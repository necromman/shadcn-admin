// Dummy data for library system

export interface Book {
  id: string
  isbn: string
  title: string
  author: string
  publisher: string
  publicationYear: number
  category: string
  location: string
  status: 'available' | 'borrowed' | 'reserved' | 'processing'
  coverImage: string
  description: string
  callNumber: string
  loanCount: number
  tags: string[]
}

export interface User {
  id: string
  studentId?: string
  name: string
  email: string
  university?: string
  memberType: 'student' | 'faculty' | 'external'
  status: 'active' | 'suspended'
  loanCount: number
  overdueCount: number
}

export interface Loan {
  id: string
  userId: string
  bookId: string
  book?: Book
  loanDate: Date
  dueDate: Date
  returnDate?: Date
  status: 'active' | 'returned' | 'overdue'
  renewCount: number
}

export interface Notice {
  id: string
  title: string
  content: string
  category: 'notice' | 'news' | 'event'
  author: string
  createdAt: Date
  isPinned: boolean
  viewCount: number
}

export interface SeatReservation {
  id: string
  userId: string
  seatNumber: string
  floor: number
  zone: string
  startTime: Date
  endTime: Date
  status: 'active' | 'completed' | 'cancelled'
}

// Generate dummy books
export const dummyBooks: Book[] = [
  {
    id: '1',
    isbn: '978-89-123-4567-8',
    title: '인공지능과 미래사회',
    author: '김철수',
    publisher: '미래출판사',
    publicationYear: 2024,
    category: '컴퓨터과학',
    location: '2층 일반자료실',
    status: 'available',
    coverImage: 'https://via.placeholder.com/200x300/4F46E5/ffffff?text=AI',
    description: '인공지능 기술의 발전과 미래 사회 변화를 다룬 종합 안내서',
    callNumber: '004.73 김84ㅇ',
    loanCount: 45,
    tags: ['AI', '미래학', '기술']
  },
  {
    id: '2',
    isbn: '978-89-234-5678-9',
    title: '한국 현대문학의 이해',
    author: '이영희',
    publisher: '문학동네',
    publicationYear: 2023,
    category: '문학',
    location: '2층 일반자료실',
    status: 'borrowed',
    coverImage: 'https://via.placeholder.com/200x300/10B981/ffffff?text=문학',
    description: '한국 현대문학의 흐름과 주요 작가들을 소개하는 개론서',
    callNumber: '810.9 이64ㅎ',
    loanCount: 32,
    tags: ['문학', '한국문학', '현대문학']
  },
  {
    id: '3',
    isbn: '978-89-345-6789-0',
    title: '경제학 원론',
    author: '박경제',
    publisher: '경제출판',
    publicationYear: 2024,
    category: '경제학',
    location: '3층 전문자료실',
    status: 'available',
    coverImage: 'https://via.placeholder.com/200x300/EF4444/ffffff?text=경제',
    description: '경제학의 기본 원리와 이론을 체계적으로 정리한 교과서',
    callNumber: '330 박14ㄱ',
    loanCount: 67,
    tags: ['경제학', '교과서', '입문서']
  },
  {
    id: '4',
    isbn: '978-89-456-7890-1',
    title: '빅데이터 분석 실무',
    author: '정데이터',
    publisher: '데이터북스',
    publicationYear: 2024,
    category: '컴퓨터과학',
    location: '2층 일반자료실',
    status: 'available',
    coverImage: 'https://via.placeholder.com/200x300/3B82F6/ffffff?text=빅데이터',
    description: '실무에서 활용 가능한 빅데이터 분석 기법과 사례',
    callNumber: '005.7 정24ㅂ',
    loanCount: 89,
    tags: ['빅데이터', '데이터분석', 'IT']
  },
  {
    id: '5',
    isbn: '978-89-567-8901-2',
    title: '세계사 대백과',
    author: '역사연구회',
    publisher: '역사출판',
    publicationYear: 2023,
    category: '역사',
    location: '3층 참고자료실',
    status: 'available',
    coverImage: 'https://via.placeholder.com/200x300/F59E0B/ffffff?text=역사',
    description: '고대부터 현대까지 세계 역사를 총망라한 백과사전',
    callNumber: '909 역52ㅅ',
    loanCount: 23,
    tags: ['역사', '백과사전', '참고도서']
  },
  {
    id: '6',
    isbn: '978-89-678-9012-3',
    title: '심리학 개론',
    author: '최심리',
    publisher: '마음출판',
    publicationYear: 2024,
    category: '심리학',
    location: '2층 일반자료실',
    status: 'reserved',
    coverImage: 'https://via.placeholder.com/200x300/8B5CF6/ffffff?text=심리',
    description: '인간의 마음과 행동을 이해하는 심리학 입문서',
    callNumber: '150 최52ㅅ',
    loanCount: 56,
    tags: ['심리학', '입문서', '교양']
  },
  {
    id: '7',
    isbn: '978-89-789-0123-4',
    title: '환경과 지속가능성',
    author: '녹색미래',
    publisher: '에코북',
    publicationYear: 2024,
    category: '환경학',
    location: '2층 일반자료실',
    status: 'available',
    coverImage: 'https://via.placeholder.com/200x300/10B981/ffffff?text=환경',
    description: '기후변화와 환경문제에 대한 실천적 해결방안',
    callNumber: '363.7 녹52ㅎ',
    loanCount: 34,
    tags: ['환경', '지속가능성', '기후변화']
  },
  {
    id: '8',
    isbn: '978-89-890-1234-5',
    title: '디자인 씽킹',
    author: '아트디자인',
    publisher: '디자인하우스',
    publicationYear: 2023,
    category: '디자인',
    location: '2층 일반자료실',
    status: 'available',
    coverImage: 'https://via.placeholder.com/200x300/EC4899/ffffff?text=디자인',
    description: '창의적 문제 해결을 위한 디자인 사고 방법론',
    callNumber: '745.2 아87ㄷ',
    loanCount: 78,
    tags: ['디자인', '창의성', '방법론']
  }
]

