interface TourStep {
  target: string
  title: string
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  highlight?: boolean
}

export const tourSteps: Record<string, TourStep[]> = {
  'sfr-003': [
    {
      target: 'demo-selector',
      title: '요구사항 선택',
      content: '다른 요구사항 데모로 빠르게 이동할 수 있습니다. 드롭다운에서 원하는 요구사항을 선택하세요.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'stats-dashboard',
      title: '실시간 대시보드',
      content: '전체 서비스 현황을 한눈에 파악할 수 있습니다. 취소 대기 중인 서비스는 즉시 동기화 가능합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'sync-mode-selector',
      title: '동기화 모드 선택',
      content: '수동 동기화와 배치 동기화 중 선택할 수 있습니다. 배치는 대량 데이터를 한번에 처리합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'service-search',
      title: '서비스 검색',
      content: '서비스 ID, 모아팹 ID, 서비스명, 기업명으로 빠르게 검색할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'service-table',
      title: '서비스 목록',
      content: '150개 이상의 실제 서비스 데이터를 관리합니다. 각 행의 동기화 버튼으로 개별 처리가 가능합니다.',
      placement: 'top',
      highlight: true
    },
    {
      target: 'sync-logs-tab',
      title: '동기화 로그',
      content: '모든 동기화 작업의 상세 로그를 실시간으로 확인할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'monitoring-tab',
      title: '시스템 모니터링',
      content: 'API 응답시간, DB 상태, 큐 대기 현황 등 시스템 상태를 모니터링합니다.',
      placement: 'bottom',
      highlight: true
    }
  ],

  'sfr-004': [
    {
      target: 'demo-selector',
      title: '요구사항 네비게이션',
      content: '드롭다운을 통해 다른 요구사항 데모를 즉시 확인할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'stats-cards',
      title: '담당자 통계',
      content: '전체 담당자 수, 동기화 완료/대기 현황, 오늘 변경 건수를 실시간으로 확인합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'manager-filters',
      title: '담당자 필터',
      content: '이름, 이메일, 부서별로 담당자를 검색하고 필터링할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'sync-all-button',
      title: '전체 동기화',
      content: '모든 대기 중인 담당자 정보를 한번에 동기화합니다.',
      placement: 'left',
      highlight: true
    },
    {
      target: 'manager-table',
      title: '담당자 관리 테이블',
      content: 'KANC와 모아팹의 결제 유형이 다른 경우 불일치 표시가 나타납니다. 개별 수정이 가능합니다.',
      placement: 'top',
      highlight: true
    },
    {
      target: 'history-tab',
      title: '변경 이력',
      content: '모든 담당자 정보 변경 이력을 시간순으로 확인할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'mapping-tab',
      title: '매핑 규칙',
      content: 'KANC와 모아팹 간의 필드 매핑 규칙과 동기화 정책을 확인합니다.',
      placement: 'bottom',
      highlight: true
    }
  ],

  'sfr-005': [
    {
      target: 'demo-selector',
      title: '요구사항 선택',
      content: '다른 요구사항으로 빠르게 전환할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'revenue-stats',
      title: '실적 통계',
      content: '당월 KANC 실적, 모아팹 동기화 현황, 프로젝트 수, 동기화율을 한눈에 확인합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'period-selector',
      title: '기간 및 부서 선택',
      content: '특정 월과 부서를 선택하여 상세 실적을 조회할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'excel-download',
      title: 'Excel 다운로드',
      content: '선택한 데이터를 Excel 파일로 다운로드할 수 있습니다.',
      placement: 'left',
      highlight: true
    },
    {
      target: 'batch-sync',
      title: '배치 동기화',
      content: '대기 중인 모든 금액 데이터를 한번에 동기화합니다.',
      placement: 'left',
      highlight: true
    },
    {
      target: 'monthly-tab',
      title: '월별 실적',
      content: '9개월간의 실적 추이와 동기화 상태를 확인할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'category-tab',
      title: '카테고리별 분석',
      content: '장비이용료, 시험분석료 등 카테고리별 실적 비중을 확인합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'batch-history-tab',
      title: '배치 이력',
      content: '자동/수동 배치 실행 이력과 처리 결과를 확인할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    }
  ],

  'sfr-006': [
    {
      target: 'demo-selector',
      title: '데모 전환',
      content: '드롭다운으로 다른 요구사항 데모를 선택할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'storage-stats',
      title: '스토리지 현황',
      content: '전체 파일 수, 총 용량, 동기화 상태를 실시간으로 모니터링합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'file-upload',
      title: '파일 업로드',
      content: '다양한 형식의 파일을 업로드하고 자동으로 모아팹과 동기화됩니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'file-filters',
      title: '파일 검색 및 필터',
      content: '파일명, 프로젝트, 카테고리별로 파일을 검색하고 필터링합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'file-table',
      title: '파일 관리',
      content: '200개 이상의 파일을 효율적으로 관리합니다. 미리보기, 다운로드, 공유가 가능합니다.',
      placement: 'top',
      highlight: true
    },
    {
      target: 'sync-queue-tab',
      title: '동기화 큐',
      content: '현재 처리 중인 파일 동기화 작업을 실시간으로 확인합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'category-stats-tab',
      title: '카테고리별 통계',
      content: '계약서, 견적서 등 문서 카테고리별 사용 현황을 파악합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'storage-tab',
      title: '스토리지 정책',
      content: 'KANC와 모아팹의 스토리지 사용량, 암호화, 백업 정책을 확인합니다.',
      placement: 'bottom',
      highlight: true
    }
  ],

  'sfr-002': [
    {
      target: 'demo-selector',
      title: '요구사항 선택',
      content: '드롭다운을 통해 다른 요구사항 데모로 이동할 수 있습니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'design-principles',
      title: '디자인 원칙',
      content: '반응형 디자인, 3단계 네비게이션, 웹 표준 준수 등 핵심 디자인 원칙을 확인합니다.',
      placement: 'bottom',
      highlight: true
    },
    {
      target: 'performance-metrics',
      title: '성능 지표',
      content: '페이지 로딩 속도, 웹 접근성 점수 등 실시간 성능 지표를 모니터링합니다.',
      placement: 'bottom',
      highlight: true
    }
  ]
}