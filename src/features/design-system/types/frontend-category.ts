export type CategoryType = 
  | 'announcement-bar'  // 헤더 위 공지/광고 바
  | 'header'            // 헤더/네비게이션
  | 'carousel'          // 메인 캐러셀
  | 'search'            // 통합 검색
  | 'hero'              // 히어로 섹션
  | 'notice-preview'    // 공지사항 미리보기
  | 'content'           // 일반 컨텐츠
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
    title: '프리 헤더',
    description: '헤더 상단에 표시되는 공지사항 또는 프로모션 배너',
    order: 1,
    enabled: true,
    movable: false,
    fullWidth: true,
    placeholder: '공지사항 바 영역'
  },
  {
    id: 'header',
    title: '헤더',
    description: '사이트 헤더 및 메인 네비게이션 메뉴',
    order: 2,
    enabled: true,
    movable: false,
    fullWidth: true
  },
  {
    id: 'carousel',
    title: '메인 캐러셀',
    description: '프로모션 및 주요 콘텐츠를 보여주는 이미지 슬라이더',
    order: 3,
    enabled: true,
    movable: false,
    fullWidth: true
  },
  {
    id: 'search',
    title: '통합 검색',
    description: '카테고리별 통합 검색 시스템',
    order: 4,
    enabled: true,
    movable: false,
    fullWidth: false
  },
  {
    id: 'hero',
    title: '히어로 섹션',
    description: '메인 비주얼 및 핵심 메시지 전달 영역',
    order: 5,
    enabled: true,
    movable: false,
    fullWidth: true
  },
  {
    id: 'notice-preview',
    title: '최신소식 미리보기',
    description: '최신 소식과 게시판 업데이트 요약 표시',
    order: 6,
    enabled: true,
    movable: true,
    placeholder: '최신소식 미리보기 영역'
  },
  {
    id: 'portfolio',
    title: '쇼케이스',
    description: '파트너사 및 스폰서 소개',
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
    id: 'footer',
    title: '푸터',
    description: '사이트 하단 정보 및 링크',
    order: 10,
    enabled: true,
    movable: false,
    fullWidth: true
  },
  {
    id: 'components',
    title: 'UI 컴포넌트',
    description: '버튼, 폼, 모달 등 UI 컴포넌트 라이브러리',
    order: 11,
    enabled: true,
    movable: true
  }
]