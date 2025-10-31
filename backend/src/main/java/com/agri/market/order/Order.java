package com.agri.market.order;

import com.agri.market.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrderItem> orderItems = new HashSet<>();

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus; // PENDING, PAID, SHIPPED, DELIVERED, CANCELLED

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus; // PENDING, PAID, FAILED

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Shipping information
    @Column(nullable = false)
    private String recipientName;
    @Column(nullable = false)
    private String recipientPhone;
    @Column(nullable = false)
    private String shippingAddressLine1;
    private String shippingAddressLine2;
    @Column(nullable = false)
    private String shippingPostcode;

    // Cancellation information
    private String cancellationReason; // 취소 사유
    private LocalDateTime cancelledAt; // 취소 시간
    private String trackingNumber; // 송장 번호 (배송 추적용)

    // Delivery information
    private LocalDateTime shippedAt; // 배송 시작 시간
    private LocalDateTime deliveredAt; // 배송 완료 시간
    private LocalDateTime confirmedAt; // 구매 확정 시간
}