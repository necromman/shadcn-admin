import { type Post } from '../types/board.types'

// 날짜 생성 함수
const getRandomDate = (daysAgo: number = 30) => {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  return date.toISOString()
}

// 공지사항 데이터 생성 (30개)
const generateNoticeData = (): Post[] => {
  const noticeTopics = [
    { title: '🚨 [긴급] 서비스 점검 안내', priority: 'urgent' },
    { title: '📌 [중요] 개인정보 처리방침 개정 안내', priority: 'important' },
    { title: '🎉 새로운 기능 업데이트 소식', priority: 'normal' },
    { title: '📢 커뮤니티 이용규칙 변경사항', priority: 'important' },
    { title: '🔧 시스템 정기 점검 일정', priority: 'normal' },
    { title: '💡 서비스 이용 팁 모음', priority: 'normal' },
    { title: '⚠️ [긴급] 보안 업데이트 필수 적용 안내', priority: 'urgent' },
    { title: '🏆 이달의 우수 회원 발표', priority: 'normal' },
    { title: '📊 2025년 1분기 서비스 개선 계획', priority: 'important' },
    { title: '🎁 신규 회원 이벤트 안내', priority: 'normal' },
  ]

  const notices: Post[] = []
  
  for (let i = 1; i <= 30; i++) {
    const topic = noticeTopics[i % noticeTopics.length]
    const isPinned = i <= 3 // 처음 3개는 고정
    const isUrgent = topic.priority === 'urgent'
    const isImportant = topic.priority === 'important'
    
    notices.push({
      id: `notice-${i}`,
      boardId: 'board_notice',
      title: `${topic.title} (${i}차 공지)`,
      content: `
        <h3>안녕하세요, BRAND 회원 여러분</h3>
        <p>본 공지사항은 ${topic.title}에 대한 내용입니다.</p>
        <h4>주요 내용</h4>
        <ul>
          <li>변경 사항 1: 서비스 개선 관련 내용</li>
          <li>변경 사항 2: 사용자 편의성 증대</li>
          <li>변경 사항 3: 시스템 안정성 강화</li>
        </ul>
        <p>자세한 내용은 고객센터를 통해 문의 주시기 바랍니다.</p>
        <p>감사합니다.</p>
      `,
      contentType: 'html',
      author: {
        id: 'admin-1',
        name: '시스템 관리자',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      },
      tags: isUrgent ? ['긴급', '필독'] : isImportant ? ['중요', '공지'] : ['공지', '안내'],
      images: [],
      attachments: i % 5 === 0 ? [
        { id: `file-${i}`, name: '첨부파일.pdf', size: 1024000, type: 'application/pdf' }
      ] : [],
      metadata: {
        views: Math.floor(Math.random() * 3000) + 500,
        likes: Math.floor(Math.random() * 50),
        commentsCount: 0, // 공지사항은 댓글 비활성화
        isLiked: false
      },
      status: 'published',
      isPinned,
      isLocked: true, // 공지사항은 댓글 잠금
      isPrivate: false,
      isNew: i <= 2,
      createdAt: getRandomDate(i === 1 ? 1 : 30),
      updatedAt: getRandomDate(i === 1 ? 1 : 30)
    })
  }
  
  return notices
}

// 자유게시판 데이터 생성 (30개)
const generateGeneralData = (): Post[] => {
  const categories = ['일상', '유머', '정보', '취미', '기타']
  const generalTopics = [
    '오늘 날씨가 정말 좋네요',
    '맛집 추천 부탁드립니다',
    '재미있는 유머 모음',
    '유용한 생활 팁 공유',
    '주말에 뭐하시나요?',
    '최근에 본 영화 추천',
    '운동 같이 하실 분',
    '프로그래밍 공부 방법',
    '반려동물 자랑하기',
    '여행 다녀왔습니다'
  ]

  const userNames = ['김철수', '이영희', '박민수', '정수진', '최동훈', '강미나', '조현우', '윤서연', '임재현', '한지민']
  
  const posts: Post[] = []
  
  for (let i = 1; i <= 30; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const topic = generalTopics[i % generalTopics.length]
    const userName = userNames[Math.floor(Math.random() * userNames.length)]
    const views = Math.floor(Math.random() * 2000)
    const likes = Math.floor(Math.random() * 100)
    const comments = Math.floor(Math.random() * 50)
    const isPopular = views > 1000 || likes > 50 || comments > 20
    
    posts.push({
      id: `general-${i}`,
      boardId: 'board_general',
      title: `[${category}] ${topic} ${i}`,
      content: `
        <p>안녕하세요! ${userName}입니다.</p>
        <p>${topic}에 대한 이야기를 나누고 싶어서 글을 올립니다.</p>
        <p>여러분의 의견이 궁금해요. 댓글로 많은 이야기 나눠주세요!</p>
        <p>오늘도 좋은 하루 되세요 😊</p>
      `,
      contentType: 'html',
      author: {
        id: `user-${i}`,
        name: userName,
        role: i % 10 === 0 ? 'moderator' : 'member',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
      },
      tags: [category, isPopular ? '인기글' : '일반'],
      images: i % 3 === 0 ? [
        {
          id: `img-${i}`,
          url: `https://picsum.photos/seed/${i}/800/600`,
          thumbnailUrl: `https://picsum.photos/seed/${i}/400/300`,
          alt: '게시글 이미지'
        }
      ] : [],
      attachments: [],
      metadata: {
        views,
        likes,
        commentsCount: comments,
        isLiked: Math.random() > 0.7
      },
      status: 'published',
      isPinned: false,
      isLocked: false,
      isPrivate: i % 15 === 0, // 가끔 비공개 글
      isNew: i <= 3,
      createdAt: getRandomDate(30),
      updatedAt: getRandomDate(20)
    })
  }
  
  return posts
}

