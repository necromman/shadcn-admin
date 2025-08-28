# 게시판 설정 기능 수정 설계 문서

## 📋 현재 문제점

### 1. 페이지당 게시글 수 설정 문제
- **증상**: 자유게시판에서 페이지당 게시글 수가 표시되지 않음
- **원인**: 기본값이 설정되어 있지 않거나 UI에 반영되지 않음

### 2. 표시 방식(View Type) 전환 문제
- **증상**: 테이블/갤러리/카드/리스트 뷰 전환이 작동하지 않음
- **원인**: 컨트롤 패널에서 변경해도 실제 뷰가 바뀌지 않음

### 3. 테이블 밀도 설정 문제
- **증상**: Compact/Normal/Comfortable 설정이 작동하지 않음
- **원인**: 테이블 뷰에서 밀도 스타일이 적용되지 않음

### 4. 갤러리 이미지 레이아웃 문제
- **증상**: 갤러리 뷰에서 이미지 위쪽에 불필요한 공백 존재
- **원인**: CardContent의 기본 패딩 때문

## 🎯 해결 목표

1. 모든 게시판 설정이 실시간으로 반영되도록 수정
2. 기본값이 명확하게 표시되고 작동하도록 보장
3. 각 뷰 타입별로 올바른 레이아웃 적용
4. 사용자 경험 개선을 위한 즉각적인 피드백 제공

## 📝 작업 계획

### Phase 1: 문제 진단 및 데이터 확인
1. board-configs.ts에서 기본값 확인
2. DSBoard 컴포넌트의 상태 관리 로직 확인
3. BoardControlPanel과 BoardList 간 props 전달 확인

### Phase 2: 페이지당 게시글 수 수정
1. 기본값 설정 확인 및 수정
2. Select 컴포넌트의 value prop 바인딩 확인
3. 변경 시 실제 게시글 수 반영 확인

### Phase 3: View Type 전환 기능 수정
1. BoardControlPanel에서 viewType 변경 이벤트 확인
2. DSBoard의 SET_CONFIG 액션 처리 확인
3. BoardList의 displayViewType 로직 확인
4. 각 뷰 타입별 렌더링 조건 수정

### Phase 4: 테이블 밀도 기능 수정
1. use-table-density 훅 확인
2. densityStyles 객체 적용 확인
3. 테이블 행 높이 및 패딩 동적 적용

### Phase 5: 갤러리 레이아웃 수정
1. CardContent의 p-0 클래스가 제대로 적용되는지 확인
2. 이미지 컨테이너의 aspect-square 적용 확인
3. 불필요한 마진/패딩 제거

### Phase 6: 통합 테스트
1. 모든 게시판 타입에서 설정 변경 테스트
2. 각 뷰 타입별 전환 테스트
3. 테이블 밀도 변경 테스트
4. 페이지네이션 동작 확인

## 🔧 수정할 파일 목록

1. **src/features/design-system/board/data/board-configs.ts**
   - 기본값 명확히 설정

2. **src/components/design-system/ds-board.tsx**
   - 상태 관리 로직 수정
   - 설정 변경 핸들러 개선

3. **src/features/design-system/board/components/board-control-panel.tsx**
   - Select 컴포넌트 value 바인딩
   - 변경 이벤트 핸들러 수정

4. **src/features/design-system/board/components/board-list.tsx**
   - viewType 조건문 수정
   - 테이블 밀도 적용 로직 수정

5. **src/features/design-system/board/components/board-list-gallery.tsx**
   - 이미지 레이아웃 수정

## ✅ 성공 기준

1. 페이지당 게시글 수가 Select에 표시되고 변경 가능
2. View Type 변경 시 즉시 UI 변경
3. 테이블 밀도 변경 시 행 높이 변경
4. 갤러리 이미지가 카드 상단에 꽉 차게 표시
5. 모든 설정이 게시판별로 독립적으로 작동

## 📊 예상 결과

- 사용자가 게시판 설정을 변경하면 즉시 반영
- 각 게시판별로 다른 설정 유지 가능
- 와이어프레임 스타일 유지하면서 기능성 확보