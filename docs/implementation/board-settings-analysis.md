# 게시판 설정 문제 분석 문서

## 📋 문제 요약
현재 게시판 설정 컨트롤 컴포넌트에서 다음 기능들이 적용되지 않는 문제 발견:
1. **뷰 타입 변경** - 설정은 변경되나 실제 UI에 반영 안됨
2. **테이블 밀도 설정** - 테이블 뷰에서만 적용되고 다른 뷰에서는 무시됨
3. **페이지당 게시글 수** - 공지사항 게시판에만 부분 적용
4. **무한 스크롤** - 페이지네이션 타입 변경이 동작하지 않음

## 🔍 코드 흐름 분석

### 1. 데이터 흐름
```
DSBoard (메인 컴포넌트)
  ├── BoardControlPanel (설정 패널)
  │   └── onConfigChange → dispatch SET_CONFIG
  ├── BoardList (리스트 렌더링)
  │   ├── config.display 직접 참조
  │   └── 게시판 타입별 컴포넌트 분기
  └── state 관리 (useReducer)
```

### 2. 핵심 문제점 발견

#### A. 타입 불일치 문제
- **BoardConfig.display** 타입 정의:
  - `postsPerPage`: 정의되어 있음 (line 25)
  - `itemsPerPage`: 정의되어 있음 (line 26)
  - 두 개의 중복된 필드가 존재하여 혼란 야기

- **실제 사용**:
  - `ds-board.tsx`: `itemsPerPage` 사용 (lines 120, 176, 193, 208, 293)
  - `board-list.tsx`: `itemsPerPage` 사용 (lines 247, 256, 280, 304, 393, 496, 582, 690)
  - `board-list.tsx` line 353: `postsPerPage` 잘못 참조 (버그)

#### B. 설정 적용 누락
1. **handleConfigChange 함수** (ds-board.tsx lines 164-214):
   - 게시판 타입 변경 시 처리 ✅
   - 페이지 크기 변경 시 처리 ✅
   - 정렬 변경 시 처리 ✅
   - **뷰 타입 변경 처리 누락** ❌
   - **테이블 밀도 변경 처리 누락** ❌
   - **페이지네이션 타입 변경 처리 누락** ❌

2. **BoardList 컴포넌트** (board-list.tsx):
   - `displayViewType` 직접 참조 (line 213) ✅
   - `displayPaginationType` 직접 참조 (line 214) ✅
   - `displayTableDensity` 직접 참조 (line 215) ✅
   - 그러나 게시판별 전용 컴포넌트에서는 이 설정들을 무시함

#### C. 게시판별 컴포넌트 문제
1. **BoardListNotice** (공지사항):
   - `itemsPerPage` props로 받음 (line 20, 27)
   - 페이지네이션 타입 무시 (항상 일반 페이지네이션)
   - 뷰 타입 변경 불가 (항상 테이블)

2. **BoardListGeneral** (자유게시판):
   - 설정 props 전달 안됨
   - 모든 display 설정 무시

3. **BoardListGallery** (갤러리):
   - 설정 props 전달 안됨
   - 무한스크롤 부분 지원하나 설정과 연동 안됨

## 📊 중복 코드 및 스타일 충돌

### 1. 중복 코드
- **페이지네이션 렌더링**: 6곳에서 동일한 코드 반복
  - lines 251-259 (공지사항)
  - lines 274-282 (자유게시판)
  - lines 297-319 (갤러리)
  - lines 388-410 (테이블 뷰)
  - lines 490-512 (카드 뷰)
  - lines 575-597 (갤러리 뷰)
  - lines 684-706 (리스트 뷰)

### 2. 스타일 충돌
- 테이블 밀도 스타일이 `densityStyles` 훅에서 가져오나, 실제 적용은 테이블 뷰에서만 됨
- 게시판별 컴포넌트는 자체 스타일 사용으로 일관성 부족

## 🐛 발견된 버그 목록

1. **Critical Bugs**:
   - `postsPerPage` vs `itemsPerPage` 혼용 (line 353)
   - 게시판별 컴포넌트에 config 전달 누락
   - 무한스크롤 설정이 실제 동작과 연결 안됨