// FAQ 데이터 생성 (30개)
const generateFAQData = (): Post[] => {
  const faqCategories = ['서비스', '결제', '계정', '기술', '기타']
  const faqQuestions = [
    '비밀번호를 잊어버렸어요',
    '회원가입은 어떻게 하나요?',
    '결제 방법을 변경하고 싶어요',
    '서비스 이용 요금은 얼마인가요?',
    '계정 삭제는 어떻게 하나요?',
    '파일 업로드 제한은 얼마나 되나요?',
    '모바일 앱은 언제 출시되나요?',
    '다크모드 설정은 어디서 하나요?',
    '알림 설정을 변경하고 싶어요',
    '포인트는 어떻게 사용하나요?'
  ]

  const posts: Post[] = []
  
  for (let i = 1; i <= 30; i++) {
    const category = faqCategories[i % faqCategories.length]
    const question = faqQuestions[i % faqQuestions.length]
    
    posts.push({
      id: `faq-${i}`,
      boardId: 'board_faq',
      title: `[${category}] ${question}`,
      content: `
        <h4>질문</h4>
        <p>${question}</p>
        <h4>답변</h4>
        <p>안녕하세요. BRAND 고객센터입니다.</p>
        <p>문의 주신 내용에 대한 답변입니다:</p>
        <ol>
          <li>먼저 설정 페이지로 이동합니다</li>
          <li>해당 메뉴를 선택합니다</li>
          <li>원하는 옵션을 변경합니다</li>
          <li>저장 버튼을 클릭합니다</li>
        </ol>
        <p>추가 문의사항이 있으시면 고객센터로 연락 주세요.</p>
      `,
      contentType: 'html',
      author: {
        id: 'support-1',
        name: '고객지원팀',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=support'
      },
      tags: [category, 'FAQ'],
      images: [],
      attachments: [],
      metadata: {
        views: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 30),
        commentsCount: 0, // FAQ는 댓글 비활성화
        isLiked: false,
        helpfulCount: Math.floor(Math.random() * 100),
        notHelpfulCount: Math.floor(Math.random() * 10)
      },
      status: 'published',
      isPinned: i <= 5, // 상위 5개 고정
      isLocked: true,
      isPrivate: false,
      isNew: false,
      createdAt: getRandomDate(60),
      updatedAt: getRandomDate(30)
    })
  }
  
  return posts
}

