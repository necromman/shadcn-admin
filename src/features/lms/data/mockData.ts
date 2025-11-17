// LMS 목업 데이터

export interface Course {
  id: string
  title: string
  instructor: string
  organization: string
  thumbnail: string
  rating: number
  reviewCount: number
  studentCount: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'online' | 'offline' | 'blended'
  status: 'recruiting' | 'in-progress' | 'completed'
  price: number
  discountPrice?: number
  tags: string[]
  duration: string
  startDate: string
  endDate: string
  description: string
  category: string
  progress?: number
}

export interface Notice {
  id: string
  title: string
  content: string
  date: string
  category: string
  isImportant: boolean
  viewCount: number
  author: string
}

export interface Banner {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  link: string
  backgroundColor: string
  textColor: string
}

export interface Category {
  id: string
  name: string
  icon?: string
  courseCount: number
}

// 카테고리 데이터
export const categories: Category[] = [
  { id: 'all', name: '전체', courseCount: 150 },
  { id: 'programming', name: '프로그래밍', courseCount: 45 },
  { id: 'data', name: '데이터 분석', courseCount: 32 },
  { id: 'design', name: '디자인', courseCount: 28 },
  { id: 'business', name: '비즈니스', courseCount: 25 },
  { id: 'marketing', name: '마케팅', courseCount: 20 },
]

// 배너 데이터
export const banners: Banner[] = [
  {
    id: '1',
    title: '2025 신년 특별 이벤트',
    subtitle: '새해 맞이 전 과정 30% 할인',
    description: '1월 한 달간 모든 온라인 과정을 특별 할인된 가격으로 만나보세요.',
    image: 'https://placehold.co/1920x600/3B82F6/FFFFFF/png?text=New+Year+Event',
    link: '/events/newyear2025',
    backgroundColor: 'bg-blue-600',
    textColor: 'text-white'
  },
  {
    id: '2',
    title: 'AI 프로그래밍 마스터 과정',
    subtitle: '실무 중심의 AI 개발자 양성',
    description: 'ChatGPT API부터 LangChain까지, 6개월 완성 커리큘럼',
    image: 'https://placehold.co/1920x600/8B5CF6/FFFFFF/png?text=AI+Programming',
    link: '/courses/ai-master',
    backgroundColor: 'bg-purple-600',
    textColor: 'text-white'
  },
  {
    id: '3',
    title: '취업 성공 보장 부트캠프',
    subtitle: '100% 취업 연계 프로그램',
    description: '3개월 집중 교육 후 파트너사 취업 보장',
    image: 'https://placehold.co/1920x600/10B981/FFFFFF/png?text=Bootcamp',
    link: '/bootcamp',
    backgroundColor: 'bg-green-600',
    textColor: 'text-white'
  }
]

