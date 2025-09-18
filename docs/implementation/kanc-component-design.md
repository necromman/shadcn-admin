# KANC 프로토타입 컴포넌트 설계 문서

## 📦 컴포넌트 구조 및 구현 계획

### 1. Layout 컴포넌트

#### `MainLayout.tsx`
```typescript
interface MainLayoutProps {
  children: React.ReactNode
  variant: 'intro' | 'service' // KANC 소개 | KANC 서비스
}
```
- 전체 레이아웃 관리
- Header, Footer 포함
- 탭 전환 상태 관리

#### `Header.tsx`
```typescript
interface HeaderProps {
  currentTab: 'intro' | 'service'
  onTabChange: (tab: 'intro' | 'service') => void
}
```
- 상단 유틸리티 바 (TopBar)
- 로고
- 메인 네비게이션 (GNB)
- 모바일 햄버거 메뉴

#### `Footer.tsx`
- 사이트맵
- 연락처 정보
- 관련 링크
- 카피라이트

### 2. Navigation 컴포넌트

#### `TopBar.tsx`
```typescript
interface TopBarProps {
  currentTab: 'intro' | 'service'
  onTabChange: (tab: 'intro' | 'service') => void
}
```
- KANC 소개/서비스 탭 전환
- 유틸리티 링크 (Intranet, 영문, SNS)

#### `MegaMenu.tsx`
```typescript
interface MenuItem {
  id: string
  title: string
  path?: string
  children?: MenuItem[]
}

interface MegaMenuProps {
  menuItems: MenuItem[]
  variant: 'intro' | 'service'
}
```
- 다단계 드롭다운 메뉴
- 호버 인터랙션
- 키보드 접근성

#### `MobileDrawer.tsx`
```typescript
interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}
```
- 모바일 슬라이드 메뉴
- 아코디언 서브메뉴
- 스크롤 잠금

### 3. Home 페이지 컴포넌트

#### `HeroSlider.tsx`
```typescript
interface Slide {
  id: string
  image: string
  title: string
  subtitle: string
  link?: string
}

interface HeroSliderProps {
  slides: Slide[]
  autoplay?: boolean
  interval?: number
}
```
- 풀스크린 이미지 슬라이더
- 자동 재생
- 페이지네이션/화살표 컨트롤

#### `QuickMenu.tsx`
```typescript
interface QuickMenuItem {
  id: string
  icon: string
  title: string
  description: string
  link: string
}

interface QuickMenuProps {
  items: QuickMenuItem[]
}
```
- 6-8개 아이콘 그리드
- 호버 효과
- 반응형 레이아웃

#### `NoticeSection.tsx`
```typescript
interface Notice {
  id: string
  category: 'notice' | 'news'
  title: string
  date: string
  isNew?: boolean
}

interface NoticeSectionProps {
  notices: Notice[]
  news: Notice[]
}
```
- 탭 전환 UI
- 최신 5개 항목 표시
- 더보기 링크

#### `ServiceCards.tsx`
```typescript
interface ServiceCard {
  id: string
  icon: string
  title: string
  description: string
  link: string
  color?: string
}

interface ServiceCardsProps {
  services: ServiceCard[]
}
```
- 4개 서비스 카드
- 호버 애니메이션
- 그리드 레이아웃

#### `BannerSlider.tsx`
```typescript
interface Banner {
  id: string
  image: string
  title: string
  link: string
}

interface BannerSliderProps {
  banners: Banner[]
}
```
- 관련 사이트 배너
- 자동 슬라이드
- 컨트롤 버튼

### 4. UI 컴포넌트

#### `Tabs.tsx`
```typescript
interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
}
```

#### `Card.tsx`
```typescript
interface CardProps {
  title: string
  description?: string
  image?: string
  footer?: React.ReactNode
  onClick?: () => void
}
```

#### `Accordion.tsx`
```typescript
interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}
```

### 5. 페이지 구조

```
src/
├── pages/
│   ├── kanc-intro/           # KANC 소개 페이지
│   │   ├── index.tsx
│   │   └── components/
│   ├── kanc-service/         # KANC 서비스 페이지
│   │   ├── index.tsx
│   │   └── components/
│   └── shared/               # 공통 페이지 컴포넌트
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── navigation/
│   │   ├── TopBar.tsx
│   │   ├── MegaMenu.tsx
│   │   └── MobileDrawer.tsx
│   ├── home/
│   │   ├── HeroSlider.tsx
│   │   ├── QuickMenu.tsx
│   │   ├── NoticeSection.tsx
│   │   ├── ServiceCards.tsx
│   │   └── BannerSlider.tsx
│   └── ui/
│       ├── Tabs.tsx
│       ├── Card.tsx
│       └── Accordion.tsx
└── data/
    └── mockup/
        ├── menu.mock.ts
        ├── slides.mock.ts
        ├── notices.mock.ts
        └── services.mock.ts
```

