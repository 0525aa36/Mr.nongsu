package com.agri.market.admin;

import com.agri.market.order.Order;
import com.agri.market.order.OrderRepository;
import com.agri.market.order.OrderItem;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExcelService {

    private final OrderRepository orderRepository;

    public ExcelService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public ByteArrayOutputStream exportOrdersToExcel(LocalDate fromDate, LocalDate toDate) throws IOException {
        List<Order> orders = orderRepository.findAll(); // For simplicity, fetching all. Can filter by date range.

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Orders");

        // Create header row
        String[] headers = {"주문번호", "주문일자", "회원이메일", "수령인", "상품명", "수량", "총액", "결제상태", "배송상태"};
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Populate data rows
        int rowNum = 1;
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        for (Order order : orders) {
            for (OrderItem item : order.getOrderItems()) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(order.getId());
                row.createCell(1).setCellValue(order.getCreatedAt().format(dateFormatter));
                row.createCell(2).setCellValue(order.getUser().getEmail());
                row.createCell(3).setCellValue(order.getRecipientName());
                row.createCell(4).setCellValue(item.getProduct().getName());
                row.createCell(5).setCellValue(item.getQuantity());
                row.createCell(6).setCellValue(order.getTotalAmount().doubleValue());
                row.createCell(7).setCellValue(order.getPaymentStatus().name());
                row.createCell(8).setCellValue(order.getOrderStatus().name());
            }
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        return outputStream;
    }
}