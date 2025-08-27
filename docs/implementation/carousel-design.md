# 캐러셀 구현 설계 문서

## 📋 요구사항 분석
- 헤더 섹션 바로 아래 위치할 캐러셀 섹션 구현
- 참조 이미지 기반 디자인 (BRAND 로고 및 프로모션 콘텐츠)
- 완벽한 반응형 디자인 지원
- 자동 슬라이드 및 수동 제어 기능
- 모바일/태블릿/데스크톱 최적화

## 🎨 디자인 요구사항

### 데스크톱 (1024px+)
- 풀 너비 캐러셀
- 좌우 네비게이션 버튼
- 하단 인디케이터 (dot navigation)
- 슬라이드당 1개 이미지 표시
- 높이: 400-500px

### 태블릿 (768px-1023px)
- 풀 너비 유지
- 터치 스와이프 지원
- 높이: 350-400px
- 좌우 패딩 조정

### 모바일 (767px 이하)
- 풀 너비
- 터치 스와이프 중심 네비게이션
- 높이: 250-300px
- 간소화된 인디케이터

## 🏗️ 구현 구조

### 컴포넌트 구조
```
ds-carousel/
├── main.tsx           # 메인 캐러셀 컴포넌트
├── types.ts          # 타입 정의
├── carousel-slide.tsx # 개별 슬라이드 컴포넌트
├── carousel-controls.tsx # 네비게이션 컨트롤
├── carousel-data.tsx  # 슬라이드 데이터
└── index.tsx         # Barrel export
```

### 주요 기능
1. **자동 재생**: 5초 간격 자동 슬라이드
2. **수동 제어**: 이전/다음 버튼, 인디케이터 클릭
3. **터치 지원**: 모바일 스와이프 제스처
4. **일시 정지**: 호버 시 자동 재생 일시 정지
5. **무한 루프**: 마지막 슬라이드 후 첫 슬라이드로
6. **애니메이션**: 부드러운 트랜지션 효과
7. **접근성**: 키보드 네비게이션, ARIA 레이블

## 📦 사용 기술
- **embla-carousel-react**: 메인 캐러셀 엔진
- **shadcn/ui carousel**: 기본 캐러셀 컴포넌트
- **Tailwind CSS**: 반응형 스타일링
- **React hooks**: 상태 관리

## 🔄 데이터 구조
```typescript
interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  image: string
  cta?: {
    text: string
    link: string
    variant?: 'default' | 'outline' | 'secondary'
  }
  badge?: string
  alignment?: 'left' | 'center' | 'right'
}
```

## ⚠️ 주의사항
- 이미지 최적화 필수 (lazy loading)
- 모바일 성능 최적화
- 접근성 표준 준수
- SEO 최적화 (alt 텍스트)
- 다크모드 지원

## 📝 체크리스트
- [ ] 캐러셀 컴포넌트 생성
- [ ] 타입 정의 추가
- [ ] 카테고리 등록
- [ ] 반응형 디자인 구현
- [ ] 자동 재생 기능
- [ ] 터치 지원
- [ ] 접근성 구현
- [ ] 다크모드 스타일
- [ ] 성능 최적화
- [ ] 테스트 및 검증