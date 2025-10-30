package com.agri.market.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WebhookRequest {
    private Long orderId;
    private String transactionId;
    private String status; // e.g., "PAID", "FAILED"
    // Add other relevant fields from the mock payment gateway webhook
}