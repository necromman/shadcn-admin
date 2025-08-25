export type CategoryType = 
  | 'announcement-bar'  // 헤더 위 공지/광고 바
  | 'header'            // 헤더/네비게이션
  | 'hero'              // 히어로 섹션
  | 'notice-preview'    // 공지사항 미리보기
  | 'board-preview'     // 게시판 미리보기
  | 'content'           // 일반 컨텐츠
  | 'business'          // 비즈니스 솔루션
  | 'portfolio'         // 포트폴리오/쇼케이스
  | 'auth'              // 인증 관련
  | 'components'        // UI 컴포넌트 라이브러리
  | 'footer'            // 푸터

export interface CategoryConfig {
  id: CategoryType
  title: string
  description: string
  order: number
  enabled: boolean
  movable: boolean  // 순서 변경 가능 여부
  fullWidth?: boolean
  component?: React.ComponentType
  placeholder?: string
}

export interface CategoryManagerState {
  categories: CategoryConfig[]
  expandedCategories: Set<string>
}

// 기본 카테고리 설정
export const DEFAULT_CATEGORIES: CategoryConfig[] = [
  {
    id: 'announcement-bar',
    title: '공지/광고 바',
    description: '헤더 상단에 표시되는 공지사항 또는 프로모션 배너',
    order: 1,
    enabled: true,
    movable: false,
    fullWidth: true,
    placeholder: '공지사항 바 영역'
  },
  {
    id: 'header',
    title: '헤더 & 네비게이션',
    description: '사이트 헤더 및 메인 네비게이션 메뉴',
    order: 2,
    enabled: true,
    movable: false,
    fullWidth: true
  },
  {
    id: 'hero',
    title: '히어로 섹션',
    description: '메인 비주얼 및 핵심 메시지 전달 영역',
    order: 3,
    enabled: true,
    movable: false,
    fullWidth: true
  },
  {
    id: 'notice-preview',
    title: '공지사항 미리보기',
    description: '최신 공지사항 요약 표시',
    order: 4,
    enabled: true,
    movable: true,
    placeholder: '공지사항 미리보기 영역'
  },
  {
    id: 'board-preview',
    title: '게시판 미리보기',
    description: '주요 게시판 콘텐츠 미리보기',
    order: 5,
    enabled: true,
    movable: true,
    placeholder: '게시판 미리보기 영역'
  },
  {
    id: 'business',
    title: '비즈니스 솔루션',
    description: '서비스, 가격, 팀, 추천사 등 비즈니스 카드',
    order: 6,
    enabled: true,
    movable: true
  },
  {
    id: 'portfolio',
    title: '포트폴리오 & 쇼케이스',
    description: '작업물, 프로젝트, 파트너사 소개',
    order: 7,
    enabled: true,
    movable: true
  },
  {
    id: 'content',
    title: '일반 컨텐츠',
    description: '기타 컨텐츠 섹션',
    order: 8,
    enabled: true,
    movable: true,
    placeholder: '일반 컨텐츠 영역'
  },
  {
    id: 'auth',
    title: '인증 카드',
    description: '로그인, 회원가입 폼',
    order: 9,
    enabled: true,
    movable: true
  },
  {
    id: 'components',
    title: 'UI 컴포넌트',
    description: '버튼, 폼, 모달 등 UI 컴포넌트 라이브러리',
    order: 10,
    enabled: true,
    movable: true
  },
  {
    id: 'footer',
    title: '푸터',
    description: '사이트 하단 정보 및 링크',
    order: 11,
    enabled: true,
    movable: false,
    fullWidth: true
  }
]