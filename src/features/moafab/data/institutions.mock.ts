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
  specialties: string[]
  establishedDate: string
  isNew?: boolean
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
  nameEn?: string
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
    name: '한국나노융합기술원',
    slug: 'korea-nano-convergence',
    theme: {
      primaryColor: '#6366F1',
      secondaryColor: '#4F46E5'
    },
    contact: {
      address: '전라북도 전주시 덕진구 반룡로 110',
      phone: '063-219-0000',
      email: 'info@nnfc.kr'
    },
    description: '나노기술 기반 융합연구 및 산업지원을 수행하는 국가 나노인프라 기관입니다.',
    mission: '나노기술 산업화를 통한 국가 경쟁력 강화',
    vision: '글로벌 나노융합기술 허브',
    specialties: ['나노소자', '반도체공정', 'MEMS', '나노바이오'],
    establishedDate: '2009-01-01',
    services: [
      {
        id: 'srv-001',
        name: '공정 서비스',
        description: '반도체 8인치 공정 라인 활용 소자 제작',
        icon: 'Cpu'
      },
      {
        id: 'srv-002',
        name: '분석 서비스',
        description: '고분해능 전자현미경 및 표면분석',
        icon: 'Microscope'
      },
      {
        id: 'srv-003',
        name: '기술 컨설팅',
        description: '공정 설계 및 최적화 컨설팅',
        icon: 'MessageSquare'
      },
      {
        id: 'srv-004',
        name: '교육 프로그램',
        description: '반도체 공정 및 나노기술 전문교육',
        icon: 'GraduationCap'
      }
    ],
    equipment: [
      {
        id: 'eq-001',
        name: '고분해능 투과전자현미경',
        nameEn: 'HR-TEM (JEM-2100F)',
        category: '분석장비',
        description: '원자 수준의 미세구조 분석이 가능한 고성능 투과전자현미경',
        specs: ['가속전압: 200kV', '분해능: 0.19nm', 'EDS/EELS 분석 가능'],
        availability: '평일 09:00-18:00',
        pricePerHour: 150000
      },
      {
        id: 'eq-002',
        name: '전자빔 리소그래피 시스템',
        nameEn: 'E-Beam Lithography System',
        category: '리소그래피',
        description: '나노 패턴 제작용 고정밀 전자빔 노광 장비',
        specs: ['최소 선폭: 10nm', '가속전압: 100kV', '6인치 웨이퍼 호환'],
        availability: '평일 09:00-18:00',
        pricePerHour: 200000
      },
      {
        id: 'eq-003',
        name: '원자층 증착 장비',
        nameEn: 'ALD (Atomic Layer Deposition)',
        category: '증착장비',
        description: '원자층 단위의 정밀한 박막 증착 장비',
        specs: ['공정온도: 50-400°C', '8인치 웨이퍼', '다중 프리커서 시스템'],
        availability: '평일 09:00-18:00',
        pricePerHour: 100000
      },
      {
        id: 'eq-004',
        name: '플라즈마 식각 장비',
        nameEn: 'ICP-RIE',
        category: '식각장비',
        description: '고밀도 플라즈마를 이용한 정밀 식각 장비',
        specs: ['RF Power: 3000W', 'ICP Power: 2000W', '8인치 웨이퍼'],
        availability: '평일 09:00-18:00',
        pricePerHour: 120000
      }
    ],
    notices: [
      {
        id: 'notice-001',
        title: '2025년 상반기 장비 이용 교육 일정',
        content: '전자현미경, 리소그래피 장비 사용자 교육을 매월 첫째, 셋째 주 화요일에 진행합니다.',
        category: '교육',
        isPinned: true,
        createdAt: '2025-01-10',
        author: '교육팀'
      },
      {
        id: 'notice-002',
        title: '클린룸 출입 절차 변경 안내',
        content: '보안 강화를 위해 2월 1일부터 클린룸 출입 절차가 변경됩니다.',
        category: '공지',
        isPinned: true,
        createdAt: '2025-01-08',
        author: '시설관리팀'
      }
    ],
    archives: [
      {
        id: 'arch-001',
        title: '반도체 공정 기초 교육자료',
        description: '8대 공정 기초 이론 및 실습 가이드',
        category: '교육자료',
        fileSize: '45.2MB',
        downloadUrl: '/files/semiconductor-process.pdf',
        createdAt: '2025-01-01'
      }
    ]
  },
  {
    id: 'inst-002',
    name: '서울반도체연구센터',
    slug: 'seoul-semiconductor',
    theme: {
      primaryColor: '#DC2626',
      secondaryColor: '#B91C1C'
    },
    contact: {
      address: '서울특별시 관악구 관악로 1',
      phone: '02-880-7000',
      email: 'contact@ssrc.kr'
    },
    description: '차세대 반도체 소자 연구 및 공정 개발을 지원하는 연구 센터입니다.',
    mission: '반도체 기술 혁신을 통한 산업 경쟁력 제고',
    vision: '세계 최고 수준의 반도체 연구 인프라',
    specialties: ['반도체공정', '소자개발', '공정통합', '신소재'],
    establishedDate: '2015-03-01',
    services: [
      {
        id: 'srv-005',
        name: '웨이퍼 공정',
        description: '4/6/8인치 웨이퍼 전공정 서비스',
        icon: 'Circle'
      },
      {
        id: 'srv-006',
        name: '소자 특성 평가',
        description: '전기적/물리적 특성 분석',
        icon: 'Activity'
      },
      {
        id: 'srv-007',
        name: '공정 최적화',
        description: 'DOE 기반 공정 조건 최적화',
        icon: 'Settings'
      }
    ],
    equipment: [
      {
        id: 'eq-005',
        name: 'I-Line 스테퍼',
        nameEn: 'I-Line Stepper',
        category: '리소그래피',
        description: '365nm 파장의 고정밀 노광 장비',
        specs: ['해상도: 0.35μm', '8인치 웨이퍼', '오버레이: ±25nm'],
        availability: '평일 09:00-18:00',
        pricePerHour: 250000
      },
      {
        id: 'eq-006',
        name: '스퍼터링 시스템',
        nameEn: 'Multi-chamber Sputter',
        category: '증착장비',
        description: '다중 타겟 마그네트론 스퍼터링 시스템',
        specs: ['8인치 웨이퍼', '5개 타겟', '진공도: 1e-8 Torr'],
        availability: '평일 09:00-18:00',
        pricePerHour: 150000
      }
    ],
    notices: [
      {
        id: 'notice-003',
        title: '신규 Deep-UV 노광기 도입',
        content: '248nm DUV 노광기가 2월부터 서비스를 시작합니다.',
        category: '장비',
        isPinned: false,
        createdAt: '2025-01-11',
        author: '장비운영팀'
      }
    ],
    archives: [
      {
        id: 'arch-002',
        title: '포토리소그래피 공정 매뉴얼',
        description: '노광 공정 상세 절차 및 트러블슈팅',
        category: '매뉴얼',
        fileSize: '12.8MB',
        downloadUrl: '/files/lithography-manual.pdf',
        createdAt: '2025-01-05'
      }
    ]
  },
  {
    id: 'inst-003',
    name: '대전나노팹센터',
    slug: 'daejeon-nanofab',
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#047857'
    },
    contact: {
      address: '대전광역시 유성구 대학로 291',
      phone: '042-350-2000',
      email: 'info@dnfc.kr'
    },
    description: '나노소자 제작 및 MEMS 공정을 지원하는 국가 나노팹 시설입니다.',
    mission: '나노기술 상용화 지원을 통한 신산업 창출',
    vision: '나노소자 제작의 메카',
    specialties: ['MEMS', '나노소자', '센서', '광소자'],
    establishedDate: '2012-06-01',
    isNew: false,
    services: [
      {
        id: 'srv-008',
        name: 'MEMS 공정',
        description: 'MEMS 소자 설계 및 제작',
        icon: 'Chip'
      },
      {
        id: 'srv-009',
        name: '패키징 서비스',
        description: '와이어본딩, 다이본딩',
        icon: 'Package'
      }
    ],
    equipment: [
      {
        id: 'eq-007',
        name: 'PECVD 시스템',
        nameEn: 'PECVD System',
        category: '증착장비',
        description: '플라즈마 화학기상증착 장비',
        specs: ['공정온도: 100-400°C', 'SiO2, Si3N4, a-Si', '8인치'],
        availability: '평일 09:00-18:00',
        pricePerHour: 120000
      },
      {
        id: 'eq-008',
        name: '주사전자현미경',
        nameEn: 'FE-SEM',
        category: '분석장비',
        description: '고분해능 전계방출 주사전자현미경',
        specs: ['분해능: 1.0nm', '가속전압: 0.5-30kV', 'EDS 분석'],
        availability: '평일 09:00-18:00',
        pricePerHour: 100000
      }
    ],
    notices: [],
    archives: []
  },
  {
    id: 'inst-004',
    name: '경기반도체지원센터',
    slug: 'gyeonggi-semiconductor',
    theme: {
      primaryColor: '#7C3AED',
      secondaryColor: '#6D28D9'
    },
    contact: {
      address: '경기도 수원시 영통구 광교로 109',
      phone: '031-888-9000',
      email: 'support@gssc.kr'
    },
    description: '반도체 테스트 및 신뢰성 평가 전문 지원 센터입니다.',
    mission: '반도체 품질 혁신과 신뢰성 확보',
    vision: '글로벌 반도체 테스트 허브',
    specialties: ['신뢰성평가', '전기특성', '패키지테스트', '불량분석'],
    establishedDate: '2018-09-01',
    isNew: false,
    services: [
      {
        id: 'srv-010',
        name: '신뢰성 평가',
        description: 'JEDEC 규격 신뢰성 테스트',
        icon: 'Shield'
      },
      {
        id: 'srv-011',
        name: '불량 분석',
        description: 'FIB, TEM을 활용한 불량 분석',
        icon: 'Search'
      }
    ],
    equipment: [
      {
        id: 'eq-009',
        name: '집속이온빔 장비',
        nameEn: 'FIB (Focused Ion Beam)',
        category: '분석장비',
        description: '나노스케일 가공 및 단면 분석용 FIB',
        specs: ['Ga 이온빔', '최대 가속전압: 30kV', 'TEM 시편 제작'],
        availability: '평일 09:00-18:00',
        pricePerHour: 180000
      },
      {
        id: 'eq-010',
        name: '프로브 스테이션',
        nameEn: 'Probe Station',
        category: '측정장비',
        description: '웨이퍼 레벨 전기특성 측정 장비',
        specs: ['300mm 웨이퍼', '고온/저온 측정', 'RF 프로브'],
        availability: '평일 09:00-18:00',
        pricePerHour: 80000
      }
    ],
    notices: [],
    archives: []
  },
  {
    id: 'inst-005',
    name: '부산전자소재연구소',
    slug: 'busan-electronic-materials',
    theme: {
      primaryColor: '#0891B2',
      secondaryColor: '#0E7490'
    },
    contact: {
      address: '부산광역시 강서구 과학산단로 333',
      phone: '051-974-5000',
      email: 'info@bemi.kr'
    },
    description: '전자소재 분석 및 차세대 소재 개발을 지원하는 연구소입니다.',
    mission: '혁신적 전자소재 개발로 미래 산업 선도',
    vision: '전자소재 R&D 글로벌 리더',
    specialties: ['전자소재', '유기반도체', '2D소재', '에너지소재'],
    establishedDate: '2016-04-01',
    isNew: false,
    services: [
      {
        id: 'srv-012',
        name: '소재 분석',
        description: 'XPS, XRD, Raman 분광 분석',
        icon: 'Atom'
      },
      {
        id: 'srv-013',
        name: '박막 증착',
        description: '유기/무기 박막 증착 서비스',
        icon: 'Layers'
      }
    ],
    equipment: [
      {
        id: 'eq-011',
        name: 'X선 광전자 분광기',
        nameEn: 'XPS',
        category: '분석장비',
        description: '표면 화학 조성 및 결합 상태 분석',
        specs: ['단색 Al Kα X선원', '에너지 분해능: 0.45eV', 'Ar 이온건'],
        availability: '평일 09:00-18:00',
        pricePerHour: 120000
      },
      {
        id: 'eq-012',
        name: '라만 분광기',
        nameEn: 'Raman Spectroscopy',
        category: '분석장비',
        description: '분자 진동 및 결정 구조 분석',
        specs: ['레이저: 532nm, 633nm, 785nm', '공간분해능: 1μm', '매핑 기능'],
        availability: '평일 09:00-18:00',
        pricePerHour: 80000
      }
    ],
    notices: [
      {
        id: 'notice-004',
        title: '그래핀 합성 서비스 오픈',
        content: 'CVD 방식의 대면적 그래핀 합성 서비스를 시작합니다.',
        category: '서비스',
        isPinned: false,
        createdAt: '2025-01-09',
        author: '소재개발팀'
      }
    ],
    archives: []
  },
  {
    id: 'inst-006',
    name: '광주포토닉스센터',
    slug: 'gwangju-photonics',
    theme: {
      primaryColor: '#EA580C',
      secondaryColor: '#DC2626'
    },
    contact: {
      address: '광주광역시 북구 첨단과기로 123',
      phone: '062-605-9000',
      email: 'info@gpc.kr'
    },
    description: '광학 및 포토닉스 소자 개발을 지원하는 전문 센터입니다.',
    mission: '광기술 산업화를 통한 미래 성장동력 창출',
    vision: '세계적 포토닉스 연구 허브',
    specialties: ['광소자', '레이저', '광통신', 'LED/OLED'],
    establishedDate: '2014-11-01',
    isNew: false,
    services: [
      {
        id: 'srv-014',
        name: '광학 설계',
        description: '렌즈 및 광학계 설계 시뮬레이션',
        icon: 'Zap'
      },
      {
        id: 'srv-015',
        name: '광특성 측정',
        description: '발광효율, 스펙트럼 분석',
        icon: 'Sun'
      }
    ],
    equipment: [
      {
        id: 'eq-013',
        name: '분광광도계',
        nameEn: 'UV-Vis-NIR Spectrophotometer',
        category: '분석장비',
        description: '자외선-가시광-근적외선 영역 투과/반사 측정',
        specs: ['파장범위: 175-3300nm', '분해능: 0.02nm', '적분구 포함'],
        availability: '평일 09:00-18:00',
        pricePerHour: 60000
      }
    ],
    notices: [],
    archives: []
  },
  {
    id: 'inst-007',
    name: '인천마이크로시스템센터',
    slug: 'incheon-microsystem',
    theme: {
      primaryColor: '#0D9488',
      secondaryColor: '#0F766E'
    },
    contact: {
      address: '인천광역시 연수구 송도미래로 30',
      phone: '032-850-8000',
      email: 'contact@imsc.kr'
    },
    description: 'MEMS 및 마이크로시스템 개발 전문 지원 센터입니다.',
    mission: 'MEMS 기술 혁신으로 스마트 센서 산업 선도',
    vision: 'MEMS/센서 글로벌 제조 허브',
    specialties: ['MEMS센서', '바이오MEMS', '압력센서', '관성센서'],
    establishedDate: '2017-02-01',
    isNew: false,
    services: [
      {
        id: 'srv-016',
        name: 'MEMS 설계',
        description: 'FEM 시뮬레이션 기반 MEMS 설계',
        icon: 'Grid'
      },
      {
        id: 'srv-017',
        name: '센서 캘리브레이션',
        description: '정밀 센서 보정 서비스',
        icon: 'Gauge'
      }
    ],
    equipment: [
      {
        id: 'eq-014',
        name: 'DRIE 시스템',
        nameEn: 'Deep RIE',
        category: '식각장비',
        description: '실리콘 깊은 식각용 Bosch 공정 장비',
        specs: ['식각속도: 20μm/min', '종횡비: 50:1', '8인치 웨이퍼'],
        availability: '평일 09:00-18:00',
        pricePerHour: 150000
      }
    ],
    notices: [],
    archives: []
  },
  {
    id: 'inst-008',
    name: '충북바이오칩센터',
    slug: 'chungbuk-biochip',
    theme: {
      primaryColor: '#84CC16',
      secondaryColor: '#65A30D'
    },
    contact: {
      address: '충청북도 청주시 흥덕구 오송생명로 200',
      phone: '043-200-3000',
      email: 'info@cbbc.kr'
    },
    description: '바이오칩 및 바이오센서 개발을 지원하는 전문 센터입니다.',
    mission: '바이오칩 기술로 정밀의료 실현',
    vision: '바이오센서 기술 선도 기관',
    specialties: ['바이오칩', '마이크로유체', 'DNA칩', '단백질칩'],
    establishedDate: '2019-07-01',
    isNew: true,
    services: [
      {
        id: 'srv-018',
        name: '바이오칩 제작',
        description: '맞춤형 바이오칩 설계 및 제작',
        icon: 'Dna'
      },
      {
        id: 'srv-019',
        name: '미세유체 칩',
        description: '랩온어칩 설계 및 제작',
        icon: 'Droplet'
      }
    ],
    equipment: [
      {
        id: 'eq-015',
        name: '마이크로어레이 스캐너',
        nameEn: 'Microarray Scanner',
        category: '분석장비',
        description: 'DNA/단백질 칩 형광 신호 검출',
        specs: ['해상도: 2.5μm', '동시 검출: 2색', '자동 초점'],
        availability: '평일 09:00-18:00',
        pricePerHour: 70000
      }
    ],
    notices: [
      {
        id: 'notice-cb-001',
        title: '바이오칩 제작 신규 서비스 런칭',
        content: 'Lab-on-a-chip 플랫폼을 활용한 맞춤형 바이오칩 제작 서비스를 시작합니다. 진단용 바이오센서부터 약물 스크리닝 칩까지 다양한 응용이 가능합니다.',
        category: '신규서비스',
        isPinned: true,
        createdAt: '2025-01-11',
        author: '바이오칩개발팀'
      },
      {
        id: 'notice-cb-002',
        title: '미세유체칩 설계 워크샵 개최',
        content: '2월 20일 미세유체칩 설계 및 제작 실습 워크샵을 진행합니다. 참가비 무료, 선착순 20명 모집합니다.',
        category: '교육',
        isPinned: true,
        createdAt: '2025-01-10',
        author: '교육지원팀'
      },
      {
        id: 'notice-cb-003',
        title: '마이크로어레이 스캐너 업그레이드 완료',
        content: '고해상도 4색 동시 검출이 가능한 최신 모델로 업그레이드했습니다. 더욱 정밀한 분석이 가능합니다.',
        category: '장비',
        isPinned: false,
        createdAt: '2025-01-08',
        author: '장비관리팀'
      }
    ],
    archives: []
  },
  {
    id: 'inst-009',
    name: '전북탄소융합기술원',
    slug: 'jeonbuk-carbon',
    theme: {
      primaryColor: '#991B1B',
      secondaryColor: '#7F1D1D'
    },
    contact: {
      address: '전라북도 전주시 덕진구 탄소로 100',
      phone: '063-219-3700',
      email: 'carbon@jcti.kr'
    },
    description: '탄소소재 및 복합재료 개발을 지원하는 전문 기관입니다.',
    mission: '탄소소재 산업화로 신성장동력 창출',
    vision: '탄소밸리 구축을 통한 글로벌 경쟁력 확보',
    specialties: ['탄소섬유', '그래핀', 'CNT', '탄소복합재'],
    establishedDate: '2013-12-01',
    isNew: false,
    services: [
      {
        id: 'srv-020',
        name: '탄소소재 합성',
        description: 'CNT, 그래핀 합성 서비스',
        icon: 'Hexagon'
      },
      {
        id: 'srv-021',
        name: '복합재 성형',
        description: '탄소섬유 복합재 제작',
        icon: 'Box'
      }
    ],
    equipment: [
      {
        id: 'eq-016',
        name: 'CVD 그래핀 합성로',
        nameEn: 'Graphene CVD System',
        category: '증착장비',
        description: '대면적 그래핀 합성용 CVD 시스템',
        specs: ['최대온도: 1100°C', '4인치 기판', '롤투롤 가능'],
        availability: '평일 09:00-18:00',
        pricePerHour: 100000
      }
    ],
    notices: [],
    archives: []
  },
  {
    id: 'inst-010',
    name: '울산화학소재연구소',
    slug: 'ulsan-chemical',
    theme: {
      primaryColor: '#B45309',
      secondaryColor: '#92400E'
    },
    contact: {
      address: '울산광역시 남구 테크노산업로 55',
      phone: '052-259-7000',
      email: 'info@ucmi.kr'
    },
    description: '화학소재 분석 및 고분자 소재 개발을 지원하는 연구소입니다.',
    mission: '화학소재 혁신을 통한 산업 경쟁력 강화',
    vision: '친환경 화학소재 개발 선도',
    specialties: ['고분자', '촉매', '전해질', '분리막'],
    establishedDate: '2020-03-01',
    isNew: true,
    services: [
      {
        id: 'srv-022',
        name: '고분자 분석',
        description: 'GPC, DSC, TGA 분석',
        icon: 'Flask'
      },
      {
        id: 'srv-023',
        name: '촉매 평가',
        description: '촉매 활성 및 선택성 평가',
        icon: 'Activity'
      }
    ],
    equipment: [
      {
        id: 'eq-017',
        name: '핵자기공명분광기',
        nameEn: 'NMR (600MHz)',
        category: '분석장비',
        description: '유기화합물 구조 분석용 고분해능 NMR',
        specs: ['600MHz', '자동시료교환기', '다핵종 프로브'],
        availability: '평일 09:00-18:00',
        pricePerHour: 150000
      }
    ],
    notices: [
      {
        id: 'notice-ul-001',
        title: '고분자 분석 서비스 확대 안내',
        content: 'GPC, DSC, TGA 외에 DMA(동적기계분석) 서비스를 추가로 제공합니다. 고분자 소재의 점탄성 특성 분석이 가능합니다.',
        category: '신규서비스',
        isPinned: true,
        createdAt: '2025-01-12',
        author: '분석지원팀'
      },
      {
        id: 'notice-ul-002',
        title: '촉매 평가 장비 24시간 운영 시작',
        content: '연구 수요 증가에 따라 촉매 활성 평가 장비를 24시간 운영합니다. 야간 및 주말 이용 시 20% 할인 혜택을 제공합니다.',
        category: '운영',
        isPinned: true,
        createdAt: '2025-01-09',
        author: '운영관리팀'
      },
      {
        id: 'notice-ul-003',
        title: '친환경 플라스틱 소재 개발 성과 발표회',
        content: '생분해성 플라스틱 및 재활용 가능 복합소재 개발 성과를 공유하는 세미나를 1월 25일 개최합니다.',
        category: '행사',
        isPinned: false,
        createdAt: '2025-01-07',
        author: '연구기획팀'
      }
    ],
    archives: []
  },
  {
    id: 'inst-011',
    name: '강원신소재연구센터',
    slug: 'gangwon-materials',
    theme: {
      primaryColor: '#4338CA',
      secondaryColor: '#3730A3'
    },
    contact: {
      address: '강원도 춘천시 강원대학길 1',
      phone: '033-250-8000',
      email: 'materials@gwmrc.kr'
    },
    description: '신소재 개발 및 소재 특성 평가를 지원하는 연구 센터입니다.',
    mission: '혁신 소재 개발로 미래 산업 선도',
    vision: '소재 강국 실현을 위한 R&D 허브',
    specialties: ['금속소재', '세라믹스', '복합소재', '기능성코팅'],
    establishedDate: '2021-06-01',
    isNew: true,
    services: [
      {
        id: 'srv-024',
        name: '소재 특성 평가',
        description: '기계적, 열적, 전기적 특성 분석',
        icon: 'TestTube'
      },
      {
        id: 'srv-025',
        name: '표면 처리',
        description: '플라즈마, 이온빔 표면 개질',
        icon: 'Sparkles'
      }
    ],
    equipment: [
      {
        id: 'eq-018',
        name: '만능재료시험기',
        nameEn: 'UTM',
        category: '측정장비',
        description: '재료의 인장, 압축, 굽힘 강도 측정',
        specs: ['최대하중: 100kN', '변형률 측정', '고온 챔버'],
        availability: '평일 09:00-18:00',
        pricePerHour: 50000
      }
    ],
    notices: [
      {
        id: 'notice-gw-001',
        title: '복합소재 3D 프린팅 서비스 오픈',
        content: '탄소섬유, 유리섬유 강화 복합소재를 활용한 3D 프린팅 서비스를 시작합니다. 항공우주, 자동차 부품 제작에 최적화되어 있습니다.',
        category: '신규서비스',
        isPinned: true,
        createdAt: '2025-01-13',
        author: '신소재개발팀'
      },
      {
        id: 'notice-gw-002',
        title: '표면 코팅 기술 워크샵 참가자 모집',
        content: 'DLC, TiN, 다이아몬드 코팅 등 고기능성 표면 처리 기술 교육을 2월 15일 진행합니다. 실습 위주의 교육으로 정원 15명입니다.',
        category: '교육',
        isPinned: true,
        createdAt: '2025-01-11',
        author: '기술교육센터'
      },
      {
        id: 'notice-gw-003',
        title: '금속 3D 프린터 도입 완료',
        content: 'SLM 방식의 금속 3D 프린터를 도입했습니다. 티타늄, 알루미늄, 스테인리스 스틸 등 다양한 금속 소재 출력이 가능합니다.',
        category: '장비',
        isPinned: false,
        createdAt: '2025-01-10',
        author: '장비운영팀'
      },
      {
        id: 'notice-gw-004',
        title: '소재 물성 데이터베이스 구축 완료',
        content: '5000종 이상의 소재 물성 데이터를 검색할 수 있는 온라인 DB를 구축했습니다. 홈페이지에서 무료로 이용 가능합니다.',
        category: '공지',
        isPinned: false,
        createdAt: '2025-01-08',
        author: '정보화팀'
      }
    ],
    archives: []
  },
  {
    id: 'inst-012',
    name: '제주청정에너지연구원',
    slug: 'jeju-energy',
    theme: {
      primaryColor: '#16A34A',
      secondaryColor: '#15803D'
    },
    contact: {
      address: '제주특별자치도 제주시 첨단로 330',
      phone: '064-800-2000',
      email: 'energy@jcei.kr'
    },
    description: '신재생에너지 소재 및 에너지 저장 기술을 연구하는 기관입니다.',
    mission: '청정에너지 기술로 탄소중립 실현',
    vision: '글로벌 에너지 전환 선도',
    specialties: ['태양전지', '이차전지', '연료전지', '에너지저장'],
    establishedDate: '2022-01-01',
    isNew: true,
    services: [
      {
        id: 'srv-026',
        name: '전지 성능 평가',
        description: '충방전 사이클, 임피던스 분석',
        icon: 'Battery'
      },
      {
        id: 'srv-027',
        name: '태양전지 효율 측정',
        description: 'I-V 특성, 양자효율 측정',
        icon: 'Sun'
      }
    ],
    equipment: [
      {
        id: 'eq-019',
        name: '배터리 충방전 시험기',
        nameEn: 'Battery Cycler',
        category: '측정장비',
        description: '이차전지 충방전 사이클 테스트',
        specs: ['전압: 0-5V', '전류: ±10A', '128채널'],
        availability: '24시간',
        pricePerHour: 30000
      },
      {
        id: 'eq-020',
        name: '태양전지 시뮬레이터',
        nameEn: 'Solar Simulator',
        category: '측정장비',
        description: 'AM1.5G 표준 태양광 모사',
        specs: ['Class AAA', '조사면적: 15x15cm', '강도: 1 Sun'],
        availability: '평일 09:00-18:00',
        pricePerHour: 60000
      }
    ],
    notices: [
      {
        id: 'notice-005',
        title: '페로브스카이트 태양전지 제작 서비스 시작',
        content: '차세대 태양전지 제작 및 평가 서비스를 제공합니다.',
        category: '신규서비스',
        isPinned: true,
        createdAt: '2025-01-12',
        author: '태양전지팀'
      }
    ],
    archives: []
  }
]

export const getInstitutionBySlug = (slug: string): Institution | undefined => {
  return mockInstitutions.find(inst => inst.slug === slug)
}

export const getInstitutionById = (id: string): Institution | undefined => {
  return mockInstitutions.find(inst => inst.id === id)
}

export const getNewInstitutions = (): Institution[] => {
  return mockInstitutions.filter(inst => inst.isNew).slice(0, 3)
}

export const getRecentInstitutions = (count: number = 6): Institution[] => {
  return [...mockInstitutions]
    .sort((a, b) => new Date(b.establishedDate).getTime() - new Date(a.establishedDate).getTime())
    .slice(0, count)
}