// 인기 강좌 데이터
export const popularCourses: Course[] = [
  {
    id: 'pop1',
    title: 'React 완벽 가이드 2025',
    instructor: '김리액트',
    organization: '코드캠퍼스',
    thumbnail: 'https://placehold.co/400x225/3B82F6/FFFFFF/png?text=React',
    rating: 4.8,
    reviewCount: 1234,
    studentCount: 5678,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 99000,
    discountPrice: 69000,
    tags: ['React', 'Frontend', 'JavaScript'],
    duration: '40시간',
    startDate: '2025-02-01',
    endDate: '2025-03-31',
    description: 'React 18의 모든 것을 마스터하는 실전 중심 강의',
    category: 'programming',
    progress: 0
  },
  {
    id: 'pop2',
    title: 'Python 데이터 분석 입문',
    instructor: '박파이썬',
    organization: '데이터스쿨',
    thumbnail: 'https://placehold.co/400x225/10B981/FFFFFF/png?text=Python',
    rating: 4.9,
    reviewCount: 892,
    studentCount: 3456,
    difficulty: 'beginner',
    type: 'online',
    status: 'in-progress',
    price: 79000,
    tags: ['Python', 'Data Analysis', 'Pandas'],
    duration: '30시간',
    startDate: '2025-01-15',
    endDate: '2025-02-28',
    description: 'Python과 Pandas로 시작하는 데이터 분석의 모든 것',
    category: 'data',
    progress: 35
  },
  {
    id: 'pop3',
    title: 'UI/UX 디자인 실무',
    instructor: '이디자인',
    organization: '디자인허브',
    thumbnail: 'https://placehold.co/400x225/8B5CF6/FFFFFF/png?text=UI+UX',
    rating: 4.7,
    reviewCount: 567,
    studentCount: 2345,
    difficulty: 'intermediate',
    type: 'blended',
    status: 'recruiting',
    price: 120000,
    discountPrice: 96000,
    tags: ['UI/UX', 'Figma', 'Design System'],
    duration: '50시간',
    startDate: '2025-02-15',
    endDate: '2025-04-15',
    description: 'Figma를 활용한 실무 디자인 시스템 구축',
    category: 'design',
    progress: 0
  },
  {
    id: 'pop4',
    title: 'Spring Boot 백엔드 마스터',
    instructor: '최스프링',
    organization: '백엔드스쿨',
    thumbnail: 'https://placehold.co/400x225/F59E0B/FFFFFF/png?text=Spring',
    rating: 4.6,
    reviewCount: 432,
    studentCount: 1890,
    difficulty: 'advanced',
    type: 'online',
    status: 'in-progress',
    price: 150000,
    tags: ['Spring Boot', 'Java', 'Backend'],
    duration: '60시간',
    startDate: '2025-01-01',
    endDate: '2025-03-15',
    description: 'Spring Boot 3.0과 MSA 아키텍처 완벽 정복',
    category: 'programming',
    progress: 45
  },
  {
    id: 'pop5',
    title: '디지털 마케팅 전략',
    instructor: '강마케터',
    organization: '마케팅아카데미',
    thumbnail: 'https://placehold.co/400x225/EC4899/FFFFFF/png?text=Marketing',
    rating: 4.5,
    reviewCount: 321,
    studentCount: 1567,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 89000,
    tags: ['Marketing', 'SEO', 'SNS'],
    duration: '25시간',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    description: 'SNS와 SEO를 활용한 효과적인 디지털 마케팅',
    category: 'marketing',
    progress: 0
  }
]

// 카테고리별 과정 데이터
// 추천하는 과정
export const recommendedCourses: Course[] = [
  {
    id: 'rec1',
    title: 'TypeScript 완벽 마스터',
    instructor: '정타입',
    organization: '타입캠퍼스',
    thumbnail: 'https://placehold.co/400x225/0EA5E9/FFFFFF/png?text=TypeScript',
    rating: 4.9,
    reviewCount: 678,
    studentCount: 2890,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 89000,
    tags: ['TypeScript', 'JavaScript', 'Frontend'],
    duration: '35시간',
    startDate: '2025-02-10',
    endDate: '2025-03-20',
    description: '타입스크립트로 안전한 코드 작성하기',
    category: 'programming'
  },
  {
    id: 'rec2',
    title: 'AWS 클라우드 실무',
    instructor: '김클라우드',
    organization: '클라우드스쿨',
    thumbnail: 'https://placehold.co/400x225/6366F1/FFFFFF/png?text=AWS',
    rating: 4.8,
    reviewCount: 456,
    studentCount: 1678,
    difficulty: 'advanced',
    type: 'online',
    status: 'in-progress',
    price: 130000,
    tags: ['AWS', 'Cloud', 'DevOps'],
    duration: '45시간',
    startDate: '2025-01-20',
    endDate: '2025-03-10',
    description: 'AWS 서비스를 활용한 클라우드 아키텍처 설계',
    category: 'programming'
  },
  {
    id: 'rec3',
    title: 'Excel 데이터 분석',
    instructor: '박엑셀',
    organization: '오피스마스터',
    thumbnail: 'https://placehold.co/400x225/22C55E/FFFFFF/png?text=Excel',
    rating: 4.7,
    reviewCount: 892,
    studentCount: 4567,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 59000,
    tags: ['Excel', 'Data', 'Office'],
    duration: '20시간',
    startDate: '2025-02-05',
    endDate: '2025-02-25',
    description: '엑셀로 시작하는 비즈니스 데이터 분석',
    category: 'business'
  },
  {
    id: 'rec4',
    title: 'Vue.js 3 심화 과정',
    instructor: '이뷰어',
    organization: '프론트엔드랩',
    thumbnail: 'https://placehold.co/400x225/84CC16/FFFFFF/png?text=Vue',
    rating: 4.6,
    reviewCount: 234,
    studentCount: 987,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 95000,
    tags: ['Vue.js', 'Frontend', 'JavaScript'],
    duration: '38시간',
    startDate: '2025-02-15',
    endDate: '2025-03-30',
    description: 'Vue 3 Composition API와 실전 프로젝트',
    category: 'programming'
  }
]

