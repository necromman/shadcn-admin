# 세종샘물도서관 홈페이지 구현 진행 상태

## 📚 참조 문서
- 설계: `docs/implementation/library-frontend-plan.md`
- 상세 페이지: `docs/implementation/library-frontend-detailed-pages.md`

## 🚀 프로젝트 현황
- **프로젝트 유형**: 독립 실행 가능한 React + Vite 프로젝트
- **개발 서버**: http://localhost:5175/ (실행 중)
- **빌드 상태**: ✅ 성공 (JS: 412KB, CSS: 48KB)
- **라우팅**: react-router-dom 사용

## 🔴 중요 지침
- **절대 수정 금지**: `src/features/design-system/frontend-section-new.tsx`는 참조용 원본
- **작업 대상**: library-frontend 폴더 내의 파일들만 수정
- **원본 보호**: shadcn-admin 프로젝트의 파일은 읽기 전용

## 🐛 현재 이슈 (2025-01-03 발견)
### 다크모드 관련 문제
1. **배경색 미적용 문제**
   - 다크모드 전환 시 일부 컴포넌트 배경색이 변경되지 않음
   - 특히 카드, 드롭다운, 모달 배경이 흰색으로 유지됨
   
2. **드롭다운 배경 투명 문제**
   - 네비게이션 드롭다운 메뉴 배경이 투명하게 표시
   - `bg-popover` 클래스가 제대로 적용되지 않음
   
3. **텍스트 색상 대비 문제**
   - 일부 텍스트가 다크모드에서 읽기 어려움
   - 특히 회색 계열 텍스트의 대비가 부족

### 예상 원인
- Tailwind CSS 다크모드 설정 누락 가능성
- CSS 변수 정의 누락
- 컴포넌트별 다크모드 클래스 미적용

## ✅ 완료된 작업

### 1. 프로젝트 초기 설정 ✅
- [x] library-frontend 독립 프로젝트 생성
- [x] package.json, vite.config.ts, tsconfig.json 설정
- [x] tailwind.config.js 설정
- [x] 모든 의존성 패키지 설치 완료
- [x] 개발 서버 정상 작동 확인
- [x] 프로덕션 빌드 테스트 성공

### 2. 기본 구조 설정 ✅
- [x] 폴더 구조 생성
  - `src/app/(main)` - 메인 페이지들
  - `src/app/(auth)` - 인증 페이지들
  - `src/components/layout` - 레이아웃 컴포넌트
  - `src/components/ui` - shadcn/ui 컴포넌트 (복사 완료)
  - `src/lib` - 유틸리티 함수

### 3. 라우팅 시스템 ✅
- [x] react-router-dom 설정
- [x] 기본 라우트 구조
  - `/` - 홈페이지
  - `/login` - 로그인
  - `/register` - 회원가입
  - `/search` - 검색 (Placeholder)
  - `/facilities/seat` - 좌석 예약 (Placeholder)
  - `/my-library` - My Library (Placeholder)

### 4. 레이아웃 컴포넌트 ✅
- [x] MainLayout - 메인 레이아웃 컨테이너
- [x] LibraryHeader (**2025-09-03 업데이트**)
  - 상단 공지 바
  - 로고 및 네비게이션
  - **드롭다운 서브메뉴 구현** ✨
    - 자료검색 (통합검색, 상세검색, 신착자료, 인기자료, 주제별 브라우징)
    - 도서관 서비스 (대출/예약/연장, 희망도서 신청, 상호대차, 원문복사, 이용교육)
    - 시설이용 (열람실 좌석, 스터디룸, 세미나실, 시설 안내, 예약 현황)
    - 도서관 소식 (공지사항, 도서관 소식, 이벤트/행사, FAQ, Q&A)
    - 이용안내 (도서관 소개, 이용시간, 대출/반납, 시설, 오시는 길, 규정)
  - 검색바
  - 사용자 메뉴
  - **모바일 메뉴 아코디언 구현** ✨
- [x] LibraryFooter
  - 도서관 정보
  - 빠른 링크
  - 관련 사이트

### 5. 구현된 페이지 ✅
- [x] **홈페이지** (`/`)
  - 히어로 배너
  - 빠른 서비스 카드 (4개)
  - 공지사항 섹션
  - 신착도서 캐러셀
  - 도서관 정보 위젯
- [x] **로그인 페이지** (`/login`)
  - 이메일/학번 입력
  - 비밀번호 입력
  - 자동 로그인 체크박스
  - 회원가입 링크

### 6. 기술적 해결사항 ✅
- [x] tanstack/react-router → react-router-dom 마이그레이션
- [x] navigation-menu 컴포넌트 누락 → 간단한 네비게이션으로 대체
- [x] Tailwind CSS 커스텀 유틸리티 클래스 문제 해결
- [x] 독립 프로젝트로 분리 (기존 shadcn-admin과 분리)

## 🔄 진행 중인 작업
- 없음 (기본 구조 완성)

## 📝 남은 작업 목록

### Phase 3: 검색 시스템 (0%)
- [ ] 통합검색 페이지 (`/search`)
  - [ ] 검색 필터 UI (자료유형, 발행년도, 소장위치)
  - [ ] 검색 결과 카드 컴포넌트
  - [ ] 정렬 옵션 (최신순, 인기순, 제목순)
  - [ ] 페이지네이션
  - [ ] 검색어 하이라이팅
