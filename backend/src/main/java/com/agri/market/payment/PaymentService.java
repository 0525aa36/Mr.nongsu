package com.agri.market.payment;

import com.agri.market.dto.WebhookRequest;
import com.agri.market.order.Order;
import com.agri.market.order.OrderRepository;
import com.agri.market.order.OrderStatus;
import com.agri.market.order.PaymentStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
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
        }
        // Update transaction ID if provided by webhook
        if (webhookRequest.getTransactionId() != null && !webhookRequest.getTransactionId().isEmpty()) {
            payment.setTransactionId(webhookRequest.getTransactionId());
        }

        orderRepository.save(order);
        paymentRepository.save(payment);
    }
}