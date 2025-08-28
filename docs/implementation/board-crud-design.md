# 게시판 CRUD 기능 설계 문서 (v2)

## 📋 요구사항

### 핵심 기능 요구사항

1. **동적 게시판 시스템**
   - 하나의 컴포넌트로 여러 타입의 게시판 표현
   - 백엔드에서 게시판 설정 시 자동 반영
   - 게시판별 권한 및 기능 설정

2. **게시판 설정 컨트롤 패널**
   - 게시판 타입 선택 (공지사항, 자유게시판, FAQ, 갤러리 등)
   - 권한 설정 (읽기 전용, 댓글 허용, 작성 권한 등)
   - 기능 on/off (이미지 업로드, 파일 첨부, 댓글, 좋아요 등)
   - 표시 옵션 (목록 형태, 카드/테이블 뷰 등)

3. **CRUD 기능**
   - **Create**: 게시글 작성 (리치 텍스트 에디터, 이미지/파일 첨부)
   - **Read**: 게시글 목록 및 상세보기
   - **Update**: 게시글 수정 (권한 체크)
   - **Delete**: 게시글 삭제 (소프트 삭제)

4. **이미지 처리 시스템**
   - 게시글 내 이미지 표시
   - 라이트박스 형태의 이미지 뷰어
   - 이미지 확대/축소 (핀치 줌)
   - 이미지 스와이프 네비게이션
   - 반응형 이미지 최적화

5. **댓글 시스템**
   - 계층형 댓글 (대댓글)
   - @멘션 기능
   - 댓글 수정/삭제
   - 실시간 업데이트 UI
   - 댓글 알림

6. **통합 검색**
   - 제목, 내용, 작성자, 태그 통합 검색
   - 실시간 검색 필터링
   - 검색 결과 하이라이팅
   - 고급 검색 옵션

7. **권한 관리**
   - 게시판별 읽기/쓰기/수정/삭제 권한
   - 댓글 작성 권한
   - 파일 업로드 권한
   - 관리자 권한

### 비기능 요구사항
- 완벽한 반응형 디자인 (모바일 우선)
- 다크모드 지원
- 프로덕션 레벨 UI/UX
- 접근성 준수 (WCAG 2.1)
- SEO 최적화

## 🏗️ 기술 스택
- **프레임워크**: React + TypeScript
- **UI 컴포넌트**: shadcn/ui
- **스타일링**: Tailwind CSS
- **상태관리**: React State + useReducer
- **데이터**: 임시 목업 데이터
- **라우팅**: React Router
- **이미지 뷰어**: 커스텀 라이트박스
- **텍스트 에디터**: 커스텀 리치 텍스트 에디터

## 📁 파일 구조

```
src/
├── features/design-system/
│   ├── board/
│   │   ├── components/
│   │   │   ├── board-control-panel.tsx   # 게시판 설정 컨트롤
│   │   │   ├── board-list.tsx            # 게시글 목록
│   │   │   ├── board-detail.tsx          # 게시글 상세
│   │   │   ├── board-form.tsx            # 작성/수정 폼
│   │   │   ├── board-search.tsx          # 검색 컴포넌트
│   │   │   ├── board-filters.tsx         # 필터 컴포넌트
│   │   │   ├── board-comments.tsx        # 댓글 시스템
│   │   │   ├── board-image-viewer.tsx    # 이미지 뷰어
│   │   │   └── board-permissions.tsx     # 권한 관리
│   │   ├── types/
│   │   │   ├── board.types.ts            # 게시판 타입
│   │   │   ├── comment.types.ts          # 댓글 타입
│   │   │   └── permission.types.ts       # 권한 타입
│   │   ├── data/
│   │   │   ├── board-mock.ts             # 게시글 목업
│   │   │   ├── board-configs.ts          # 게시판 설정
│   │   │   └── comments-mock.ts          # 댓글 목업
│   │   ├── hooks/
│   │   │   ├── use-board-state.ts        # 게시판 상태
│   │   │   ├── use-image-viewer.ts       # 이미지 뷰어
│   │   │   └── use-permissions.ts        # 권한 체크
│   │   └── utils/
│   │       ├── board-utils.ts            # 게시판 유틸
│   │       └── image-utils.ts            # 이미지 처리
│   └── types/
│       └── frontend-category.ts          # 카테고리 타입
└── components/design-system/
    └── ds-board.tsx                      # 메인 게시판 컴포넌트
```

