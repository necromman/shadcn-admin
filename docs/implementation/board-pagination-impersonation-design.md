# 게시판 페이지네이션 및 권한 시스템 개선 설계

## 📋 요구사항 분석

### 1. 페이지네이션/무한스크롤 기능
- **현재 상태**: 페이지네이션만 구현, 무한스크롤 미구현
- **목표**: 
  - 페이지네이션과 무한스크롤 토글 기능
  - 컨트롤 패널에서 설정 가능
  - 게시판별로 다른 설정 가능

### 2. 테이블 밀도(Dense) 설정
- **현재 상태**: 테이블 뷰의 높이 고정
- **목표**:
  - Compact/Normal/Comfortable 3단계 밀도 설정
  - 실시간 미리보기
  - 사용자 선호도 저장

### 3. 권한 시스템 (Impersonation)
- **현재 상태**: 고정된 'user' 권한
- **목표**:
  - 기본값: 최고 관리자(admin)
  - 권한 전환 기능 (GitLab Impersonation 스타일)
  - 권한별 UI/기능 변화 실시간 반영

## 🏗️ 구현 계획

### Phase 1: 페이지네이션/무한스크롤 토글

#### 1.1 타입 정의 확장
```typescript
// board.types.ts
interface BoardConfig {
  display: {
    // 기존 필드...
    paginationType: 'pagination' | 'infinite-scroll'
    itemsPerPage: number
    infiniteScrollThreshold: number // 하단에서 몇 px 전에 로드
  }
}
```

#### 1.2 무한스크롤 훅 구현
- `useInfiniteScroll` 커스텀 훅
- Intersection Observer API 활용
- 로딩 상태 관리
- 중복 요청 방지

#### 1.3 BoardList 컴포넌트 개선
- 조건부 렌더링: 페이지네이션 vs 무한스크롤
- 스크롤 로더 컴포넌트
- 가상 스크롤과의 호환성

### Phase 2: 테이블 밀도 설정

#### 2.1 밀도 레벨 정의
```typescript
type TableDensity = 'compact' | 'normal' | 'comfortable'

// 각 밀도별 스타일
const densityStyles = {
  compact: {
    rowHeight: '32px',
    padding: 'py-1 px-2',
    fontSize: 'text-xs'
  },
  normal: {
    rowHeight: '48px', 
    padding: 'py-2 px-4',
    fontSize: 'text-sm'
  },
  comfortable: {
    rowHeight: '64px',
    padding: 'py-4 px-6', 
    fontSize: 'text-base'
  }
}
```

#### 2.2 컨트롤 패널 UI 추가
- 밀도 선택 드롭다운
- 실시간 미리보기
- 로컬스토리지 저장

### Phase 3: 권한 시스템 (Impersonation)

#### 3.1 권한 Context 구현
```typescript
interface AuthContext {
  currentRole: UserRole
  actualRole: UserRole // 실제 권한
  isImpersonating: boolean
  impersonate: (role: UserRole) => void
  stopImpersonation: () => void
}
```

#### 3.2 권한 전환 UI
- 헤더에 권한 선택 드롭다운
- 현재 권한 표시 배지
- Impersonation 모드 경고 표시

#### 3.3 권한별 기능 제어
- 게시글 작성 버튼 표시/숨김
- 관리 기능 활성화/비활성화
- 권한 불충분 메시지

## 📊 영향 범위 분석

### 수정 대상 파일
1. **컴포넌트**
   - `ds-board.tsx`: 상태 관리, 권한 컨텍스트
   - `board-list.tsx`: 무한스크롤, 밀도 적용
   - `board-control-panel.tsx`: 새 설정 옵션
   - `board-list-virtual.tsx`: 무한스크롤 호환

2. **타입 정의**
   - `board.types.ts`: Config 타입 확장
   - `permission.types.ts`: 권한 타입 개선

3. **훅**
   - `useInfiniteScroll.ts`: 새로 생성
   - `useTableDensity.ts`: 새로 생성
   - `useImpersonation.ts`: 새로 생성

4. **데이터**
   - `board-configs.ts`: 기본 설정 업데이트
   - `board-mock.ts`: 더 많은 테스트 데이터

## 🎯 구현 우선순위

1. **권한 시스템** (가장 우선)
   - 전체 시스템에 영향
   - 테스트 필수
   
2. **페이지네이션/무한스크롤**
   - 사용자 경험 개선
   - 성능 최적화 포함

3. **테이블 밀도**
   - UI 개선
   - 상대적으로 독립적

## ⚠️ 주의사항

### 성능 고려사항
- 무한스크롤 시 메모리 관리
- 가상 스크롤과의 충돌 방지
- 스크롤 이벤트 쓰로틀링

### 접근성
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 권한 변경 시 알림

### 호환성
- 기존 게시판 설정 마이그레이션
- 로컬스토리지 버전 관리
- 브라우저 호환성 체크

## 🔄 진행 상태 추적

각 Phase별로 진행 상태를 `board-pagination-impersonation-progress.md`에 기록하여 세션 간 연속성 보장.

## 📝 테스트 계획

### 단위 테스트
- 권한 전환 로직
- 무한스크롤 훅
- 밀도 계산 함수

### 통합 테스트
- 권한별 UI 변화
- 페이지네이션 ↔ 무한스크롤 전환
- 설정 저장/복원

### E2E 테스트
- 전체 워크플로우
- 다양한 권한으로 접근
- 성능 측정