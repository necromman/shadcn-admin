# 게시판 UI 개선 및 댓글 시스템 구현 설계

## 📋 요구사항 분석

### 1. 현재 문제점
- 모든 게시판(공지사항, 자유게시판 등)이 동일한 UI로 표시됨
- 게시판 타입별 특성이 반영되지 않음
- 샘플 데이터가 부족하여 페이징 기능 테스트 어려움
- 댓글 시스템 미구현

### 2. 개선 목표
- 각 게시판 타입별 고유한 UI/UX 제공
- 게시판 성격에 맞는 콘텐츠 표시
- 충분한 샘플 데이터로 페이징 기능 검증
- 댓글 시스템 구현으로 상호작용 기능 강화

## 🎨 게시판별 UI 디자인

### 1. 공지사항 (board_notice)
**특징:**
- 공식적이고 권위 있는 디자인
- 중요도 표시 (중요/긴급/일반)
- 작성자는 관리자만
- 댓글 비활성화 또는 제한적 허용
- 조회수 강조

**UI 요소:**
- 📌 중요 공지 상단 고정
- 🔴 긴급 공지 빨간색 배지
- 📊 조회수 뱃지 크게 표시
- 👤 관리자 아이콘
- 📅 등록일 강조

### 2. 자유게시판 (board_general)
**특징:**
- 친근하고 활발한 분위기
- 카테고리 다양성 (일상, 유머, 정보 등)
- 댓글 수 강조
- 인기글/추천글 표시
- 사용자 프로필 이미지

**UI 요소:**
- 💬 댓글 수 버블
- 👍 추천 수 표시
- 🏷️ 카테고리 태그
- 🔥 인기글 아이콘
- 😊 이모지 리액션

### 3. FAQ (board_faq)
**특징:**
- Q&A 형식의 구조화된 레이아웃
- 카테고리별 분류 (서비스, 결제, 계정 등)
- 검색 기능 강화
- 도움됨 투표
- 관련 질문 추천

**UI 요소:**
- ❓ 질문 아이콘
- ✅ 답변 완료 표시
- 📁 카테고리 필터
- 👍 도움됨 카운트
- 🔍 검색 하이라이트

### 4. 갤러리 (board_gallery)
**특징:**
- 이미지 중심 레이아웃
- 썸네일 그리드/masonry 뷰
- 이미지 미리보기
- 좋아요/조회수 오버레이
- 무한 스크롤

**UI 요소:**
- 🖼️ 큰 썸네일
- ❤️ 좋아요 오버레이
- 👁️ 조회수 오버레이
- 📸 이미지 개수 표시
- 🎨 작품 정보

### 5. Q&A (board_qna)
**특징:**
- 질문-답변 스레드 구조
- 답변 상태 표시 (대기/진행/완료)
- 베스트 답변 선정
- 전문가 답변 구분
- 보상/포인트 시스템

**UI 요소:**
- 🤔 질문 상태 아이콘
- ✔️ 채택된 답변
- 🏆 베스트 답변
- 💎 보상 포인트
- 👨‍🏫 전문가 배지

## 📊 샘플 데이터 구조

### 1. 공지사항 데이터 (30개)
```typescript
{
  id: string,
  boardId: 'board_notice',
  title: string,
  content: string,
  author: {
    id: string,
    name: string,
    role: 'admin',
    avatar: string
  },
  priority: 'urgent' | 'important' | 'normal',
  isPinned: boolean,
  viewCount: number,
  createdAt: Date,
  updatedAt: Date,
  attachments: File[],
  comments: [] // 비활성화 또는 제한
}
```

### 2. 자유게시판 데이터 (30개)
```typescript
{
  id: string,
  boardId: 'board_general',
  title: string,
  content: string,
  category: '일상' | '유머' | '정보' | '취미' | '기타',
  author: {
    id: string,
    name: string,
    role: 'user' | 'member',
    avatar: string,
    level: number
  },
  viewCount: number,
  likeCount: number,
  commentCount: number,
  isPopular: boolean,
  reactions: {
    like: number,
    love: number,
    laugh: number
  },
  createdAt: Date,
  comments: Comment[]
}
```

### 3. FAQ 데이터 (30개)
```typescript
{
  id: string,
  boardId: 'board_faq',
  question: string,
  answer: string,
  category: '서비스' | '결제' | '계정' | '기술' | '기타',
  helpfulCount: number,
  notHelpfulCount: number,
  relatedFaqs: string[],
  tags: string[],
  lastUpdated: Date,
  viewCount: number
}
```

### 4. 갤러리 데이터 (30개)
```typescript
{
  id: string,
  boardId: 'board_gallery',
  title: string,
  description: string,
  images: {
    thumbnail: string,
    full: string,
    width: number,
    height: number
  }[],
  author: {
    id: string,
    name: string,
    avatar: string,
    portfolio: string
  },
  category: '사진' | '일러스트' | '디자인' | '아트',
  tags: string[],
  viewCount: number,
  likeCount: number,
  downloadCount: number,
  comments: Comment[]
}
```

