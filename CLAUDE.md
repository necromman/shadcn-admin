# 🎯 프론트엔드 프로토타입 개발 지침

## 🚨 절대 준수 규칙 - 작업 전 필독!

### 1. 라우트 컴포넌트 확인 (가장 중요!)
**작업 시작 전 반드시 다음 순서로 확인:**
1. `src/routes/index.tsx` 파일을 먼저 확인하여 **실제로 렌더링되는 컴포넌트** 파악
2. 해당 라우트가 어떤 페이지 컴포넌트를 사용하는지 확인
3. 페이지 컴포넌트가 import하는 하위 컴포넌트들 추적
4. **절대 추측하지 말고 실제 사용되는 컴포넌트를 수정할 것**

**예시 - 실수 방지:**
```tsx
// src/routes/index.tsx 확인
export const Route = createFileRoute('/')({ 
  component: MoafabHomePage,  // ← LibraryHomePage가 아님!
})

// 따라서 수정해야 할 파일:
// ✅ src/features/moafab/... (정답)
// ❌ src/features/library/... (틀림)
```

### 2. 국제화(i18n) 보존 필수
**국제화 관련 코드는 절대 제거 금지:**
- `useTranslation` 훅 유지
- `t()` 함수 사용 유지
- 다국어 지원 파일 보존
- 언어 전환 기능 유지
- **이유**: 프로토타입도 글로벌 서비스를 고려해야 함

### 3. 배경색 및 그라데이션 사용 금지
**촌스러운 그라데이션 배경색 절대 금지:**
- ❌ **금지**: 화려한 색상 그라데이션 배경 (from-blue-500, to-green-600 등)
- ❌ **금지**: 채도 높은 컬러풀한 배경
- ✅ **허용**: 아주 은은한 그레이 톤 (gray-50, gray-100/50)
- ✅ **허용**: 배경색 없이 보더만 사용
- ✅ **권장**: 깔끔한 흰색/다크모드 배경 + 미니멀한 보더

**올바른 카드 스타일링:**
```tsx
// ❌ Bad - 촌스러운 컬러 그라데이션
<div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20">

// ✅ Good - 깔끔하고 모던한 스타일
<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
<div className="bg-gray-50/50 dark:bg-gray-800/50"> // 아주 은은한 배경
```

### 4. 섹션 컴포넌트 컨테이너 너비 일관성 유지
**모든 섹션 컴포넌트는 부모 컴포넌트의 컨테이너 설정을 따라야 함:**
- ❌ **금지**: 섹션 컴포넌트 내부에서 `container` 클래스나 독립적인 max-width 설정
- ✅ **올바른 방법**: 부모 페이지 컴포넌트에서 컨테이너 너비 관리
  ```tsx
  // ❌ Bad - 섹션 내부에서 독립적인 컨테이너 설정
  export function NoticeSection() {
    return (
      <section className="py-12">
        <div className="container"> // 잘못됨!
          ...
        </div>
      </section>
    )
  }

  // ✅ Good - 부모에서 관리하는 컨테이너 설정 활용
  export function NoticeSection() {
    return (
      <section className="py-12">
        {/* 컨테이너 없이 직접 콘텐츠 배치 */}
        <div className="flex items-center">...</div>
      </section>
    )
  }
  ```
- **이유**: 페이지 전체의 일관된 레이아웃과 정렬 유지

### 5. Card 컴포넌트 헤더 사용 규칙 (중요!)
**Card 컴포넌트 사용 시 반드시 CardHeader 컴포넌트 사용:**
- ✅ **필수**: Card 내부에 헤더가 필요한 경우 반드시 `CardHeader` 컴포넌트 사용
- ✅ **올바른 구조**: CardHeader는 Card 컴포넌트가 헤더를 감지하여 적절한 스타일과 간격을 계산
- ❌ **금지**: div나 다른 요소로 헤더를 임의로 구현

**올바른 Card 헤더 사용법:**
```tsx
import { Card, CardHeader, CardContent } from '@/components/ui/card'

// ✅ Good - CardHeader 컴포넌트 사용
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">제목</h3>
      <a href="/more" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
        전체보기
        <ChevronRight className="w-3 h-3" />
      </a>
    </div>
  </CardHeader>
  <CardContent>
    {/* 콘텐츠 */}
  </CardContent>
</Card>

// ❌ Bad - div로 헤더 구현
<Card>
  <div className="p-4 border-b">
    <h3>제목</h3>
  </div>
  <div className="p-4">
    {/* 콘텐츠 */}
  </div>
</Card>
```
- **이유**: shadcn/ui Card 컴포넌트의 일관된 스타일링과 접근성 보장

