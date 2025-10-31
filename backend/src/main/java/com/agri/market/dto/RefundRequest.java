package com.agri.market.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefundRequest {
    @NotBlank(message = "Refund reason is required")
    private String refundReason;
}
