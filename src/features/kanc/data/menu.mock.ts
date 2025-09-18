export interface MenuItem {
  id: string
  title: string
  path?: string
  children?: MenuItem[]
}

export const introMenuItems: MenuItem[] = [
  {
    id: 'about',
    title: '기술원 소개',
    children: [
      { id: 'greeting', title: '인사말', path: '/about/greeting' },
      { id: 'history', title: '일반현황', path: '/about/history' },
      { id: 'achievement', title: '주요사업 및 성과', path: '/about/achievement' },
      { id: 'ci', title: 'CI소개', path: '/about/ci' },
      { id: 'talent', title: '인재상', path: '/about/talent' },
      { id: 'ethics', title: '윤리헌장', path: '/about/ethics' },
      { id: 'safety', title: '안전보건경영', path: '/about/safety' },
      { id: 'org', title: '조직 및 직원', path: '/about/org' },
      { id: 'location', title: '찾아오시는길', path: '/about/location' },
    ],
  },
  {
    id: 'tech',
    title: '기술소개',
    children: [
      { id: 'process', title: '공정기술', path: '/tech/process' },
      { id: 'epi', title: '에피기술', path: '/tech/epi' },
      { id: 'analysis', title: '시험분석기술', path: '/tech/analysis' },
      { id: 'device', title: '소자기술', path: '/tech/device' },
    ],
  },
  {
    id: 'service',
    title: '서비스 안내',
    children: [
      { id: 'fab', title: '팹서비스', path: '/service/fab' },
      { id: 'equipment', title: '장비안내', path: '/service/equipment' },
      { id: 'education', title: '교육서비스', path: '/service/education' },
      { id: 'rental', title: '임대서비스', path: '/service/rental' },
    ],
  },
  {
    id: 'notice',
    title: '공지 및 안내',
    children: [
      { id: 'notice', title: '공지사항', path: '/notice/list' },
      { id: 'announcement', title: '공고', path: '/notice/announcement' },
      { id: 'law', title: '법령자료', path: '/notice/law' },
    ],
  },
  {
    id: 'support',
    title: '기업지원 안내',
    children: [
      { id: 'status', title: '기업지원 현황', path: '/support/status' },
      { id: 'intro', title: '기업지원 소개', path: '/support/intro' },
      { id: 'event', title: '행사 안내', path: '/support/event' },
      { id: 'transfer', title: '기술 이전', path: '/support/transfer' },
      { id: 'commercialization', title: '기술 사업화', path: '/support/commercialization' },
    ],
  },
  {
    id: 'activity',
    title: 'KANC 활동',
    children: [
      { id: 'news', title: 'KANC소식', path: '/activity/news' },
      { id: 'events', title: '관련 행사 안내', path: '/activity/events' },
      { id: 'council', title: '이용자 협의회', path: '/activity/council' },
      { id: 'environment', title: '환경안전', path: '/activity/environment' },
    ],
  },
  {
    id: 'disclosure',
    title: '정보공개',
    children: [
      { id: 'system', title: '정보공개제도안내', path: '/disclosure/system' },
      { id: 'real-name', title: '사업실명제', path: '/disclosure/real-name' },
      { id: 'pre-disclosure', title: '사전정보공개', path: '/disclosure/pre' },
      { id: 'open-data', title: '공공데이터 개방', path: '/disclosure/open-data' },
      { id: 'management', title: '경영공시', path: '/disclosure/management' },
    ],
  },
]

export const serviceMenuItems: MenuItem[] = [
  {
    id: 'analysis',
    title: '시험분석서비스',
    children: [
      { id: 'intro', title: '서비스 소개', path: '/service-portal/analysis/intro' },
      { id: 'equipment', title: '분석장비 안내', path: '/service-portal/analysis/equipment' },
      { id: 'process', title: '이용절차', path: '/service-portal/analysis/process' },
      { id: 'fee', title: '이용요금', path: '/service-portal/analysis/fee' },
    ],
  },
  {
    id: 'education',
    title: '교육서비스',
    children: [
      { id: 'program', title: '교육프로그램', path: '/service-portal/education/program' },
      { id: 'schedule', title: '교육일정', path: '/service-portal/education/schedule' },
      { id: 'apply', title: '교육신청', path: '/service-portal/education/apply' },
      { id: 'materials', title: '교육자료실', path: '/service-portal/education/materials' },
    ],
  },
  {
    id: 'fab',
    title: '팹서비스 종합안내',
    children: [
      { id: 'intro', title: '팹서비스 소개', path: '/service-portal/fab/intro' },
      { id: 'facility', title: '시설 안내', path: '/service-portal/fab/facility' },
      { id: 'process', title: '이용절차', path: '/service-portal/fab/process' },
      { id: 'tour', title: '팹 투어', path: '/service-portal/fab/tour' },
    ],
  },
  {
    id: 'reservation',
    title: '온라인 예약',
    children: [
      { id: 'equipment', title: '장비 예약', path: '/service-portal/reservation/equipment' },
      { id: 'space', title: '공간 예약', path: '/service-portal/reservation/space' },
      { id: 'consulting', title: '기술상담 예약', path: '/service-portal/reservation/consulting' },
      { id: 'my', title: '나의 예약현황', path: '/service-portal/reservation/my' },
    ],
  },
  {
    id: 'customer',
    title: '고객서비스',
    children: [
      { id: 'faq', title: 'FAQ', path: '/service-portal/customer/faq' },
      { id: 'qna', title: 'Q&A', path: '/service-portal/customer/qna' },
      { id: 'download', title: '자료실', path: '/service-portal/customer/download' },
      { id: 'contact', title: '문의하기', path: '/service-portal/customer/contact' },
    ],
  },
]

export function getMenuItems(variant: 'intro' | 'service'): MenuItem[] {
  return variant === 'intro' ? introMenuItems : serviceMenuItems
}