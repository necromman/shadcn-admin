export interface MenuItem {
  id: string
  title: string
  path?: string
  children?: MenuItem[]
  depth?: number
}

export const introMenuItems: MenuItem[] = [
  {
    id: 'about',
    title: '기술원소개',
    children: [
      { id: 'greeting', title: '인사말', path: '/about/greeting' },
      {
        id: 'history',
        title: '일반현황',
        children: [
          { id: 'purpose', title: '설립목적 및 주요기능', path: '/about/history/purpose' },
          { id: 'vision', title: '비전 및 목표', path: '/about/history/vision' },
          { id: 'facility', title: '시설현황', path: '/about/history/facility' },
        ]
      },
      { id: 'achievement', title: '주요사업 및 성과', path: '/about/achievement' },
      { id: 'ci', title: 'CI소개', path: '/about/ci' },
      { id: 'talent', title: '인재상', path: '/about/talent' },
      { id: 'ethics', title: '윤리헌장', path: '/about/ethics' },
      {
        id: 'org',
        title: '조직 및 직원',
        children: [
          { id: 'chart', title: '조직도', path: '/about/org/chart' },
          { id: 'staff', title: '직원검색', path: '/about/org/staff' },
        ]
      },
      { id: 'location', title: '찾아오시는길', path: '/about/location' },
    ],
  },
  {
    id: 'tech',
    title: '기술소개',
    children: [
      {
        id: 'process',
        title: '공정기술',
        children: [
          { id: 'module', title: '모듈공정기술', path: '/tech/process/module' },
          { id: 'thin-film', title: '박막기술', path: '/tech/process/thin-film' },
          { id: 'etching', title: '식각기술', path: '/tech/process/etching' },
          { id: 'patterning', title: '패터닝기술', path: '/tech/process/patterning' },
          { id: 'post', title: '후공정기술', path: '/tech/process/post' },
          { id: 'epi', title: '에피기술', path: '/tech/process/epi' },
        ]
      },
      { id: 'analysis', title: '시험분석기술', path: '/tech/analysis' },
      { id: 'device', title: '소자기술', path: '/tech/device' },
    ],
  },
  {
    id: 'service',
    title: '서비스안내',
    children: [
      {
        id: 'fab',
        title: '팹서비스',
        children: [
          { id: 'overview', title: '팹서비스 종합안내', path: '/service/fab/overview' },
          { id: 'info', title: '서비스 안내', path: '/service/fab/info' },
          { id: 'tour', title: '팹 투어 안내', path: '/service/fab/tour' },
          { id: 'equipment', title: '장비안내', path: '/service/fab/equipment' },
        ]
      },
      { id: 'education', title: '교육서비스', path: '/service/education' },
      {
        id: 'rental',
        title: '임대서비스',
        children: [
          { id: 'guide', title: '입주안내', path: '/service/rental/guide' },
          { id: 'building', title: '건물현황', path: '/service/rental/building' },
          { id: 'companies', title: '입주기업', path: '/service/rental/companies' },
        ]
      },
      {
        id: 'venue',
        title: '대관안내',
        children: [
          { id: 'cleanroom', title: '클린룸 공간 사용', path: '/service/venue/cleanroom' },
        ]
      },
    ],
  },
  {
    id: 'notice',
    title: '공지 및 안내',
    children: [
      { id: 'notice', title: '공지사항', path: '/notice/list' },
      {
        id: 'announcement',
        title: '공고',
        children: [
          { id: 'bidding', title: '입찰공고', path: '/notice/announcement/bidding' },
          { id: 'recruitment', title: '채용공고', path: '/notice/announcement/recruitment' },
          { id: 'family', title: '친인척 채용정보 공개', path: '/notice/announcement/family' },
        ]
      },
      { id: 'law', title: '법령자료', path: '/notice/law' },
    ],
  },
  {
    id: 'support',
    title: '기업지원안내',
    children: [
      { id: 'status', title: '기업지원 현황', path: '/support/status' },
      {
        id: 'intro',
        title: '기업지원 소개',
        children: [
          {
            id: 'single-creator',
            title: '1인 창조기업 지원센터',
            children: [
              { id: 'biz-intro', title: '사업 소개', path: '/support/intro/single-creator/intro' },
              { id: 'companies', title: '참여기업 현황', path: '/support/intro/single-creator/companies' },
            ]
          },
          {
            id: 'nano-sme',
            title: '나노 중소기업 지원사업',
            children: [
              { id: 'biz-intro', title: '사업 소개', path: '/support/intro/nano-sme/intro' },
              { id: 'companies', title: '참여기업 현황', path: '/support/intro/nano-sme/companies' },
            ]
          },
        ]
      },
      {
        id: 'ended',
        title: '종료된 사업',
        children: [
          { id: 'platform', title: '나노 공동연구 플랫폼', path: '/support/ended/platform' },
          { id: 'certification', title: '나노 소자 신뢰성인증', path: '/support/ended/certification' },
        ]
      },
      {
        id: 'event',
        title: '행사 안내',
        children: [
          { id: 'conference', title: '기술교류회 및 발표회', path: '/support/event/conference' },
          { id: 'nanokorea', title: '행사안내(나노코리아)', path: '/support/event/nanokorea' },
        ]
      },
      {
        id: 'transfer',
        title: '기술 이전',
        children: [
          { id: 'guide', title: '기술 이전 지원 안내', path: '/support/transfer/guide' },
          { id: 'patent', title: '기술원 보유 특허 안내', path: '/support/transfer/patent' },
        ]
      },
      {
        id: 'commercialization',
        title: '기술 사업화 및 후속지원',
        children: [
          { id: 'overview', title: '사업개요 및 지원내용', path: '/support/commercialization/overview' },
        ]
      },
    ],
  },
  {
    id: 'activity',
    title: 'KANC 활동',
    children: [
      { id: 'news', title: 'KANC 소식', path: '/activity/news' },
      { id: 'events', title: '관련 행사 안내', path: '/activity/events' },
      { id: 'council', title: '이용자 협의회', path: '/activity/council' },
    ],
  },
  {
    id: 'environment',
    title: '환경안전',
    children: [
      { id: 'message', title: '원장메세지', path: '/environment/message' },
      { id: 'policy', title: '환경안전방침', path: '/environment/policy' },
      { id: 'system', title: '환경안전 운영 시스템', path: '/environment/system' },
      { id: 'green', title: '녹색지킴이 활동 및 성과', path: '/environment/green' },
    ],
  },
  {
    id: 'disclosure',
    title: '정보공개',
    children: [
      {
        id: 'system',
        title: '정보공개제도안내',
        children: [
          { id: 'what', title: '정보공개제도란', path: '/disclosure/system/what' },
          { id: 'law', title: '법령자료', path: '/disclosure/system/law' },
          { id: 'process', title: '정보공개처리절차', path: '/disclosure/system/process' },
          { id: 'target', title: '공개대상기관', path: '/disclosure/system/target' },
          { id: 'method', title: '정보공개방법', path: '/disclosure/system/method' },
          { id: 'obligation', title: '공공기관의무', path: '/disclosure/system/obligation' },
          { id: 'appeal', title: '불복구제절차방법', path: '/disclosure/system/appeal' },
          { id: 'fee', title: '수수료안내', path: '/disclosure/system/fee' },
          { id: 'private', title: '비공개정보', path: '/disclosure/system/private' },
        ]
      },
      { id: 'real-name', title: '사업실명제', path: '/disclosure/real-name' },
      { id: 'pre-disclosure', title: '사전정보공개', path: '/disclosure/pre' },
      { id: 'open-data', title: '공공데이터 개방', path: '/disclosure/open-data' },
      { id: 'management', title: '경영공시', path: '/disclosure/management' },
      { id: 'expense', title: '업무추진비', path: '/disclosure/expense' },
      { id: 'request', title: '정보공개청구', path: '/disclosure/request' },
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