다음 요구사항을 충실히 구현하라.
결과물은 React 프론트엔드 + Spring Boot 백엔드 기반의 완전한 농수산물 쇼핑몰 웹서비스여야 하며,
회원가입, 결제, 관리자 엑셀 다운로드 기능까지 포함되어야 한다.

🥕 프로젝트 개요

프로젝트명: 농수산물 쇼핑몰 (AgriMarket)

목표: 산지 직배송 농수산물 온라인 쇼핑몰 구축

역할 분리:

회원(USER): 상품 조회, 장바구니, 주문 및 결제

관리자(ADMIN): 상품 등록/관리, 결제 내역 확인, 엑셀 다운로드

⚙️ 기술 스택

Frontend: React + TypeScript, React Router, TanStack Query, Zustand(or Redux), TailwindCSS

Backend: Spring Boot 3.x (Java 21), Spring Data JPA, Spring Security, JWT, Lombok, Validation

Database: MySQL

빌드: Gradle

파일/엑셀: Apache POI (XLSX), CSV export

결제: Mock 결제 시스템 + Webhook 시뮬레이터

👥 사용자 역할 및 권한
역할	권한	주요 기능
USER	일반 회원	상품 조회, 장바구니, 결제, 주문 내역 조회
ADMIN	관리자	상품 CRUD, 주문 관리, 엑셀 다운로드

JWT 기반 인증/인가를 사용하며,
Spring Security에서 @PreAuthorize("hasRole('ADMIN')") 등의 방식으로 접근 제어한다.

🧱 데이터 모델
users (회원)
CREATE TABLE users (
id BIGSERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,             -- 아이디(이메일)
password_hash VARCHAR(255) NOT NULL,            -- 비밀번호 (BCrypt)
name VARCHAR(100) NOT NULL,                     -- 이름
phone VARCHAR(20) NOT NULL,                     -- 전화번호
address_line1 VARCHAR(255) NOT NULL,            -- 기본 주소
address_line2 VARCHAR(255),                     -- 상세 주소
postcode VARCHAR(10),                           -- 우편번호
birth_date DATE NOT NULL,                       -- 생년월일
role VARCHAR(20) DEFAULT 'ROLE_USER' NOT NULL,  -- 권한
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

products (상품)
id, name, category, origin, description, price, stock, image_url, created_at, updated_at

orders, payments, order_items

주문, 결제, 배송 상태 관리 (PAID / SHIPPED / DELIVERED)

결제 Mock → Webhook 승인 후 상태 업데이트

🧾 회원가입 요청 DTO
// RegisterRequest.java
package com.agri.market.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수 입력 항목입니다.")
    private String email;  // 아이디 (이메일)

    @NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다.")
    private String password;

    @NotBlank(message = "이름은 필수 입력 항목입니다.")
    private String name;

    @NotBlank(message = "전화번호는 필수 입력 항목입니다.")
    private String phone;

    @NotBlank(message = "주소는 필수 입력 항목입니다.")
    private String addressLine1;

    private String addressLine2;

    @NotBlank(message = "우편번호는 필수 입력 항목입니다.")
    private String postcode;

    @NotNull(message = "생년월일은 필수 입력 항목입니다.")
    private LocalDate birthDate;
}

회원가입 API
@PostMapping("/api/auth/register")
public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
userService.register(request);
return ResponseEntity.ok("회원가입이 완료되었습니다.");
}

🌐 REST API 요약
구분	엔드포인트	설명
Auth	POST /api/auth/register	회원가입
Auth	POST /api/auth/login	로그인 (JWT 발급)
Product	GET /api/products	상품 목록 조회
Product	GET /api/products/{id}	상품 상세
Cart	POST /api/cart/items	장바구니 담기
Order	POST /api/orders	주문 생성
Payment	POST /api/payments/{orderId}/request	결제 요청
Payment	POST /api/payments/webhook	결제 Webhook 수신
Admin	POST /api/admin/products	상품 등록
Admin	GET /api/admin/orders/export	주문 엑셀 다운로드
📊 관리자 엑셀 다운로드 기능

URL: /api/admin/orders/export?format=xlsx&from=2025-01-01&to=2025-01-31

컬럼 예시:
| 주문번호 | 주문일자 | 회원이메일 | 수령인 | 상품명 | 수량 | 총액 | 결제상태 | 배송상태 |

Apache POI를 사용해 .xlsx 또는 .csv 스트리밍 응답

🖥️ 프론트엔드 주요 화면

홈/상품목록/상품상세

회원가입 & 로그인 페이지

장바구니 / 주문 / 결제 결과 페이지

관리자 대시보드

상품 등록/관리

주문/결제 현황 테이블

엑셀 다운로드 버튼



✅ 완료 조건

회원가입 시 이메일 중복 체크, 비밀번호 유효성 검증 통과

로그인 후 JWT 발급 및 인증 헤더 기반 요청 정상 처리

장바구니 → 결제 → Webhook 처리 후 주문 상태 변경 확인

관리자 페이지에서 기간별 주문 목록 엑셀 다운로드 가능

README.md에 실행 및 테스트 절차 명시