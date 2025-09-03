# 세종공동캠퍼스 도서관 홈페이지 구현 계획

## 📋 프로젝트 개요

### 목표
- 기존 디자인 시스템을 활용한 도서관 이용자 홈페이지 구축
- 최소 기능 구현 (MVP)
- 더미 데이터 활용
- 빠른 프로토타입 개발

### 기술 스택
- **기존 활용**: React, TypeScript, shadcn/ui, Tailwind CSS, Zustand
- **추가 필요**: React Query (API 시뮬레이션), Faker.js (더미 데이터)

## 🗺️ 사이트맵

```
세종샘물도서관
│
├── 🏠 홈
│   ├── 메인 배너
│   ├── 공지사항 미리보기
│   ├── 신착도서
│   ├── 인기도서
│   ├── 도서관 이용시간
│   └── 빠른 서비스 링크
│
├── 🔍 자료검색
│   ├── 통합검색
│   ├── 상세검색
│   ├── 신착자료
│   ├── 인기자료
│   └── 주제별 브라우징
│
├── 📚 도서관 서비스
│   ├── 대출/예약/연장
│   ├── 희망도서 신청
│   ├── 상호대차
│   ├── 원문복사
│   └── 도서관 이용교육
│
├── 💺 시설이용
│   ├── 열람실 좌석 예약
│   ├── 스터디룸 예약
│   ├── 세미나실 예약
│   ├── 시설 안내
│   └── 예약 현황
│
├── 📢 도서관 소식
│   ├── 공지사항
│   ├── 도서관 소식
│   ├── 이벤트/행사
│   ├── FAQ
│   └── Q&A 게시판
│
├── 📖 이용안내
│   ├── 도서관 소개
│   ├── 이용시간
│   ├── 대출/반납 안내
│   ├── 시설 안내
│   ├── 오시는 길
│   └── 규정/지침
│
├── 👤 My Library
│   ├── 대출 현황
│   ├── 예약 도서
│   ├── 대출 이력
│   ├── 연체/제재
│   ├── 희망도서 신청내역
│   ├── 시설 예약 내역
│   ├── 개인정보 수정
│   └── 회원 탈퇴
│
└── 🔐 인증
    ├── 로그인
    ├── 회원가입
    ├── 아이디 찾기
    └── 비밀번호 찾기
```

## 📁 프로젝트 폴더 구조

```
shadcn-admin/
├── library-frontend/              # 도서관 홈페이지 루트
│   ├── src/
│   │   ├── app/                  # 페이지 라우팅
│   │   │   ├── (auth)/          # 인증 관련
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── forgot/
│   │   │   ├── (main)/          # 메인 레이아웃
│   │   │   │   ├── home/
│   │   │   │   ├── search/
│   │   │   │   ├── services/
│   │   │   │   ├── facilities/
│   │   │   │   ├── news/
│   │   │   │   └── guide/
│   │   │   └── (user)/          # 사용자 전용
│   │   │       └── my-library/
│   │   │
│   │   ├── components/
│   │   │   ├── layout/          # 레이아웃 컴포넌트
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   └── navigation/
│   │   │   ├── search/          # 검색 컴포넌트
│   │   │   ├── book/            # 도서 관련
│   │   │   ├── reservation/     # 예약 관련
│   │   │   └── ui/              # 공통 UI
│   │   │
│   │   ├── hooks/                # 커스텀 훅
│   │   ├── lib/                  # 유틸리티
│   │   ├── stores/               # 상태 관리
│   │   ├── types/                # 타입 정의
│   │   └── data/                 # 더미 데이터
│   │
│   ├── public/
│   └── package.json
│
└── (기존 프로젝트 구조)
```

## 🎯 구현 우선순위 및 일정

### Phase 1: 기본 설정 (Day 1)
1. ✅ 프로젝트 폴더 생성 및 기본 설정
2. ✅ 라우팅 구조 설정
3. ✅ 레이아웃 컴포넌트 (Header, Footer, Navigation)
4. ✅ 테마 및 디자인 시스템 연결

### Phase 2: 인증 시스템 (Day 2)
1. ✅ 로그인 페이지
2. ✅ 회원가입 페이지
3. ✅ 비밀번호 찾기
4. ✅ 인증 상태 관리 (Zustand)

### Phase 3: 메인 페이지 (Day 3)
1. ✅ 메인 배너/히어로 섹션
2. ✅ 공지사항 위젯
3. ✅ 신착/인기 도서 캐러셀
4. ✅ 도서관 정보 위젯
5. ✅ 빠른 서비스 링크

### Phase 4: 검색 시스템 (Day 4-5)
1. ✅ 통합검색 페이지
2. ✅ 검색 결과 리스트
3. ✅ 도서 상세 페이지
4. ✅ 필터 및 정렬
5. ✅ 검색 히스토리

### Phase 5: 도서관 서비스 (Day 6-7)
1. ✅ 대출/예약 관리
2. ✅ 희망도서 신청
3. ✅ 상호대차 신청
4. ✅ 서비스 신청 폼

### Phase 6: 시설 예약 (Day 8-9)
1. ✅ 열람실 좌석 현황
2. ✅ 좌석 예약 시스템
3. ✅ 스터디룸 예약
4. ✅ 예약 캘린더 뷰

### Phase 7: My Library (Day 10)
1. ✅ 대시보드
2. ✅ 대출 현황
3. ✅ 예약 내역
4. ✅ 개인정보 관리