## 🎯 구현 계획

### 1단계: 기본 설정 및 타입 정의 (1시간)
- [x] 설계 문서 작성
- [ ] 게시판 카테고리 추가
- [ ] 타입 정의 (Post, Comment, Permission, BoardConfig)
- [ ] 게시판 설정 시스템 구조화

### 2단계: 컨트롤 패널 구현 (1시간)
- [ ] 게시판 타입 선택기
- [ ] 권한 설정 UI
- [ ] 기능 on/off 토글
- [ ] 표시 옵션 설정

### 3단계: 게시글 목록 (1.5시간)
- [ ] 동적 목록 컴포넌트 (테이블/카드/갤러리 뷰)
- [ ] 페이지네이션
- [ ] 정렬 기능
- [ ] 권한별 UI 변경

### 4단계: 게시글 작성/수정 (2시간)
- [ ] 리치 텍스트 에디터
- [ ] 이미지/파일 업로드
- [ ] 미리보기 기능
- [ ] 임시 저장

### 5단계: 게시글 상세 및 이미지 뷰어 (2시간)
- [ ] 상세보기 레이아웃
- [ ] 이미지 라이트박스
- [ ] 핀치 줌/스와이프
- [ ] 반응형 이미지 처리

### 6단계: 댓글 시스템 (2시간)
- [ ] 계층형 댓글 구조
- [ ] @멘션 기능
- [ ] 댓글 CRUD
- [ ] 실시간 UI 업데이트

### 7단계: 검색 및 필터 (1시간)
- [ ] 통합 검색 구현
- [ ] 고급 검색 옵션
- [ ] 필터링 시스템
- [ ] 검색 결과 하이라이팅

### 8단계: 권한 관리 (1시간)
- [ ] 권한 체크 로직
- [ ] UI 권한별 렌더링
- [ ] 에러 핸들링

### 9단계: 최종 테스트 및 최적화 (1시간)
- [ ] 반응형 테스트
- [ ] 다크모드 테스트
- [ ] 성능 최적화
- [ ] 빌드 검증

## 📝 데이터 구조

```typescript
// 게시판 설정
interface BoardConfig {
  id: string;
  name: string;
  type: 'notice' | 'general' | 'faq' | 'gallery' | 'qna';
  description: string;
  features: {
    comments: boolean;
    likes: boolean;
    attachments: boolean;
    images: boolean;
    mentions: boolean;
    privatePost: boolean;
    anonymousPost: boolean;
  };
  permissions: BoardPermissions;
  display: {
    viewType: 'table' | 'card' | 'gallery' | 'list';
    postsPerPage: number;
    showThumbnail: boolean;
    showExcerpt: boolean;
    excerptLength: number;
  };
}

// 권한 설정
interface BoardPermissions {
  read: UserRole[];
  write: UserRole[];
  comment: UserRole[];
  delete: UserRole[];
  moderate: UserRole[];
  uploadFile: UserRole[];
  uploadImage: UserRole[];
}

type UserRole = 'guest' | 'user' | 'member' | 'moderator' | 'admin';

// 게시글
interface Post {
  id: string;
  boardId: string;
  title: string;
  content: string;
  contentType: 'text' | 'html' | 'markdown';
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: UserRole;
  };
  category?: string;
  tags: string[];
  images: PostImage[];
  attachments: PostAttachment[];
  metadata: {
    views: number;
    likes: number;
    commentsCount: number;
    isLiked: boolean;
  };
  status: 'draft' | 'published' | 'deleted';
  isPinned: boolean;
  isLocked: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

// 이미지
interface PostImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  alt: string;
  width: number;
  height: number;
  size: number;
}

// 첨부파일
interface PostAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

// 댓글
interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: UserRole;
  };
  mentions: string[];
  likes: number;
  isLiked: boolean;
  children?: Comment[];
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isDeleted: boolean;
}

// 게시판 상태
interface BoardState {
  config: BoardConfig;
  posts: Post[];
  selectedPost: Post | null;
  comments: Comment[];
  filters: {
    searchQuery: string;
    category: string | null;
    tags: string[];
    sortBy: 'latest' | 'views' | 'likes' | 'comments';
    dateRange: [Date | null, Date | null];
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    pageSize: number;
  };
  ui: {
    isLoading: boolean;
    isCreating: boolean;
    isEditing: boolean;
    viewMode: 'list' | 'detail' | 'create' | 'edit';
    selectedImages: PostImage[];
    imageViewerIndex: number;
  };
}
```

