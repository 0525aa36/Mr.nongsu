package com.agri.market.payment;

import com.agri.market.order.Order;
import com.agri.market.order.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status; // PENDING, PAID, FAILED

    private String transactionId; // From mock payment gateway

    @CreationTimestamp
    @Column(name = "payment_date", nullable = false, updatable = false)
    private LocalDateTime paymentDate;

    // Refund information
    @Column(precision = 10, scale = 2)
    private BigDecimal refundAmount; // 환불 금액
    private LocalDateTime refundedAt; // 환불 시간
    private String refundTransactionId; // 환불 거래 ID
    private String refundReason; // 환불 사유
}