### Phase 8: 정보 페이지 (Day 11)
1. ✅ 공지사항/소식
2. ✅ FAQ
3. ✅ 이용안내
4. ✅ 도서관 소개

### Phase 9: 마무리 (Day 12)
1. ✅ 반응형 디자인 검증
2. ✅ 접근성 체크
3. ✅ 성능 최적화
4. ✅ 테스트

## 🧩 주요 컴포넌트 목록

### 레이아웃 컴포넌트
- `LibraryHeader` - 상단 헤더
- `LibraryFooter` - 하단 푸터
- `MainNavigation` - 메인 네비게이션
- `MobileMenu` - 모바일 메뉴
- `UserMenu` - 사용자 메뉴

### 검색 컴포넌트
- `SearchBar` - 검색 바
- `SearchFilters` - 검색 필터
- `BookCard` - 도서 카드
- `BookList` - 도서 목록
- `BookDetail` - 도서 상세

### 예약 컴포넌트
- `SeatMap` - 좌석 배치도
- `ReservationCalendar` - 예약 캘린더
- `ReservationForm` - 예약 폼
- `ReservationStatus` - 예약 상태

### 사용자 컴포넌트
- `LoginForm` - 로그인 폼
- `RegisterForm` - 회원가입 폼
- `UserDashboard` - 사용자 대시보드
- `LoanHistory` - 대출 이력
- `UserProfile` - 사용자 프로필

### 공통 컴포넌트
- `NoticeBoard` - 공지사항 게시판
- `BookCarousel` - 도서 캐러셀
- `QuickLinks` - 빠른 링크
- `LibraryInfo` - 도서관 정보
- `FAQAccordion` - FAQ 아코디언

## 📊 더미 데이터 구조

### 사용자 데이터
```typescript
interface User {
  id: string
  studentId: string
  name: string
  email: string
  university: string
  memberType: 'student' | 'faculty' | 'external'
  status: 'active' | 'suspended'
}
```

### 도서 데이터
```typescript
interface Book {
  id: string
  isbn: string
  title: string
  author: string
  publisher: string
  publicationYear: number
  category: string
  status: 'available' | 'borrowed' | 'reserved'
  coverImage: string
  description: string
}
```

### 대출 데이터
```typescript
interface Loan {
  id: string
  userId: string
  bookId: string
  loanDate: Date
  dueDate: Date
  returnDate?: Date
  status: 'active' | 'returned' | 'overdue'
  renewCount: number
}
```

### 예약 데이터
```typescript
interface Reservation {
  id: string
  userId: string
  resourceType: 'book' | 'seat' | 'room'
  resourceId: string
  startTime: Date
  endTime: Date
  status: 'pending' | 'confirmed' | 'cancelled'
}
```

## 🎨 디자인 가이드라인

### 색상 테마
- **Primary**: 도서관 브랜드 색상
- **Secondary**: 보조 색상
- **Background**: 밝은 배경
- **Card**: 카드 배경
- **Text**: 텍스트 색상

### 타이포그래피
- **제목**: font-bold text-2xl ~ text-4xl
- **본문**: text-base
- **캡션**: text-sm text-muted-foreground

### 레이아웃
- **Container**: max-w-7xl mx-auto px-4
- **Grid**: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Spacing**: space-y-4, gap-4

### 컴포넌트 스타일
- **Card**: rounded-lg border shadow-sm
- **Button**: 기존 shadcn/ui 버튼 활용
- **Form**: 기존 shadcn/ui 폼 컴포넌트 활용

## 🚀 시작하기

### 1. 프로젝트 생성
```bash
# library-frontend 폴더 생성
mkdir library-frontend
cd library-frontend

# package.json 생성 및 의존성 설치
npm init
npm install react react-dom @types/react
npm install -D typescript vite @vitejs/plugin-react
```

### 2. 더미 데이터 라이브러리
```bash
npm install @faker-js/faker
npm install dayjs
```

### 3. 라우팅 설정
```bash
npm install react-router-dom
npm install @tanstack/react-query
```

## 📝 다음 단계

1. **Day 1-2**: 기본 구조 및 인증 시스템 구현
2. **Day 3-5**: 메인 페이지 및 검색 시스템
3. **Day 6-9**: 서비스 및 예약 시스템
4. **Day 10-12**: My Library 및 마무리

## ⚡ 핵심 기능 (MVP)

### 필수 구현
- ✅ 로그인/회원가입
- ✅ 도서 검색 및 조회
- ✅ 대출/예약 신청 (UI만)
- ✅ 좌석 예약 (UI만)
- ✅ 공지사항 조회

### 선택 구현
- ⚠️ 실시간 좌석 현황
- ⚠️ 도서 추천
- ⚠️ 모바일 학생증
- ⚠️ 푸시 알림

## 🔧 개발 팁

1. **기존 컴포넌트 재활용**: shadcn/ui 컴포넌트 최대한 활용
2. **더미 데이터**: Faker.js로 실제같은 데이터 생성
3. **상태 관리**: Zustand로 간단한 전역 상태 관리
4. **스타일**: Tailwind CSS 유틸리티 클래스 활용
5. **타입 안정성**: TypeScript 인터페이스 정의

---

이 계획서를 기반으로 세종공동캠퍼스 도서관 홈페이지를 구현합니다.
각 Phase별로 체계적으로 진행하여 12일 내 완성을 목표로 합니다.