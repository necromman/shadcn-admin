# 기관별 홈페이지 기능 설계 문서

## 📋 요구사항 분석

### 핵심 요구사항
- **목적**: 자체 홈페이지가 없는 협의체 참여 기관을 위한 클라우드 형태의 미니 홈페이지 제공
- **구조**: 메인 홈페이지(moafab) 내에서 서브 페이지 형태로 구현
- **데이터 관리**: 백엔드에서 기관 정보 관리, 프론트엔드는 표현만 담당

### 기능 요구사항
1. **기관별 홈페이지 메인**
   - 기관 브랜딩 (로고는 텍스트)
   - 주요 정보 한눈에 보기
   - 각 섹션으로의 네비게이션

2. **기관별 소개**
   - 기관 개요
   - 미션/비전
   - 주요 서비스
   - 연락처 정보

3. **공지사항**
   - 기관별 공지 목록
   - 중요 공지 고정
   - 카테고리 분류

4. **자료실 게시판**
   - 파일 다운로드 목록
   - 카테고리별 분류
   - 검색 기능

5. **장비 소개**
   - 보유 장비 목록
   - 장비별 상세 정보
   - 이용 가능 시간

6. **서비스 신청**
   - 팹서비스 신청
   - 장비별 서비스 신청
   - 신청 폼

## 🏗️ 아키텍처 설계

### URL 구조
```
/moafab                          # 메인 홈페이지
/moafab/institutions             # 기관 목록 페이지
/moafab/institution/{id}         # 기관별 홈페이지 메인
/moafab/institution/{id}/about   # 기관 소개
/moafab/institution/{id}/notice  # 공지사항
/moafab/institution/{id}/archive # 자료실
/moafab/institution/{id}/equipment # 장비 소개
/moafab/institution/{id}/service # 서비스 신청
```

### 컴포넌트 구조
```
src/features/moafab/
├── pages/
│   ├── home.tsx                    # 메인 홈페이지 (기존)
│   ├── institutions.tsx             # 기관 목록
│   └── institution/
│       ├── index.tsx                # 기관별 홈페이지 메인
│       ├── about.tsx                # 기관 소개
│       ├── notice.tsx               # 공지사항
│       ├── archive.tsx              # 자료실
│       ├── equipment.tsx            # 장비 소개
│       └── service.tsx              # 서비스 신청
├── components/
│   └── institution/
│       ├── institution-header.tsx   # 기관별 헤더
│       ├── institution-nav.tsx      # 기관별 네비게이션
│       ├── institution-footer.tsx   # 기관별 푸터
│       └── sections/
│           ├── hero-section.tsx     # 히어로 섹션
│           ├── quick-links.tsx      # 빠른 링크
│           ├── notice-preview.tsx   # 공지사항 미리보기
│           └── equipment-grid.tsx   # 장비 그리드
└── data/
    └── institutions.mock.ts         # 기관 더미 데이터
```

## 🎨 디자인 컨셉

### 미니 사이트 특성
- **단순하고 깔끔한 레이아웃**: 정보 전달에 집중
- **일관된 템플릿**: 모든 기관이 동일한 구조 사용
- **커스터마이징 제한**: 색상 테마 정도만 변경 가능
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원

### 스타일 가이드
1. **헤더**
   - 기관명 텍스트 로고
   - 기관 색상 테마 적용
   - 간단한 네비게이션 메뉴

2. **메인 페이지**
   - 히어로 섹션: 기관 소개 요약
   - 퀵 링크: 주요 서비스 바로가기
   - 최신 공지사항 3-5개
   - 주요 장비 소개 카드

3. **콘텐츠 페이지**
   - 좌측 사이드바: 서브 메뉴
   - 우측 콘텐츠: 실제 내용
   - 브레드크럼: 현재 위치 표시

## 💾 데이터 구조

### 기관 정보
```typescript
interface Institution {
  id: string
  name: string
  slug: string // URL용
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
```

### 장비 정보
```typescript
interface Equipment {
  id: string
  name: string
  category: string
  description: string
  specs: string[]
  availability: string
  image?: string
  pricePerHour?: number
}
```

### 서비스 신청
```typescript
interface ServiceRequest {
  type: 'fab' | 'equipment'
  equipmentId?: string
  requestDate: string
  startTime: string
  endTime: string
  purpose: string
  requesterInfo: {
    name: string
    organization: string
    phone: string
    email: string
  }
}
```

## 🚀 구현 계획

### Phase 1: 기본 구조 (우선순위: 높음)
1. **메인 홈페이지에 기관 목록 버튼 추가**
   - 패밀리 사이트 스타일로 구현
   - 드롭다운 또는 별도 페이지 연결

2. **기관별 홈페이지 메인 페이지**
   - 라우팅 설정
   - 기본 레이아웃 구성
   - 더미 데이터 연결

3. **공통 컴포넌트**
   - 기관별 헤더/푸터
   - 네비게이션 메뉴
   - 브레드크럼

### Phase 2: 콘텐츠 페이지 (우선순위: 중간)
1. **기관 소개 페이지**
   - 탭 형식으로 정보 구성
   - 연락처 정보 카드

2. **공지사항 페이지**
   - 리스트 뷰
   - 페이지네이션
   - 검색/필터

3. **자료실 페이지**
   - 파일 목록
   - 다운로드 버튼
   - 카테고리 필터

### Phase 3: 서비스 기능 (우선순위: 낮음)
1. **장비 소개 페이지**
   - 그리드 레이아웃
   - 상세 모달
   - 이용 가능 시간 표시

2. **서비스 신청 페이지**
   - 신청 폼
   - 달력 위젯
   - 유효성 검사

## 🎯 예상 화면 구성

### 메인 홈페이지 추가 요소
```
[기관별 홈페이지] 버튼/드롭다운
├── A 기관 바로가기
├── B 기관 바로가기
└── C 기관 바로가기
```

### 기관별 홈페이지 메인
```
┌─────────────────────────────────┐
│ [기관명]          홈|소개|공지|... │  <- 헤더
├─────────────────────────────────┤
│                                 │
│     환영 메시지 / 히어로 이미지    │  <- 히어로
│                                 │
├─────────────────────────────────┤
│ [공지사항]        [주요 서비스]    │
│ • 최신 공지 1     • 장비 예약     │  <- 퀵 링크
│ • 최신 공지 2     • 교육 신청     │
│ • 최신 공지 3     • 상담 예약     │
├─────────────────────────────────┤
│        [보유 장비 소개]           │
│   장비1   장비2   장비3   장비4   │  <- 장비 그리드
└─────────────────────────────────┘
```

## ⚠️ 제약사항 및 고려사항

1. **데이터 의존성**
   - 모든 콘텐츠는 백엔드 API에서 제공
   - 프론트엔드는 순수 표현 계층
   - 더미 데이터로 프로토타입 구현

2. **커스터마이징 제한**
   - 레이아웃 변경 불가
   - 색상 테마만 변경 가능
   - 폰트, 간격 등은 고정

3. **성능 최적화**
   - 기관별 데이터 lazy loading
   - 이미지 최적화 필수
   - 캐싱 전략 수립

4. **접근성**
   - 모든 인터랙티브 요소 키보드 접근 가능
   - 스크린 리더 대응
   - 고대비 모드 지원

## 📝 다음 단계

1. 이 설계 문서 검토 및 승인
2. 더미 데이터 구조 생성
3. 메인 홈페이지에 기관 목록 버튼 추가
4. 기관별 홈페이지 메인 페이지 구현
5. 각 서브 페이지 순차적 구현

## 🔄 업데이트 이력
- 2025-01-12: 초기 설계 문서 작성