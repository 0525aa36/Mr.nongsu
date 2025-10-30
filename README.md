# 농수산물 쇼핑몰 (AgriMarket)

산지 직배송 농수산물 온라인 쇼핑몰 프로젝트입니다.

## 프로젝트 개요

*   **목표**: 산지 직배송 농수산물 온라인 쇼핑몰 구축
*   **역할 분리**:
    *   **회원(USER)**: 상품 조회, 장바구니, 주문 및 결제
    *   **관리자(ADMIN)**: 상품 등록/관리, 결제 내역 확인, 엑셀 다운로드

## 기술 스택

*   **Frontend**: React + TypeScript, React Router, TanStack Query, Zustand(or Redux), TailwindCSS
*   **Backend**: Spring Boot 3.x (Java 21), Spring Data JPA, Spring Security, JWT, Lombok, Validation
*   **Database**: MySQL
*   **Build**: Gradle
*   **파일/엑셀**: Apache POI (XLSX), CSV export
*   **결제**: Mock 결제 시스템 + Webhook 시뮬레이터

## 주요 기능

*   **회원 관리**: 회원가입, 로그인 (JWT 기반 인증/인가)
*   **상품 관리**: 상품 목록 조회, 상품 상세 조회, 관리자 상품 CRUD
*   **장바구니**: 상품 장바구니 담기
*   **주문/결제**: 주문 생성, Mock 결제 시스템 연동, Webhook을 통한 결제 상태 업데이트
*   **관리자 기능**: 주문 내역 엑셀 다운로드

## 프로젝트 설정 및 실행

### 1. 필수 도구 설치

*   Docker Desktop (Docker Compose 포함)
*   Java Development Kit (JDK) 21
*   Node.js (LTS 버전) 및 pnpm

### 2. 프로젝트 클론

```bash
git clone [프로젝트_레포지토리_URL]
cd korean-agri-shop
```

### 3. 백엔드 설정

`backend/src/main/resources/application.properties` 파일에 JWT 비밀 키를 설정해야 합니다. `YourSuperSecretJwtKeyThatIsAtLeast256BitsLongAndBase64Encoded` 부분을 실제 보안 키로 변경해주세요. 이 키는 Base64로 인코딩된 256비트 이상의 문자열이어야 합니다.

### 4. Docker Compose를 이용한 실행

프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 모든 서비스를 빌드하고 실행합니다.

```bash
docker compose up --build
```

*   **Frontend**: `http://localhost:3000`
*   **Backend API**: `http://localhost:8080`
*   **MySQL Database**: `db` 서비스 (내부적으로만 접근)

### 5. 애플리케이션 접근

*   프론트엔드: 웹 브라우저에서 `http://localhost:3000` 으로 접속합니다.
*   백엔드 API: `http://localhost:8080` 으로 API 요청을 보낼 수 있습니다.

## 테스트

*   **회원가입**: `/api/auth/register` 엔드포인트로 회원가입 요청을 보냅니다. 이메일 중복 및 비밀번호 유효성 검증을 확인합니다.
*   **로그인**: `/api/auth/login` 엔드포인트로 로그인 요청을 보내 JWT 토큰을 발급받습니다.
*   **인증/인가**: 발급받은 JWT 토큰을 `Authorization: Bearer <token>` 헤더에 포함하여 보호된 API (예: `/api/admin/products`)에 접근하여 정상 작동하는지 확인합니다.
*   **장바구니/주문/결제**: 프론트엔드를 통해 상품을 장바구니에 담고, 주문 및 결제 과정을 진행하여 주문 상태가 올바르게 변경되는지 확인합니다.
*   **관리자 엑셀 다운로드**: `/api/admin/orders/export` 엔드포인트로 엑셀 다운로드 요청을 보내 정상적으로 파일이 다운로드되는지 확인합니다.

## 추가 정보

*   **관리자 계정 생성**: 초기 관리자 계정은 데이터베이스에 직접 삽입하거나, 별도의 관리자 등록 API를 구현해야 합니다.
*   **Mock 결제**: 현재 결제 시스템은 Mock으로 구현되어 있으며, 실제 결제 연동을 위해서는 추가 개발이 필요합니다.
# Mr.nongsu
