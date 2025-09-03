# 프로젝트 개발 지침

## 🔴 중요: 프로젝트 작업 범위
**현재 프로젝트는 디자인 시스템 개발에 집중**
- **작업 대상 폴더**: `src/features/design-system/` 
- **작업 대상 컴포넌트**: `src/components/design-system/`
- **기타 폴더**: shadcn 참조용으로만 사용 (수정 금지)
  - `src/features/auth/`, `src/features/dashboard/` 등은 참조만
  - `src/components/ui/`: shadcn 기본 컴포넌트 (필요시 확장만)

### 실제 사용 중인 엔드포인트
```
/                  # 디자인 시스템 메인 페이지 (메인 작업 페이지)
/old              # 기존 대시보드 (참조용)
/sign-in          # 로그인 (참조용)
/users            # 사용자 관리 (참조용)
/tasks            # 작업 관리 (참조용)
/settings         # 설정 (참조용)
```

### 사이드바 구조
- **Old (참조용)**: 기존 shadcn-admin 메뉴들이 접혀있는 상태로 존재
  - 참조용으로만 사용, 수정 금지
  - 디자인 시스템 개발 시 UI 패턴 참고용

## 📋 작업 진행 상태 문서 관리
**대규모 기능 개발 시 필수 작성**
- **설계 문서**: `docs/implementation/[기능명]-design.md`
- **진행 상태**: `docs/implementation/[기능명]-progress.md`
- **세션 간 연속성 보장**: 진행 상태 문서에 다음 정보 필수 기록
  - 현재 완료된 작업
  - 진행 중인 작업
  - 다음 작업 목록
  - 생성된 파일 목록
  - 참조해야 할 문서
- **새 세션 시작 시**: 진행 상태 문서 확인 후 작업 재개

### 진행 상태 문서 템플릿
```markdown
# [기능명] 구현 진행 상태

## 📚 참조 문서
- 설계: `docs/implementation/[기능명]-design.md`
- 관련 파일: [파일 목록]

## ✅ 완료된 작업
- [ ] 작업 1
- [ ] 작업 2

## 🔄 진행 중
- 현재 작업: [작업명]
- 진행률: [%]

## 📝 다음 작업
1. 작업 A
2. 작업 B

## 생성된 파일
- `path/to/file1.tsx`
- `path/to/file2.ts`

## 메모
- 중요 결정 사항
- 이슈 및 해결 방법
```

## 🆕 디자인 시스템 새 섹션/카테고리 추가 체크리스트

### 필수 체크 항목 (순서대로 진행)
새로운 섹션을 추가할 때 반드시 다음 5가지를 모두 확인해야 합니다:

#### 1. 컴포넌트 파일 생성 ✅
```tsx
// src/components/design-system/ds-[component-name].tsx
export function DS[ComponentName]() {
  return <div>...</div>
}
```

#### 2. 컴포넌트 Import 추가 ✅
```tsx
// src/features/design-system/frontend-section-new.tsx
import { DS[ComponentName] } from '@/components/design-system/ds-[component-name]'
```

#### 3. COMPONENT_MAP에 매핑 추가 ✅ (가장 중요!)
```tsx
// src/features/design-system/frontend-section-new.tsx
const COMPONENT_MAP: Record<CategoryType, React.ComponentType | null> = {
  // ...
  'new-section': DS[ComponentName],  // ← 반드시 추가!
  // ...
}
```

#### 4. 카테고리 타입 정의 추가 ✅
```tsx
// src/features/design-system/types/frontend-category.ts
export type CategoryType = 
  | 'existing-section'
  | 'new-section'  // ← 새 타입 추가
  // ...
```

#### 5. DEFAULT_CATEGORIES에 추가 ✅
```tsx
// src/features/design-system/types/frontend-category.ts
export const DEFAULT_CATEGORIES: CategoryConfig[] = [
  // ...
  {
    id: 'new-section',
    title: '새 섹션',
    description: '섹션 설명',
    order: 5,  // 적절한 순서
    enabled: true,  // 기본 표시 여부
    movable: true,  // 순서 변경 가능 여부
  },
  // ...
]
```

