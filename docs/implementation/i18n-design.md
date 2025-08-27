# 다국어(i18n) 기능 구현 설계

## 📋 요구사항
- **지원 언어**: 한국어(기본), 영어, 중국어(북경어), 중국어(광동어), 일본어, 태국어, 프랑스어, 이탈리아어
- **적용 범위**: 헤더 섹션의 네비게이션 메뉴
- **UI 위치**: 헤더 우측 (로그인 버튼 제거 후 언어 선택 셀렉트박스 추가)
- **확장성**: JSON 파일 기반 번역 관리로 향후 언어 추가 용이

## 🏗️ 아키텍처 설계

### 1. 기술 스택 선택
- **react-i18next**: React 공식 추천 i18n 라이브러리
- **i18next**: 핵심 번역 엔진
- **JSON 파일**: 언어별 번역 데이터 저장

### 2. 디렉토리 구조
```
src/
├── locales/                    # 번역 파일 디렉토리
│   ├── ko/                     # 한국어 (기본)
│   │   └── translation.json
│   ├── en/                     # 영어
│   │   └── translation.json
│   ├── zh-CN/                  # 중국어 간체 (북경어)
│   │   └── translation.json
│   ├── zh-HK/                  # 중국어 번체 (광동어)
│   │   └── translation.json
│   ├── ja/                     # 일본어
│   │   └── translation.json
│   ├── th/                     # 태국어
│   │   └── translation.json
│   ├── fr/                     # 프랑스어
│   │   └── translation.json
│   └── it/                     # 이탈리아어
│       └── translation.json
├── lib/
│   └── i18n/
│       ├── config.ts           # i18n 설정
│       ├── types.ts            # 타입 정의
│       └── hooks.ts            # 커스텀 훅
└── components/
    └── design-system/
        └── language-selector/  # 언어 선택 컴포넌트
            └── index.tsx
```

### 3. 언어 코드 체계
```typescript
export const SUPPORTED_LANGUAGES = {
  'ko': { name: '한국어', flag: '🇰🇷' },
  'en': { name: 'English', flag: '🇺🇸' },
  'zh-CN': { name: '简体中文', flag: '🇨🇳' },
  'zh-HK': { name: '繁體中文', flag: '🇭🇰' },
  'ja': { name: '日本語', flag: '🇯🇵' },
  'th': { name: 'ไทย', flag: '🇹🇭' },
  'fr': { name: 'Français', flag: '🇫🇷' },
  'it': { name: 'Italiano', flag: '🇮🇹' }
}
```

### 4. JSON 번역 구조
```json
{
  "header": {
    "nav": {
      "solutions": "솔루션",
      "products": "제품",
      "services": "서비스",
      "company": "회사소개",
      "resources": "자료실",
      "support": "지원",
      "contact": "문의하기"
    },
    "submenus": {
      "solutions": {
        "enterprise": "엔터프라이즈",
        "business": "비즈니스",
        "startup": "스타트업"
      }
    }
  }
}
```

## 🔧 구현 계획

### Phase 1: 기반 구축
1. **패키지 설치**
   - react-i18next
   - i18next
   - i18next-browser-languagedetector (브라우저 언어 감지)

2. **i18n 초기 설정**
   - 설정 파일 생성
   - Provider 구현
   - 타입 정의

### Phase 2: 번역 데이터 구축
1. **JSON 파일 생성**
   - 각 언어별 디렉토리 및 파일 생성
   - 헤더 네비게이션 메뉴 번역
   - 서브메뉴 번역

2. **번역 키 구조화**
   - 계층적 구조로 관리
   - 네임스페이스 분리

### Phase 3: UI 컴포넌트 구현
1. **언어 선택 셀렉터**
   - shadcn/ui Select 컴포넌트 활용
   - 플래그 아이콘 + 언어명 표시
   - 현재 선택된 언어 표시

2. **헤더 컴포넌트 수정**
   - 로그인 버튼 제거
   - 언어 선택 셀렉터 추가
   - 반응형 대응

### Phase 4: 통합 및 적용
1. **헤더 네비게이션 다국어 적용**
   - useTranslation 훅 사용
   - 동적 메뉴 렌더링
   - 언어 변경 시 즉시 반영

2. **로컬스토리지 연동**
   - 선택한 언어 저장
   - 페이지 리로드 시 복원

## 📊 영향 범위
- **수정 대상 파일**:
  - `ds-header-enterprise.tsx` - 헤더 컴포넌트
  - `ds-header-enterprise/` 폴더 구조 (복잡도 증가 시)
  
- **신규 생성 파일**:
  - 언어별 JSON 파일 (8개)
  - i18n 설정 파일
  - 언어 선택 컴포넌트

## ⚠️ 주의사항
- 번역 키 누락 방지를 위한 타입 체크
- 기본 언어(한국어) 폴백 처리
- 성능 최적화 (번역 파일 lazy loading)
- RTL 언어 대응 준비 (향후 아랍어 등)

## 🔄 확장성
- 새 언어 추가 시 JSON 파일만 추가하면 자동 반영
- 다른 섹션으로 다국어 확장 가능한 구조
- 번역 관리 시스템 연동 가능한 구조

## ✅ 성공 기준
- 모든 8개 언어 정상 전환
- 언어 변경 시 즉각 반영
- 브라우저 새로고침 후에도 언어 설정 유지
- 빌드 에러 없음
- 타입 에러 없음