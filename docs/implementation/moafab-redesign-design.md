# MOAFAB 홈페이지 개편 설계 문서

## 📋 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: MOAFAB 홈페이지 개편
- **작업 범위**: SFR-001(국문), SFR-002(영문), SFR-003(모바일) 
- **기존 사이트**: https://www.moafab.kr
- **작성일**: 2025-09-11
- **버전**: 1.0

### 목표
- 웹 접근성 및 웹 표준 준수 (WCAG 2.2, HTML5/CSS3)
- 사용자 중심의 직관적인 UI/UX 제공
- 반응형 웹 디자인 구현 (데스크톱, 태블릿, 모바일)
- 국제화(i18n) 지원 (국문/영문)
- 협의체 참여 기관 소개 및 클라우드 기반 기관별 홈페이지 제공

## 🏗️ 아키텍처 설계

### 기술 스택
- **프론트엔드**: React + TypeScript + Vite
- **UI 프레임워크**: Tailwind CSS + shadcn/ui
- **라우팅**: TanStack Router
- **상태관리**: Zustand + Context API
- **국제화**: i18next
- **빌드도구**: Vite

### 폴더 구조
```
src/
├── features/
│   ├── moafab/                  # MOAFAB 메인 기능
│   │   ├── pages/               # 페이지 컴포넌트
│   │   │   ├── home.tsx        # 메인 홈페이지
│   │   │   ├── about.tsx       # 소개 페이지
│   │   │   └── institutions.tsx # 기관 소개
│   │   ├── components/          # 컴포넌트
│   │   │   ├── layout/         # 레이아웃 컴포넌트
│   │   │   │   ├── header.tsx
│   │   │   │   ├── navigation.tsx
│   │   │   │   └── footer.tsx
│   │   │   ├── sections/       # 메인 페이지 섹션
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── equipment-search.tsx
│   │   │   │   ├── notice-board.tsx
│   │   │   │   └── quick-links.tsx
│   │   │   └── common/         # 공통 컴포넌트
│   │   ├── hooks/              # 커스텀 훅
│   │   ├── utils/              # 유틸리티
│   │   └── types/              # 타입 정의
│   └── institutions/           # 기관별 홈페이지
│       ├── components/
│       └── pages/
└── routes/
    └── moafab.tsx             # MOAFAB 라우트 정의
```

## 🎨 UI/UX 설계

### 1. 레이아웃 구조

#### 데스크톱 레이아웃 (1920px)
```
┌─────────────────────────────────────────────────┐
│                   Pre-Header                     │ (유틸리티 메뉴)
├─────────────────────────────────────────────────┤
│                    Header                        │ (로고, 메인 네비게이션)
├─────────────────────────────────────────────────┤
│                  Hero Section                    │ (메인 비주얼 슬라이더)
├─────────────────────────────────────────────────┤
│              Equipment Search                    │ (공정장비 검색)
├─────────────────────────────────────────────────┤
│     Notice Board    │    Quick Links             │ (공지사항, 바로가기)
├─────────────────────────────────────────────────┤
│              Service Information                 │ (서비스 안내)
├─────────────────────────────────────────────────┤
│             Institution Partners                 │ (참여 기관)
├─────────────────────────────────────────────────┤
│                    Footer                        │ (하단 정보)
└─────────────────────────────────────────────────┘
```

#### 모바일 레이아웃 (360px - 768px)
```
┌──────────────────┐
│   Mobile Header  │ (햄버거 메뉴)
├──────────────────┤
│   Hero Section   │ (터치 슬라이더)
├──────────────────┤
│ Equipment Search │ (모바일 최적화)
├──────────────────┤
│   Notice Board   │ (세로 정렬)
├──────────────────┤
│   Quick Links    │ (그리드 2x2)
├──────────────────┤
│     Footer       │
└──────────────────┘
```

### 2. 네비게이션 구조

#### 메인 네비게이션 (GNB) - 실제 사이트 기반
```
MOAFAB
├── 팹서비스 소개
│   ├── 사이트 이용방법
│   ├── 팹서비스 절차
│   └── 기관별 종합현황
├── 팹서비스 신청
│   ├── 상담 신청
│   ├── 견적 신청
│   ├── 서비스 신청
│   ├── 장비별 신청
│   ├── 모아팹 신청
│   └── 마이칩 신청
├── 팹서비스 현황
│   ├── 상담 현황
│   ├── 견적 현황
│   ├── 서비스 현황
│   ├── 서비스 모니터링
│   └── 정산 현황
└── 고객센터
    ├── 공지
    ├── 보도자료
    ├── 문의
    └── FAQ
```