#### 6. CATEGORY_DESCRIPTIONS에 설명 추가 ✅
```tsx
// src/features/design-system/frontend-section-new.tsx
const CATEGORY_DESCRIPTIONS: Record<CategoryType, { title: string; description: string }> = {
  // ...
  'new-section': {
    title: '섹션 제목',
    description: '섹션에 대한 상세 설명'
  },
  // ...
}
```

### ⚠️ 로컬스토리지 캐시 문제 해결

#### 문제 증상
- 새로 추가한 섹션이 브라우저에 표시되지 않음
- 시크릿/프라이빗 모드에서는 정상 표시됨
- 다른 사용자 브라우저에서는 보이지 않음

#### 원인
- 로컬스토리지에 이전 카테고리 설정이 캐시되어 있음
- 새로운 카테고리가 기존 저장된 설정에 포함되지 않음

#### 해결 방법

##### 방법 1: 버전 번호 증가 (권장) ⭐
```tsx
// src/features/design-system/frontend-section-new.tsx
const STORAGE_VERSION = 'v3'  // v2 → v3으로 증가
```
- 버전 변경 시 모든 사용자의 캐시가 자동 초기화됨
- 새 섹션 추가 시마다 버전 번호 증가 필요

##### 방법 2: 수동 초기화 (개발 중)
- 브라우저 개발자 도구 → Application → Local Storage
- `frontend-categories` 항목 삭제
- 페이지 새로고침

##### 방법 3: UI에서 초기화
- 카테고리 관리 버튼(⚙️) 클릭
- "초기화" 버튼 클릭

### 🔍 디버깅 체크리스트
섹션이 표시되지 않을 때 확인 사항:

1. **콘솔 에러 확인**
   - 컴포넌트 import 에러
   - TypeScript 타입 에러

2. **COMPONENT_MAP 확인** (90% 원인)
   ```tsx
   console.log(COMPONENT_MAP['new-section'])  // undefined면 매핑 누락
   ```

3. **카테고리 설정 확인**
   ```tsx
   console.log(categories.find(c => c.id === 'new-section'))
   ```

4. **로컬스토리지 확인**
   ```javascript
   localStorage.getItem('frontend-categories')
   ```

### 📝 완성도 체크리스트
- [ ] 컴포넌트가 정상 렌더링되는가?
- [ ] 반응형 디자인이 적용되었는가?
- [ ] 다크모드에서 정상 동작하는가?
- [ ] 접기/펼치기가 정상 동작하는가?
- [ ] 카테고리 관리에서 on/off 가능한가?
- [ ] 빌드 에러가 없는가? (`pnpm run build`)

## 🏢 브랜드명 사용 규칙
- **회사명/브랜드명은 항상 "BRAND"로 표기**
- 테크컴퍼니, 회사명, 기업명 등 구체적인 이름 사용 금지
- 예시에서도 일관되게 BRAND 사용
- 로고나 회사 표시가 필요한 모든 곳에 BRAND 표기

## 🚫 이모지 및 아이콘 사용 금지
- **이모지 사용 금지**: 사용자가 명시적으로 요청하지 않는 한 이모지 사용 금지
- **로고는 텍스트만**: 로고 영역에는 텍스트만 사용, 아이콘이나 이모지 제외
- **아이콘은 요청 시에만**: 아이콘은 사용자가 명확히 요청한 경우에만 추가
- **코드 주석 이모지 제외**: 코드 내 주석에도 이모지 사용 자제
- **예외 사항**: 
  - 사용자가 "이모지 추가해줘" 등 명시적 요청 시
  - 기존 코드에 이미 있는 이모지는 유지
  - lucide-react, react-icons 등 아이콘 라이브러리는 기능적 필요 시 사용 가능

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

## 📂 디자인 시스템 컴포넌트 구조 패턴

### Feature-based Component Organization
디자인 시스템 컴포넌트는 **Feature-based Component Organization** 패턴을 따름:

#### 1. 파일 구조 원칙
- **단순 컴포넌트**: 단일 파일로 관리
  ```
  ds-[component-name].tsx
  ```
- **복잡 컴포넌트**: 폴더 구조로 분리 (300줄 초과 시)
  ```
  ds-[component-name]/
  ├── main.tsx              # 메인 컴포넌트
  ├── types.ts              # 타입 정의
  ├── utils.ts              # 유틸리티 함수
  ├── constants.tsx         # 상수 데이터
  ├── [sub-component].tsx   # 하위 컴포넌트
  └── index.tsx            # Barrel export
  ```