// 갤러리 데이터 생성 (30개)
const generateGalleryData = (): Post[] => {
  const galleryCategories = ['사진', '일러스트', '디자인', '아트']
  const galleryTitles = [
    '오늘의 풍경',
    '창작 일러스트',
    'UI/UX 디자인 포트폴리오',
    '디지털 아트워크',
    '여행 사진 모음',
    '캐릭터 디자인',
    '웹 디자인 작업',
    '수채화 작품',
    '도시 야경',
    '자연 풍경 사진'
  ]

  const artistNames = ['김아트', '이디자인', '박창작', '정예술', '최포토']
  
  const posts: Post[] = []
  
  for (let i = 1; i <= 30; i++) {
    const category = galleryCategories[i % galleryCategories.length]
    const title = galleryTitles[i % galleryTitles.length]
    const artistName = artistNames[i % artistNames.length]
    const imageCount = Math.floor(Math.random() * 5) + 1
    
    const images = []
    for (let j = 0; j < imageCount; j++) {
      images.push({
        id: `gallery-img-${i}-${j}`,
        url: `https://picsum.photos/seed/${i}${j}/1200/900`,
        thumbnailUrl: `https://picsum.photos/seed/${i}${j}/400/300`,
        alt: `${title} ${j + 1}`
      })
    }
    
    posts.push({
      id: `gallery-${i}`,
      boardId: 'board_gallery',
      title: `${title} #${i}`,
      content: `
        <p>${category} 작품입니다.</p>
        <p>사용 도구: Adobe Photoshop, Illustrator</p>
        <p>작업 기간: 3일</p>
        <p>피드백 환영합니다!</p>
      `,
      contentType: 'html',
      author: {
        id: `artist-${i}`,
        name: artistName,
        role: 'member',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${artistName}`
      },
      tags: [category, '포트폴리오', '창작'],
      images,
      attachments: [],
      metadata: {
        views: Math.floor(Math.random() * 3000) + 200,
        likes: Math.floor(Math.random() * 200) + 10,
        commentsCount: Math.floor(Math.random() * 30),
        isLiked: Math.random() > 0.5,
        downloadCount: Math.floor(Math.random() * 50)
      },
      status: 'published',
      isPinned: false,
      isLocked: false,
      isPrivate: false,
      isNew: i <= 5,
      createdAt: getRandomDate(30),
      updatedAt: getRandomDate(20)
    })
  }
  
  return posts
}

// Q&A 데이터 생성 (30개)
const generateQnAData = (): Post[] => {
  const qnaTopics = [
    '프로그래밍 관련 질문',
    '디자인 툴 사용법',
    '서버 설정 문제',
    '데이터베이스 쿼리 질문',
    'React 컴포넌트 에러',
    'CSS 레이아웃 문제',
    'API 연동 관련',
    '배포 과정 질문',
    '성능 최적화 방법',
    '보안 관련 이슈'
  ]

  const posts: Post[] = []
  
  for (let i = 1; i <= 30; i++) {
    const topic = qnaTopics[i % qnaTopics.length]
    const status = i <= 10 ? 'resolved' : i <= 20 ? 'in-progress' : 'waiting'
    const hasAnswer = status !== 'waiting'
    
    posts.push({
      id: `qna-${i}`,
      boardId: 'board_qna',
      title: `[${status === 'resolved' ? '해결됨' : status === 'in-progress' ? '진행중' : '대기'}] ${topic} 도와주세요!`,
      content: `
        <h4>질문 내용</h4>
        <p>${topic}에 대해 문제가 발생했습니다.</p>
        <pre><code>
// 예제 코드
function example() {
  // 여기서 에러가 발생합니다
  return null;
}
        </code></pre>
        <p>위 코드에서 문제가 무엇인지 모르겠습니다.</p>
        ${hasAnswer ? `
        <hr>
        <h4>답변</h4>
        <p>안녕하세요! 문제를 확인해보니...</p>
        <p>다음과 같이 수정하시면 됩니다:</p>
        <pre><code>
// 수정된 코드
function example() {
  // 올바른 구현
  return true;
}
        </code></pre>
        ` : ''}
      `,
      contentType: 'html',
      author: {
        id: `qna-user-${i}`,
        name: `질문자${i}`,
        role: 'member',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=qna${i}`
      },
      tags: ['질문', topic.split(' ')[0], status],
      images: [],
      attachments: [],
      metadata: {
        views: Math.floor(Math.random() * 1000) + 50,
        likes: Math.floor(Math.random() * 20),
        commentsCount: hasAnswer ? Math.floor(Math.random() * 10) + 1 : 0,
        isLiked: false,
        answerCount: hasAnswer ? Math.floor(Math.random() * 3) + 1 : 0,
        bounty: i % 5 === 0 ? 500 : 0
      },
      status: 'published',
      isPinned: false,
      isLocked: status === 'resolved',
      isPrivate: false,
      isNew: i <= 3,
      createdAt: getRandomDate(15),
      updatedAt: getRandomDate(10)
    })
  }
  
  return posts
}

// 전체 mock 데이터 결합
export const mockPosts: Post[] = [
  ...generateNoticeData(),
  ...generateGeneralData(),
  ...generateFAQData(),
  ...generateGalleryData(),
  ...generateQnAData()
]

// 게시판별로 필터링된 데이터 제공
export const getPostsByBoardId = (boardId: string): Post[] => {
  return mockPosts.filter(post => post.boardId === boardId)
}

// 페이지네이션된 데이터 제공
export const getPaginatedPosts = (
  boardId: string,
  page: number = 1,
  pageSize: number = 10
): { posts: Post[], totalPages: number, totalCount: number } => {
  const filteredPosts = getPostsByBoardId(boardId)
  const totalCount = filteredPosts.length
  const totalPages = Math.ceil(totalCount / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    posts: filteredPosts.slice(startIndex, endIndex),
    totalPages,
    totalCount
  }
}