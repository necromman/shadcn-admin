# 세종공동캠퍼스 도서관 시스템 설계 문서

## 🏗️ 시스템 아키텍처

### 1. 전체 시스템 구조
```
┌─────────────────────────────────────────────────────────┐
│                    클라우드 인프라 (CSAP 인증)              │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Web Server │  │  WAS Server │  │  DB Server  │   │
│  │   (Nginx)    │  │  (Node.js)  │  │ (PostgreSQL)│   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              검색 엔진 (DEXPEED4)                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              파일 스토리지 (NAS)                   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2. 기술 스택

#### Frontend
- **Framework**: React 18 + TypeScript
- **UI Library**: shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js / Fastify
- **ORM**: Prisma
- **Authentication**: JWT + OAuth2
- **WebSocket**: Socket.io

#### Database
- **Primary DB**: PostgreSQL
- **Cache**: Redis
- **Search Engine**: DEXPEED4

#### Infrastructure
- **Cloud**: CSAP 인증 클라우드
- **Container**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana

## 📊 데이터베이스 설계

### 주요 테이블 구조

#### 1. 사용자 관련
```sql
-- 사용자 기본 정보
users (
  id UUID PRIMARY KEY,
  user_type ENUM('internal', 'external'),
  student_id VARCHAR(20),
  university_code VARCHAR(10),
  name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- 대학 정보
universities (
  code VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100),
  api_endpoint VARCHAR(255),
  api_status ENUM('active', 'inactive', 'pending')
)
```

#### 2. 도서 관련
```sql
-- 서지 정보
books (
  id UUID PRIMARY KEY,
  isbn VARCHAR(20),
  title VARCHAR(500),
  author VARCHAR(500),
  publisher VARCHAR(200),
  publication_year INTEGER,
  category VARCHAR(50),
  location VARCHAR(100),
  status ENUM('available', 'borrowed', 'reserved', 'lost')
)

-- 대출 기록
loans (
  id UUID PRIMARY KEY,
  book_id UUID REFERENCES books(id),
  user_id UUID REFERENCES users(id),
  loan_date TIMESTAMP,
  due_date TIMESTAMP,
  return_date TIMESTAMP,
  status ENUM('active', 'returned', 'overdue')
)
```

#### 3. 좌석/시설 예약
```sql
-- 좌석 정보
seats (
  id UUID PRIMARY KEY,
  floor INTEGER,
  zone VARCHAR(50),
  seat_number VARCHAR(10),
  status ENUM('available', 'occupied', 'maintenance')
)

-- 예약 정보
reservations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  resource_type ENUM('seat', 'room'),
  resource_id UUID,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  status ENUM('active', 'completed', 'cancelled')
)
```

## 🔌 시스템 연동 설계

### 1. 대학 학사시스템 연동

#### API 연동 (지원 대학)
```javascript
// API 연동 인터페이스
interface UniversityAPI {
  authenticate(): Promise<Token>
  getUserInfo(studentId: string): Promise<UserInfo>
  validateStudent(studentId: string): Promise<boolean>
}

// 구현 예시 (한밭대)
class HanbatAPI implements UniversityAPI {
  async authenticate() {
    // OAuth2 인증
  }
  