#### 2. 폴더 변환 규칙
컴포넌트가 복잡해지면 다음 프로세스로 폴더 구조로 변환:

1. **기존 파일 백업**
   ```bash
   mv ds-component.tsx ds-component.tsx.bak
   ```

2. **폴더 구조 생성**
   ```bash
   mkdir ds-component/
   ```

3. **파일 분리 기준**
   - `types.ts`: 모든 타입과 인터페이스
   - `utils.ts`: 순수 함수, 계산 로직
   - `constants.tsx`: 상수 데이터, 기본값
   - `[sub-component].tsx`: 독립적인 UI 컴포넌트
   - `main.tsx`: 메인 컴포넌트 로직
   - `index.tsx`: 모든 export 관리

4. **엔트리 파일 생성**
   ```tsx
   // ds-component.tsx (엔트리 포인트)
   export { DSComponent } from './ds-component/main'
   ```

#### 3. Barrel Export 패턴
```tsx
// index.tsx
export { MainComponent } from './main'
export { SubComponent } from './sub-component'
export { utilFunction } from './utils'
export type { ComponentProps, ComponentState } from './types'
```

#### 4. 네이밍 컨벤션
- **폴더명**: `ds-[feature-name]` (kebab-case)
- **컴포넌트 파일**: `[component-name].tsx` (kebab-case)
- **타입 파일**: `types.ts`
- **유틸리티**: `utils.ts`
- **상수**: `constants.tsx` 또는 `[data-name]-data.tsx`

#### 5. 분리 기준
- **300줄 초과**: 필수 분리
- **3개 이상 하위 컴포넌트**: 폴더 구조 권장
- **복잡한 타입 정의**: types.ts 분리
- **5개 이상 유틸리티 함수**: utils.ts 분리

#### 6. 장점
- ✅ **점진적 복잡도 관리**: 작게 시작, 필요시 확장
- ✅ **명확한 경계**: 각 파일의 책임 명확
- ✅ **쉬운 리팩토링**: 폴더 단위 이동/삭제
- ✅ **IDE 친화적**: 파일 탐색 용이
- ✅ **Co-location**: 관련 파일 한 곳에 관리

#### 7. 실제 적용 예시
```
src/components/design-system/
├── ds-simple-card.tsx              # 단순 컴포넌트 (150줄)
├── ds-hero-enterprise-v2/          # 복잡 컴포넌트 (1000줄+)
│   ├── main.tsx                   # 메인 컴포넌트
│   ├── types.ts                   # 타입 정의
│   ├── hero-popup.tsx             # 팝업 컴포넌트
│   ├── options-panel.tsx          # 옵션 패널
│   ├── stats-cards.tsx            # 통계 카드
│   ├── popup-data.tsx             # 팝업 데이터
│   ├── utils.ts                   # 유틸리티
│   └── index.tsx                  # Barrel export
└── ds-hero-enterprise-v2.tsx      # 엔트리 포인트
```

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

## 📁 파일 버전 관리 지침

### 컴포넌트 버전 업그레이드 규칙
**새 버전 생성 시 반드시 따라야 할 프로세스:**

1. **기존 파일 백업 (필수)**
   ```bash
   # 원본 파일을 .bak 확장자로 백업
   # 예시: ds-hero-enterprise.tsx → ds-hero-enterprise.tsx.bak
   ```

2. **버전 관리 규칙**
   - v2, v3 등 새 버전 생성 전 **반드시 원본 백업**
   - 백업 파일은 다음 세션에서 참조 가능하도록 유지
   - 원본 구조와 디자인을 최대한 보존하면서 확장

3. **파일 명명 규칙**
   ```
   원본: component-name.tsx
   백업: component-name.tsx.bak
   새버전: component-name-v2.tsx (또는 원본 파일명 유지)
   ```

4. **버전 업그레이드 시 원칙**
   - ✅ **원본 디자인 보존**: 기존 UI/UX 최대한 유지
   - ✅ **점진적 개선**: 기능 추가 시 기존 기능 보존
   - ✅ **하위 호환성**: 기존 props와 인터페이스 유지
   - ❌ **파괴적 변경 금지**: 원본 디자인 임의 변경 금지
   - ❌ **단순화 금지**: 복잡한 디자인을 단순화하지 말 것