2. **Minor Bugs**:
   - 테이블 밀도가 테이블 뷰에서만 적용
   - 뷰 타입 변경 시 데이터 재로드 안함
   - 페이지네이션 정보 계산 오류 (totalItems 계산)

## 💡 해결 방안

### 1. 즉시 수정 필요
1. **타입 정의 통일**:
   - `postsPerPage` 제거, `itemsPerPage`만 사용
   - 모든 참조 통일

2. **게시판별 컴포넌트 props 추가**:
   ```tsx
   interface BoardListCommonProps {
     posts: Post[]
     config: BoardConfig
     onPostClick: (post: Post) => void
     // 페이지네이션 관련
     currentPage?: number
     totalPages?: number
     onPageChange?: (page: number) => void
     // 무한스크롤 관련
     onLoadMore?: () => void
     hasMore?: boolean
     isLoadingMore?: boolean
   }
   ```

3. **handleConfigChange 함수 개선**:
   - 모든 display 속성 변경 감지
   - 필요시 데이터 재로드

### 2. 구조 개선 제안
1. **컴포넌트 통합**:
   - 게시판별 컴포넌트를 하나로 통합
   - config 기반으로 UI 렌더링

2. **상태 관리 개선**:
   - display 설정을 별도 state로 분리
   - 설정 변경 시 자동 동기화

3. **페이지네이션 컴포넌트 분리**:
   - 중복 코드 제거
   - 일관된 동작 보장

## 📝 작업 우선순위

### Phase 1 (긴급)
- [ ] `postsPerPage` → `itemsPerPage` 통일
- [ ] 게시판별 컴포넌트에 config props 전달
- [ ] 무한스크롤 설정 연결

### Phase 2 (중요)
- [ ] handleConfigChange 함수 완성
- [ ] 페이지네이션 컴포넌트 통합
- [ ] 테이블 밀도 전체 뷰 적용

### Phase 3 (개선)
- [ ] 게시판별 컴포넌트 통합
- [ ] 상태 관리 구조 개선
- [ ] 성능 최적화

## 🔧 테스트 체크리스트
- [ ] 뷰 타입 변경 시 UI 즉시 반영
- [ ] 테이블 밀도 모든 뷰에서 동작
- [ ] 페이지당 게시글 수 모든 게시판 적용
- [ ] 무한스크롤 토글 정상 동작
- [ ] 게시판 타입 변경 시 설정 유지
- [ ] 페이지네이션 정보 정확성

## 📅 업데이트 기록
- 2025-08-29: 초기 분석 완료
- 문제점 식별 및 해결 방안 제시
- 2025-08-29: Phase 1 수정 완료
  - ✅ postsPerPage → itemsPerPage 통일
  - ✅ 게시판별 컴포넌트에 config props 전달
  - ✅ 무한스크롤 설정 연결
  - ✅ handleConfigChange 함수 개선 (페이지네이션 타입 변경 처리 추가)
  - ✅ 빌드 성공 확인
- 2025-08-29: 전체 구조 재설계 완료
  - ✅ 통합 BoardRenderer 컴포넌트 구현
  - ✅ 각 뷰 타입별 독립 컴포넌트 생성 (table, card, gallery, list)
  - ✅ 페이지네이션/무한스크롤 통합 컴포넌트 구현
  - ✅ 설정 변경 핸들러 완전 재구현
  - ✅ 모든 타입 에러 해결 및 빌드 성공

## ✅ 해결된 문제들
1. **타입 불일치 문제 해결**
   - postsPerPage 필드 제거, itemsPerPage로 통일
   - board-configs.ts의 중복 필드 제거

2. **설정 적용 문제 해결**
   - 모든 게시판별 컴포넌트에 config와 페이지네이션 props 전달
   - BoardListNotice, BoardListGeneral, BoardListGallery 컴포넌트 수정

3. **무한스크롤 기능 연결**
   - 각 게시판별 컴포넌트에 무한스크롤 지원 추가
   - handleConfigChange에서 페이지네이션 타입 변경 처리

4. **빌드 에러 해결**
   - 타입 에러 모두 수정
   - 사용하지 않는 import 제거
   - 빌드 성공 확인

## 🔄 남은 작업
- 실제 환경에서 기능 테스트
- 성능 최적화 검토
- 사용자 피드백 반영