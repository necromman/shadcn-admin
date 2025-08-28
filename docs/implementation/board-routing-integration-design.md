# 게시판 라우팅 및 통합 구현 설계 문서

## 📌 개요

이 문서는 동적 라우팅을 통한 게시판 시스템 통합 구현을 위한 설계 문서입니다. 
각 게시판 타입(`/board/notice`, `/board/gallery` 등)에 맞는 설정과 UI가 자동으로 적용되도록 하는 완전한 통합 시스템을 구현합니다.

## 🎯 목표

1. **동적 라우팅 기반 게시판**: URL 파라미터에 따라 자동으로 게시판 타입과 설정이 변경
2. **컨트롤 패널 완전 연동**: 모든 설정이 실시간으로 게시판에 반영
3. **상태별 컨트롤 패널**: 리스트 뷰와 상세 뷰에서 다른 설정 옵션 제공
4. **데이터 필터링**: 각 게시판 타입에 맞는 게시글만 표시

## 🔍 현재 상태 분석

### 1. 라우팅 구조
```
src/routes/_authenticated/board.$type.tsx
- 동적 파라미터: $type (notice, general, faq, gallery, qna)
- 컴포넌트: BoardPage
- 메인 컴포넌트: DSBoard
```

### 2. 주요 컴포넌트 구조

#### DSBoard (통합 컨트롤러)
- **역할**: 게시판 상태 관리 및 하위 컴포넌트 조율
- **상태 관리**: useReducer 사용
- **현재 문제점**:
  - boardType 파라미터는 받지만 완전히 활용하지 못함
  - config ID와 boardType 매핑이 일치하지 않음 (notice vs board_notice)
  - 컨트롤 패널 설정이 실제 렌더링에 반영되지 않음

#### BoardControlPanel
- **역할**: 게시판 설정 UI 제공
- **현재 상태**: 설정 변경은 가능하나 실제 적용 미흡

#### BoardList
- **역할**: 게시글 목록 표시
- **문제점**: viewType 설정이 반영되지 않음

### 3. 데이터 구조

#### BoardConfig
```typescript
{
  id: string              // 'notice', 'gallery' 등
  type: BoardType         // 게시판 타입
  display: {
    viewType: 'table' | 'card' | 'gallery' | 'list'
    postsPerPage: number
    showThumbnail: boolean
    showExcerpt: boolean
  }
  features: { ... }       // 기능 on/off
  permissions: { ... }    // 권한 설정
}
```

#### 현재 매핑 문제
- URL: `/board/notice`
- Config ID: `notice` (수정 필요)
- Post boardId: `board_notice` (불일치)

## 🛠️ 구현 계획

### 1단계: 데이터 일관성 확보

#### 1-1. BoardConfig ID 수정
```typescript
// board-configs.ts
{
  id: 'board_notice',     // 변경
  name: '공지사항',
  type: 'notice',
  // ...
}
```

#### 1-2. Mock 데이터 boardId 일치
```typescript
// board-mock.ts
{
  boardId: 'board_notice',  // 일치시킴
  // ...
}
```

### 2단계: DSBoard 컴포넌트 개선

#### 2-1. 초기화 로직 개선
```typescript
const getInitialConfig = (boardType: string) => {
  const boardId = `board_${boardType}`
  return getBoardConfigById(boardId) || defaultBoardConfig
}
```

#### 2-2. 컨트롤 패널 상태 연동
```typescript
// viewType 변경 시 즉시 반영
const handleViewTypeChange = (viewType: ViewType) => {
  dispatch({ 
    type: 'SET_CONFIG', 
    payload: { 
      ...state.config,
      display: { ...state.config.display, viewType }
    }
  })
}
```

#### 2-3. 동적 렌더링
```typescript
// BoardList에 viewType 전달
<BoardList
  posts={state.posts}
  config={state.config}
  viewType={state.config.display.viewType}  // 추가
  // ...
/>
```

### 3단계: BoardControlPanel 개선

#### 3-1. 상태별 컨트롤 옵션
```typescript
interface BoardControlPanelProps {
  config: BoardConfig
  viewMode: 'list' | 'detail' | 'create' | 'edit'
  onConfigChange: (config: BoardConfig) => void
}

// 리스트 뷰일 때
- 표시 방식 (테이블/카드/갤러리/리스트)
- 페이지당 게시글 수
- 정렬 옵션
- 필터 옵션

// 상세 뷰일 때
- 댓글 표시 여부
- 관련 게시글 표시
- 공유 기능
- 인쇄 옵션
```

#### 3-2. 실시간 반영
```typescript
// 설정 변경 시 즉시 UI 업데이트
const handleDisplayChange = (display: Partial<DisplayConfig>) => {
  const newConfig = {
    ...config,
    display: { ...config.display, ...display }
  }
  onConfigChange(newConfig)
}
```

### 4단계: BoardList 동적 렌더링

#### 4-1. ViewType별 렌더링
```typescript
const renderByViewType = () => {
  switch(config.display.viewType) {
    case 'table':
      return <TableView posts={posts} config={config} />
    case 'card':
      return <CardView posts={posts} config={config} />
    case 'gallery':
      return <GalleryView posts={posts} config={config} />
    case 'list':
      return <ListView posts={posts} config={config} />
  }
}
```

