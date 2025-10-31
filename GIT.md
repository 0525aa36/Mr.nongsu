GITHUB_STRATEGY_SOLO.md — 솔로 프로젝트 Git 전략 프롬프트

아래 지침을 모든 커밋/브랜치/릴리즈/이슈 운영에 적용하라. 목표는 속도, 명확한 히스토리, 재현 가능한 릴리즈다.

1) 브랜치 전략 (Solo 최적화)

기본은 트렁크 기반 개발(Trunk-Based):

main = 단일 진실 소스(배포 가능한 상태 유지).

필요 시만 짧은 기능 브랜치 사용:

feat/<짧은-키워드> / fix/<짧은-키워드>

1~3 커밋 내로 작업 후 squash merge → main.

긴급 수정은 hotfix/<이슈>로 만들어 즉시 반영 후 태그 업데이트.

예시

feat/register-api
fix/order-total
hotfix/webhook-npe

2) 커밋 컨벤션 (Conventional/Angular)
   <type>(<scope>): <subject>


type: feat|fix|refactor|style|docs|test|chore|perf|ci

scope: 선택(예: user, product, order, payment, infra)

subject: 70자 이내, 현재형 간결 서술

예시

feat(user): 회원가입 API 추가
fix(order): 총액 계산 반올림 오류 수정
chore(build): Gradle 플러그인 버전 업데이트

3) PR 운영 (선택적·셀프리뷰)

혼자여도 Draft PR를 열어 작업 메모와 TODO를 기록(히스토리 가시성↑).

머지는 Squash 권장(히스토리 일관/간결).

PR 템플릿(요약/테스트 포인트/릴리즈 노트 후보)을 사용해 릴리즈 로그 재활용.

PR 제목 권장:

[feat/register-api] 회원가입 API 및 요청 DTO 추가


PR 본문 템플릿(요약):

## 요약
- 무엇을, 왜 변경했는지 한 줄 요약

## 테스트
- [ ] 로컬 API 응답 확인
- [ ] 주요 흐름(회원가입/로그인/결제 Mock) 수동 테스트

## Notes
- 마이그레이션/설정 변경 여부

4) 이슈 & 프로젝트 보드 (라이트웨이트)

이슈 제목 접두사: [feat], [fix], [chore], [docs]

마일스톤: v1.0.0(MVP), v1.1.0(기능 확장) 식으로 큼직하게.

단축 흐름: 아이디어가 생기면 이슈 생성 → 바로 브랜치 → 작업 → PR.

예시 이슈 제목

[feat] 관리자 주문 엑셀 다운로드
[fix] 결제 Webhook 서명 검증 실패 처리

5) 버전/릴리즈 (SemVer + 태그)

버전 규칙: v<MAJOR>.<MINOR>.<PATCH>

배포/공개 시:

CHANGELOG.md 업데이트

태그 생성 & 푸시

git tag -a v1.0.0 -m "MVP: 회원가입/결제(Mock)/엑셀 다운로드"
git push origin v1.0.0


GitHub Release에 PR/커밋 요약 붙여넣기

버전 상승 가이드

MAJOR: 호환 깨짐

MINOR: 기능 추가(호환 유지)

PATCH: 버그 수정/자잘한 개선

6) 브랜치 보호 & 자동화(선택)

main 보호 규칙(혼자여도 실수 방지):

Force-push 금지, 직접 커밋 금지(반드시 PR 통해 머지)

GitHub Actions(선택):

build & test 워크플로를 pull_request와 push(main)에서 실행

CODEOWNERS(선택):

* @your-github-username


Commitlint/Husky(원하면):

커밋 메시지 컨벤션 자동 검사

7) 파일 템플릿(요약)
   .github/PULL_REQUEST_TEMPLATE.md
## 요약
-

## 테스트
- [ ] 로컬 빌드/테스트 통과
- [ ] 핵심 기능 수동 점검(회원가입/결제 Mock 등)

## Notes
-

.github/ISSUE_TEMPLATE/feature.md
---
name: Feature
about: 기능 추가 요청
---

## 목적
-

## 완료 조건
- [ ] 
- [ ] 

8) 작업 루틴 예시
# 새 기능
git checkout -b feat/register-api
# 작업 & 커밋
git commit -m "feat(user): 회원가입 요청 DTO 및 유효성 추가"
git commit -m "feat(user): 회원가입 서비스/컨트롤러 구현"
# 원격 푸시 & PR 생성
git push -u origin feat/register-api
# (옵션) Draft PR로 TODO 기록
# 셀프 리뷰 후 머지(Squash)
# 태그/릴리즈 필요 시 생성

9) 정리 규칙(요약)

Trunk-Based: main 중심, feature는 짧게 → squash merge

Conventional Commits로 의미 있는 히스토리

Draft PR로 작업 노트/체크리스트(혼자여도 유용)

SemVer 태그와 간단 릴리즈 노트로 배포 가시성 확보

자동화는 최소 필요만(build/test)부터 시작, 점진 확장

생성형 도우미 지시

코드/문서 생성 시 위 전략을 준수해 브랜치명/커밋 메시지/PR 템플릿/릴리즈 노트를 함께 제안하라.

새 기능을 제안할 때는 이슈 템플릿 형식으로 완료 조건을 포함하라.

릴리즈 제안 시 변경 요약 + 태그명 + 마이그레이션 유무를 함께 출력하라.