5. **예시**
   ```typescript
   // ❌ Bad: 원본 삭제 후 새 버전 생성
   // ds-hero-enterprise.tsx 삭제
   // ds-hero-enterprise-v2.tsx 생성
   
   // ✅ Good: 백업 후 새 버전 생성
   // ds-hero-enterprise.tsx → ds-hero-enterprise.tsx.bak
   // ds-hero-enterprise-v2.tsx 생성 (원본 구조 보존)
   ```

6. **복원 가능성 확보**
   - 백업 파일은 삭제하지 않음
   - 다음 세션에서 "v1 버전 참조" 요청 시 .bak 파일 확인
   - 필요 시 백업에서 복원 가능

### 실제 적용 예시
```bash
# 1. 기존 파일 백업
mv ds-hero-enterprise.tsx ds-hero-enterprise.tsx.bak

# 2. 새 버전 생성 (원본 구조 복사 후 확장)
cp ds-hero-enterprise.tsx.bak ds-hero-enterprise-v2.tsx

# 3. v2 버전에서 기능 추가/개선
# - 원본 UI 유지
# - 새 기능 추가
# - 기존 props 호환
```

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

## 🏗️ 디자인 시스템 카테고리 구조

### 필수 카테고리 정보
모든 디자인 시스템 카테고리는 다음 정보를 포함해야 함:
- **제목 (title)**: 카테고리의 명확한 이름
- **설명 (description)**: 카테고리의 목적과 내용을 설명하는 상세 텍스트
- **컴포넌트**: 실제 구현된 UI 컴포넌트 또는 placeholder

### 카테고리 순서 (표준 웹사이트 구조)
1. **공지/광고 바** - 헤더 상단 공지사항, 이벤트, 프로모션
2. **헤더 & 네비게이션** - GNB, 메인 메뉴
3. **히어로 섹션** - 메인 비주얼, 핵심 메시지
4. **공지사항 미리보기** - 최신 공지 요약
5. **게시판 미리보기** - 주요 게시글 미리보기
6. **비즈니스 솔루션** - 서비스, 가격, 팀 소개
7. **포트폴리오** - 작업물, 프로젝트 소개
8. **콘텐츠 섹션** - 일반 콘텐츠
9. **인증 카드** - 로그인, 회원가입
10. **UI 컴포넌트** - 기본 UI 요소들
11. **푸터** - 사이트 하단 정보

### 카테고리 관리 기능
- 카테고리별 켜기/끄기 토글
- 순서 변경 (이동 가능한 카테고리만)
- 설정 저장 및 초기화
- 각 카테고리별 접기/펼치기

### 컴포넌트 변형 표시 규칙
복수의 컴포넌트 변형(variants)을 표시할 때:
- **각 변형별 설명 카드 필수**: 컴포넌트 위에 제목과 설명을 포함한 카드 배치
- **카드 구조**:
  - 제목: 변형 이름 (예: "기본 공지 바", "심플 공지 바")
  - 설명: 사용 목적과 특징 설명
  - 시각적 구분: border, shadow, 배경색으로 카드 영역 구분
- **컴포넌트와 분리**: 설명 카드가 컴포넌트를 감싸지 않고 위에 독립적으로 배치
- **일관된 여백**: 카드와 컴포넌트 사이 적절한 간격 유지

## 🎨 프로덕션 레벨 디자인 시스템 기준

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

## 🚀 개발 워크플로우
1. 기능 분석 및 설계
2. 컴포넌트 구조 설계
3. 타입 정의
4. UI 구현 (shadcn 활용)
5. 비즈니스 로직 구현
6. **프로덕션 품질 검증**
7. 테스트 작성
8. 빌드 및 검증
9. 리팩토링

## 📊 콘텐츠 표시 옵션 표준

### 디자인 시스템 섹션의 설정 옵션 구현 가이드

모든 디자인 시스템 컴포넌트에서 설정/옵션이 필요한 경우 다음 표준을 따라야 합니다:

#### 1. 콘텐츠 표시 옵션 UI 표준
```tsx
// 표준 스타일 클래스
const optionContainerClass = "bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4"
const optionHeaderClass = "flex items-center gap-2 mb-3"
const optionIconClass = "h-4 w-4 text-slate-600 dark:text-muted-foreground"
const optionTitleClass = "text-sm font-semibold text-slate-700 dark:text-muted-foreground"
const checkboxClass = "h-4 w-4 border-slate-400 dark:border-border"
const labelClass = "cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
const helpTextClass = "text-xs text-slate-500 dark:text-muted-foreground mt-3 pl-0.5"
```

#### 2. 구현 패턴
```tsx
// 항상 보이는 옵션 패널 (스위치 없음)
<div className={optionContainerClass}>
  <div className={optionHeaderClass}>
    <HiCog6Tooth className={optionIconClass} />
    <span className={optionTitleClass}>콘텐츠 표시 옵션</span>
  </div>
  
  <div className="flex flex-wrap gap-4">
    <div className="flex items-center space-x-2">
      <Checkbox id="option1" className={checkboxClass} />
      <Label htmlFor="option1" className={labelClass}>
        옵션 이름 (아이콘 없음)
      </Label>
    </div>
  </div>
  
  <p className={helpTextClass}>
    설명 텍스트
  </p>
</div>
```

#### 3. 핵심 원칙
- **항상 보이기**: 설정 패널은 기본적으로 항상 표시 (토글 스위치 없음)
- **도트 보더**: 2px 도트 보더로 유틸리티 영역임을 명확히 표시
- **라이트/다크 모드 대비**: 라이트 모드에서 더 진한 색상 사용
- **컴팩트한 레이아웃**: p-4 패딩, h-4 w-4 체크박스
- **아이콘 없는 라벨**: 체크박스 라벨에 아이콘 제외
- **명확한 구분**: 다른 콘텐츠와 시각적으로 명확히 구분

#### 4. 색상 시스템
- **라이트 모드**:
  - 배경: `bg-slate-100`
  - 보더: `border-slate-300`
  - 텍스트: `text-slate-700`
  - 설명: `text-slate-500`
  
- **다크 모드**:
  - 배경: `dark:bg-muted/30`
  - 보더: `dark:border-border/50`
  - 텍스트: `dark:text-muted-foreground`
  - 라벨: `dark:text-slate-300`

## 🎯 스타일 작성 가이드

### 핵심 원칙
1. **shadcn/ui 우선**: 기본 shadcn 컴포넌트와 Tailwind 클래스를 최대한 활용
2. **최소 커스텀 스타일**: 꼭 필요한 경우에만 추가 스타일 작성
3. **격리된 스타일**: 다른 컴포넌트에 영향을 주지 않도록 스코프 제한
4. **테마 시스템 활용**: 하드코딩된 색상 대신 CSS 변수 사용

### 스타일 작성 위치
```
src/styles/
├── globals.css          # 전역 스타일 (수정 금지)
├── frontend/            # 프론트엔드 전용 스타일
│   └── [필요시 작성]
└── backoffice/          # 백오피스 전용 스타일
    └── [필요시 작성]
```

### 스타일 작성 규칙

#### 1. 컴포넌트별 격리
```css
/* ❌ Bad: 전역 영향 */
.card {
  padding: 20px;
}

/* ✅ Good: 스코프 제한 */
.ds-business-card {
  padding: 20px;
}

/* ✅ Better: data 속성 활용 */
[data-component="business-card"] {
  padding: 20px;
}
```

#### 2. shadcn 컴포넌트 확장
```tsx
/* ❌ Bad: 새로운 컴포넌트 생성 */
<div className="custom-card">...</div>

/* ✅ Good: shadcn Card 확장 */
<Card className="relative overflow-hidden">
  <CardHeader className="pb-3">...</CardHeader>
</Card>

/* ✅ Best: Tailwind 유틸리티 활용 */
<Card className="hover:shadow-lg transition-shadow">...</Card>
```

#### 3. 프론트/백오피스 구분
```tsx
// 프론트엔드 섹션
<div data-section="frontend">
  {/* 프론트 전용 스타일 적용 */}
</div>

// 백오피스 섹션  
<div data-section="backoffice">
  {/* 백오피스 전용 스타일 적용 */}
</div>
```

