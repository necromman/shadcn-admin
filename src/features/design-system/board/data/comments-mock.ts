import { type Comment } from '../types/comment.types'

// 댓글 목업 데이터
export const mockComments: Comment[] = [
  // post-1 댓글들
  {
    id: 'comment-1',
    postId: 'post-1',
    content: '새로운 게시판 시스템 정말 좋아보여요! 사용하기 편할 것 같습니다.',
    author: {
      id: 'user-1',
      name: '햇살가득',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunshine'
    },
    mentions: [],
    likes: 5,
    isLiked: false,
    children: [],
    createdAt: '2025-01-28T10:30:00Z',
    updatedAt: '2025-01-28T10:30:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    parentId: 'comment-1',
    content: '@햇살가득 동의합니다! 특히 이미지 뷰어가 기대되네요.',
    author: {
      id: 'user-2',
      name: '코딩초보',
      role: 'user'
    },
    mentions: ['햇살가득'],
    likes: 2,
    isLiked: false,
    createdAt: '2025-01-28T10:45:00Z',
    updatedAt: '2025-01-28T10:45:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-3',
    postId: 'post-1',
    content: '모바일 최적화가 되어 있다니 정말 기대됩니다!',
    author: {
      id: 'user-3',
      name: '모임왕',
      role: 'member'
    },
    mentions: [],
    likes: 3,
    isLiked: true,
    children: [],
    createdAt: '2025-01-28T11:00:00Z',
    updatedAt: '2025-01-28T11:00:00Z',
    isEdited: false,
    isDeleted: false
  },

  // post-4 댓글들
  {
    id: 'comment-4',
    postId: 'post-4',
    content: '정말 날씨가 좋네요! 저도 나가고 싶어요~',
    author: {
      id: 'user-2',
      name: '코딩초보',
      role: 'user'
    },
    mentions: [],
    likes: 1,
    isLiked: false,
    children: [],
    createdAt: '2025-01-28T08:30:00Z',
    updatedAt: '2025-01-28T08:30:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-5',
    postId: 'post-4',
    content: '사진이 정말 예쁘네요! 어디서 찍으신 건가요?',
    author: {
      id: 'user-5',
      name: '멍멍이친구',
      role: 'member'
    },
    mentions: [],
    likes: 2,
    isLiked: false,
    children: [],
    createdAt: '2025-01-28T08:45:00Z',
    updatedAt: '2025-01-28T08:45:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-6',
    postId: 'post-4',
    parentId: 'comment-5',
    content: '@멍멍이친구 집 근처 공원에서 찍었어요!',
    author: {
      id: 'user-1',
      name: '햇살가득',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunshine'
    },
    mentions: ['멍멍이친구'],
    likes: 1,
    isLiked: true,
    createdAt: '2025-01-28T09:00:00Z',
    updatedAt: '2025-01-28T09:00:00Z',
    isEdited: false,
    isDeleted: false
  },

  // post-5 댓글들
  {
    id: 'comment-7',
    postId: 'post-5',
    content: '좋은 팁 감사합니다! 특히 프로젝트 기반 학습이 정말 중요한 것 같아요.',
    author: {
      id: 'user-6',
      name: '개발입문자',
      role: 'user'
    },
    mentions: [],
    likes: 8,
    isLiked: false,
    children: [],
    createdAt: '2025-01-27T16:30:00Z',
    updatedAt: '2025-01-27T16:30:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-8',
    postId: 'post-5',
    content: '문서화 습관은 정말 중요합니다! 나중에 자신의 코드도 이해하기 어려울 때가 있더라고요.',
    author: {
      id: 'user-7',
      name: 'TS초보',
      role: 'member'
    },
    mentions: [],
    likes: 5,
    isLiked: true,
    children: [],
    createdAt: '2025-01-27T16:45:00Z',
    updatedAt: '2025-01-27T16:45:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-9',
    postId: 'post-5',
    parentId: 'comment-8',
    content: '@TS초보 맞아요! 6개월 후의 나를 위한 문서화라고 생각하면 좋더라고요.',
    author: {
      id: 'user-2',
      name: '코딩초보',
      role: 'user'
    },
    mentions: ['TS초보'],
    likes: 3,
    isLiked: false,
    createdAt: '2025-01-27T17:00:00Z',
    updatedAt: '2025-01-27T17:00:00Z',
    isEdited: false,
    isDeleted: false
  },

  // post-11 댓글들 (Q&A)
  {
    id: 'comment-10',
    postId: 'post-11',
    content: '개인적으로 React를 추천합니다! 커뮤니티가 크고 자료가 많아서 학습하기 좋아요.',
    author: {
      id: 'user-7',
      name: 'TS초보',
      role: 'member'
    },
    mentions: [],
    likes: 4,
    isLiked: false,
    children: [],
    createdAt: '2025-01-28T10:00:00Z',
    updatedAt: '2025-01-28T10:00:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-11',
    postId: 'post-11',
    content: 'Vue가 초보자에게는 더 쉬울 수 있어요. 러닝커브가 낮거든요.',
    author: {
      id: 'user-8',
      name: '커피러버',
      role: 'member'
    },
    mentions: [],
    likes: 3,
    isLiked: false,
    children: [],
    createdAt: '2025-01-28T10:15:00Z',
    updatedAt: '2025-01-28T10:15:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-12',
    postId: 'post-11',
    parentId: 'comment-10',
    content: '@TS초보 저도 React 추천합니다. 취업시장에서도 React 수요가 많아요.',
    author: {
      id: 'user-11',
      name: '팀리더',
      role: 'member'
    },
    mentions: ['TS초보'],
    likes: 2,
    isLiked: true,
    createdAt: '2025-01-28T10:30:00Z',
    updatedAt: '2025-01-28T10:30:00Z',
    isEdited: false,
    isDeleted: false
  },

  // post-9 댓글들 (갤러리)
  {
    id: 'comment-13',
    postId: 'post-9',
    content: '와 정말 멋진 사진이네요! 색감이 너무 예뻐요.',
    author: {
      id: 'user-10',
      name: '먹방러',
      role: 'member'
    },
    mentions: [],
    likes: 6,
    isLiked: false,
    children: [],
    createdAt: '2025-01-28T17:45:00Z',
    updatedAt: '2025-01-28T17:45:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-14',
    postId: 'post-9',
    content: '카메라 기종이 무엇인가요? 사진이 정말 선명하네요!',
    author: {
      id: 'user-13',
      name: '산악인',
      role: 'member'
    },
    mentions: [],
    likes: 3,
    isLiked: false,
    children: [],
    createdAt: '2025-01-28T18:00:00Z',
    updatedAt: '2025-01-28T18:00:00Z',
    isEdited: false,
    isDeleted: false
  },
  {
    id: 'comment-15',
    postId: 'post-9',
    parentId: 'comment-14',
    content: '@산악인 아이폰으로 찍었어요! 요즘 폰카도 성능이 좋더라고요.',
    author: {
      id: 'user-4',
      name: '사진러버',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=photo'
    },
    mentions: ['산악인'],
    likes: 2,
    isLiked: true,
    createdAt: '2025-01-28T18:15:00Z',
    updatedAt: '2025-01-28T18:15:00Z',
    isEdited: false,
    isDeleted: false
  },

  // 삭제된 댓글 예시
  {
    id: 'comment-16',
    postId: 'post-6',
    content: '이 댓글은 삭제되었습니다.',
    author: {
      id: 'deleted-user',
      name: '삭제된 사용자',
      role: 'user'
    },
    mentions: [],
    likes: 0,
    isLiked: false,
    children: [],
    createdAt: '2025-01-27T12:00:00Z',
    updatedAt: '2025-01-27T12:00:00Z',
    isEdited: false,
    isDeleted: true
  },

  // 수정된 댓글 예시
  {
    id: 'comment-17',
    postId: 'post-12',
    content: 'TypeScript 타입 에러는 보통 타입 정의가 맞지 않아서 발생합니다. any 타입을 사용하지 말고 정확한 타입을 지정해보세요. (수정됨)',
    author: {
      id: 'mod-1',
      name: '운영자',
      role: 'moderator'
    },
    mentions: [],
    likes: 12,
    isLiked: false,
    children: [],
    createdAt: '2025-01-27T15:30:00Z',
    updatedAt: '2025-01-27T16:00:00Z',
    isEdited: true,
    isDeleted: false
  },
  {
    id: 'comment-18',
    postId: 'post-12',
    parentId: 'comment-17',
    content: '@운영자 감사합니다! 해결했어요!',
    author: {
      id: 'user-7',
      name: 'TS초보',
      role: 'member'
    },
    mentions: ['운영자'],
    likes: 3,
    isLiked: true,
    createdAt: '2025-01-27T16:15:00Z',
    updatedAt: '2025-01-27T16:15:00Z',
    isEdited: false,
    isDeleted: false
  }
]

// 게시글별 댓글 가져오기
export const getCommentsByPostId = (postId: string): Comment[] => {
  return mockComments.filter(comment => comment.postId === postId)
}

// 계층형 댓글 구조 생성
export const buildCommentTree = (comments: Comment[]): Comment[] => {
  const commentMap = new Map<string, Comment>()
  const rootComments: Comment[] = []

  // 모든 댓글을 맵에 저장
  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, children: [] })
  })

  // 부모-자식 관계 설정
  comments.forEach(comment => {
    const mappedComment = commentMap.get(comment.id)!
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId)
      if (parent) {
        if (!parent.children) parent.children = []
        parent.children.push(mappedComment)
      }
    } else {
      rootComments.push(mappedComment)
    }
  })

  return rootComments
}

// 댓글 수 계산
export const countComments = (comments: Comment[]): number => {
  let count = 0
  const countRecursive = (commentList: Comment[]) => {
    commentList.forEach(comment => {
      if (!comment.isDeleted) count++
      if (comment.children) countRecursive(comment.children)
    })
  }
  countRecursive(comments)
  return count
}