#### 유틸리티 메뉴
- 로그인/로그아웃
- 회원가입
- 마이페이지
- 언어 선택 (KR/EN)
- 서비스 이용료
- 사이트맵

### 3. 주요 컴포넌트 설계

#### Hero Section
- **캐러셀**: 3-5개 슬라이드, 자동 재생, 인디케이터
- **콘텐츠**: 이미지 + 텍스트 오버레이 + CTA 버튼
- **반응형**: 모바일에서 높이 조절, 텍스트 크기 최적화

#### Equipment Search (공정장비 검색)

##### UI 구성 (실제 사이트 기반)
```
┌─────────────────────────────────────────────────┐
│          공정장비 검색                            │
├─────────────────────────────────────────────────┤
│ 기관 선택 (체크박스)                              │
│ □ 전체  □ NINT  □ NNFC  □ KANC                 │
│ □ ISRC  □ ETRI  □ DGIST                        │
├─────────────────────────────────────────────────┤
│ 공정 선택 (드롭다운)        키워드 검색           │
│ [전체 ▼]                   [검색어 입력]         │
│                            [검색] [초기화]        │
└─────────────────────────────────────────────────┘
```

##### 필터 옵션
1. **기관별 필터** (체크박스 다중 선택)
   - NINT (나노융합기술원)
   - NNFC (나노종합기술원)
   - KANC (한국나노기술원)
   - ISRC (반도체공정장비연구소)
   - ETRI (한국전자통신연구원)
   - DGIST (대구경북과학기술원)

2. **공정별 필터** (드롭다운 선택)
   - 전체
   - 에피공정 (PG01)
   - 산화공정 (PG02)
   - 포토리소그래피 (PG03)
   - 식각공정 (PG04)
   - 증착공정 (PG05)
   - 배선공정 (PG06)
   - EDS (PG07)
   - 패키징 (PG08)
   - 분석 및 기타 (PG09)

3. **키워드 검색**
   - 장비명, 모델명, 사양 등 텍스트 검색
   - 실시간 자동완성 기능

##### 반응형 디자인
- **Desktop**: 가로 배치 (기관 체크박스 + 드롭다운 + 검색)
- **Tablet**: 2단 배치 (기관 선택 / 공정 및 검색)
- **Mobile**: 세로 배치 (아코디언 형식으로 필터 접기/펼치기)

##### 검색 결과 표시
- 카드 그리드 레이아웃 (Desktop 3-4열, Tablet 2열, Mobile 1열)
- 장비 이미지, 이름, 기관, 주요 사양 표시
- 페이지네이션 또는 무한 스크롤
- 상세 보기 버튼 → 모달 또는 상세 페이지

#### Notice Board (공지사항)
- **레이아웃**: 탭 형식 (공지사항, 보도자료, 이벤트)
- **표시**: 최근 5개 항목, 더보기 링크
- **모바일**: 아코디언 형식으로 변경

#### Institution Partners (참여기관)
- **표시**: 로고 그리드 또는 캐러셀
- **인터랙션**: 호버 시 기관명 표시, 클릭 시 상세 페이지

## 🌐 국제화(i18n) 설계

### 언어 지원
- **국문 (ko-KR)**: 기본 언어
- **영문 (en-US)**: 글로벌 사용자

### 구현 방식
```typescript
// i18n 설정
const resources = {
  ko: {
    translation: {
      nav: {
        home: '홈',
        about: '소개',
        services: '팹서비스',
        institutions: '참여기관',
      },
      // ...
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Fab Services',
        institutions: 'Partners',
      },
      // ...
    }
  }
}
```

## 📱 반응형 디자인 전략

### 브레이크포인트
- **Mobile**: 360px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1919px
- **Wide**: 1920px+

### 주요 대응 전략
1. **네비게이션**
   - Desktop: 수평 메뉴 + 드롭다운
   - Tablet/Mobile: 햄버거 메뉴 + 드로어

2. **그리드 레이아웃**
   - Desktop: 3-4 컬럼
   - Tablet: 2 컬럼
   - Mobile: 1 컬럼

