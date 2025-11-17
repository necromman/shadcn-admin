# LMS 메인 페이지 구현 계획서

## 프로젝트 개요
- **목표**: STEP 평생직업능력개발 LMS 사이트를 참고한 모던한 LMS 메인 페이지 구현
- **참고 사이트**: https://www.step.or.kr/
- **구현 범위**: 메인 페이지 UI/UX 프로토타입
- **기술 스택**: React, TypeScript, Tailwind CSS, shadcn/ui

## 디자인 시스템 분석

### 색상 팔레트
- **Primary**: Blue 계열 (blue-600, blue-700)
- **Secondary**: Gray 계열 (gray-100 ~ gray-900)
- **Accent**:
  - Success: green-600 (수강 가능)
  - Warning: orange-600 (마감 임박)
  - Error: red-600 (마감)
- **Background**:
  - Light: white, gray-50
  - Dark: gray-900, gray-800

### 타이포그래피
- **헤딩**:
  - H1: text-3xl font-bold
  - H2: text-2xl font-semibold
  - H3: text-xl font-medium
- **본문**: text-base
- **캡션**: text-sm, text-xs

### 레이아웃 시스템
- **Container**: max-w-7xl
- **Grid**: 12 column grid
- **Spacing**: 4px 배수 시스템 (4, 8, 12, 16, 20, 24...)

## 구현 단계별 계획

### Phase 1: 기본 구조 설정 (1시간)
1. 현재 라우트 구조 파악
2. LMS 메인 페이지 컴포넌트 생성
3. 기본 레이아웃 구조 설정
4. 목업 데이터 구조 설계

### Phase 2: 헤더 구현 (1.5시간)
1. **TopBar (유틸리티바)**
   - 로그인/회원가입 버튼
   - 언어 선택 드롭다운 (한/영)
   - 나의 훈련기관 선택
   - 다크모드 토글

2. **MainHeader (메인 네비게이션)**
   - 로고 영역 (텍스트)
   - 메인 메뉴 (이러닝, 가상훈련, 추천테마, 커뮤니티)
   - 통합 검색 바
   - 모바일 햄버거 메뉴

### Phase 3: 메인 콘텐츠 구현 (3시간)
1. **HeroSection (메인 배너)**
   - 자동 슬라이드 캐러셀
   - 페이지네이션 인디케이터
   - 재생/정지 컨트롤
   - 반응형 이미지 처리

2. **PopularCoursesSection (인기 강좌)**
   - 실시간 인기 강좌 목록
   - 카드형 레이아웃
   - 호버 효과
   - 수강신청 버튼

3. **RecommendedCoursesSection (추천 과정)**
   - 카테고리별 탭 구성
   - 과정 카드 그리드
   - 더보기 기능

4. **NewCoursesSection (신규 과정)**
   - 최신 등록 과정 표시
   - 수평 스크롤 (모바일)

5. **NoticeSection (공지사항)**
   - 공지사항 리스트
   - 날짜 표시
   - 더보기 링크

### Phase 4: 컴포넌트 상세 구현 (2시간)
1. **CourseCard 컴포넌트**
   - 썸네일 이미지 (플레이스홀더)
   - 과정 정보 (제목, 강사, 평점)
   - 메타 정보 (난이도, 유형, 상태)
   - 액션 버튼 (미리보기, 관심과정, 수강신청)

2. **SearchBar 컴포넌트**
   - 자동완성 기능
   - 검색 필터
   - 최근 검색어

3. **CategoryTab 컴포넌트**
   - 탭 네비게이션
   - 활성 상태 표시
   - 스와이프 (모바일)

### Phase 5: 반응형 및 인터랙션 (1.5시간)
1. **반응형 대응**
   - 모바일 (640px 이하)
   - 태블릿 (768px ~ 1024px)
   - 데스크톱 (1024px 이상)

2. **인터랙션 추가**
   - 호버 효과
   - 클릭 피드백
   - 로딩 상태
   - 에러 상태

### Phase 6: 최종 마무리 (1시간)
1. **다크모드 최적화**
2. **접근성 개선**
3. **성능 최적화**
4. **코드 정리 및 리팩토링**

## 파일 구조

```
src/
├── features/
│   └── lms/
│       ├── components/
│       │   ├── header/
│       │   │   ├── LmsTopBar.tsx
│       │   │   └── LmsMainHeader.tsx
│       │   ├── sections/
│       │   │   ├── HeroSection.tsx
│       │   │   ├── PopularCoursesSection.tsx
│       │   │   ├── RecommendedCoursesSection.tsx
│       │   │   ├── NewCoursesSection.tsx
│       │   │   └── NoticeSection.tsx
│       │   └── common/
│       │       ├── CourseCard.tsx
│       │       ├── SearchBar.tsx
│       │       └── CategoryTab.tsx
│       ├── pages/
│       │   └── LmsHomePage.tsx
│       └── data/
│           └── mockData.ts
└── routes/
    └── index.tsx (업데이트)
```

## 목업 데이터 구조

```typescript
interface Course {
  id: string;
  title: string;
  instructor: string;
  organization: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'online' | 'offline' | 'blended';
  status: 'recruiting' | 'in-progress' | 'completed';
  price: number;
  discountPrice?: number;
  tags: string[];
  duration: string;
  startDate: string;
  endDate: string;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  isImportant: boolean;
  viewCount: number;
}

interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  backgroundColor: string;
}
```

## 예상 소요 시간
- **총 예상 시간**: 약 10시간
- **실제 구현 목표**: 6-8시간 내 완성

## 주요 고려사항
1. **기존 프로젝트 구조 유지**: 현재 라우팅 시스템과 컴포넌트 구조 활용
2. **shadcn/ui 컴포넌트 최대 활용**: Card, Button, Tabs, Dialog 등
3. **라이트/다크 모드 완벽 지원**: 모든 컴포넌트에 다크모드 스타일 적용
4. **반응형 우선 설계**: 모바일 퍼스트 접근
5. **성능 최적화**: lazy loading, 메모이제이션 적용
6. **접근성 준수**: ARIA 레이블, 키보드 네비게이션 지원

## 성공 지표
- [ ] 모든 섹션이 정상적으로 렌더링
- [ ] 반응형 디자인 완벽 구현
- [ ] 다크모드 전환 매끄러움
- [ ] 인터랙션 부드러움
- [ ] 빌드 에러 없음
- [ ] 타입 에러 없음
- [ ] 린트 에러 없음