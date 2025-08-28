# 캐러셀 표시 옵션 고도화 설계 문서

## 📋 현재 문제점 분석

### 1. 레이아웃 문제
- **컨텐츠 영역 오버플로우**: 높이가 작을 때 텍스트가 잘리거나 버튼이 겹침
- **패딩 불일치**: 상하 패딩이 옵션에 따라 일관성 없음
- **인디케이터 겹침**: 내부 배치 시 컨텐츠와 인디케이터가 겹침
- **버튼 위치 문제**: 좌우 버튼이 컨텐츠와 적절히 분리되지 않음

### 2. 반응형 문제
- PC 최소 높이 300px 미적용
- 모바일에서 버튼 크기 미조정
- 컨텐츠 여백 반응형 처리 부족

### 3. 옵션 연동 문제
- 높이 변경 시 모든 요소가 비례적으로 조정되지 않음
- 인디케이터 위치에 따른 컨텐츠 영역 재계산 미흡

## 🎯 개선 목표

### 핵심 원칙
1. **명확한 영역 분리**: 버튼, 컨텐츠, 인디케이터가 절대 겹치지 않음
2. **비례적 크기 조정**: 높이에 따라 모든 요소가 조화롭게 조정
3. **완벽한 반응형**: PC/모바일 각각 최적화된 레이아웃
4. **즉시 반영**: 모든 옵션이 실시간으로 정확히 적용

## 📐 레이아웃 구조 설계

### PC 레이아웃 구조 (min-width: 768px)
```
┌─────────────────────────────────────────────────┐
│          캐러셀 컨테이너 (width: 100%)           │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───┬───────────────────────────────┬───┐     │
│  │   │                               │   │     │ height: options.height
│  │ < │     컨텐츠 영역               │ > │     │
│  │   │     (콘텐츠 패딩 적용)        │   │     │
│  └───┴───────────────────────────────┴───┘     │
│                                                 │
├─────────────────────────────────────────────────┤
│         [인디케이터 영역]                        │ height: 50px (내부) or 0px
└─────────────────────────────────────────────────┘

총 높이 = options.height (인디케이터 내부 시 포함)
```

### 영역별 정확한 계산식

#### 1. 전체 높이 계산
```typescript
// PC 최소/최대 높이
const MIN_HEIGHT = 300
const MAX_HEIGHT = 800

// 실제 적용 높이
const appliedHeight = Math.max(MIN_HEIGHT, Math.min(options.height, MAX_HEIGHT))

// 인디케이터 높이
const INDICATOR_HEIGHT = 50

// 컨텐츠 영역 실제 높이
const contentAreaHeight = options.indicatorPosition === 'inside' 
  ? appliedHeight - INDICATOR_HEIGHT 
  : appliedHeight
```

#### 2. 컨텐츠 패딩 계산 (높이 비례)
```typescript
const getContentPadding = (height: number) => {
  // 기본 패딩 계산 (높이의 8%)
  const basePadding = height * 0.08
  const minPadding = 24
  const maxPadding = 60
  
  const vertical = Math.max(minPadding, Math.min(basePadding, maxPadding))
  
  // 인디케이터가 내부일 때 하단 패딩 추가
  const bottom = options.indicatorPosition === 'inside' 
    ? vertical + 10 // 인디케이터와의 간격
    : vertical
  
  return {
    top: `${vertical}px`,
    bottom: `${bottom}px`,
    sides: `${Math.max(80, height * 0.2)}px` // 좌우 패딩 (버튼 공간)
  }
}
```

#### 3. 버튼 크기 및 위치
```typescript
const getButtonStyles = () => {
  const sizes = {
    small: { button: 40, icon: 20, offset: 50 },
    medium: { button: 48, icon: 24, offset: 60 },
    large: { button: 64, icon: 32, offset: 80 },
    custom: { 
      button: options.customButtonSize, 
      icon: options.customIconSize,
      offset: options.customButtonSize + 20
    }
  }
  
  const current = sizes[options.navigationSize]
  
  // 위치 계산
  const position = options.navigationPosition === 'safe'
    ? { left: current.offset, right: current.offset }
    : { left: 16, right: 16 }
  
  return {
    width: current.button,
    height: current.button,
    iconSize: current.icon,
    ...position
  }
}
```

