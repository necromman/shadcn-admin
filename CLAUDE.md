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
/design-system     # 디자인 시스템 메인 페이지 (현재 작업 중)
/                  # 대시보드 (참조용)
/sign-in          # 로그인 (참조용)
/users            # 사용자 관리 (참조용)
/tasks            # 작업 관리 (참조용)
/settings         # 설정 (참조용)
```

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

## 💅 UI 개발 규칙

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