package com.agri.market.review;

import com.agri.market.dto.ReviewRequest;
import com.agri.market.dto.ReviewResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // 리뷰 생성 (인증 필요)
    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @Valid @RequestBody ReviewRequest request,
            Authentication authentication) {

        // 현재 로그인한 사용자 ID 가져오기 (실제로는 UserDetails에서 추출해야 함)
        // 임시로 userId 1로 설정 (실제 구현 시 수정 필요)
        Long userId = 1L; // TODO: authentication에서 userId 추출

        Review review = reviewService.createReview(
            request.getProductId(),
            userId,
            request.getRating(),
            request.getTitle(),
            request.getContent()
        );

        return ResponseEntity.ok(ReviewResponse.from(review));
    }

    // 상품별 리뷰 조회 (공개)
    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<ReviewResponse>> getProductReviews(
            @PathVariable Long productId,
            Pageable pageable) {
        Page<Review> reviews = reviewService.getReviewsByProductId(productId, pageable);
        Page<ReviewResponse> response = reviews.map(ReviewResponse::from);
        return ResponseEntity.ok(response);
    }

    // 상품 평균 평점 및 리뷰 개수 조회 (공개)
    @GetMapping("/product/{productId}/stats")
    public ResponseEntity<Map<String, Object>> getProductReviewStats(@PathVariable Long productId) {
        Double avgRating = reviewService.getAverageRating(productId);
        Long reviewCount = reviewService.getReviewCount(productId);

        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", avgRating);
        stats.put("reviewCount", reviewCount);

        return ResponseEntity.ok(stats);
    }

    // 사용자별 리뷰 조회 (인증 필요)
    @GetMapping("/my-reviews")
    public ResponseEntity<Page<ReviewResponse>> getMyReviews(
            Authentication authentication,
            Pageable pageable) {
        // 임시로 userId 1로 설정
        Long userId = 1L; // TODO: authentication에서 userId 추출

        Page<Review> reviews = reviewService.getReviewsByUserId(userId, pageable);
        Page<ReviewResponse> response = reviews.map(ReviewResponse::from);
        return ResponseEntity.ok(response);
    }

    // 리뷰 수정 (인증 필요, 본인 확인)
    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request,
            Authentication authentication) {

        Review review = reviewService.updateReview(
            id,
            request.getRating(),
            request.getTitle(),
            request.getContent()
        );

        return ResponseEntity.ok(ReviewResponse.from(review));
    }

    // 리뷰 삭제 (인증 필요, 본인 확인)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(
            @PathVariable Long id,
            Authentication authentication) {

        reviewService.deleteReview(id);
        return ResponseEntity.ok("리뷰가 삭제되었습니다.");
    }
}