3. **이미지/미디어**
   - srcset 활용한 반응형 이미지
   - 모바일에서 불필요한 장식 요소 제거

4. **터치 최적화**
   - 최소 터치 영역: 44x44px
   - 스와이프 제스처 지원
   - 모바일 친화적 폼 요소

## 🔧 기능 요구사항 구현

### SFR-001: 국문 홈페이지
- [x] 웹 표준/접근성 준수
- [ ] 사용자 중심 UI
- [ ] CMS 연동
- [ ] 협의체 기관 소개
- [ ] 기관별 클라우드 홈페이지

### SFR-002: 영문 홈페이지  
- [ ] 국문 콘텐츠와 동기화
- [ ] 영문 전용 UI 최적화
- [ ] 기관 영문 소개
- [ ] 장비 검색 영문 지원

### SFR-003: 모바일 홈페이지
- [ ] 모바일 전용 UI
- [ ] 터치 제스처 최적화
- [ ] 오프라인 캐싱 (PWA)
- [ ] 실시간 서비스 현황

## 📊 성능 목표

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### 최적화 전략
- 코드 스플리팅
- 이미지 lazy loading
- CDN 활용
- 캐싱 전략

## 📐 컴포넌트별 구현 명세

### 1. Navigation Component
```typescript
// 네비게이션 데이터 구조
interface NavMenuItem {
  id: string
  title: string
  href?: string
  children?: NavMenuItem[]
  icon?: string
}

// 주요 기능
- 2단계 드롭다운 메뉴
- 호버/포커스 시 서브메뉴 표시
- 활성 메뉴 하이라이트
- 모바일: Sheet 컴포넌트로 전환
- 키보드 네비게이션 지원
```

### 2. Equipment Search Component
```typescript
interface EquipmentSearchProps {
  institutions: Institution[]
  processes: Process[]
  onSearch: (filters: SearchFilters) => void
}

interface SearchFilters {
  institutions: string[]  // 선택된 기관 ID
  process: string        // 선택된 공정 코드
  keyword: string        // 검색 키워드
}

// shadcn/ui 활용
- Checkbox: 기관 선택
- Select: 공정 선택
- Input: 키워드 입력
- Button: 검색/초기화
- Card: 검색 결과 표시
```

### 3. Hero Carousel Component
```typescript
interface CarouselSlide {
  id: string
  image: string
  title: string
  description: string
  ctaText?: string
  ctaLink?: string
}

// shadcn/ui Carousel 확장
- 자동 재생 (5초 간격)
- 페이드/슬라이드 애니메이션
- 인디케이터 (dots)
- 좌우 네비게이션 버튼
- 모바일 스와이프 지원
```

### 4. Notice Board Component
```typescript
interface NoticeItem {
  id: string
  title: string
  date: string
  category: 'notice' | 'news' | 'event'
  isImportant?: boolean
}

// shadcn/ui Tabs 활용
- 탭별 콘텐츠 분리
- 중요 공지 상단 고정
- 더보기 링크
- 모바일: 아코디언으로 변환
```

## 🚀 구현 우선순위

### Phase 1: 기본 구조 (Week 1)
1. 프로젝트 세팅 및 라우팅
2. 레이아웃 컴포넌트 (Header, Footer)
3. 네비게이션 시스템
4. 반응형 기본 구조

### Phase 2: 메인 페이지 (Week 2)
1. Hero Section
2. Equipment Search
3. Notice Board
4. Quick Links
5. Institution Partners

### Phase 3: 서브 페이지 (Week 3)
1. 소개 페이지들
2. 서비스 신청/현황
3. 기관별 페이지
4. 고객센터

### Phase 4: 기능 고도화 (Week 4)
1. 국제화(i18n) 적용
2. PWA 기능
3. 성능 최적화
4. 테스트 및 QA

## 🔍 참고 사항

### 기존 사이트 분석
- 전문적이고 기술적인 디자인 유지
- 주요 기능 접근성 개선
- 모바일 사용성 대폭 향상 필요

### 디자인 방향성
- 깔끔하고 현대적인 UI
- 정보 계층 구조 명확화
- 일관된 디자인 시스템 적용

### 기술적 고려사항
- SEO 최적화
- 보안 강화 (HTTPS, CSP)
- 브라우저 호환성 (Chrome, Safari, Firefox, Edge)
- 접근성 테스트 도구 활용