#### 4. 필수 스타일만 작성
```css
/* ❌ Bad: 과도한 커스터마이징 */
.custom-button {
  background: linear-gradient(...);
  box-shadow: 0 0 20px ...;
  animation: pulse 2s infinite;
  /* 10줄 이상의 스타일... */
}

/* ✅ Good: 최소한의 오버라이드 */
.specific-case-button {
  min-width: 200px; /* 특정 요구사항 */
}
```

### 스타일 우선순위
1. **Tailwind 인라인 클래스** - 가장 우선
   ```tsx
   <Button className="min-w-[200px] hover:scale-105">
   ```

2. **shadcn 컴포넌트 variant** - 두 번째 선택
   ```tsx
   <Button variant="outline" size="lg">
   ```

3. **data 속성 스타일** - 특수한 경우
   ```css
   [data-state="active"] { ... }
   ```

4. **커스텀 CSS 클래스** - 최후의 수단
   ```css
   .very-specific-requirement { ... }
   ```

### 테마 변수 활용
```css
/* ❌ Bad: 하드코딩된 색상 */
.custom-element {
  background: #3b82f6;
  color: #ffffff;
}

/* ✅ Good: 테마 변수 사용 */
.custom-element {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### 반응형 디자인
```css
/* Tailwind 브레이크포인트 활용 */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px */

/* ✅ Tailwind 클래스 사용 (권장) */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

/* 커스텀 CSS가 필요한 경우 */
@media (min-width: 768px) {
  .specific-layout {
    /* 태블릿 이상 */
  }
}
```

### 성능 고려사항
1. **CSS-in-JS 지양**: 런타임 오버헤드 방지
2. **불필요한 애니메이션 제한**: 필수적인 UX 개선 요소만
3. **will-change 신중히 사용**: 메모리 사용량 고려
4. **복잡한 선택자 피하기**: 성능 최적화

### 스타일 작성 체크리스트
- [ ] Tailwind 클래스로 해결 가능한가?
- [ ] shadcn 컴포넌트 variant로 충분한가?
- [ ] 다른 컴포넌트에 영향을 주지 않는가?
- [ ] 테마 변수를 활용했는가?
- [ ] 반응형을 고려했는가?
- [ ] 최소한의 코드로 작성했는가?

### 금지 사항
- ❌ `!important` 사용 (극히 예외적인 경우 제외)
- ❌ 인라인 스타일 직접 작성 (`style={{}}`)
- ❌ 전역 요소 선택자 (`div`, `button` 등)
- ❌ 깊은 중첩 선택자 (3단계 이상)
- ❌ ID 선택자 사용 (#id)
- ❌ 하드코딩된 색상값

## 🚨 library-frontend 프로젝트 작업 지침

### 🔴 절대 수정 금지 파일
**`src/features/design-system/frontend-section-new.tsx`는 참조용 원본 파일**
- ⛔ **절대 수정 금지**: 이 파일은 디자인 시스템의 원본
- 📖 **참조만 허용**: UI 패턴과 구조 참고용으로만 사용
- 🔒 **원본 보호**: 어떤 경우에도 이 파일을 변경하지 말 것

### 작업 대상 프로젝트 확인
**library-frontend는 독립된 별도 프로젝트**
- **프로젝트 위치**: `D:\PROJECT\practice\shadcn-admin\library-frontend`
- **개발 서버**: http://localhost:5175/
- **작업 대상**: library-frontend 폴더 내의 파일들만 수정
- **스타일링 후순위**: 기능 구현 우선, 스타일링은 나중에

### 기존 리소스 활용 원칙
1. **원본 디자인 시스템 참조**
   - `frontend-section-new.tsx`의 구조와 패턴 참고
   - 원본은 읽기만, 수정은 library-frontend에서
   - 컴포넌트 구조와 스타일 패턴 학습용

2. **library-frontend 내에서만 작업**
   - `library-frontend/src/components/` - 새 컴포넌트 생성
   - `library-frontend/src/app/` - 새 페이지 생성
   - `library-frontend/src/lib/` - 유틸리티 함수
   - 모든 수정은 library-frontend 폴더 내에서만

3. **shadcn/ui 컴포넌트 필수 사용**
   - 모든 UI는 shadcn/ui 기반
   - 커스텀 스타일링 최소화
   - 기존 테마 시스템 준수

### 개발 우선순위
1. **기능 구현** (1순위)
   - 컴포넌트 로직과 상호작용
   - 데이터 바인딩과 상태 관리
   - 이벤트 핸들링

2. **구조 설계** (2순위)
   - 컴포넌트 계층 구조
   - Props 인터페이스 정의
   - 재사용성 고려

3. **스타일링** (3순위 - 나중에)
   - 기본 shadcn 스타일 유지
   - 세부 디자인은 추후 조정
   - 반응형은 기본만 적용

### 금지 사항
- ❌ **frontend-section-new.tsx 수정 절대 금지**
- ❌ shadcn-admin 원본 프로젝트 파일 수정
- ❌ 기존 라우팅 시스템 변경
- ❌ 새로운 CSS 프레임워크 도입
- ❌ 과도한 스타일링 작업

### 필수 준수 사항
- ✅ **frontend-section-new.tsx는 읽기 전용**
- ✅ library-frontend 폴더 내에서만 작업
- ✅ shadcn/ui 컴포넌트만 사용
- ✅ TypeScript 타입 안정성 유지
- ✅ 작업 완료 후 progress.md 문서 업데이트
- ✅ **개발자 옵션 설정 구현 (아래 지침 참조)**

### 🎛️ 개발자 옵션 설정 구현 지침

**모든 컴포넌트는 개발자가 코드 레벨에서 조절 가능한 옵션을 포함해야 함**

#### 1. 설정 옵션 구현 패턴
```tsx
// ========================================
// 개발자 설정 옵션 (Developer Configuration)
// ========================================
const DEVELOPER_CONFIG = {
  // 기능 토글
  enableSearch: true,          // 검색 기능 활성화
  enableNotification: true,    // 알림 기능 활성화
  enableDarkMode: true,        // 다크모드 지원
  
  // 표시 옵션
  showBanner: true,            // 상단 배너 표시
  showFooterLinks: true,       // 푸터 링크 표시
  maxItemsToShow: 10,          // 최대 표시 항목 수
  
  // 스타일 옵션
  headerStyle: 'fixed',        // 'fixed' | 'static' | 'sticky'
  layoutWidth: 'container',    // 'full' | 'container' | 'narrow'
  
  // 데이터 소스
  useRealData: false,          // true: 실제 API, false: 더미 데이터
  apiEndpoint: '/api/v1',      // API 엔드포인트
}

