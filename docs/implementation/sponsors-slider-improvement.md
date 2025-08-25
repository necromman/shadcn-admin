# 스폰서 슬라이더 개선 계획

## 📋 현재 문제점 분석

### 1. 아이콘 관리 문제
- **현재 상황**: 모든 브랜드 로고를 직접 SVG 코드로 작성
- **문제점**:
  - SVG 코드 작성 시 오류 발생 가능성
  - 유지보수 어려움
  - 코드 가독성 저하
  - 파일 크기 증가

### 2. 무한 슬라이드 문제
- **현재 상황**: 
  - 10개 아이템을 3번 복제 (총 30개)
  - translateX(-33.333%) 사용
- **문제점**:
  - 애니메이션 끝에서 끊김 발생
  - 시작점으로 돌아갈 때 점프 현상
  - 아이템 개수에 따른 동적 대응 불가

## 🎯 개선 방안

### 1. 아이콘 라이브러리 도입
**react-icons 라이브러리 사용**
- 이미 최적화된 브랜드 로고 제공
- 일관된 크기와 스타일
- 타입 안전성 보장
- 트리 쉐이킹 지원으로 번들 크기 최적화

```tsx
import { 
  FaApple, 
  FaMicrosoft, 
  FaGoogle,
  FaAmazon,
  FaMeta,
  // ... 
} from 'react-icons/fa6'
import { SiTesla, SiNetflix, SiSpotify, SiAdobe, SiNvidia } from 'react-icons/si'
```

### 2. 무한 슬라이드 로직 개선

#### 현재 접근법의 문제
- 단순 복제로 인한 메모리 낭비
- 고정된 translateX 값으로 유연성 부족

#### 개선된 접근법
1. **동적 복제 계산**
   - 뷰포트 너비 측정
   - 필요한 최소 복제 횟수 계산
   - 아이템 너비 * 개수 > 뷰포트 너비 * 2

2. **끊김 없는 애니메이션**
   ```css
   @keyframes infinite-scroll {
     0% {
       transform: translateX(0);
     }
     100% {
       /* 정확히 한 세트만큼 이동 */
       transform: translateX(calc(-100% / 복제수));
     }
   }
   ```

3. **리셋 로직**
   - 애니메이션 끝 감지
   - transform 리셋 없이 연속 재생

## 📝 구현 단계

### Step 1: react-icons 설치
```bash
pnpm add react-icons
```

### Step 2: 데이터 구조 개선
```tsx
const sponsorsData = [
  { id: 1, name: "Apple", Icon: FaApple },
  { id: 2, name: "Microsoft", Icon: FaMicrosoft },
  // ...
]
```

### Step 3: 무한 슬라이드 계산 로직
```tsx
// 뷰포트 너비에 따른 동적 복제
const calculateDuplicates = () => {
  const viewportWidth = window.innerWidth
  const itemWidth = 176 // 카드 너비 + 간격
  const totalWidth = sponsorsData.length * itemWidth
  
  // 최소 2세트가 보이도록 복제 수 계산
  return Math.ceil((viewportWidth * 2) / totalWidth) + 1
}
```

### Step 4: CSS 애니메이션 개선
```css
.infinite-scroll {
  display: flex;
  animation: scroll var(--duration) linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    /* 정확히 한 세트 너비만큼 이동 */
    transform: translateX(calc(-100% / var(--sets)));
  }
}
```

## ✅ 기대 효과

1. **코드 품질 향상**
   - 500줄 이상의 SVG 코드 제거
   - 타입 안전성 확보
   - 유지보수성 개선

2. **성능 개선**
   - 불필요한 DOM 요소 감소
   - 부드러운 애니메이션
   - 메모리 사용량 최적화

3. **사용자 경험 개선**
   - 끊김 없는 무한 스크롤
   - 일관된 로고 품질
   - 반응형 대응 개선

## 🚀 실행 계획

1. ✅ 현재 상황 분석
2. ⏳ react-icons 설치
3. ⏳ 스폰서 데이터 구조 변경
4. ⏳ 컴포넌트 로직 개선
5. ⏳ CSS 애니메이션 수정
6. ⏳ 테스트 및 검증
7. ⏳ 최종 최적화

---
*작성일: 2025-12-22*