## 🔴 최우선 규칙: 프로토타입 전용 프로젝트
**이 프로젝트는 프론트엔드 프로토타입 구현 전용입니다**
- ✅ **목적**: 실무 수준의 프론트엔드 프로토타입 빠른 구현
- ✅ **범위**: UI/UX 구현, 최소한의 인터랙션, 목업 데이터 활용
- ❌ **제외**: 백엔드 연동, API 개발, 실제 데이터베이스

## 📐 프로토타입 구현 프로세스 (필수 준수)

### 1단계: 와이어프레임 (Wireframe)
- **레이아웃 구조 정의**: 섹션 배치, 그리드 시스템
- **콘텐츠 블록 설정**: 헤더, 콘텐츠 영역, 사이드바 등
- **기본 구조만 구현**: 색상, 스타일 없이 구조만

### 2단계: 레이아웃 (Layout)
- **반응형 그리드 적용**: 모바일, 태블릿, 데스크톱
- **여백과 정렬**: 일관된 spacing 시스템
- **컨테이너 설정**: max-width, padding 정의

### 3단계: 스타일링 (Styling)
- **색상 시스템 적용**: 브랜드 컬러, 계층 구조
- **타이포그래피**: 폰트 크기, 굵기, 행간
- **기본 인터랙션**: hover, active 상태

### 4단계: 디테일링 (Detailing)
- **마이크로 인터랙션**: 트랜지션, 애니메이션
- **목업 데이터 추가**: 실제처럼 보이는 더미 콘텐츠
- **엣지 케이스 처리**: 빈 상태, 로딩 상태
- **최종 폴리싱**: 픽셀 퍼펙트 조정

## 🗂️ 프로젝트 구조
```
src/
├── pages/           # 페이지 컴포넌트 (프로토타입)
├── components/      # 재사용 UI 컴포넌트
│   ├── ui/         # shadcn 기본 컴포넌트
│   └── custom/     # 프로토타입용 커스텀 컴포넌트
├── features/        # 기능별 컴포넌트
├── data/           # 목업 데이터
└── styles/         # 스타일 파일
```

## 🎨 디자인 시스템 활용
- **기반**: shadcn/ui 컴포넌트 최대한 활용
- **확장**: 필요시 커스텀 컴포넌트 추가
- **일관성**: 디자인 토큰 사용 (색상, 간격, 타이포그래피)
- **재사용성**: 컴포넌트 기반 설계

## 📱 반응형 디자인 필수 브레이크포인트
```tsx
// Tailwind 브레이크포인트
sm: 640px   // 모바일
md: 768px   // 태블릿
lg: 1024px  // 데스크톱
xl: 1280px  // 대형 데스크톱
2xl: 1536px // 초대형 화면
```

## 🔨 프로토타입 구현 체크리스트
- [ ] 와이어프레임 완성
- [ ] 반응형 레이아웃 적용
- [ ] 스타일링 완료
- [ ] 인터랙션 구현
- [ ] 목업 데이터 추가
- [ ] 엣지 케이스 처리
- [ ] 크로스 브라우저 테스트
- [ ] 성능 최적화


## 🚫 이모지 및 아이콘 사용 금지
- **이모지 사용 금지**: 사용자가 명시적으로 요청하지 않는 한 이모지 사용 금지
- **로고는 텍스트만**: 로고 영역에는 텍스트만 사용, 아이콘이나 이모지 제외
- **아이콘은 요청 시에만**: 아이콘은 사용자가 명확히 요청한 경우에만 추가
- **코드 주석 이모지 제외**: 코드 내 주석에도 이모지 사용 자제
- **예외 사항**:
  - 사용자가 "이모지 추가해줘" 등 명시적 요청 시
  - 기존 코드에 이미 있는 이모지는 유지
  - lucide-react, react-icons 등 아이콘 라이브러리는 기능적 필요 시 사용 가능