### 5. Q&A 데이터 (30개)
```typescript
{
  id: string,
  boardId: 'board_qna',
  question: {
    title: string,
    content: string,
    author: User,
    tags: string[],
    bounty: number
  },
  status: 'waiting' | 'in-progress' | 'resolved',
  answers: Answer[],
  acceptedAnswerId?: string,
  viewCount: number,
  voteCount: number,
  createdAt: Date,
  updatedAt: Date
}
```

## 💬 댓글 시스템 설계

### 1. 댓글 데이터 구조
```typescript
interface Comment {
  id: string;
  postId: string;
  parentId?: string; // 대댓글용
  author: {
    id: string;
    name: string;
    avatar: string;
    role: UserRole;
  };
  content: string;
  likeCount: number;
  isEdited: boolean;
  isDeleted: boolean;
  mentions?: string[]; // @멘션된 사용자
  createdAt: Date;
  updatedAt?: Date;
  replies?: Comment[]; // 대댓글
}
```

### 2. 댓글 기능
- **작성**: 실시간 프리뷰, 마크다운 지원
- **수정**: 수정 이력 표시
- **삭제**: 소프트 삭제 (내용만 숨김)
- **좋아요**: 중복 방지
- **답글**: 2단계까지 지원
- **멘션**: @username 자동완성
- **알림**: 답글/멘션 시 알림

### 3. 댓글 UI 컴포넌트
```typescript
// 댓글 리스트
<CommentList 
  comments={comments}
  onReply={handleReply}
  onLike={handleLike}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

// 댓글 작성
<CommentEditor
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  parentId={parentId}
  mentions={availableUsers}
/>

// 댓글 아이템
<CommentItem
  comment={comment}
  depth={0 | 1}
  isAuthor={isAuthor}
  canEdit={canEdit}
  canDelete={canDelete}
/>
```

## 🔄 구현 순서

### Phase 1: 게시판별 UI 차별화
1. BoardList 컴포넌트 분기 처리
   - boardId별 조건부 렌더링
   - 게시판별 전용 렌더링 함수 생성
2. 게시판 타입별 전용 컴포넌트 생성
   - BoardListNotice (공지사항 전용)
   - BoardListGeneral (자유게시판 전용)
   - BoardListFAQ (FAQ 전용)
   - BoardListGallery (갤러리 전용)
   - BoardListQNA (Q&A 전용)
3. 각 게시판별 스타일 적용
   - 색상 테마 차별화
   - 레이아웃 구조 최적화
   - 아이콘 및 배지 시스템
4. 조건부 렌더링 구현

### Phase 2: 샘플 데이터 생성
1. board-mock.ts 파일 확장
   - 기존 데이터 백업
   - 각 게시판별 30개 데이터 생성
2. 실제 서비스와 유사한 콘텐츠
   - 공지사항: 서비스 업데이트, 정책 변경 등
   - 자유게시판: 일상, 유머, 정보 공유 등
   - FAQ: 자주 묻는 질문과 답변
   - 갤러리: 이미지 URL 포함 게시글
   - Q&A: 기술 질문과 답변
3. 다양한 상태값 분포
   - 중요도, 인기도, 답변 상태 등
4. 시간대별 분산

### Phase 3: 댓글 시스템 구현
1. 댓글 타입 정의 (board.types.ts 확장)
2. 댓글 컴포넌트 생성
   - CommentList.tsx
   - CommentItem.tsx
   - CommentEditor.tsx
3. 댓글 상태 관리
   - useReducer 활용
   - CRUD 액션 정의
4. 댓글 UI 통합

### Phase 4: 통합 및 테스트
1. 전체 기능 통합
2. 페이징 테스트
3. 댓글 기능 테스트
4. 성능 최적화

## 📈 예상 결과

### 개선 효과
1. **사용자 경험 향상**: 게시판별 최적화된 UI
2. **직관성 증대**: 게시판 성격이 한눈에 파악
3. **참여도 증가**: 댓글 시스템으로 상호작용 강화
4. **테스트 용이성**: 충분한 샘플 데이터

### 성능 목표
- 30개 게시글 로딩: < 500ms
- 댓글 로딩: < 200ms
- 페이지 전환: < 100ms
- 메모리 사용: < 50MB

## 🚨 주의사항

1. **기존 기능 호환성**: 현재 동작하는 기능 유지
2. **점진적 마이그레이션**: 단계별 적용
3. **롤백 가능성**: 각 단계별 백업
4. **성능 모니터링**: 대량 데이터 처리 최적화

## 📝 체크리스트

- [ ] 게시판별 UI 컴포넌트 설계
- [ ] 샘플 데이터 구조 정의
- [ ] 댓글 시스템 아키텍처 설계
- [ ] API 인터페이스 정의
- [ ] 테스트 시나리오 작성
- [ ] 성능 벤치마크 설정

---
**작성일**: 2025-01-28
**작성자**: Claude
**문서 버전**: v1.0