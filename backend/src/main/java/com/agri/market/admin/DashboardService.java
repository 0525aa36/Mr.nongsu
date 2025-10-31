package com.agri.market.admin;

import com.agri.market.dto.DashboardStats;
import com.agri.market.order.OrderRepository;
import com.agri.market.order.OrderStatus;
import com.agri.market.order.PaymentStatus;
import com.agri.market.user.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public DashboardService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public DashboardStats getDashboardStats() {
        DashboardStats stats = new DashboardStats();

        // 날짜 범위 설정
        LocalDateTime todayStart = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime todayEnd = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
        LocalDateTime monthStart = LocalDateTime.of(LocalDate.now().withDayOfMonth(1), LocalTime.MIN);
        LocalDateTime monthEnd = LocalDateTime.now();

        // 매출 통계 (결제 완료된 주문만)
        stats.setTotalSales(orderRepository.findAll().stream()
                .filter(order -> order.getPaymentStatus() == PaymentStatus.PAID)
                .map(order -> order.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        stats.setTodaySales(orderRepository.findByCreatedAtBetween(todayStart, todayEnd, null)
                .getContent().stream()
                .filter(order -> order.getPaymentStatus() == PaymentStatus.PAID)
                .map(order -> order.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        stats.setMonthSales(orderRepository.findByCreatedAtBetween(monthStart, monthEnd, null)
                .getContent().stream()
                .filter(order -> order.getPaymentStatus() == PaymentStatus.PAID)
                .map(order -> order.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        // 주문 통계
        stats.setTotalOrders(orderRepository.count());
        stats.setTodayOrders((long) orderRepository.findByCreatedAtBetween(todayStart, todayEnd, null)
                .getContent().size());
        stats.setMonthOrders((long) orderRepository.findByCreatedAtBetween(monthStart, monthEnd, null)
                .getContent().size());
        stats.setPendingOrders(orderRepository.findByOrderStatusOrderByCreatedAtDesc(
                OrderStatus.PENDING, null).getTotalElements());

        // 사용자 통계
        stats.setTotalUsers(userRepository.count());
        stats.setTodayNewUsers(userRepository.findAll().stream()
                .filter(user -> user.getCreatedAt().isAfter(todayStart) &&
                               user.getCreatedAt().isBefore(todayEnd))
                .count());

        // 인기 상품 Top 5 (Mock 데이터 - 실제로는 OrderItem을 집계해야 함)
        List<Map<String, Object>> topProducts = new ArrayList<>();
        // 실제 구현 시에는 OrderItem 집계 필요
        stats.setTopProducts(topProducts);

        return stats;
    }
}