## 🌓 라이트/다크 모드 토글 버튼 필수
- **모든 헤더에 테마 토글 버튼 필수**: 프리헤더나 메인 헤더에 라이트/다크 모드 전환 버튼 반드시 포함
- **구현 방법**:
  ```tsx
  // useTheme 훅 사용
  const { theme, setTheme } = useTheme()

  // 토글 버튼 구현
  <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    <HiSun className="dark:hidden" />
    <HiMoon className="hidden dark:block" />
  </Button>
  ```
- **위치**: 헤더 우측 상단이나 프리헤더에 배치
- **아이콘**: HiSun (라이트 모드), HiMoon (다크 모드) 사용
- **애니메이션**: rotate 및 scale transition 적용 권장

## 🎯 헤더 네비게이션 구현 원칙

### Sticky Navigation 구현
- **항상 `sticky top-0` 사용**: 복잡한 fixed positioning과 transform 조합 대신 간단한 sticky 사용
- **참조 구조**: `src/features/moafab` 폴더의 헤더 구조를 항상 참조
- **PreHeader와 Navigation 분리**: PreHeader(TopBar)는 별도 컴포넌트로, Navigation은 메인 헤더로
- **금지 사항**:
  - ❌ 복잡한 스크롤 이벤트 리스너와 상태 관리
  - ❌ fixed positioning과 transform 애니메이션 조합
  - ❌ 다중 z-index 레이어 관리
  - ❌ window.scrollY 기반의 복잡한 로직

### 메가 메뉴 구현
- **전체 너비 표시**: 메가 메뉴는 컨테이너 제한 없이 브라우저 전체 너비(`w-screen`)로 표시
- **위치 설정**:
  ```css
  position: absolute;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  ```
- **안전 영역 제한 금지**: 메가 메뉴 드롭다운은 container나 max-width 제한 없음
- **콘텐츠 영역만 제한**: 메가 메뉴 내부 콘텐츠만 max-width 적용 가능

### 올바른 헤더 구조 예시
```tsx
// ✅ Good - moafab 참조 구조 (간단하고 명확)
<>
  {showPreHeader && <TopBar />}
  <header className="sticky top-0 z-40">
    <nav>...</nav>
  </header>
</>

// ❌ Bad - 복잡한 구조
<div className="fixed top-0 transform -translate-y-full">
  <TopBar />
</div>
<header className={cn(
  "sticky",
  hideTopBar ? "top-0" : "top-11"
)}>
  ...
</header>
```

## 🚫 Git 커밋 규칙
- AI 서명 절대 포함하지 말 것
- 커밋 메시지는 간결하고 명확하게 작성
- Co-authored-by 등 AI 관련 서명 제외

## 📦 패키지 매니저
- **pnpm 사용 필수**
- npm, yarn 사용 금지
- `pnpm install`, `pnpm add` 등 pnpm 명령어만 사용

## 🛠️ 개발 서버
- **`pnpm run dev` 실행 금지**
- 개발 서버는 이미 실행 중이므로 중복 실행하지 말 것
- 변경사항은 HMR로 자동 반영됨

## ✅ 테스트 및 빌드
- **작업 완료 시 반드시 빌드 테스트 실행**
  ```bash
  pnpm run build
  pnpm run typecheck
  pnpm run lint
  ```
- 빌드 에러, 타입 에러, 린트 에러 모두 해결 필수

## 🏗️ 아키텍처 원칙

### 책임 분리 원칙 (SRP)
- 각 컴포넌트는 단일 책임만 가질 것
- 비즈니스 로직과 UI 로직 분리
- 유틸리티 함수는 별도 파일로 분리
- 타입 정의는 별도 types 파일로 관리

### 컴포넌트 구조
```
components/
├── ui/           # shadcn 기본 컴포넌트
├── design-system/  # 디자인 시스템 전용
├── shared/       # 공통 컴포넌트
└── features/     # 기능별 컴포넌트
```

## 📂 컴포넌트 구조 패턴

### 프로토타입 컴포넌트 조직화
- **페이지 컴포넌트**: `src/pages/[page-name]/`
- **공통 컴포넌트**: `src/components/common/`
- **섹션 컴포넌트**: `src/components/sections/`
- **목업 데이터**: `src/data/mockup/`

### 파일 명명 규칙
- 페이지: `[PageName]Page.tsx`
- 섹션: `[SectionName]Section.tsx`
- 컴포넌트: `[ComponentName].tsx`
- 목업 데이터: `[data-name].mock.ts`

## 💅 UI 개발 규칙