// 취업 마스터 플랜: 실전 전략·스킬
export const careerMasterCourses: Course[] = [
  {
    id: 'career1',
    title: '이력서 작성과 면접 전략',
    instructor: '김커리어',
    organization: '커리어빌더',
    thumbnail: 'https://placehold.co/400x225/8B5CF6/FFFFFF/png?text=Career',
    rating: 4.8,
    reviewCount: 890,
    studentCount: 3456,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 49000,
    tags: ['취업', '이력서', '면접'],
    duration: '15시간',
    startDate: '2025-02-01',
    endDate: '2025-02-15',
    description: '취업 성공을 위한 이력서 작성법과 면접 대비',
    category: 'career'
  },
  {
    id: 'career2',
    title: '개발자 취업 완성 가이드',
    instructor: '박개발',
    organization: '테크커리어',
    thumbnail: 'https://placehold.co/400x225/3B82F6/FFFFFF/png?text=Dev+Career',
    rating: 4.9,
    reviewCount: 567,
    studentCount: 2890,
    difficulty: 'intermediate',
    type: 'blended',
    status: 'recruiting',
    price: 89000,
    tags: ['개발자', '포트폴리오', '취업'],
    duration: '30시간',
    startDate: '2025-02-10',
    endDate: '2025-03-10',
    description: '개발자 취업을 위한 포트폴리오와 코딩테스트 준비',
    category: 'career'
  },
  {
    id: 'career3',
    title: '데이터 분석가 커리어 로드맵',
    instructor: '이데이터',
    organization: '데이터커리어',
    thumbnail: 'https://placehold.co/400x225/10B981/FFFFFF/png?text=Data+Career',
    rating: 4.7,
    reviewCount: 456,
    studentCount: 1890,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 79000,
    tags: ['데이터분석', '커리어', '취업'],
    duration: '25시간',
    startDate: '2025-02-15',
    endDate: '2025-03-15',
    description: '데이터 분석가로 커리어 전환하기',
    category: 'career'
  },
  {
    id: 'career4',
    title: '스타트업 취업 성공 전략',
    instructor: '최스타트',
    organization: '스타트업스쿨',
    thumbnail: 'https://placehold.co/400x225/F59E0B/FFFFFF/png?text=Startup',
    rating: 4.6,
    reviewCount: 234,
    studentCount: 987,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 39000,
    tags: ['스타트업', '취업', '커리어'],
    duration: '10시간',
    startDate: '2025-02-20',
    endDate: '2025-02-28',
    description: '스타트업 취업을 위한 준비 가이드',
    category: 'career'
  }
]