## 🎨 UI/UX 설계

### 📊 게시판 컨트롤 패널
```tsx
// 상단 컨트롤 패널 (항상 표시)
<div className="bg-slate-100 dark:bg-muted/30 border-2 border-dotted border-slate-300 dark:border-border/50 rounded-lg p-4">
  <div className="flex items-center gap-2 mb-3">
    <HiCog6Tooth className="h-4 w-4" />
    <span className="text-sm font-semibold">게시판 설정</span>
  </div>
  
  // 게시판 타입 선택
  <Select value={boardType}>
    <option>공지사항</option>
    <option>자유게시판</option>
    <option>FAQ</option>
    <option>갤러리</option>
  </Select>
  
  // 권한 설정
  <div className="grid grid-cols-2 gap-4">
    <Checkbox label="댓글 허용" />
    <Checkbox label="이미지 업로드" />
    <Checkbox label="파일 첨부" />
    <Checkbox label="익명 작성" />
  </div>
  
  // 표시 옵션
  <RadioGroup value={viewType}>
    <Radio value="table">테이블</Radio>
    <Radio value="card">카드</Radio>
    <Radio value="gallery">갤러리</Radio>
  </RadioGroup>
</div>
```

### 📝 게시글 목록
- **동적 뷰 전환**: 테이블/카드/갤러리 자동 전환
- **반응형 레이아웃**:
  - 데스크탑: 테이블 뷰 기본
  - 태블릿: 카드 그리드
  - 모바일: 단일 카드 리스트
- **상단 툴바**: 검색, 필터, 정렬, 글쓰기 버튼
- **무한 스크롤 옵션**: 페이지네이션과 선택 가능

### 📄 게시글 상세
- **헤더**: 제목, 작성자, 작성일, 조회수, 액션 버튼
- **컨텐츠**: 
  - 본문 (HTML/마크다운 렌더링)
  - 인라인 이미지 (클릭 시 뷰어 열기)
  - 첨부파일 목록
- **하단**: 좋아요, 공유, 댓글 섹션
- **플로팅 액션**: 목록으로, 위로 가기

### 🖼️ 이미지 뷰어
```tsx
// 라이트박스 스타일 뷰어
<Dialog open={isImageViewerOpen}>
  <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
    // 터치/마우스 제스처 지원
    <div onTouchStart={handleTouchStart}
         onTouchMove={handlePinch}
         onWheel={handleZoom}>
      <img src={currentImage} 
           style={{ transform: `scale(${zoom})` }}/>
    </div>
    
    // 네비게이션
    <Button onClick={prevImage}>이전</Button>
    <Button onClick={nextImage}>다음</Button>
    
    // 컨트롤
    <Button onClick={zoomIn}>확대</Button>
    <Button onClick={zoomOut}>축소</Button>
    <Button onClick={download}>다운로드</Button>
  </DialogContent>
</Dialog>
```

### 💬 댓글 시스템
```tsx
// 모던한 댓글 UI
<div className="space-y-4">
  // 댓글 작성
  <Card className="p-4">
    <Textarea placeholder="댓글을 입력하세요... @로 멘션" />
    <div className="flex justify-between mt-2">
      <div className="flex gap-2">
        <Button size="icon" variant="ghost">
          <ImageIcon /> // 이미지 첨부
        </Button>
        <Button size="icon" variant="ghost">
          <EmojiIcon /> // 이모지
        </Button>
      </div>
      <Button>댓글 작성</Button>
    </div>
  </Card>
  
  // 댓글 목록 (계층형)
  <div className="space-y-2">
    <CommentItem>
      // 대댓글 들여쓰기
      <div className="ml-8">
        <CommentItem /> 
      </div>
    </CommentItem>
  </div>
</div>
```

### ✏️ 게시글 작성/수정
- **2단 레이아웃**: 
  - 왼쪽: 에디터
  - 오른쪽: 실시간 미리보기
- **에디터 기능**:
  - 툴바: 텍스트 포맷, 링크, 이미지, 코드
  - 드래그앤드롭 이미지 업로드
  - 마크다운 단축키 지원
- **하단**: 임시저장, 취소, 발행 버튼