### 🎯 shadcn/ui 컴포넌트 사용 필수
**모든 UI 요소는 반드시 shadcn/ui 컴포넌트를 사용해야 함**
- ❌ **절대 금지**: HTML 네이티브 요소 직접 사용
  ```tsx
  // ❌ Bad - 네이티브 HTML input 사용
  <input type="checkbox" checked={value} onChange={...} />
  <label>...</label>
  
  // ✅ Good - shadcn/ui 컴포넌트 사용
  import { Checkbox } from '@/components/ui/checkbox'
  import { Label } from '@/components/ui/label'
  
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" checked={value} onCheckedChange={setValue} />
    <Label htmlFor="terms">...</Label>
  </div>
  ```

- **필수 import 체크리스트**:
  - Checkbox → `@/components/ui/checkbox`
  - Label → `@/components/ui/label`
  - Button → `@/components/ui/button`
  - Input → `@/components/ui/input`
  - Select → `@/components/ui/select`
  - Switch → `@/components/ui/switch`
  - RadioGroup → `@/components/ui/radio-group`
  - 기타 모든 UI 요소는 shadcn/ui 사용

- **체크박스 표준 패턴**:
  ```tsx
  <div className="flex items-center space-x-2">
    <Checkbox 
      id="unique-id"
      checked={state}
      onCheckedChange={(checked) => setState(checked as boolean)}
    />
    <Label htmlFor="unique-id" className="cursor-pointer">
      레이블 텍스트
    </Label>
  </div>
  ```

### 컴포넌트 크기 제한
- **단일 컴포넌트 파일은 300줄 이하**
- 300줄 초과 시 반드시 분리
- 복잡한 로직은 커스텀 훅으로 추출
- 반복되는 UI는 별도 컴포넌트로 분리

### UI 프레임워크
- **shadcn/ui 컴포넌트만 사용**
- 외부 UI 라이브러리 추가 금지
- 필요시 shadcn 컴포넌트 확장/조합으로 해결
- Tailwind CSS 클래스 사용

## 📝 코드 컨벤션

### TypeScript
- 명시적 타입 선언 필수
- any 타입 사용 금지
- interface over type (확장 가능한 경우)
- Props는 컴포넌트명 + Props 패턴

### React
- 함수형 컴포넌트만 사용
- 커스텀 훅은 use 접두사
- Props destructuring 사용
- 조건부 렌더링은 명확하게

### 네이밍 컨벤션
- 컴포넌트: PascalCase
- 함수/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- 타입/인터페이스: PascalCase
- 파일명: kebab-case (컴포넌트 제외)

### Import 순서
1. React 관련
2. 외부 라이브러리
3. 내부 컴포넌트
4. 유틸리티/헬퍼
5. 타입 정의
6. 스타일


## 🔧 추가 권장사항

### 성능 최적화
- React.memo 적극 활용
- useMemo, useCallback 적절히 사용
- 큰 리스트는 가상화 적용
- 이미지 lazy loading

### 이벤트 위임 (Event Delegation)
**이벤트 위임을 사용해야 하는 경우:**
- 동적으로 생성되는 요소들
- 대량의 반복 요소 (리스트, 테이블 등)
- 메모리 사용량 최적화가 필요한 경우

**구현 예시:**
```tsx
// ❌ Bad: 각 아이템에 개별 핸들러
{items.map(item => (
  <button onClick={() => handleClick(item.id)}>
    {item.name}
  </button>
))}

// ✅ Good: 부모에서 이벤트 위임
<div onClick={(e) => {
  const button = e.target.closest('button');
  if (button) {
    const id = button.dataset.id;
    handleClick(id);
  }
}}>
  {items.map(item => (
    <button data-id={item.id}>
      {item.name}
    </button>
  ))}
</div>
```

**이벤트 위임 장점:**
- 메모리 사용량 감소 (핸들러 수 감소)
- 동적 요소에 대한 자동 이벤트 바인딩
- 리렌더링 성능 향상

### 접근성
- 시맨틱 HTML 사용
- ARIA 레이블 추가
- 키보드 네비게이션 지원
- 포커스 관리

### 에러 처리
- Error Boundary 구현
- try-catch 블록 활용
- 사용자 친화적 에러 메시지
- 로깅 시스템 구축

### 상태 관리
- 로컬 상태는 useState
- 복잡한 상태는 useReducer
- 전역 상태는 Zustand 활용
- 서버 상태는 TanStack Query

