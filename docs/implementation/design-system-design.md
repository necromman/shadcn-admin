# 디자인 시스템 구축 계획

## 📋 프로젝트 개요
shadcn-admin 프로젝트를 기반으로 프론트엔드와 백오피스용 디자인 시스템을 구축합니다.

## 🎯 목표
1. 한 페이지에서 모든 컴포넌트를 확인 가능
2. 프론트엔드/백오피스 섹션 분리
3. 라이트/다크 모드 즉시 전환 및 확인
4. 기존 컴포넌트 최대한 활용
5. 반응형 디자인 적용

## 🏗️ 구현 전략

### 1. 라우팅 구조 단순화
- 현재: 복잡한 중첩 라우팅 구조
- 목표: `/design-system` 단일 페이지로 통합
- 내비게이션: 프론트엔드 | 백오피스 탭 방식

### 2. 페이지 구조
```
/design-system
├── 상단 네비게이션 (프론트엔드 | 백오피스)
├── 테마 전환 버튼 (라이트/다크/시스템)
└── 컴포넌트 섹션들
    ├── 프론트엔드
    │   ├── Header
    │   ├── Hero
    │   ├── Footer
    │   └── UI Components
    └── 백오피스
        ├── Dashboard Components
        ├── Table Components
        └── Form Components
```

### 3. 프론트엔드 섹션 컴포넌트

#### Header 컴포넌트
- 로고 + 네비게이션 메뉴
- 반응형 모바일 메뉴
- 기존 `header.tsx` 활용 및 수정

#### Hero 섹션
- 메인 타이틀 + 서브타이틀
- CTA 버튼
- 배경 그라데이션 효과

#### Footer 컴포넌트
- 회사 정보
- 링크 섹션
- 소셜 미디어 아이콘

#### UI Components 쇼케이스
- Button (모든 variant, size)
- Select
- Input
- Card
- Dialog
- Toast

### 4. 기술적 구현 방안

#### 기존 자원 활용
- **UI 컴포넌트**: `src/components/ui/*` 모두 활용
- **테마 시스템**: 현재 ThemeProvider 그대로 사용
- **레이아웃**: 새로운 단순화된 레이아웃 생성
- **스타일링**: Tailwind CSS + CSS 변수 활용

#### 새로 생성할 파일
1. `src/routes/design-system.tsx` - 메인 페이지
2. `src/features/design-system/` - 디자인 시스템 컴포넌트
   - `frontend-section.tsx`
   - `backoffice-section.tsx`
   - `component-showcase.tsx`
3. `src/components/design-system/` - 프론트엔드 컴포넌트
   - `ds-header.tsx`
   - `ds-hero.tsx`
   - `ds-footer.tsx`

### 5. 구현 순서
1. ✅ 계획 문서 작성
2. 라우팅 추가 (`/design-system`)
3. 기본 페이지 레이아웃 구성
4. 프론트엔드 섹션 구현
   - Header 컴포넌트
   - Hero 섹션
   - Footer 컴포넌트
   - UI 컴포넌트 쇼케이스
5. 백오피스 섹션 구현 (추후)
6. 테마 전환 기능 통합
7. 반응형 최적화

## 🎨 디자인 원칙
- **간결성**: 불필요한 요소 제거, 핵심 기능에 집중
- **일관성**: 기존 디자인 토큰 활용
- **접근성**: ARIA 레이블, 키보드 네비게이션
- **성능**: 컴포넌트 lazy loading, 코드 스플리팅

## 📝 예상 결과
- 개발자가 필요한 컴포넌트를 한눈에 확인
- 라이트/다크 모드에서 즉시 테스트 가능
- 복사하여 바로 사용 가능한 컴포넌트 코드
- 반응형 디자인 실시간 확인

## ⚠️ 주의사항
- 기존 라우팅 구조에 영향 최소화
- 기존 컴포넌트 수정 자제, 래퍼 컴포넌트로 확장
- 번들 사이즈 증가 최소화