### 🔍 검색 및 필터
```tsx
// 통합 검색 바
<div className="relative">
  <Input 
    placeholder="제목, 내용, 작성자, 태그 검색..."
    value={searchQuery}
    onChange={handleSearch} // 디바운스 300ms
  />
  <Button variant="ghost" size="icon">
    <FilterIcon /> // 고급 검색 토글
  </Button>
</div>

// 고급 검색 패널
<Collapsible open={showAdvanced}>
  <div className="grid grid-cols-2 gap-4 p-4">
    <Select label="카테고리" />
    <Select label="정렬" />
    <DatePicker label="시작일" />
    <DatePicker label="종료일" />
    <MultiSelect label="태그" />
  </div>
</Collapsible>
```

## 🔍 핵심 구현 알고리즘

### 통합 검색 알고리즘
```typescript
function searchPosts(posts: Post[], query: string, filters: Filters): Post[] {
  const normalizedQuery = query.toLowerCase();
  
  return posts.filter(post => {
    // 검색어 필터링
    if (query) {
      const searchableFields = [
        post.title,
        post.content,
        post.author.name,
        ...post.tags
      ].join(' ').toLowerCase();
      
      if (!searchableFields.includes(normalizedQuery)) {
        return false;
      }
    }
    
    // 카테고리 필터
    if (filters.category && post.category !== filters.category) {
      return false;
    }
    
    // 날짜 범위 필터
    if (filters.dateRange[0] && new Date(post.createdAt) < filters.dateRange[0]) {
      return false;
    }
    
    return true;
  });
}
```

### 이미지 뷰어 제스처 처리
```typescript
// 핀치 줌 구현
const handlePinchZoom = (e: TouchEvent) => {
  if (e.touches.length !== 2) return;
  
  const distance = Math.hypot(
    e.touches[0].pageX - e.touches[1].pageX,
    e.touches[0].pageY - e.touches[1].pageY
  );
  
  const scale = distance / initialDistance;
  setZoom(Math.max(0.5, Math.min(3, scale)));
};

// 스와이프 구현
const handleSwipe = (deltaX: number) => {
  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) prevImage();
    else nextImage();
  }
};
```

## 📊 게시판 설정 예시

```typescript
const boardConfigs: BoardConfig[] = [
  {
    id: 'notice',
    name: '공지사항',
    type: 'notice',
    description: '중요한 공지사항을 확인하세요',
    features: {
      comments: false,
      likes: false,
      attachments: true,
      images: true,
      mentions: false,
      privatePost: false,
      anonymousPost: false
    },
    permissions: {
      read: ['guest', 'user', 'member', 'moderator', 'admin'],
      write: ['admin'],
      comment: [],
      delete: ['admin'],
      moderate: ['admin'],
      uploadFile: ['admin'],
      uploadImage: ['admin']
    },
    display: {
      viewType: 'table',
      postsPerPage: 20,
      showThumbnail: false,
      showExcerpt: true,
      excerptLength: 100
    }
  },
  {
    id: 'general',
    name: '자유게시판',
    type: 'general',
    description: '자유롭게 글을 작성하고 소통하세요',
    features: {
      comments: true,
      likes: true,
      attachments: true,
      images: true,
      mentions: true,
      privatePost: false,
      anonymousPost: true
    },
    permissions: {
      read: ['guest', 'user', 'member', 'moderator', 'admin'],
      write: ['user', 'member', 'moderator', 'admin'],
      comment: ['user', 'member', 'moderator', 'admin'],
      delete: ['moderator', 'admin'],
      moderate: ['moderator', 'admin'],
      uploadFile: ['member', 'moderator', 'admin'],
      uploadImage: ['user', 'member', 'moderator', 'admin']
    },
    display: {
      viewType: 'card',
      postsPerPage: 12,
      showThumbnail: true,
      showExcerpt: true,
      excerptLength: 150
    }
  }
];
```

## ⚡ 성능 최적화

### 렌더링 최적화
```typescript
// 메모이제이션
const PostListItem = React.memo(({ post }) => {
  // 컴포넌트 구현
});

// 가상 스크롤 (대량 데이터)
import { FixedSizeList } from 'react-window';

// 이미지 최적화
const OptimizedImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Skeleton />}
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
```

### 상태 관리 최적화
```typescript
// useReducer로 복잡한 상태 관리
const boardReducer = (state: BoardState, action: BoardAction) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.payload)
      };
    default:
      return state;
  }
};
```