// 새로 올라온 과정
export const newCourses: Course[] = [
  {
    id: 'new1',
    title: 'Next.js 14 풀스택 개발',
    instructor: '신넥스트',
    organization: '풀스택아카데미',
    thumbnail: 'https://placehold.co/400x225/000000/FFFFFF/png?text=Next.js',
    rating: 0,
    reviewCount: 0,
    studentCount: 45,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 110000,
    discountPrice: 88000,
    tags: ['Next.js', 'React', 'Fullstack'],
    duration: '42시간',
    startDate: '2025-03-01',
    endDate: '2025-04-30',
    description: '최신 Next.js 14로 만드는 풀스택 애플리케이션',
    category: 'programming'
  },
  {
    id: 'new2',
    title: 'ChatGPT API 활용 개발',
    instructor: '오픈AI',
    organization: 'AI스쿨',
    thumbnail: 'https://placehold.co/400x225/10B981/FFFFFF/png?text=ChatGPT',
    rating: 0,
    reviewCount: 0,
    studentCount: 78,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 125000,
    tags: ['ChatGPT', 'AI', 'API'],
    duration: '30시간',
    startDate: '2025-02-20',
    endDate: '2025-03-20',
    description: 'ChatGPT API로 만드는 AI 서비스',
    category: 'programming'
  },
  {
    id: 'new3',
    title: '파워BI 대시보드 구축',
    instructor: '데이터비즈',
    organization: 'BI아카데미',
    thumbnail: 'https://placehold.co/400x225/F59E0B/FFFFFF/png?text=PowerBI',
    rating: 0,
    reviewCount: 0,
    studentCount: 34,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 75000,
    tags: ['PowerBI', 'Dashboard', 'Data'],
    duration: '25시간',
    startDate: '2025-02-25',
    endDate: '2025-03-15',
    description: 'Power BI로 만드는 인터랙티브 대시보드',
    category: 'data'
  },
  {
    id: 'new4',
    title: 'Kubernetes 운영 실무',
    instructor: '쿠버마스터',
    organization: '데브옵스랩',
    thumbnail: 'https://placehold.co/400x225/0EA5E9/FFFFFF/png?text=K8s',
    rating: 0,
    reviewCount: 0,
    studentCount: 23,
    difficulty: 'advanced',
    type: 'online',
    status: 'recruiting',
    price: 140000,
    tags: ['Kubernetes', 'DevOps', 'Container'],
    duration: '48시간',
    startDate: '2025-03-05',
    endDate: '2025-04-20',
    description: '쿠버네티스 클러스터 구축과 운영',
    category: 'programming'
  }
]

// 메타버스로 연결된 디지털 세상
export const metaverseCourses: Course[] = [
  {
    id: 'meta1',
    title: '메타버스 플랫폼 개발 입문',
    instructor: '김메타',
    organization: '메타버스아카데미',
    thumbnail: 'https://placehold.co/400x225/8B5CF6/FFFFFF/png?text=Metaverse',
    rating: 4.7,
    reviewCount: 456,
    studentCount: 1890,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 95000,
    tags: ['메타버스', 'Unity', '3D'],
    duration: '35시간',
    startDate: '2025-02-15',
    endDate: '2025-03-30',
    description: 'Unity로 시작하는 메타버스 플랫폼 개발',
    category: 'metaverse'
  },
  {
    id: 'meta2',
    title: 'Roblox 게임 개발과 수익화',
    instructor: '박로블록스',
    organization: '게임스쿨',
    thumbnail: 'https://placehold.co/400x225/EC4899/FFFFFF/png?text=Roblox',
    rating: 4.8,
    reviewCount: 789,
    studentCount: 2345,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 79000,
    tags: ['Roblox', '게임개발', '메타버스'],
    duration: '28시간',
    startDate: '2025-02-10',
    endDate: '2025-03-20',
    description: 'Roblox 스튜디오로 게임 만들고 수익 창출하기',
    category: 'metaverse'
  },
  {
    id: 'meta3',
    title: 'VR/AR 콘텐츠 제작',
    instructor: '이가상',
    organization: 'XR스튜디오',
    thumbnail: 'https://placehold.co/400x225/06B6D4/FFFFFF/png?text=VR+AR',
    rating: 4.6,
    reviewCount: 234,
    studentCount: 987,
    difficulty: 'advanced',
    type: 'blended',
    status: 'recruiting',
    price: 120000,
    tags: ['VR', 'AR', 'XR'],
    duration: '40시간',
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    description: 'VR/AR 기술로 만드는 실감형 콘텐츠',
    category: 'metaverse'
  },
  {
    id: 'meta4',
    title: '메타버스 비즈니스 전략',
    instructor: '최전략',
    organization: '비즈니스스쿨',
    thumbnail: 'https://placehold.co/400x225/F59E0B/FFFFFF/png?text=Business',
    rating: 4.5,
    reviewCount: 345,
    studentCount: 1234,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 59000,
    tags: ['메타버스', '비즈니스', '전략'],
    duration: '20시간',
    startDate: '2025-02-20',
    endDate: '2025-03-10',
    description: '메타버스 시대의 새로운 비즈니스 기회',
    category: 'metaverse'
  }
]

