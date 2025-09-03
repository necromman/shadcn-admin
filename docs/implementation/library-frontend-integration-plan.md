# 세종샘물도서관 홈페이지 메인 프로젝트 통합 계획

## 📚 개요
library-frontend 프로젝트를 메인 shadcn-admin 프로젝트의 루트 경로로 통합

## 🎯 목표
- 메인 프로젝트 루트(`/`)에서 세종샘물도서관 홈페이지 표시
- 기존 디자인 시스템 경로는 `/design-system`으로 이동
- library-frontend의 모든 기능을 메인 프로젝트에서 사용
- 메인 프로젝트의 스타일 시스템 활용

## 🏗️ 구현 전략

### 1. 라우팅 재구성
**현재 구조:**
- `/` - 디자인 시스템 메인
- `/old` - 기존 대시보드

**변경 후:**
- `/` - 세종샘물도서관 홈페이지
- `/design-system` - 디자인 시스템 (기존 `/`)
- `/admin` - 기존 대시보드 (기존 `/old`)
- `/login`, `/register` - 인증 페이지
- `/search`, `/facilities/*`, `/my-library` 등 - 도서관 서비스 페이지

### 2. 컴포넌트 마이그레이션

#### 이동할 컴포넌트
1. **레이아웃 컴포넌트**
   - `LibraryHeaderEnterprise` → `src/components/library/header.tsx`
   - `LibraryFooter` → `src/components/library/footer.tsx`
   - `MainLayout` → `src/components/library/layout.tsx`

2. **페이지 컴포넌트**
   - `HomePage` → `src/routes/library/home.tsx`
   - `LoginPage` → `src/routes/library/login.tsx`
   - 기타 placeholder 페이지들

3. **UI 컴포넌트**
   - `LibraryCarousel` → `src/components/library/carousel.tsx`
   - 개발자 설정 패널 관련 컴포넌트

4. **Context/Provider**
   - `DevSettingsProvider` → 기존 시스템과 통합
   - `ThemeProvider` → 이미 존재하므로 재사용

### 3. 스타일 통합 전략
- library-frontend의 커스텀 스타일은 가져오지 않음
- 메인 프로젝트의 기존 shadcn/ui 컴포넌트 활용
- Tailwind 클래스는 메인 프로젝트의 테마 시스템 사용

### 4. 개발자 설정 패널
- library-frontend의 DevSettings 시스템 통합
- 플로팅 버튼 + 드로어 UI 유지
- 도서관 특화 설정 추가

## 📝 작업 순서

### Phase 1: 라우팅 재구성
1. 기존 라우트 백업
2. 새 라우팅 구조 구현
3. `/design-system`, `/admin` 경로로 기존 기능 이동

### Phase 2: 레이아웃 통합
1. 프리헤더(공지바) 컴포넌트 생성
2. 헤더 컴포넌트 통합
3. 푸터 컴포넌트 통합
4. 메인 레이아웃 래퍼 생성

### Phase 3: 홈페이지 구현
1. 히어로 캐러셀 섹션
2. 빠른 서비스 카드
3. 공지사항/도서관 정보 위젯
4. 신착도서 섹션

### Phase 4: 서브페이지 구현
1. 로그인/회원가입 페이지
2. 검색 관련 페이지
3. 시설 예약 페이지
4. My Library 페이지

### Phase 5: 개발자 도구
1. 개발자 설정 패널 통합
2. 도서관 특화 설정 옵션 추가
3. 쿠키 기반 설정 저장

## 🚫 주의사항
- library-frontend 폴더는 참조용으로만 사용 (수정 X)
- 메인 프로젝트의 스타일 시스템 준수
- 기존 디자인 시스템 기능 보존

## ✅ 체크리스트
- [ ] 라우팅 시스템 재구성
- [ ] 레이아웃 컴포넌트 통합
- [ ] 홈페이지 구현
- [ ] 서브페이지 구현
- [ ] 개발자 설정 패널
- [ ] 빌드 테스트
- [ ] 타입 체크
- [ ] 린트 통과