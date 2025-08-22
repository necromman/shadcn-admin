# Sponsors Slider 흐름 애니메이션 이슈 문서

## 📋 현재 상황

### 구현된 기능
- ✅ 토글 버튼 (Play/Pause 아이콘)
- ✅ useState로 isAnimating 상태 관리
- ✅ 정적 모드 (flex-wrap, 반응형 그리드)
- ✅ 조건부 렌더링 (애니메이션 시 데이터 2배 복제)
- ✅ 카드 디자인 (로고 돌출, 완벽한 중앙 정렬)

### 🚨 현재 이슈
**흐름 애니메이션이 작동하지 않음**

- CSS 클래스 `animate-scroll-right`가 적용되지만 실제 애니메이션 동작 안함
- `business-cards.css`에 정의된 애니메이션이 제대로 연결되지 않는 것으로 추정

## 🎯 원하는 동작

### 자동 흐름 모드 (기본값)
1. **무한 좌→우 스크롤** - 끊김 없이 연속적으로 흐름
2. **20초 주기** - 한 바퀴 도는데 20초 소요
3. **호버 시 일시정지** - 마우스 올리면 애니메이션 멈춤
4. **데이터 2배 복제** - 끊김 없는 순환을 위해 sponsors 배열 복제

### 토글 시 동작
- **기본**: 흐름 모드 활성화
- **토글 클릭**: 정적 그리드로 전환
- **재클릭**: 다시 흐름 모드로 복귀

## 🔧 기술적 요구사항

### CSS 애니메이션
```css
@keyframes scroll-right {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll-right {
  animation: scroll-right 20s linear infinite;
}

.animate-scroll-right:hover {
  animation-play-state: paused;
}
```

### React 컴포넌트 구조
```tsx
const [isAnimating, setIsAnimating] = useState(true)
const displaySponsors = isAnimating ? [...sponsorsData, ...sponsorsData] : sponsorsData

// 조건부 클래스 적용
className={`flex ${isAnimating ? 'animate-scroll-right space-x-8' : 'justify-center flex-wrap gap-8'}`}
```

## 📁 관련 파일 위치

### 컴포넌트
- `src/components/design-system/ds-sponsors-slider.tsx`

### 스타일
- `src/styles/frontend/components/business-cards.css`
- `src/styles/frontend/index.css` (import 체크 필요)

### 사용 위치
- `src/components/design-system/ds-portfolio-section.tsx`
- `src/features/design-system/frontend-section.tsx`

## 🐛 디버깅 체크리스트

1. **CSS 파일 import 확인**
   - business-cards.css가 올바르게 import되었는지
   - index.css에서 business-cards.css를 포함하는지

2. **CSS 클래스 충돌 확인**
   - 다른 CSS가 animate-scroll-right를 덮어쓰는지
   - Tailwind CSS와의 충돌 가능성

3. **애니메이션 CSS 위치 확인**
   - @keyframes가 올바른 파일에 정의되었는지
   - 클래스명 오타 확인

4. **브라우저 개발자 도구 확인**
   - 실제 DOM에 animate-scroll-right 클래스가 적용되는지
   - CSS 애니메이션이 인식되는지

## 🎨 현재 완성된 디자인 요소

### 카드 디자인
- 로고가 카드 윤곽선 밖으로 돌출 (-top-8)
- w-16 h-16 원형 로고 컨테이너
- w-40 h-24 카드 크기
- 시그니처 브랜드 색상 미묘하게 적용

### 토글 UI
- Play/Pause 아이콘
- "자동 흐름" / "정적 보기" 텍스트
- outline 버튼 스타일

### 반응형 처리
- 정적 모드: max-w-6xl, flex-wrap, gap-8
- 애니메이션 모드: space-x-8, flex-shrink-0

## 🚀 다음 세션 작업 계획

1. CSS 애니메이션 연결 문제 해결
2. 흐름 효과 정상 작동 확인
3. 호버 시 일시정지 기능 테스트
4. 반응형 동작 최종 검증
5. 성능 최적화 (필요시)

---
*생성일: 2024-12-22*
*작성자: Claude Code Assistant*