// 데이터로 연결된 세상: 빅데이터
export const bigDataCourses: Course[] = [
  {
    id: 'data1',
    title: '빅데이터 분석 기초',
    instructor: '김데이터',
    organization: '데이터사이언스랩',
    thumbnail: 'https://placehold.co/400x225/3B82F6/FFFFFF/png?text=BigData',
    rating: 4.8,
    reviewCount: 890,
    studentCount: 3456,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 85000,
    tags: ['빅데이터', 'Python', 'SQL'],
    duration: '32시간',
    startDate: '2025-02-05',
    endDate: '2025-03-15',
    description: 'Python과 SQL로 시작하는 빅데이터 분석',
    category: 'data'
  },
  {
    id: 'data2',
    title: 'Spark 실시간 데이터 처리',
    instructor: '이스파크',
    organization: '빅데이터캠퍼스',
    thumbnail: 'https://placehold.co/400x225/F97316/FFFFFF/png?text=Spark',
    rating: 4.7,
    reviewCount: 567,
    studentCount: 1890,
    difficulty: 'advanced',
    type: 'online',
    status: 'recruiting',
    price: 110000,
    tags: ['Spark', 'Hadoop', '실시간처리'],
    duration: '45시간',
    startDate: '2025-02-15',
    endDate: '2025-04-01',
    description: 'Apache Spark로 대용량 데이터 실시간 처리',
    category: 'data'
  },
  {
    id: 'data3',
    title: '데이터 시각화 마스터',
    instructor: '박비주얼',
    organization: '비주얼라이제이션랩',
    thumbnail: 'https://placehold.co/400x225/10B981/FFFFFF/png?text=DataViz',
    rating: 4.9,
    reviewCount: 678,
    studentCount: 2890,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 75000,
    tags: ['Tableau', 'PowerBI', '시각화'],
    duration: '28시간',
    startDate: '2025-02-10',
    endDate: '2025-03-10',
    description: 'Tableau와 Power BI로 만드는 인사이트풀한 대시보드',
    category: 'data'
  },
  {
    id: 'data4',
    title: '데이터 엔지니어링 부트캠프',
    instructor: '최엔지니어',
    organization: '데이터엔지니어링스쿨',
    thumbnail: 'https://placehold.co/400x225/6366F1/FFFFFF/png?text=DataEng',
    rating: 4.8,
    reviewCount: 456,
    studentCount: 1567,
    difficulty: 'intermediate',
    type: 'blended',
    status: 'recruiting',
    price: 130000,
    tags: ['데이터파이프라인', 'ETL', 'Airflow'],
    duration: '50시간',
    startDate: '2025-03-01',
    endDate: '2025-04-30',
    description: '데이터 파이프라인 구축과 운영',
    category: 'data'
  }
]

