package com.agri.market.order;

import com.agri.market.cart.Cart;
import com.agri.market.cart.CartItem;
import com.agri.market.cart.CartRepository;
import com.agri.market.dto.OrderRequest;
import com.agri.market.product.Product;
import com.agri.market.product.ProductRepository;
import com.agri.market.user.User;
import com.agri.market.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        UserRepository userRepository, ProductRepository productRepository, CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }

    @Transactional
    public Order createOrder(String userEmail, OrderRequest orderRequest) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        Order order = new Order();
        order.setUser(user);
        order.setRecipientName(orderRequest.getRecipientName());
        order.setRecipientPhone(orderRequest.getRecipientPhone());
        order.setShippingAddressLine1(orderRequest.getShippingAddressLine1());
        order.setShippingAddressLine2(orderRequest.getShippingAddressLine2());
        order.setShippingPostcode(orderRequest.getShippingPostcode());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);

        BigDecimal totalAmount = BigDecimal.ZERO;
        Set<OrderItem> orderItems = new HashSet<>();

        for (OrderRequest.OrderItemRequest itemRequest : orderRequest.getItems()) {
            // Pessimistic Lock을 사용하여 동시성 제어
            Product product = productRepository.findByIdWithLock(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemRequest.getProductId()));

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(product.getPrice()); // Price at the time of order
            orderItems.add(orderItem);

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));

            // Deduct stock
            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        // Clear cart after order creation (assuming order is created from cart)
        cartRepository.findByUser(user).ifPresent(cartRepository::delete);

        return savedOrder;
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getOrdersByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));
        return orderRepository.findByUser(user);
    }

    /**
     * 주문 취소 또는 결제 실패 시 재고 복구
     * @param orderId 주문 ID
     */
    @Transactional
    public void restoreStock(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        for (OrderItem orderItem : order.getOrderItems()) {
            Product product = orderItem.getProduct();
            // Pessimistic Lock으로 동시성 제어
            Product lockedProduct = productRepository.findByIdWithLock(product.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + product.getId()));

            // 재고 복구
            lockedProduct.setStock(lockedProduct.getStock() + orderItem.getQuantity());
            productRepository.save(lockedProduct);
        }
    }

    /**
     * 주문 취소
     * @param orderId 주문 ID
     * @param userEmail 사용자 이메일 (권한 확인용)
     * @param cancellationReason 취소 사유
     * @return 취소된 주문
     */
    @Transactional
    public Order cancelOrder(Long orderId, String userEmail, String cancellationReason) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // 본인 주문인지 확인
        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized: This order does not belong to you");
        }

        // 취소 가능 상태 검증
        if (order.getOrderStatus() == OrderStatus.SHIPPED ||
            order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel order: Order already shipped or delivered");
        }

        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order is already cancelled");
        }

        // 재고 복구
        restoreStock(orderId);

        // 주문 상태 변경
        order.setOrderStatus(OrderStatus.CANCELLED);
        order.setCancellationReason(cancellationReason);
        order.setCancelledAt(java.time.LocalDateTime.now());

        // 결제 상태도 취소로 변경 (결제 완료된 경우 환불 처리는 PaymentService에서)
        if (order.getPaymentStatus() == PaymentStatus.PENDING) {
            order.setPaymentStatus(PaymentStatus.FAILED);
        }

        return orderRepository.save(order);
    }

    /**
     * 구매 확정 (사용자가 배송 완료 확인)
     * @param orderId 주문 ID
     * @param userEmail 사용자 이메일 (권한 확인용)
     * @return 구매 확정된 주문
     */
    @Transactional
    public Order confirmOrder(Long orderId, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // 본인 주문인지 확인
        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized: This order does not belong to you");
        }

        // 배송 완료 상태에서만 구매 확정 가능
        if (order.getOrderStatus() != OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot confirm order: Order is not delivered yet");
        }

        // 이미 확정된 경우
        if (order.getConfirmedAt() != null) {
            throw new RuntimeException("Order is already confirmed");
        }

        // 구매 확정
        order.setConfirmedAt(java.time.LocalDateTime.now());

        return orderRepository.save(order);
    }

    // ==================== 관리자 전용 메서드 ====================

    /**
     * 모든 주문 조회 (페이징, 필터링)
     * @param orderStatus 주문 상태 필터 (null이면 전체)
     * @param paymentStatus 결제 상태 필터 (null이면 전체)
     * @param startDate 시작 날짜 (null이면 제한 없음)
     * @param endDate 종료 날짜 (null이면 제한 없음)
     * @param pageable 페이징 정보
     * @return 주문 페이지
     */
    public Page<Order> getAllOrders(
            OrderStatus orderStatus,
            PaymentStatus paymentStatus,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Pageable pageable) {

        // 필터가 하나도 없으면 전체 조회
        if (orderStatus == null && paymentStatus == null && startDate == null && endDate == null) {
            return orderRepository.findAllByOrderByCreatedAtDesc(pageable);
        }

        // 필터링 조회
        return orderRepository.findOrdersWithFilters(orderStatus, paymentStatus, startDate, endDate, pageable);
    }

    /**
     * 주문 상태 변경 (관리자용)
     * @param orderId 주문 ID
     * @param newStatus 새로운 주문 상태
     * @return 변경된 주문
     */
    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        OrderStatus oldStatus = order.getOrderStatus();
        order.setOrderStatus(newStatus);

        // 상태별 타임스탬프 업데이트
        if (newStatus == OrderStatus.SHIPPED && oldStatus != OrderStatus.SHIPPED) {
            order.setShippedAt(LocalDateTime.now());
        } else if (newStatus == OrderStatus.DELIVERED && oldStatus != OrderStatus.DELIVERED) {
            order.setDeliveredAt(LocalDateTime.now());
        }

        return orderRepository.save(order);
    }

    /**
     * 송장 번호 등록 (관리자용)
     * @param orderId 주문 ID
     * @param trackingNumber 송장 번호
     * @return 업데이트된 주문
     */
    @Transactional
    public Order updateTrackingNumber(Long orderId, String trackingNumber) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        order.setTrackingNumber(trackingNumber);

        // 송장 번호 등록 시 자동으로 SHIPPED 상태로 변경
        if (order.getOrderStatus() == OrderStatus.PAID) {
            order.setOrderStatus(OrderStatus.SHIPPED);
            order.setShippedAt(LocalDateTime.now());
        }

        return orderRepository.save(order);
    }
}