## 🔧 구현 상세

### 1. 높이별 동적 스타일 시스템
```typescript
const getHeightBasedStyles = (height: number) => {
  if (height <= 350) {
    return {
      title: 'text-2xl md:text-3xl lg:text-4xl',
      subtitle: 'text-xs md:text-sm',
      description: 'text-sm md:text-base line-clamp-2',
      button: 'h-9 text-sm',
      spacing: 'space-y-2 md:space-y-3'
    }
  } else if (height <= 450) {
    return {
      title: 'text-3xl md:text-4xl lg:text-5xl',
      subtitle: 'text-sm md:text-base',
      description: 'text-base md:text-lg line-clamp-3',
      button: 'h-10 text-base',
      spacing: 'space-y-3 md:space-y-4'
    }
  } else if (height <= 550) {
    return {
      title: 'text-4xl md:text-5xl lg:text-6xl',
      subtitle: 'text-base md:text-lg',
      description: 'text-lg md:text-xl',
      button: 'h-11 text-base',
      spacing: 'space-y-4 md:space-y-5'
    }
  } else {
    return {
      title: 'text-5xl md:text-6xl lg:text-7xl',
      subtitle: 'text-lg md:text-xl',
      description: 'text-xl md:text-2xl',
      button: 'h-12 text-lg',
      spacing: 'space-y-5 md:space-y-6'
    }
  }
}
```

### 2. 인디케이터 위치 시스템
```typescript
// 내부 배치: 절대 위치로 하단 고정
const internalIndicatorStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: INDICATOR_HEIGHT,
  background: 'bg-black/20 backdrop-blur-sm',
  zIndex: 10
}

// 외부 배치: 캐러셀 아래 별도 영역
const externalIndicatorStyles = {
  position: 'relative',
  marginTop: '16px',
  height: 'auto'
}
```

### 3. 컨텐츠 영역 오버플로우 방지
```typescript
const contentContainerStyles = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden', // 오버플로우 방지
  position: 'relative'
}

// 텍스트 줄 수 제한
const textLimits = {
  title: 'line-clamp-2',      // 제목 최대 2줄
  description: height <= 350 
    ? 'line-clamp-2'          // 작은 높이: 2줄
    : 'line-clamp-3'          // 큰 높이: 3줄
}
```

## 📱 반응형 처리

### 브레이크포인트별 처리
```typescript
const responsiveConfig = {
  mobile: {  // < 768px
    hideNavigationButtons: true,
    reducePadding: 0.7,
    simplifyTypography: true,
    forceIndicatorOutside: false
  },
  tablet: {  // 768px - 1024px
    showNavigationButtons: true,
    reducePadding: 0.85,
    normalTypography: true
  },
  desktop: { // > 1024px
    showNavigationButtons: true,
    fullPadding: 1,
    enhancedTypography: true
  }
}
```

## 🚀 구현 단계

### Phase 1: 기본 구조 개선 ✅
1. 컴포넌트 백업
2. 높이 계산 로직 정리
3. PC 최소 높이 적용

### Phase 2: 레이아웃 시스템
1. 컨텐츠 영역 정확한 계산
2. 패딩 시스템 구현
3. 오버플로우 방지

### Phase 3: 동적 스타일
1. 높이별 타이포그래피
2. 버튼 크기 조정
3. 간격 최적화

### Phase 4: 인디케이터 개선
1. 내부/외부 위치 정확한 구현
2. 겹침 방지
3. 스타일 옵션 적용

### Phase 5: 반응형 완성
1. 모바일 최적화
2. 태블릿 처리
3. 테스트 및 검증

## ✅ 성공 기준

- [x] 설계 문서 작성 완료
- [ ] PC 최소 높이 300px 보장
- [ ] 모든 높이에서 요소 겹침 없음
- [ ] 인디케이터 위치별 정확한 레이아웃
- [ ] 버튼과 컨텐츠 명확한 분리
- [ ] 옵션 변경 시 즉시 반영
- [ ] 완벽한 반응형 동작