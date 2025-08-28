import { type BoardConfig } from '../types/board.types'

// 게시판 설정 데이터
export const boardConfigs: BoardConfig[] = [
  {
    id: 'board_notice',
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
      itemsPerPage: 20,
      sortBy: 'latest' as const,
      showThumbnail: false,
      showExcerpt: true,
      excerptLength: 100,
      paginationType: 'pagination',
      infiniteScrollThreshold: 200,
      tableDensity: 'normal'
    }
  },
  {
    id: 'board_general',
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
      itemsPerPage: 12,
      sortBy: 'latest' as const,
      showThumbnail: true,
      showExcerpt: true,
      excerptLength: 150,
      paginationType: 'pagination',
      infiniteScrollThreshold: 200,
      tableDensity: 'normal'
    }
  },
  {
    id: 'board_faq',
    name: 'FAQ',
    type: 'faq',
    description: '자주 묻는 질문과 답변',
    features: {
      comments: false,
      likes: true,
      attachments: false,
      images: true,
      mentions: false,
      privatePost: false,
      anonymousPost: false
    },
    permissions: {
      read: ['guest', 'user', 'member', 'moderator', 'admin'],
      write: ['moderator', 'admin'],
      comment: [],
      delete: ['admin'],
      moderate: ['moderator', 'admin'],
      uploadFile: [],
      uploadImage: ['moderator', 'admin']
    },
    display: {
      viewType: 'list',
      postsPerPage: 15,
      itemsPerPage: 15,
      sortBy: 'latest' as const,
      showThumbnail: false,
      showExcerpt: true,
      excerptLength: 200,
      paginationType: 'pagination',
      infiniteScrollThreshold: 200,
      tableDensity: 'normal'
    }
  },
  {
    id: 'board_gallery',
    name: '갤러리',
    type: 'gallery',
    description: '이미지와 함께하는 게시판',
    features: {
      comments: true,
      likes: true,
      attachments: false,
      images: true,
      mentions: true,
      privatePost: false,
      anonymousPost: false
    },
    permissions: {
      read: ['guest', 'user', 'member', 'moderator', 'admin'],
      write: ['member', 'moderator', 'admin'],
      comment: ['user', 'member', 'moderator', 'admin'],
      delete: ['moderator', 'admin'],
      moderate: ['moderator', 'admin'],
      uploadFile: [],
      uploadImage: ['member', 'moderator', 'admin']
    },
    display: {
      viewType: 'gallery',
      postsPerPage: 24,
      itemsPerPage: 24,
      sortBy: 'popular' as const,
      showThumbnail: true,
      showExcerpt: false,
      excerptLength: 0,
      paginationType: 'pagination',
      infiniteScrollThreshold: 200,
      tableDensity: 'normal'
    }
  },
  {
    id: 'board_qna',
    name: 'Q&A',
    type: 'qna',
    description: '질문과 답변 게시판',
    features: {
      comments: true,
      likes: true,
      attachments: true,
      images: true,
      mentions: true,
      privatePost: true,
      anonymousPost: false
    },
    permissions: {
      read: ['user', 'member', 'moderator', 'admin'],
      write: ['user', 'member', 'moderator', 'admin'],
      comment: ['member', 'moderator', 'admin'],
      delete: ['moderator', 'admin'],
      moderate: ['moderator', 'admin'],
      uploadFile: ['member', 'moderator', 'admin'],
      uploadImage: ['user', 'member', 'moderator', 'admin']
    },
    display: {
      viewType: 'table',
      postsPerPage: 20,
      itemsPerPage: 20,
      sortBy: 'latest' as const,
      showThumbnail: false,
      showExcerpt: true,
      excerptLength: 120,
      paginationType: 'pagination',
      infiniteScrollThreshold: 200,
      tableDensity: 'normal'
    }
  }
]

// 기본 게시판 설정
export const defaultBoardConfig = boardConfigs[0]

// ID로 게시판 설정 찾기
export const getBoardConfigById = (id: string): BoardConfig | undefined => {
  return boardConfigs.find(config => config.id === id)
}

// 타입으로 게시판 설정 찾기
export const getBoardConfigByType = (type: BoardConfig['type']): BoardConfig | undefined => {
  return boardConfigs.find(config => config.type === type)
}

// boardType 문자열로 게시판 설정 찾기 (board.$type 라우트용)
export const getBoardConfigByBoardType = (boardType: string): BoardConfig | undefined => {
  const typeMapping: Record<string, string> = {
    'notice': 'board_notice',
    'general': 'board_general',  // 'free' -> 'general'로 수정
    'free': 'board_general',     // 호환성을 위해 둘 다 지원
    'faq': 'board_faq',
    'gallery': 'board_gallery',
    'qna': 'board_qna'
  }
  
  const boardId = typeMapping[boardType]
  return boardId ? getBoardConfigById(boardId) : undefined
}