## 🚨 예상 이슈 및 해결 방안

1. **대량 이미지 처리**
   - 문제: 갤러리 게시판에서 이미지 로딩 지연
   - 해결: 썸네일 우선 로드, 원본은 뷰어에서만

2. **실시간 검색 부하**
   - 문제: 타이핑마다 검색 실행
   - 해결: 디바운싱 300ms, 최소 2글자 이상

3. **권한 체크 복잡도**
   - 문제: 다층 권한 체크 로직
   - 해결: 권한 체크 커스텀 훅 분리

4. **모바일 제스처 충돌**
   - 문제: 스와이프와 스크롤 충돌
   - 해결: 터치 영역 분리, 제스처 우선순위

## ✅ 완료 기준

### 기능 체크리스트
- [ ] **동적 게시판 시스템**
  - [ ] 하나의 컴포넌트로 여러 게시판 타입 표현
  - [ ] 게시판별 설정 적용
  - [ ] 컨트롤 패널 작동

- [ ] **CRUD 기능**
  - [ ] 게시글 작성 (리치 에디터, 이미지 업로드)
  - [ ] 목록 조회 (테이블/카드/갤러리 뷰)
  - [ ] 상세 보기
  - [ ] 수정 (권한 체크)
  - [ ] 삭제 (소프트 삭제)

- [ ] **이미지 시스템**
  - [ ] 이미지 업로드 및 미리보기
  - [ ] 라이트박스 뷰어
  - [ ] 핀치 줌/스와이프
  - [ ] 모바일 최적화

- [ ] **댓글 시스템**
  - [ ] 계층형 댓글
  - [ ] @멘션 기능
  - [ ] 댓글 CRUD
  - [ ] 실시간 업데이트

- [ ] **검색 및 필터**
  - [ ] 통합 검색 (제목, 내용, 작성자, 태그)
  - [ ] 고급 검색 옵션
  - [ ] 카테고리/날짜 필터
  - [ ] 검색 결과 하이라이팅

- [ ] **권한 관리**
  - [ ] 역할별 권한 체크
  - [ ] UI 권한별 표시/숨김
  - [ ] 에러 핸들링

### 품질 체크리스트
- [ ] 완벽한 반응형 (모바일/태블릿/데스크탑)
- [ ] 다크모드 완벽 지원
- [ ] 접근성 준수 (키보드 네비게이션, ARIA)
- [ ] 빌드 에러 없음
- [ ] TypeScript 타입 체크 통과
- [ ] ESLint 에러 없음

## 📅 예상 소요 시간
- **총 소요 시간**: 약 12시간
- **단계별 소요 시간**:
  1. 기본 설정: 1시간
  2. 컨트롤 패널: 1시간
  3. 게시글 목록: 1.5시간
  4. 게시글 작성/수정: 2시간
  5. 게시글 상세 및 이미지: 2시간
  6. 댓글 시스템: 2시간
  7. 검색 및 필터: 1시간
  8. 권한 관리: 1시간
  9. 테스트 및 최적화: 1시간

## 🎯 핵심 차별화 포인트

### 1. **엔터프라이즈급 게시판 시스템**
- 하나의 컴포넌트로 다양한 게시판 운영
- 세밀한 권한 관리 시스템
- 실시간 설정 변경 반영

### 2. **프로덕션 레디 품질**
- 즉시 실서비스 적용 가능
- 완벽한 에러 핸들링
- 성능 최적화 적용

### 3. **모던한 UX**
- 직관적인 인터페이스
- 부드러운 애니메이션
- 실시간 피드백

### 4. **모바일 퍼스트**
- 터치 제스처 완벽 지원
- 반응형 이미지 뷰어
- 최적화된 모바일 레이아웃

### 5. **확장 가능한 구조**
- 모듈화된 컴포넌트
- 커스터마이징 용이
- 백엔드 통합 준비

## 🔄 다음 단계 (향후 확장)

1. **백엔드 통합**
   - REST API 연동
   - 실시간 업데이트 (WebSocket)
   - 파일 업로드 서버

2. **고급 기능**
   - AI 기반 콘텐츠 추천
   - 자동 태깅
   - 스팸 필터링

3. **분석 도구**
   - 게시판 통계 대시보드
   - 사용자 활동 분석
   - 인기 콘텐츠 추적