  async getUserInfo(studentId: string) {
    // 학생 정보 조회
  }
}
```

#### Excel 업로드 (API 미지원 대학)
```javascript
// Excel 처리 모듈
class ExcelProcessor {
  async uploadStudentData(file: File) {
    // 1. 파일 검증
    // 2. 데이터 파싱
    // 3. DB 저장
    // 4. 중복 검사
  }
}
```

### 2. 하나카드 학생증 연동
```javascript
// 카드 리더 인터페이스
interface CardReader {
  connect(): Promise<void>
  readCard(): Promise<CardData>
  authenticate(cardData: CardData): Promise<User>
}
```

### 3. 출입보안(S1) 시스템 연동
```javascript
// 출입 관리 API
interface AccessControl {
  grantAccess(userId: string): Promise<void>
  revokeAccess(userId: string): Promise<void>
  checkAccessLog(userId: string): Promise<AccessLog[]>
}
```

## 🎨 UI/UX 설계

### 1. 페이지 구조

#### 도서관 홈페이지
```
/
├── /search (통합검색)
├── /my-library (마이페이지)
│   ├── /loans (대출현황)
│   ├── /reservations (예약현황)
│   └── /history (이용내역)
├── /services
│   ├── /seat-reservation (좌석예약)
│   ├── /room-reservation (시설예약)
│   └── /book-request (희망도서)
├── /notice (공지사항)
├── /guide (이용안내)
└── /admin (관리자)
```

#### 관리시스템 (LAS)
```
/admin
├── /dashboard (대시보드)
├── /acquisition (수서)
├── /cataloging (정리)
├── /circulation (대출/반납)
├── /serials (연속간행물)
├── /users (이용자관리)
├── /statistics (통계)
└── /settings (설정)
```

### 2. 반응형 디자인 브레이크포인트
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### 3. 접근성 요구사항
- WCAG 2.1 Level AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 고대비 모드 지원

## 🔒 보안 설계

### 1. 인증/인가
- JWT 기반 인증
- Role-based Access Control (RBAC)
- 2FA 지원 (관리자)

### 2. 데이터 보호
- 개인정보 암호화 (AES-256)
- 통신 암호화 (TLS 1.3)
- SQL Injection 방지
- XSS/CSRF 방지

### 3. 감사 로그
- 모든 트랜잭션 로깅
- 개인정보 접근 로그
- 시스템 변경 이력

## 📈 성능 목표

### 응답 시간
- 페이지 로드: < 2초
- API 응답: < 500ms
- 검색 결과: < 1초

### 동시 접속
- 최소: 100명
- 목표: 500명
- 피크: 1000명

### 가용성
- 목표 SLA: 99.9%
- 백업 주기: 일 1회
- 복구 시간: < 4시간

## 🚦 구현 로드맵

### Sprint 1 (Week 1-2): 기반 구축
- [ ] 클라우드 환경 설정
- [ ] 개발 환경 구성
- [ ] DB 스키마 설계
- [ ] 기본 프로젝트 구조

### Sprint 2 (Week 3-4): 핵심 기능
- [ ] 사용자 인증/인가
- [ ] 도서 관리 CRUD
- [ ] 대출/반납 로직
- [ ] 검색 엔진 연동

### Sprint 3 (Week 5-6): 서비스 개발
- [ ] 홈페이지 UI
- [ ] 이용자 서비스
- [ ] 관리자 대시보드
- [ ] 실시간 알림

### Sprint 4 (Week 7): 연동
- [ ] 대학 API 연동
- [ ] 카드 시스템 연동
- [ ] 출입 시스템 연동

### Sprint 5 (Week 8): 마무리
- [ ] 통합 테스트
- [ ] 보안 점검
- [ ] 성능 최적화
- [ ] 문서화

## 📝 리스크 관리

### 기술적 리스크
1. **API 연동 지연**
   - 완화: Excel 업로드 대체 방안 준비
   
2. **성능 이슈**
   - 완화: 캐싱 전략, DB 인덱싱

3. **보안 취약점**
   - 완화: 정기 보안 점검, 펜테스팅

### 운영 리스크
1. **전산 담당자 부재**
   - 완화: 상세한 문서화, 교육 강화
   
2. **시스템 장애**
   - 완화: 모니터링 강화, 자동 복구

## 🔄 유지보수 계획

### 1년차 무상 유지보수
- 월 1회 정기 점검
- 24시간 장애 대응
- 분기별 보안 패치
- 기능 개선 요청 처리

### 향후 계획
- 모바일 앱 개발
- AI 도서 추천 시스템
- 블록체인 기반 인증
- 빅데이터 분석 플랫폼

---

본 설계 문서는 세종공동캠퍼스 도서관 시스템 구축을 위한 기술 설계서입니다.
실제 구현 시 세부 사항은 조정될 수 있습니다.