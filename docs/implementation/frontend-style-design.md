# 프론트 스타일 시스템 설계

## 📋 요구사항
- 프론트 탭에만 적용되는 독립적인 스타일 시스템
- shadcn 컴포넌트 유지하면서 스타일 오버라이드
- 테마 시스템(색상)과 연동
- 복사/붙여넣기로 즉시 적용 가능한 구조
- 백오피스 탭에는 영향 없음

## 🏗️ 아키텍처

### 1. 폴더 구조
```
src/
├── styles/
│   └── frontend/                  # 프론트 전용 스타일
│       ├── index.css              # 메인 스타일 파일
│       ├── components/            # 컴포넌트별 오버라이드
│       │   ├── cards.css         # 카드 스타일
│       │   ├── forms.css         # 폼/입력 필드 스타일
│       │   ├── buttons.css       # 버튼 스타일
│       │   ├── auth.css          # 인증 화면 전용
│       │   └── navigation.css    # 네비게이션 스타일
│       ├── animations/            # 애니메이션 정의
│       │   └── transitions.css   # 트랜지션 효과
│       └── utilities/             # 유틸리티 클래스
│           └── helpers.css       # 헬퍼 클래스
```

### 2. 스타일 적용 전략

#### CSS 변수 활용
```css
/* 프론트 전용 CSS 변수 정의 */
.frontend-section {
  /* 모서리 반경 */
  --frontend-radius-sm: 0.75rem;
  --frontend-radius-md: 1rem;
  --frontend-radius-lg: 1.5rem;
  --frontend-radius-xl: 2rem;
  
  /* 그림자 */
  --frontend-shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
  --frontend-shadow-md: 0 8px 24px rgba(0,0,0,0.06);
  --frontend-shadow-lg: 0 16px 48px rgba(0,0,0,0.08);
  --frontend-shadow-glow: 0 0 40px rgba(var(--primary-rgb), 0.15);
  
  /* 블러 효과 */
  --frontend-blur: 20px;
  --frontend-backdrop-blur: 10px;
  
  /* 애니메이션 */
  --frontend-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --frontend-transition-fast: all 0.15s ease;
}
```

#### 클래스 네이밍 전략
```css
/* 프론트 전용 클래스는 .frontend- 접두사 사용 */
.frontend-card {
  /* 기본 카드 스타일 오버라이드 */
}

.frontend-input {
  /* 입력 필드 스타일 오버라이드 */
}

/* 데이터 속성 활용 */
[data-frontend-style="modern"] {
  /* 모던 스타일 적용 */
}
```

### 3. 컴포넌트별 스타일링 계획

#### 카드 컴포넌트
- 부드러운 그림자와 호버 효과
- 글래스모피즘 옵션
- 그라데이션 보더 효과
- 스무스한 트랜지션

#### 인증 폼
- 플로팅 라벨 효과
- 포커스 시 글로우 효과
- 모던한 입력 필드 스타일
- 애니메이션 피드백

#### 버튼
- 그라데이션 배경 옵션
- 부드러운 호버 효과
- 리플 효과
- 로딩 애니메이션

#### 네비게이션
- 스티키 헤더 블러 효과
- 드롭다운 애니메이션
- 활성 상태 인디케이터
- 모바일 드로어 트랜지션

## 🔧 구현 방법

### Phase 1: 기본 구조 설정
1. `styles/frontend/` 폴더 생성
2. 메인 스타일 파일 작성
3. FrontendSection 컴포넌트에 클래스 추가

### Phase 2: 컴포넌트 스타일 오버라이드
1. 카드 스타일 구현
   - 그림자, 호버 효과
   - 글래스모피즘 변형
2. 폼/입력 필드 스타일
   - 모던한 입력 필드
   - 포커스 효과
3. 버튼 스타일
   - 그라데이션, 호버 효과

### Phase 3: 애니메이션 및 인터랙션
1. 트랜지션 정의
2. 호버/포커스 효과
3. 로딩 상태 애니메이션

### Phase 4: 테마 연동
1. CSS 변수와 테마 시스템 연결
2. 다크모드 대응
3. 색상 커스터마이징 지원

## 📝 구현 예시

### 카드 스타일
```css
.frontend-card {
  border-radius: var(--frontend-radius-lg);
  box-shadow: var(--frontend-shadow-md);
  backdrop-filter: blur(var(--frontend-backdrop-blur));
  background: linear-gradient(
    135deg,
    hsl(var(--card) / 0.95),
    hsl(var(--card))
  );
  border: 1px solid hsl(var(--border) / 0.5);
  transition: var(--frontend-transition);
}

.frontend-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--frontend-shadow-lg);
}
```

### 입력 필드 스타일
```css
.frontend-input {
  border-radius: var(--frontend-radius-md);
  border: 2px solid transparent;
  background: hsl(var(--background) / 0.5);
  backdrop-filter: blur(8px);
  transition: var(--frontend-transition);
}

.frontend-input:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
  background: hsl(var(--background));
}
```

## 🚀 적용 방법

### 1. FrontendSection 수정
```tsx
export function FrontendSection() {
  return (
    <div className="w-full frontend-section" data-theme="frontend">
      {/* 컨텐츠 */}
    </div>
  )
}
```

### 2. 스타일 import
```tsx
// frontend-section.tsx
import '@/styles/frontend/index.css'
```

### 3. 컴포넌트 클래스 추가
```tsx
// 기존 shadcn 클래스 + 프론트 클래스
<Card className="frontend-card">
  {/* 내용 */}
</Card>

<Input className="frontend-input" />
<Button className="frontend-button" />
```

## ✅ 체크리스트
- [ ] 백오피스 탭 영향 없음 확인
- [ ] 테마 색상 변경 시 정상 동작
- [ ] 다크모드 지원
- [ ] 모바일 반응형
- [ ] 애니메이션 성능
- [ ] 브라우저 호환성

## 🎯 목표
- 모던하고 세련된 프론트엔드 UI
- shadcn의 접근성과 기능성 유지
- 쉬운 커스터마이징
- 재사용 가능한 스타일 시스템