## 🎨 스타일링 전략

### Tailwind CSS 클래스 구조

#### 색상 시스템
```css
primary: #002D83
secondary: #0066CC
accent: #FF6B00
muted: #F5F7FA
```

#### 브레이크포인트
```css
sm: 640px   /* 모바일 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 작은 데스크톱 */
xl: 1280px  /* 데스크톱 */
2xl: 1536px /* 대형 데스크톱 */
```

#### 공통 스타일 패턴
```tsx
// 컨테이너
"container mx-auto px-4 sm:px-6 lg:px-8"

// 섹션
"py-12 md:py-16 lg:py-20"

// 그리드
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// 카드
"bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"

// 버튼
"px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
```

## 🔄 상태 관리

### Context API 사용
```typescript
// TabContext.tsx
interface TabContextType {
  currentTab: 'intro' | 'service'
  setCurrentTab: (tab: 'intro' | 'service') => void
}

// MenuContext.tsx
interface MenuContextType {
  isMenuOpen: boolean
  toggleMenu: () => void
  activeMenu: string | null
  setActiveMenu: (id: string | null) => void
}
```

## 📱 반응형 디자인 패턴

### 데스크톱 우선 접근
1. 데스크톱 레이아웃 먼저 구현
2. 태블릿 브레이크포인트 조정
3. 모바일 최적화

### 컴포넌트별 반응형 전략

#### Header
- **데스크톱**: 전체 메뉴 표시
- **태블릿**: 축약된 메뉴
- **모바일**: 햄버거 메뉴

#### HeroSlider
- **데스크톱**: 풀 높이 (80vh)
- **태블릿**: 중간 높이 (60vh)
- **모바일**: 낮은 높이 (50vh)

#### QuickMenu
- **데스크톱**: 4열 그리드
- **태블릿**: 3열 그리드
- **모바일**: 2열 그리드

#### ServiceCards
- **데스크톱**: 4개 카드 가로 배열
- **태블릿**: 2x2 그리드
- **모바일**: 세로 스택

## 🚀 구현 순서

### Phase 1: 기본 구조 (Day 1)
1. ✅ 프로젝트 설정
2. ✅ 라우팅 구조
3. ⬜ MainLayout 컴포넌트
4. ⬜ Header/Footer 기본 구조

### Phase 2: 네비게이션 (Day 2)
1. ⬜ TopBar (탭 전환)
2. ⬜ MegaMenu (데스크톱)
3. ⬜ MobileDrawer (모바일)
4. ⬜ 메뉴 데이터 구조

### Phase 3: 홈 페이지 (Day 3-4)
1. ⬜ HeroSlider
2. ⬜ QuickMenu
3. ⬜ NoticeSection
4. ⬜ ServiceCards
5. ⬜ BannerSlider

### Phase 4: 반응형 & 최적화 (Day 5)
1. ⬜ 모바일 최적화
2. ⬜ 애니메이션 추가
3. ⬜ 성능 최적화
4. ⬜ 접근성 개선

## 📝 목업 데이터 예시

```typescript
// menu.mock.ts
export const introMenuItems = [
  {
    id: 'about',
    title: '기술원 소개',
    children: [
      { id: 'greeting', title: '인사말', path: '/about/greeting' },
      { id: 'history', title: '일반현황', path: '/about/history' },
      // ...
    ]
  },
  // ...
]

// slides.mock.ts
export const heroSlides = [
  {
    id: '1',
    image: '/images/hero/slide1.jpg',
    title: '나노기술의 미래를 선도하는',
    subtitle: 'BRAND 한국나노기술원',
    link: '/about'
  },
  // ...
]
```

## 🔧 개발 환경 설정

```json
// package.json dependencies
{
  "react": "^18.2.0",
  "react-router-dom": "^6.x",
  "framer-motion": "^10.x",
  "swiper": "^10.x",
  "lucide-react": "^0.x",
  "@tanstack/react-query": "^5.x",
  "zustand": "^4.x"
}
```

## ✅ 체크리스트

- [ ] 컴포넌트 파일 구조 생성
- [ ] 라우팅 설정
- [ ] 목업 데이터 준비
- [ ] 기본 레이아웃 구현
- [ ] 탭 전환 기능
- [ ] 메가메뉴 구현
- [ ] 모바일 드로어 구현
- [ ] 히어로 슬라이더
- [ ] 퀵메뉴
- [ ] 공지사항 섹션
- [ ] 서비스 카드
- [ ] 반응형 테스트
- [ ] 접근성 테스트
- [ ] 성능 최적화
- [ ] 브라우저 호환성 테스트