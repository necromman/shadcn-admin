export interface Institution {
  id: string
  name: string
  slug: string
  theme: {
    primaryColor: string
    secondaryColor: string
  }
  contact: {
    address: string
    phone: string
    email: string
  }
  description: string
  mission: string
  vision: string
  services: Service[]
  equipment: Equipment[]
  notices: Notice[]
  archives: Archive[]
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
}

export interface Equipment {
  id: string
  name: string
  category: string
  description: string
  specs: string[]
  availability: string
  image?: string
  pricePerHour?: number
}

export interface Notice {
  id: string
  title: string
  content: string
  category: string
  isPinned: boolean
  createdAt: string
  author: string
}

export interface Archive {
  id: string
  title: string
  description: string
  category: string
  fileSize: string
  downloadUrl: string
  createdAt: string
}

export const mockInstitutions: Institution[] = [
  {
    id: 'inst-001',
    name: '서울 디지털 제작소',
    slug: 'seoul-digital-fab',
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF'
    },
    contact: {
      address: '서울특별시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      email: 'contact@seoul-fab.kr'
    },
    description: '서울 디지털 제작소는 메이커들을 위한 창작 공간으로, 3D 프린터, 레이저 커터 등 다양한 디지털 제작 장비를 제공합니다.',
    mission: '시민 누구나 아이디어를 현실로 만들 수 있는 창작 문화 확산',
    vision: '대한민국 대표 메이커 스페이스로 자리매김',
    services: [
      {
        id: 'srv-001',
        name: '장비 예약',
        description: '3D 프린터, 레이저 커터 등 장비 사용 예약',
        icon: 'Calendar'
      },
      {
        id: 'srv-002',
        name: '교육 프로그램',
        description: '디지털 제작 기초부터 고급 과정까지',
        icon: 'GraduationCap'
      },
      {
        id: 'srv-003',
        name: '기술 상담',
        description: '전문가와 1:1 프로젝트 상담',
        icon: 'MessageSquare'
      },
      {
        id: 'srv-004',
        name: '공간 대관',
        description: '워크샵, 세미나를 위한 공간 대여',
        icon: 'Building'
      }
    ],
    equipment: [
      {
        id: 'eq-001',
        name: 'Ultimaker S5 Pro',
        category: '3D 프린터',
        description: '대형 출력이 가능한 전문가용 3D 프린터',
        specs: ['출력 크기: 330 x 240 x 300mm', '레이어 해상도: 20 microns', '듀얼 익스트루더'],
        availability: '평일 09:00-18:00',
        pricePerHour: 15000
      },
      {
        id: 'eq-002',
        name: 'Trotec Speedy 400',
        category: '레이저 커터',
        description: '다양한 재료를 정밀하게 가공할 수 있는 CO2 레이저',
        specs: ['작업 영역: 1000 x 610mm', '레이저 출력: 120W', '최대 속도: 3.55m/s'],
        availability: '평일 09:00-18:00',
        pricePerHour: 25000
      },
      {
        id: 'eq-003',
        name: 'Roland MDX-50',
        category: 'CNC 밀링',
        description: '정밀 가공이 가능한 데스크톱 CNC',
        specs: ['작업 영역: 400 x 305 x 135mm', '스핀들 속도: 4,500-15,000 rpm', '자동 툴 체인저'],
        availability: '평일 09:00-18:00',
        pricePerHour: 20000
      }
    ],
    notices: [
      {
        id: 'notice-001',
        title: '2025년 1월 장비 교육 일정 안내',
        content: '1월 장비 교육 프로그램 일정을 안내드립니다. 3D 프린터 기초 교육은 매주 화요일, 레이저 커터 교육은 매주 목요일에 진행됩니다.',
        category: '교육',
        isPinned: true,
        createdAt: '2025-01-10',
        author: '관리자'
      },
      {
        id: 'notice-002',
        title: '설 연휴 운영 시간 변경 안내',
        content: '설 연휴 기간(1월 28일~30일) 동안 휴관합니다. 1월 31일부터 정상 운영됩니다.',
        category: '운영',
        isPinned: true,
        createdAt: '2025-01-08',
        author: '관리자'
      },
      {
        id: 'notice-003',
        title: '신규 장비 도입 안내 - 레진 3D 프린터',
        content: '고정밀 출력이 가능한 레진 3D 프린터가 새로 도입되었습니다. 사용 교육은 사전 예약 필수입니다.',
        category: '장비',
        isPinned: false,
        createdAt: '2025-01-05',
        author: '관리자'
      }
    ],
    archives: [
      {
        id: 'arch-001',
        title: '3D 프린터 사용 매뉴얼',
        description: 'Ultimaker S5 Pro 상세 사용 설명서',
        category: '매뉴얼',
        fileSize: '15.2MB',
        downloadUrl: '/files/ultimaker-manual.pdf',
        createdAt: '2025-01-01'
      },
      {
        id: 'arch-002',
        title: '레이저 커터 안전 수칙',
        description: '레이저 커터 사용 시 반드시 지켜야 할 안전 수칙',
        category: '안전',
        fileSize: '2.5MB',
        downloadUrl: '/files/laser-safety.pdf',
        createdAt: '2024-12-28'
      }
    ]
  },
  {
    id: 'inst-002',
    name: '부산 메이커 스페이스',
    slug: 'busan-maker-space',
    theme: {
      primaryColor: '#10B981',
      secondaryColor: '#059669'
    },
    contact: {
      address: '부산광역시 해운대구 센텀중앙로 78',
      phone: '051-9876-5432',
      email: 'info@busan-maker.kr'
    },
    description: '부산 메이커 스페이스는 창의적인 아이디어를 실현할 수 있는 열린 제작 공간입니다.',
    mission: '메이커 문화 확산을 통한 지역 혁신 생태계 구축',
    vision: '동남권 최고의 메이커 커뮤니티 허브',
    services: [
      {
        id: 'srv-005',
        name: '시제품 제작',
        description: '아이디어를 실제 제품으로 구현',
        icon: 'Package'
      },
      {
        id: 'srv-006',
        name: '창업 컨설팅',
        description: '메이커 창업을 위한 전문 컨설팅',
        icon: 'Lightbulb'
      },
      {
        id: 'srv-007',
        name: '네트워킹 이벤트',
        description: '메이커들의 교류와 협업 기회 제공',
        icon: 'Users'
      }
    ],
    equipment: [
      {
        id: 'eq-004',
        name: 'Formlabs Form 3',
        category: '레진 3D 프린터',
        description: 'SLA 방식의 고정밀 3D 프린터',
        specs: ['출력 크기: 145 x 145 x 185mm', '레이어 해상도: 25 microns', 'WiFi 연결 지원'],
        availability: '평일 10:00-19:00',
        pricePerHour: 18000
      },
      {
        id: 'eq-005',
        name: 'Epilog Fusion Pro',
        category: '레이저 조각기',
        description: '금속 마킹이 가능한 파이버 레이저',
        specs: ['작업 영역: 1219 x 914mm', '레이저 출력: 80W', 'IRIS 카메라 시스템'],
        availability: '평일 10:00-19:00',
        pricePerHour: 30000
      }
    ],
    notices: [
      {
        id: 'notice-004',
        title: '메이커 페어 부산 2025 참가자 모집',
        content: '올해 메이커 페어에 참가할 메이커를 모집합니다. 신청 기간은 1월 31일까지입니다.',
        category: '이벤트',
        isPinned: true,
        createdAt: '2025-01-11',
        author: '관리자'
      },
      {
        id: 'notice-005',
        title: '2월 워크샵 일정 공개',
        content: 'Arduino 기초, 3D 모델링, PCB 설계 워크샵이 준비되어 있습니다.',
        category: '교육',
        isPinned: false,
        createdAt: '2025-01-09',
        author: '관리자'
      }
    ],
    archives: [
      {
        id: 'arch-003',
        title: '메이커 스페이스 이용 가이드',
        description: '처음 방문하시는 분들을 위한 종합 가이드',
        category: '가이드',
        fileSize: '8.7MB',
        downloadUrl: '/files/user-guide.pdf',
        createdAt: '2025-01-02'
      }
    ]
  },
  {
    id: 'inst-003',
    name: '대전 창작 공방',
    slug: 'daejeon-creative-lab',
    theme: {
      primaryColor: '#F59E0B',
      secondaryColor: '#D97706'
    },
    contact: {
      address: '대전광역시 유성구 대덕대로 480',
      phone: '042-3333-4444',
      email: 'hello@daejeon-lab.kr'
    },
    description: '대전 창작 공방은 과학도시 대전의 창의적 메이커들을 위한 혁신 공간입니다.',
    mission: '과학기술과 창의성의 융합을 통한 혁신 창출',
    vision: '중부권 메이커 혁신의 중심',
    services: [
      {
        id: 'srv-008',
        name: '연구개발 지원',
        description: 'R&D 프로젝트를 위한 장비 및 공간 지원',
        icon: 'Microscope'
      },
      {
        id: 'srv-009',
        name: '특허 상담',
        description: '아이디어 보호를 위한 지식재산권 상담',
        icon: 'Shield'
      }
    ],
    equipment: [
      {
        id: 'eq-006',
        name: 'Stratasys J750',
        category: '풀컬러 3D 프린터',
        description: '50만 가지 이상의 색상 구현이 가능한 PolyJet 3D 프린터',
        specs: ['출력 크기: 490 x 390 x 200mm', '6가지 재료 동시 출력', 'Pantone 색상 매칭'],
        availability: '평일 09:00-17:00',
        pricePerHour: 50000
      }
    ],
    notices: [
      {
        id: 'notice-006',
        title: '혁신 프로젝트 공모전 개최',
        content: '우수 프로젝트에는 최대 500만원의 지원금이 제공됩니다.',
        category: '공모',
        isPinned: true,
        createdAt: '2025-01-12',
        author: '관리자'
      }
    ],
    archives: [
      {
        id: 'arch-004',
        title: '2024년 우수 프로젝트 사례집',
        description: '작년 한 해 진행된 우수 메이커 프로젝트 모음',
        category: '사례집',
        fileSize: '25.3MB',
        downloadUrl: '/files/best-projects-2024.pdf',
        createdAt: '2025-01-03'
      }
    ]
  }
]

export const getInstitutionBySlug = (slug: string): Institution | undefined => {
  return mockInstitutions.find(inst => inst.slug === slug)
}

export const getInstitutionById = (id: string): Institution | undefined => {
  return mockInstitutions.find(inst => inst.id === id)
}