### 폴더 구조
```
src/
├── components/     # UI 컴포넌트
├── features/       # 기능별 모듈
├── hooks/          # 커스텀 훅
├── lib/           # 유틸리티
├── types/         # 타입 정의
├── styles/        # 전역 스타일
└── routes/        # 페이지 라우트
```

### 테스트
- 유닛 테스트 작성 권장
- 중요 비즈니스 로직 테스트 필수
- E2E 테스트는 핵심 플로우만

### 문서화
- 복잡한 컴포넌트는 JSDoc 추가
- README 업데이트 유지
- Storybook 활용 고려

## 🎯 목업 데이터 관리

### 데이터 구조
```tsx
// src/data/mockup/[feature].mock.ts
export const mockData = {
  // 실제같은 더미 데이터
  // 다양한 케이스 포함
  // 엣지 케이스 고려
}
```

### 데이터 원칙
- **현실성**: 실제 서비스와 유사한 데이터
- **다양성**: 다양한 시나리오 커버
- **일관성**: 전체 앱에서 일관된 데이터 사용
- **로컬 관리**: API 없이 로컬에서 관리

## 🎨 프로토타입 품질 기준

### 컴포넌트 품질 체크리스트
- **즉시 사용 가능**: 복사하여 바로 서비스에 적용 가능한 완성도
- **반응형 완벽 지원**: 모든 디바이스에서 최적화된 UX
- **접근성 준수**: ARIA 레이블, 키보드 네비게이션, 스크린 리더 지원
- **일관된 디자인**: 통일된 패딩, 마진, 폰트 크기 시스템
- **부드러운 인터랙션**: 적절한 transition, hover/active 상태

### 모바일 UI/UX 기준
#### 터치 영역
- 최소 터치 영역: 44x44px (iOS), 48x48px (Android)
- 버튼 간격: 최소 8px
- 클릭 가능 영역 명확한 표시

#### 드로어/모달
- **헤더 고정**: 스크롤 시에도 제목 영역 고정
- **적절한 패딩**: 
  - 헤더: px-6 py-4
  - 콘텐츠: px-4 py-6
  - 버튼 영역: p-6
- **시각적 계층**:
  - 메인 메뉴: text-base font-medium
  - 서브 메뉴: text-sm, 들여쓰기
  - 설명: text-xs text-muted-foreground
- **애니메이션**: 
  - 드로어 열기/닫기: smooth transition
  - 아코디언: max-height transition
  - 호버/액티브: 즉각적인 피드백

#### 네비게이션
- **GNB 구조**:
  - 데스크톱: 드롭다운 메뉴
  - 태블릿/모바일: 햄버거 메뉴 → 드로어
- **메뉴 깊이**: 최대 2단계
- **현재 위치 표시**: active 상태 명확히 구분

### 컴포넌트 상태 관리
```tsx
// 모든 인터랙티브 요소는 다음 상태를 가져야 함
- default: 기본 상태
- hover: 마우스 오버 (데스크톱)
- active: 클릭/터치 중
- focus: 키보드 포커스
- disabled: 비활성화
```

### 색상 및 테마
- 라이트/다크 모드 필수 지원
- CSS 변수 기반 테마 시스템
- 충분한 명도 대비 (WCAG AA 기준)

### 성능 기준
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- 번들 사이즈 최적화
- 이미지 최적화 (lazy loading, WebP)

## 🚀 프로토타입 개발 워크플로우
1. **요구사항 분석**: 페이지/섹션 요구사항 파악
2. **와이어프레임**: 기본 레이아웃 구조 설계
3. **레이아웃**: 반응형 그리드 적용
4. **스타일링**: 디자인 시스템 적용
5. **디테일링**: 인터랙션 및 애니메이션
6. **목업 데이터**: 실제같은 더미 데이터 추가
7. **검증**: 크로스 브라우저 테스트
8. **최적화**: 성능 개선





## ⚠️ 주의사항
- **프로토타입 목적 명확히**: 빠른 UI/UX 검증
- **백엔드 연동 없음**: 목업 데이터만 사용
- **단계별 구현**: 와이어프레임 → 레이아웃 → 스타일링 → 디테일링
- **반응형 필수**: 모든 디바이스 대응
- **성능 고려**: 불필요한 리렌더링 방지
- **브라우저 호환성**: 주요 브라우저 테스트