// 사용 예시
if (DEVELOPER_CONFIG.enableSearch) {
  // 검색 컴포넌트 렌더링
}
```

#### 2. 컴포넌트별 옵션 주석 규칙
```tsx
export function LibraryHeader() {
  // ========================================
  // 개발자 설정 영역 시작
  // ========================================
  
  // [옵션 1] 네비게이션 메뉴 구성
  // - true: 전체 메뉴 표시
  // - false: 간소화된 메뉴만 표시
  const SHOW_FULL_NAVIGATION = true;
  
  // [옵션 2] 검색바 위치
  // - 'header': 헤더에 표시
  // - 'hero': 히어로 섹션에 표시
  // - 'both': 양쪽 모두 표시
  const SEARCH_BAR_POSITION = 'header';
  
  // [옵션 3] 사용자 메뉴 항목
  // - 배열에서 항목 추가/제거로 조절
  const USER_MENU_ITEMS = [
    'myLibrary',    // My Library 링크
    'notifications', // 알림
    'settings',      // 설정
    'logout'        // 로그아웃
  ];
  
  // ========================================
  // 개발자 설정 영역 끝
  // ========================================
  
  // 컴포넌트 로직...
}
```

#### 3. 섹션별 옵션 구현 예시

##### 네비게이션 옵션
```tsx
// library-frontend/src/components/layout/library-header.tsx