// Generate dummy notices
export const dummyNotices: Notice[] = [
  {
    id: '1',
    title: '[중요] 2024년 겨울방학 도서관 운영시간 변경 안내',
    content: '겨울방학 기간 동안 도서관 운영시간이 변경됩니다. 평일 09:00-18:00, 토요일 휴관',
    category: 'notice',
    author: '도서관 운영팀',
    createdAt: new Date('2024-01-10'),
    isPinned: true,
    viewCount: 523
  },
  {
    id: '2',
    title: '신착도서 입고 안내 (1월 2주차)',
    content: '이번 주 신착도서 150권이 입고되었습니다. 2층 신착도서 코너에서 확인하세요.',
    category: 'news',
    author: '수서팀',
    createdAt: new Date('2024-01-08'),
    isPinned: false,
    viewCount: 234
  },
  {
    id: '3',
    title: '독서 마라톤 이벤트 참가자 모집',
    content: '2024년 독서 마라톤에 참여하실 분들을 모집합니다. 완주자에게는 특별한 혜택이!',
    category: 'event',
    author: '문화행사팀',
    createdAt: new Date('2024-01-05'),
    isPinned: true,
    viewCount: 456
  },
  {
    id: '4',
    title: '전자책 플랫폼 점검 안내',
    content: '1월 15일 전자책 플랫폼 점검이 있을 예정입니다. 이용에 참고 바랍니다.',
    category: 'notice',
    author: '전산팀',
    createdAt: new Date('2024-01-03'),
    isPinned: false,
    viewCount: 189
  },
  {
    id: '5',
    title: '도서관 이용 만족도 조사',
    content: '더 나은 도서관 서비스를 위해 이용 만족도 조사를 실시합니다.',
    category: 'news',
    author: '기획팀',
    createdAt: new Date('2024-01-02'),
    isPinned: false,
    viewCount: 167
  }
]

// Generate dummy user loans
export const dummyLoans: Loan[] = [
  {
    id: '1',
    userId: 'user1',
    bookId: '2',
    book: dummyBooks[1],
    loanDate: new Date('2024-01-01'),
    dueDate: new Date('2024-01-15'),
    status: 'active',
    renewCount: 0
  },
  {
    id: '2',
    userId: 'user1',
    bookId: '4',
    book: dummyBooks[3],
    loanDate: new Date('2024-01-05'),
    dueDate: new Date('2024-01-19'),
    status: 'active',
    renewCount: 1
  },
  {
    id: '3',
    userId: 'user1',
    bookId: '6',
    book: dummyBooks[5],
    loanDate: new Date('2023-12-20'),
    dueDate: new Date('2024-01-03'),
    returnDate: new Date('2024-01-02'),
    status: 'returned',
    renewCount: 0
  }
]

// Generate seat data
export const generateSeatData = (floor: number, zone: string, totalSeats: number) => {
  const seats = []
  const occupiedRate = Math.random() * 0.7 + 0.2 // 20% ~ 90% occupied
  
  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      id: `${floor}-${zone}-${i}`,
      number: i.toString().padStart(3, '0'),
      floor,
      zone,
      status: Math.random() > occupiedRate ? 'available' : 'occupied'
    })
  }
  
  return seats
}

// Popular search keywords
export const popularKeywords = [
  '인공지능',
  '빅데이터',
  '파이썬',
  '경제학',
  '심리학',
  '한국사',
  '영어회화',
  '디자인',
  '마케팅',
  '소설'
]

// Library stats
export const libraryStats = {
  totalBooks: 7000,
  totalMembers: 2500,
  todayVisitors: 342,
  availableSeats: 85,
  totalSeats: 200,
  todayLoans: 127,
  newBooks: 45
}