- [ ] 도서 상세 페이지 (`/book/:id`)
  - [ ] 서지정보 표시
  - [ ] 대출/예약 버튼
  - [ ] 대출 가능 상태 표시
  - [ ] 관련도서 추천

### Phase 4: 도서관 서비스 (0%)
- [ ] 희망도서 신청 (`/services/book-request`)
  - [ ] 신청 폼
  - [ ] ISBN 검색
  - [ ] 신청 내역 조회
- [ ] 상호대차 서비스 (`/services/interlibrary`)
- [ ] 대출 연장 서비스

### Phase 5: 시설 예약 시스템 (0%)
- [ ] 좌석 예약 페이지 (`/facilities/seat`)
  - [ ] 층별 좌석 배치도
  - [ ] 실시간 좌석 현황
  - [ ] 예약 시간 선택
  - [ ] 예약 확인/취소
- [ ] 스터디룸 예약 (`/facilities/study-room`)
- [ ] 세미나실 예약 (`/facilities/seminar`)

### Phase 6: My Library (0%)
- [ ] 대시보드 (`/my-library`)
  - [ ] 대출 현황
  - [ ] 예약 내역
  - [ ] 연체 정보
  - [ ] 이용 통계
- [ ] 개인정보 관리
- [ ] 대출 이력

### Phase 7: 정보 페이지 (0%)
- [ ] 공지사항 (`/news/notice`)
  - [ ] 목록 페이지
  - [ ] 상세 페이지
  - [ ] 검색/필터
- [ ] 도서관 안내 (`/guide/info`)
- [ ] 이용시간 안내 (`/guide/hours`)
- [ ] FAQ (`/news/faq`)

### Phase 8: 회원가입 (0%)
- [ ] 회원가입 페이지 (`/register`)
  - [ ] 회원 유형 선택 (5개 대학)
  - [ ] 본인 인증
  - [ ] 정보 입력
  - [ ] 약관 동의

### Phase 9: 데이터 및 상태 관리 (0%)
- [ ] 더미 데이터 생성 (@faker-js/faker)
  - [ ] 도서 데이터 (1000개+)
  - [ ] 사용자 데이터
  - [ ] 대출 기록
  - [ ] 공지사항
- [ ] Zustand 상태 관리
  - [ ] 사용자 인증 상태
  - [ ] 장바구니
  - [ ] 검색 히스토리

## 📁 생성된 파일 목록

### 설정 파일
- `library-frontend/package.json`
- `library-frontend/vite.config.ts`
- `library-frontend/tsconfig.json`
- `library-frontend/tailwind.config.js`
- `library-frontend/index.html`

### 소스 파일
- `library-frontend/src/main.tsx`
- `library-frontend/src/App.tsx`
- `library-frontend/src/index.css`
- `library-frontend/src/lib/utils.ts`

### 컴포넌트
- `library-frontend/src/components/layout/main-layout.tsx`
- `library-frontend/src/components/layout/library-header.tsx`
- `library-frontend/src/components/layout/library-footer.tsx`
- `library-frontend/src/components/ui/` (전체 shadcn/ui 컴포넌트)

### 페이지
- `library-frontend/src/app/(main)/home/page.tsx`
- `library-frontend/src/app/(auth)/login/page.tsx`

## 📊 전체 진행률

| Phase | 항목 | 진행률 | 상태 |
|-------|------|--------|------|
| Phase 1 | 프로젝트 설정 | 100% | ✅ |
| Phase 2 | 기본 구조 | 100% | ✅ |
| Phase 3 | 검색 시스템 | 0% | ⏳ |
| Phase 4 | 도서관 서비스 | 0% | ⏳ |
| Phase 5 | 시설 예약 | 0% | ⏳ |
| Phase 6 | My Library | 0% | ⏳ |
| Phase 7 | 정보 페이지 | 0% | ⏳ |
| Phase 8 | 회원가입 | 0% | ⏳ |
| Phase 9 | 데이터/상태관리 | 0% | ⏳ |

**전체 진행률: 약 22%** (기본 구조 완성, 헤더 네비게이션 완성)

## 💡 다음 단계 추천

1. **우선순위 높음**
   - 검색 페이지 구현 (핵심 기능)
   - 더미 데이터 생성
   - 회원가입 페이지

2. **우선순위 중간**
   - My Library 대시보드
   - 좌석 예약 시스템
   - 공지사항 페이지

3. **우선순위 낮음**
   - 희망도서 신청
   - 상호대차
   - FAQ

## 🔧 기술 스택
- **프레임워크**: React 19.1.1
- **빌드 도구**: Vite 7.1.4
- **라우팅**: react-router-dom 7.8.2
- **스타일링**: Tailwind CSS 4.1.12
- **UI 컴포넌트**: shadcn/ui
- **상태 관리**: Zustand (예정)
- **데이터 페칭**: TanStack Query (설치됨)
- **패키지 매니저**: pnpm

## 📌 메모
- 독립 실행 가능한 프로젝트로 성공적으로 분리
- MVP 수준의 프로토타입 준비 완료
- **2025-09-03 업데이트**: 헤더에 전체 네비게이션 구조 구현 완료
  - 드롭다운 서브메뉴 (데스크톱)
  - 아코디언 서브메뉴 (모바일)
  - 도서관 사이트맵 완전 반영
- 반응형 디자인 적용 필요
- 다크 모드 지원 추가 필요
- 접근성(ARIA) 개선 필요
- **중요**: `frontend-section-new.tsx`는 참조용 원본으로 절대 수정 금지