#### 4-2. 갤러리 뷰 특별 처리
```typescript
// 갤러리 게시판일 때 자동으로 갤러리 뷰 설정
if (boardType === 'gallery' && !userModified) {
  config.display.viewType = 'gallery'
}
```

### 5단계: 권한 시스템 통합

#### 5-1. usePermissions 훅 활용
```typescript
const permissions = usePermissions({
  userRole: currentUser.role,
  permissions: config.permissions
})

// 글쓰기 버튼 표시 여부
{permissions.can.create && (
  <Button onClick={handleCreatePost}>글쓰기</Button>
)}
```

### 6단계: 필터 및 검색 통합

#### 6-1. BoardSearch 연동
```typescript
<BoardSearch
  onSearch={(query, filters) => {
    dispatch({ type: 'SET_FILTER', payload: { query, ...filters } })
    fetchFilteredPosts()
  }}
/>
```

#### 6-2. BoardFilters 연동
```typescript
<BoardFilters
  filters={state.filters}
  onFilterChange={(filters) => {
    dispatch({ type: 'SET_FILTER', payload: filters })
    fetchFilteredPosts()
  }}
/>
```

## 📂 파일 구조 및 수정 대상

### 수정이 필요한 파일
1. `board-configs.ts` - ID 일관성 확보
2. `board-mock.ts` - boardId 매칭
3. `ds-board.tsx` - 메인 통합 로직
4. `board-control-panel.tsx` - 동적 컨트롤
5. `board-list.tsx` - 뷰타입별 렌더링

### 새로 생성할 파일
1. `board-table-view.tsx` - 테이블 뷰 컴포넌트
2. `board-card-view.tsx` - 카드 뷰 컴포넌트  
3. `board-gallery-view.tsx` - 갤러리 뷰 컴포넌트
4. `board-list-view.tsx` - 리스트 뷰 컴포넌트
5. `use-board-state.ts` - 게시판 상태 관리 훅

## 🔄 데이터 플로우

```
URL (/board/notice)
  ↓
Route Component (board.$type.tsx)
  ↓ (type 파라미터)
DSBoard Component
  ↓ (초기 설정 로드)
BoardConfig (board_notice)
  ↓ (설정 적용)
State Management (useReducer)
  ↓ (상태 분배)
┌─────────────────────────────────────┐
│  BoardControlPanel (설정 UI)         │
│  BoardSearch (검색)                  │
│  BoardFilters (필터)                 │
│  BoardList (목록) → ViewType 렌더링  │
│  BoardDetail (상세)                  │
│  BoardForm (작성/수정)               │
└─────────────────────────────────────┘
```

## ⚡ 핵심 개선 사항

### 1. 완전한 동적 라우팅
- URL 파라미터로 게시판 타입 자동 결정
- 타입별 초기 설정 자동 로드
- 데이터 자동 필터링

### 2. 실시간 설정 반영
- 컨트롤 패널 변경 즉시 UI 업데이트
- 뷰타입 변경 시 레이아웃 전환
- 권한 설정 즉시 적용

### 3. 상태별 차별화
- 리스트 뷰: 목록 관련 설정
- 상세 뷰: 읽기 관련 설정
- 작성/수정: 에디터 설정

### 4. 게시판별 특화
- 공지사항: 읽기 전용, 관리자만 작성
- 갤러리: 이미지 중심, 갤러리 뷰 기본
- FAQ: 아코디언 형태 가능
- Q&A: 답변 상태 표시

## 🚀 구현 우선순위

1. **긴급 (Phase 1)**
   - 데이터 ID 일관성 확보
   - DSBoard 초기화 로직 수정
   - ViewType별 렌더링 구현

2. **중요 (Phase 2)**
   - 컨트롤 패널 실시간 연동
   - 권한 시스템 통합
   - 필터/검색 연동

3. **개선 (Phase 3)**
   - 성능 최적화
   - 애니메이션 추가
   - 접근성 개선

## 📋 체크리스트

### Phase 1 (기본 동작)
- [ ] board-configs.ts ID 수정
- [ ] board-mock.ts boardId 수정
- [ ] DSBoard 초기화 로직 개선
- [ ] ViewType별 컴포넌트 생성
- [ ] BoardList 동적 렌더링 구현

### Phase 2 (완전 통합)
- [ ] 컨트롤 패널 실시간 연동
- [ ] 상태별 컨트롤 옵션 구현
- [ ] 권한 시스템 연동
- [ ] 검색/필터 통합

### Phase 3 (최적화)
- [ ] 성능 최적화
- [ ] 사용자 경험 개선
- [ ] 테스트 코드 작성

## 🔗 참조 문서
- `board-crud-design.md` - CRUD 기능 설계
- `board-crud-progress.md` - 구현 진행 상황
- `CLAUDE.md` - 프로젝트 지침

## 📝 메모

### 다음 세션을 위한 컨텍스트
- 현재 게시판 시스템은 컴포넌트는 모두 구현되었으나 통합이 미흡
- 주요 문제는 데이터 ID 불일치와 설정 미반영
- Phase 1부터 순차적으로 구현 필요
- 특히 갤러리 게시판은 자동으로 갤러리 뷰가 되도록 특별 처리 필요

---

**작성일**: 2025-01-28
**작성자**: Claude
**상태**: 설계 완료, 구현 대기
**예상 작업량**: 4-6시간