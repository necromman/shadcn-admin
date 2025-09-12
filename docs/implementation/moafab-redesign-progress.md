# MOAFAB 홈페이지 개편 진행 상태

## 📚 참조 문서
- 설계: `docs/implementation/moafab-redesign-design.md`
- 사이트 분석: `docs/implementation/moafab-current-site-analysis.md`
- 요구사항: `docs/요구사항_상세분석_SFR001-008.txt`

## ✅ 완료된 작업
- [x] 요구사항 분석 (SFR-001, SFR-002, SFR-003)
- [x] 기존 사이트 구조 분석
- [x] 설계 문서 작성
- [x] 기술 스택 결정
- [x] 폴더 구조 설계
- [x] 네비게이션 메뉴 구조 상세 분석
- [x] 공정장비 검색 UI 상세 설계
- [x] 컴포넌트별 구현 명세 작성

## 🔄 진행 중
- 현재 작업: 설계 문서 개선 완료
- 진행률: 100%

## 📝 다음 작업
1. 메인 페이지 컴포넌트 구조 상세 설계
2. 네비게이션 시스템 구현 계획
3. MOAFAB 기능 폴더 생성 (`src/features/moafab/`)
4. 라우팅 설정
5. 레이아웃 컴포넌트 개발
   - Header 컴포넌트
   - Navigation 컴포넌트
   - Footer 컴포넌트
6. 메인 페이지 섹션 구현
   - Hero Section (슬라이더)
   - Equipment Search (공정장비 검색)
   - Notice Board (공지사항)
   - Quick Links (바로가기)
   - Institution Partners (참여기관)

## 🏗️ 구현 전략

### Phase 1: 기본 구조 구축
1. **프로젝트 구조 생성**
   ```
   src/features/moafab/
   ├── pages/
   │   └── home.tsx
   ├── components/
   │   ├── layout/
   │   │   ├── header.tsx
   │   │   ├── navigation.tsx
   │   │   └── footer.tsx
   │   └── sections/
   │       ├── hero.tsx
   │       ├── equipment-search.tsx
   │       └── notice-board.tsx
   ├── hooks/
   ├── utils/
   └── types/
   ```

2. **라우팅 설정**
   - `/moafab` - MOAFAB 메인 페이지
   - `/moafab/about` - 소개
   - `/moafab/services` - 서비스
   - `/moafab/institutions` - 참여기관

3. **기본 레이아웃 구현**
   - 반응형 Container
   - Header with Navigation
   - Main Content Area
   - Footer

### Phase 2: 컴포넌트 개발
1. **Hero Section**
   - shadcn/ui Carousel 활용
   - 자동 재생, 인디케이터
   - 반응형 이미지

2. **Equipment Search**
   - 필터 UI (Select, Input)
   - 검색 결과 카드
   - 모바일 최적화

3. **Notice Board**
   - Tabs 컴포넌트
   - 리스트 뷰
   - 페이지네이션

### Phase 3: 반응형 & 국제화
1. **반응형 디자인**
   - Tailwind 브레이크포인트 활용
   - 모바일 네비게이션 (Sheet)
   - 터치 최적화

2. **국제화 설정**
   - i18next 설정
   - 언어 전환 UI
   - 콘텐츠 번역

### Phase 4: 최적화 & 테스트
1. **성능 최적화**
   - 이미지 최적화
   - 코드 스플리팅
   - 캐싱 전략

2. **접근성 검증**
   - ARIA 레이블
   - 키보드 네비게이션
   - 스크린리더 테스트

