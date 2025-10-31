package com.agri.market.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelOrderRequest {
    @NotBlank(message = "Cancellation reason is required")
    private String cancellationReason;
}