// 쉽고 재미있게 배우는 AI
export const aiCourses: Course[] = [
  {
    id: 'ai1',
    title: 'AI 첫걸음: 누구나 쉽게',
    instructor: '김인공',
    organization: 'AI입문스쿨',
    thumbnail: 'https://placehold.co/400x225/8B5CF6/FFFFFF/png?text=AI+Basic',
    rating: 4.9,
    reviewCount: 1234,
    studentCount: 5678,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 49000,
    tags: ['AI기초', '머신러닝', '인공지능'],
    duration: '20시간',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    description: '코딩 없이 이해하는 AI의 모든 것',
    category: 'ai'
  },
  {
    id: 'ai2',
    title: '딥러닝 실전 프로젝트',
    instructor: '박딥러닝',
    organization: 'DL아카데미',
    thumbnail: 'https://placehold.co/400x225/EC4899/FFFFFF/png?text=DeepLearning',
    rating: 4.8,
    reviewCount: 890,
    studentCount: 3456,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 95000,
    tags: ['딥러닝', 'TensorFlow', 'PyTorch'],
    duration: '40시간',
    startDate: '2025-02-10',
    endDate: '2025-03-30',
    description: 'TensorFlow와 PyTorch로 구현하는 실전 딥러닝',
    category: 'ai'
  },
  {
    id: 'ai3',
    title: 'ChatGPT 활용 마스터',
    instructor: '이챗봇',
    organization: 'GPT스쿨',
    thumbnail: 'https://placehold.co/400x225/10B981/FFFFFF/png?text=ChatGPT',
    rating: 4.7,
    reviewCount: 567,
    studentCount: 2890,
    difficulty: 'beginner',
    type: 'online',
    status: 'recruiting',
    price: 39000,
    tags: ['ChatGPT', 'Prompt', 'AI활용'],
    duration: '15시간',
    startDate: '2025-02-05',
    endDate: '2025-02-20',
    description: 'ChatGPT 프롬프트 엔지니어링과 실무 활용',
    category: 'ai'
  },
  {
    id: 'ai4',
    title: '컴퓨터 비전 입문',
    instructor: '최비전',
    organization: '비전AI랩',
    thumbnail: 'https://placehold.co/400x225/F59E0B/FFFFFF/png?text=Computer+Vision',
    rating: 4.6,
    reviewCount: 345,
    studentCount: 1234,
    difficulty: 'intermediate',
    type: 'online',
    status: 'recruiting',
    price: 89000,
    tags: ['컴퓨터비전', 'OpenCV', '이미지처리'],
    duration: '35시간',
    startDate: '2025-02-15',
    endDate: '2025-03-25',
    description: 'OpenCV로 배우는 컴퓨터 비전과 이미지 처리',
    category: 'ai'
  }
]

// 공지사항 데이터
export const notices: Notice[] = [
  {
    id: 'notice1',
    title: '[중요] 2025년 1월 정기 시스템 점검 안내',
    content: '더 나은 서비스 제공을 위해 시스템 점검을 실시합니다. 점검 시간 동안 서비스 이용이 제한될 수 있습니다.',
    date: '2025-01-10',
    category: '시스템',
    isImportant: true,
    viewCount: 1234,
    author: '시스템 관리자'
  },
  {
    id: 'notice2',
    title: '신규 과정 오픈 안내 - AI 프로그래밍 마스터 과정',
    content: '2025년 최신 AI 기술을 학습할 수 있는 마스터 과정이 오픈되었습니다.',
    date: '2025-01-08',
    category: '과정안내',
    isImportant: false,
    viewCount: 567,
    author: '교육운영팀'
  },
  {
    id: 'notice3',
    title: '수료증 발급 시스템 개선 안내',
    content: '수료증 발급 시스템이 개선되어 더욱 빠르고 편리하게 이용하실 수 있습니다.',
    date: '2025-01-05',
    category: '기능개선',
    isImportant: false,
    viewCount: 432,
    author: '시스템 관리자'
  },
  {
    id: 'notice4',
    title: '[이벤트] 신년 맞이 전 과정 30% 할인',
    content: '2025년 새해를 맞아 1월 한 달간 모든 온라인 과정을 30% 할인된 가격으로 제공합니다.',
    date: '2025-01-01',
    category: '이벤트',
    isImportant: true,
    viewCount: 2345,
    author: '마케팅팀'
  },
  {
    id: 'notice5',
    title: '모바일 앱 업데이트 v2.5.0 출시',
    content: '새로운 기능이 추가된 모바일 앱이 출시되었습니다. 지금 업데이트하세요.',
    date: '2024-12-28',
    category: '업데이트',
    isImportant: false,
    viewCount: 789,
    author: '개발팀'
  }
]

// 통계 데이터
export const statistics = {
  totalStudents: 128456,
  totalCourses: 1842,
  totalInstructors: 342,
  completionRate: 87.5,
  satisfactionRate: 4.7
}

// 학습 카테고리별 과정 수
export const coursesCountByCategory = {
  programming: 45,
  data: 32,
  design: 28,
  business: 25,
  marketing: 20
}