## 📁 생성될 파일 목록
```
src/
├── features/
│   └── moafab/
│       ├── pages/
│       │   ├── home.tsx
│       │   ├── about.tsx
│       │   └── services.tsx
│       ├── components/
│       │   ├── layout/
│       │   │   ├── moafab-header.tsx
│       │   │   ├── moafab-navigation.tsx
│       │   │   ├── moafab-footer.tsx
│       │   │   └── moafab-layout.tsx
│       │   ├── sections/
│       │   │   ├── hero-section.tsx
│       │   │   ├── equipment-search.tsx
│       │   │   ├── notice-board.tsx
│       │   │   ├── quick-links.tsx
│       │   │   └── institution-partners.tsx
│       │   └── common/
│       │       ├── search-filter.tsx
│       │       └── card.tsx
│       ├── hooks/
│       │   └── use-equipment-search.ts
│       ├── utils/
│       │   └── constants.ts
│       └── types/
│           └── index.ts
└── routes/
    └── moafab.tsx
```

## 🎯 주요 개선 사항 (기존 사이트 대비)

### 네비게이션 개선
1. **구조 개선**
   - 4개 주요 메뉴로 단순화 (팹서비스 소개/신청/현황, 고객센터)
   - 직관적인 2단계 구조
   - 드롭다운 메뉴로 빠른 접근

2. **사용성 개선**
   - 호버 시 즉시 서브메뉴 표시
   - 현재 위치 명확한 표시
   - 키보드 네비게이션 완벽 지원

### 공정장비 검색 개선
1. **UI/UX 개선**
   - 체크박스로 다중 기관 선택 가능
   - 공정별 필터 드롭다운 제공
   - 실시간 검색 및 자동완성

2. **기능 확장**
   - 6개 주요 기관 필터
   - 9개 공정 카테고리
   - 키워드 검색 강화

3. **반응형 최적화**
   - 모바일: 필터 아코디언
   - 태블릿: 2단 레이아웃
   - 데스크톱: 가로 배치

## 💡 중요 결정 사항

### 기술적 결정
1. **shadcn/ui 컴포넌트 최대 활용**
   - Carousel, Tabs, Sheet, Card 등
   - 커스터마이징 최소화

2. **기존 도서관 시스템과 분리**
   - 독립적인 features/moafab 폴더
   - 별도 라우팅 (/moafab/*)
   - 기존 코드 영향 최소화

3. **모바일 퍼스트 접근**
   - 기본 스타일을 모바일 기준
   - 점진적 향상 (Progressive Enhancement)

### UI/UX 결정
1. **네비게이션**
   - Desktop: 수평 메뉴 + 드롭다운
   - Mobile: 햄버거 메뉴 + Sheet

2. **색상 스킴**
   - Primary: Blue (#0066CC 계열)
   - 기존 사이트 톤 유지
   - 다크모드 지원

3. **레이아웃**
   - 최대 너비: 1440px
   - 컨테이너 패딩: 반응형
   - 섹션 간격: 일관성 유지

## 🚨 주의 사항

1. **기존 코드 보호**
   - src/features/library/ 수정 금지
   - src/components/ui/ 수정 금지
   - 기존 라우트 영향 없도록 주의

2. **명명 규칙**
   - MOAFAB 관련 컴포넌트는 'Moafab' 접두사
   - 파일명은 kebab-case
   - 컴포넌트명은 PascalCase

3. **성능 고려**
   - 이미지 lazy loading 필수
   - 큰 컴포넌트는 dynamic import
   - 불필요한 리렌더링 방지

## 📅 예상 일정

### Week 1 (현재)
- [x] 분석 및 설계
- [ ] 기본 구조 구축
- [ ] 레이아웃 컴포넌트

### Week 2
- [ ] 메인 페이지 섹션
- [ ] 반응형 디자인
- [ ] 네비게이션 시스템

### Week 3
- [ ] 서브 페이지
- [ ] 국제화 적용
- [ ] 기관별 페이지

### Week 4
- [ ] 최적화
- [ ] 테스트
- [ ] 배포 준비

## 📌 메모
- 현재 프로젝트는 Vite + React + TypeScript 기반
- shadcn/ui 컴포넌트 활용 극대화
- 기존 도서관 시스템과 완전 분리 구현
- 모바일 사용성 최우선 고려
- 웹 접근성 WCAG 2.2 AA 준수 목표