// ========================================
// 네비게이션 설정 (Navigation Settings)
// ========================================
const NAV_CONFIG = {
  // 드롭다운 동작 방식
  dropdownTrigger: 'hover',     // 'hover' | 'click'
  
  // 모바일 메뉴 스타일
  mobileMenuStyle: 'drawer',    // 'drawer' | 'dropdown' | 'fullscreen'
  
  // 메뉴 항목 표시 제어
  showSubMenuDescriptions: true, // 서브메뉴 설명 표시 여부
  maxSubMenuItems: 5,           // 서브메뉴 최대 항목 수
  
  // 메뉴 애니메이션
  enableAnimations: true,        // 애니메이션 활성화
  animationDuration: 200,        // 애니메이션 지속 시간(ms)
}
```

##### 게시판 옵션
```tsx
// library-frontend/src/components/board/board-list.tsx

// ========================================
// 게시판 설정 (Board Settings)
// ========================================
const BOARD_CONFIG = {
  // 표시 설정
  itemsPerPage: 20,              // 페이지당 항목 수
  showThumbnails: true,          // 썸네일 표시
  showAuthor: true,              // 작성자 표시
  showViewCount: true,           // 조회수 표시
  
  // 기능 설정
  enableSearch: true,            // 검색 기능
  enableFilters: true,           // 필터 기능
  enableSorting: true,           // 정렬 기능
  
  // 레이아웃
  layout: 'list',                // 'list' | 'grid' | 'card'
  columns: 3,                    // 그리드 레이아웃 컬럼 수
}
```

##### 푸터 옵션
```tsx
// library-frontend/src/components/layout/library-footer.tsx

// ========================================
// 푸터 설정 (Footer Settings)  
// ========================================
const FOOTER_CONFIG = {
  // 섹션 표시 제어
  sections: {
    info: true,          // 도서관 정보
    quickLinks: true,    // 빠른 링크
    contact: true,       // 연락처
    social: true,        // 소셜 미디어
    newsletter: false,   // 뉴스레터 구독
  },
  
  // 링크 설정
  maxQuickLinks: 6,      // 최대 빠른 링크 수
  externalLinksNewTab: true, // 외부 링크 새 탭 열기
}
```

#### 4. 주석 작성 규칙

##### 필수 주석 형식
```tsx
// ========================================
// [섹션명] 설정 ([Section] Settings)
// 설명: 이 섹션의 동작을 제어하는 설정입니다
// 팁: 개발/프로덕션 환경에 따라 조절하세요
// ========================================

// [옵션명]: [설명]
// - 가능한 값: value1 | value2 | value3
// - 기본값: defaultValue
// - 영향: 이 옵션을 변경하면 [무엇]이 변경됩니다
const OPTION_NAME = 'defaultValue';
```

##### 조건부 렌더링 주석
```tsx
{/* 
  ========================================
  조건부 렌더링: 검색바
  설정: DEVELOPER_CONFIG.enableSearch
  위치: 파일 상단 15번 라인
  ========================================
*/}
{DEVELOPER_CONFIG.enableSearch && (
  <SearchBar />
)}
```

#### 5. 환경별 설정 분리
```tsx
// config/development.ts
export const DEV_CONFIG = {
  showDebugInfo: true,
  enableMockData: true,
  apiDelay: 1000, // 개발 환경 API 지연 시뮬레이션
}

// config/production.ts  
export const PROD_CONFIG = {
  showDebugInfo: false,
  enableMockData: false,
  apiDelay: 0,
}

// 사용
const CONFIG = process.env.NODE_ENV === 'development' 
  ? DEV_CONFIG 
  : PROD_CONFIG;
```

#### 6. 옵션 문서화 요구사항
- 모든 설정 옵션은 파일 상단에 집중 배치
- 각 옵션마다 명확한 설명과 가능한 값 명시
- 옵션 변경 시 영향 범위 설명
- 관련 컴포넌트 위치 표시
- 기본값과 권장값 구분 표시

## ⚠️ 주의사항
- **작업 범위 엄수**: `src/features/design-system/` 폴더만 수정
- **다른 폴더 수정 금지**: 참조용으로만 사용
- main 브랜치 직접 푸시 금지
- 큰 변경사항은 점진적 적용
- 기존 코드 스타일 유지
- 성능 영향 고려 (이벤트 위임 활용)
- 브라우저 호환성 확인
- **모바일 퍼스트 접근**
- **프로덕션 레디 상태 유지**
- **디자인 시스템은 즉시 사용 가능한 완성도로 구현**
- **프론트/백오피스 스타일 독립성 유지**
- **library-frontend 프로젝트는 기능 우선, 스타일링 후순위**