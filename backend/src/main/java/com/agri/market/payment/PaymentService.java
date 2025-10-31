package com.agri.market.payment;

import com.agri.market.dto.WebhookRequest;
import com.agri.market.order.Order;
import com.agri.market.order.OrderRepository;
import com.agri.market.order.OrderService;
import com.agri.market.order.OrderStatus;
import com.agri.market.order.PaymentStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository, OrderService orderService) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
    }

    @Transactional
    public Payment requestPayment(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        if (order.getPaymentStatus() != PaymentStatus.PENDING) {
            throw new RuntimeException("Payment already processed for order: " + orderId);
        }

        // Simulate payment gateway interaction
        // In a real scenario, this would involve calling an external payment gateway API
        // For now, we'll create a PENDING payment record
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setTransactionId("MOCK_TXN_" + System.currentTimeMillis()); // Mock transaction ID
        paymentRepository.save(payment);

        return payment;
    }

    @Transactional
    public void handleWebhook(WebhookRequest webhookRequest) {
        Order order = orderRepository.findById(webhookRequest.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + webhookRequest.getOrderId()));

        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() -> new RuntimeException("Payment not found for order: " + webhookRequest.getOrderId()));

        if ("PAID".equalsIgnoreCase(webhookRequest.getStatus())) {
            order.setPaymentStatus(PaymentStatus.PAID);
            order.setOrderStatus(OrderStatus.PAID); // Assuming order is paid once payment is successful
            payment.setStatus(PaymentStatus.PAID);
        } else if ("FAILED".equalsIgnoreCase(webhookRequest.getStatus())) {
            order.setPaymentStatus(PaymentStatus.FAILED);
            order.setOrderStatus(OrderStatus.CANCELLED); // Or some other appropriate status
            payment.setStatus(PaymentStatus.FAILED);

            // 결제 실패 시 재고 복구
            orderService.restoreStock(order.getId());
        }
        // Update transaction ID if provided by webhook
        if (webhookRequest.getTransactionId() != null && !webhookRequest.getTransactionId().isEmpty()) {
            payment.setTransactionId(webhookRequest.getTransactionId());
        }

        orderRepository.save(order);
        paymentRepository.save(payment);
    }

    /**
     * 결제 환불 처리 (Mock)
     * @param orderId 주문 ID
     * @param refundReason 환불 사유
     * @return 환불된 Payment
     */
    @Transactional
    public Payment processRefund(Long orderId, String refundReason) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // 결제 정보 조회
        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() -> new RuntimeException("Payment not found for order: " + orderId));

        // 환불 가능 여부 확인
        if (payment.getStatus() != PaymentStatus.PAID) {
            throw new RuntimeException("Cannot refund: Payment is not in PAID status");
        }

        if (payment.getRefundAmount() != null && payment.getRefundAmount().compareTo(BigDecimal.ZERO) > 0) {
            throw new RuntimeException("Payment already refunded");
        }

        // Mock 환불 처리 (실제로는 결제 게이트웨이 API 호출)
        payment.setRefundAmount(payment.getAmount());
        payment.setRefundedAt(java.time.LocalDateTime.now());
        payment.setRefundTransactionId("REFUND_TXN_" + System.currentTimeMillis());
        payment.setRefundReason(refundReason);
        payment.setStatus(PaymentStatus.FAILED); // 환불 완료 시 FAILED로 변경 (또는 REFUNDED 상태 추가 가능)

        // 주문 상태도 CANCELLED로 변경
        order.setOrderStatus(OrderStatus.CANCELLED);
        order.setPaymentStatus(PaymentStatus.FAILED);

        paymentRepository.save(payment);
        orderRepository.save(order);

        return payment;
    }
}