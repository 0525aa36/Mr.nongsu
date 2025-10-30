package com.agri.market.payment;

import com.agri.market.dto.WebhookRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{orderId}/request")
    public ResponseEntity<Payment> requestPayment(@PathVariable Long orderId) {
        Payment payment = paymentService.requestPayment(orderId);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody WebhookRequest webhookRequest) {
        paymentService.handleWebhook(webhookRequest);
        return ResponseEntity.ok("Webhook received and processed.");
    }
}