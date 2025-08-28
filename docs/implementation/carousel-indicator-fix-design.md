# 캐러셀 인디케이터 및 네비게이션 개선 설계

## 📋 요구사항
- 인디케이터와 네비게이션 버튼이 슬라이드 전환 시 움직이지 않도록 수정
- 컨텐츠 영역의 레이아웃은 유지 (패딩 공간 확보)
- 좌우 버튼과 인디케이터 영역이 서로 침범하지 않도록 구성

## 🎯 핵심 레이아웃 전략

### 1. **영역 구성**
```
┌─────────────────────────────────────┐
│  캐러셀 컨테이너 (높이: 100%)        │
│  ┌─────┬─────────────────┬─────┐   │
│  │ 좌  │                 │ 우  │   │
│  │ 버  │  컨텐츠 영역     │ 버  │   │
│  │ 튼  │                 │ 튼  │   │
│  │     │                 │     │   │
│  │ H:  │                 │ H:  │   │
│  │100% │  ───────────    │100% │   │
│  │     │  인디케이터      │     │   │
│  └─────┴─────────────────┴─────┘   │
└─────────────────────────────────────┘
```

### 2. **구조 설계**

#### 좌우 네비게이션 버튼
- **높이**: 캐러셀 전체 높이 (100%)
- **위치**: 캐러셀 컨테이너 기준 absolute
- **정렬**: 세로 중앙 (top: 50%, translateY: -50%)
- **영역**: 버튼 크기 + 여백으로 고정 너비 확보

#### 캐러셀 아이템 (슬라이드)
- **높이**: 캐러셀 높이 유지
- **패딩**: 
  - 좌우: 버튼 영역 만큼 패딩 (버튼과 겹치지 않도록)
  - 하단: 인디케이터 "내부" 시 추가 패딩

#### 인디케이터
- **위치**: 캐러셀 컨테이너 기준 absolute
- **가로 영역**: 좌우 버튼 영역을 제외한 컨텐츠 영역 너비
- **정렬**: 하단 고정, 좌우 버튼 사이에만 표시
- **이동**: 슬라이드 전환 시 고정 위치 유지

## 🔧 구현 전략

### 1. **HTML 구조 변경**
```html
<!-- Before -->
<Carousel>
  <CarouselItem>
    <Container>
      <Content />
      <Indicators /> <!-- 제거 -->
      <NavigationButtons /> <!-- 제거 -->
    </Container>
  </CarouselItem>
</Carousel>

<!-- After -->
<div class="relative"> <!-- 캐러셀 래퍼 -->
  <Carousel>
    <CarouselItem>
      <Container>
        <Content /> <!-- 패딩 유지 -->
      </Container>
    </CarouselItem>
  </Carousel>
  
  <!-- 고정 인디케이터 -->
  <div class="absolute bottom-0" 
       style="left: buttonWidth, right: buttonWidth">
    <Indicators />
  </div>
  
  <!-- 고정 네비게이션 -->
  <CarouselPrevious class="absolute left-0" />
  <CarouselNext class="absolute right-0" />
</div>
```

### 2. **스타일 계산**
```typescript
// 버튼 영역 너비
const buttonAreaWidth = buttonSize + spacing

// 컨텐츠 영역 패딩
const contentPadding = {
  left: buttonAreaWidth,    // 좌측 버튼 공간
  right: buttonAreaWidth,   // 우측 버튼 공간
  bottom: indicatorPosition === 'inside' 
    ? indicatorHeight 
    : 0
}

// 인디케이터 위치
const indicatorStyle = {
  left: buttonAreaWidth,    // 좌측 버튼 회피
  right: buttonAreaWidth,   // 우측 버튼 회피
  bottom: indicatorPosition === 'inside' ? padding : 0
}
```

### 3. **Container 기준 정렬**
- Container 너비를 기준으로 모든 요소 정렬
- 인디케이터는 Container 패딩 내부에 위치
- 버튼은 Container 경계에 위치

## ✅ 예상 결과
1. 인디케이터가 슬라이드 전환 시 움직이지 않음
2. 좌우 버튼이 항상 세로 중앙 정렬 유지
3. 인디케이터와 버튼 영역이 겹치지 않음
4. 컨텐츠 레이아웃 변경 없음

## 📝 구현 체크리스트
- [ ] CarouselItem 내부에서 인디케이터 제거
- [ ] CarouselItem 내부에서 네비게이션 버튼 제거
- [ ] 캐러셀 래퍼에 relative 포지션 적용
- [ ] 인디케이터를 absolute로 하단 고정
- [ ] 네비게이션 버튼을 absolute로 좌우 고정
- [ ] 버튼 영역과 인디케이터 영역 분리
- [ ] 컨텐츠 패딩 유지
- [ ] 모바일 반응형 처리
- [ ] 테스트 및 검증

## 🚀 다음 단계
1. 설계 문서 검토
2. TodoWrite로 작업 관리
3. 컴포넌트 수정
4. 테스트 및 검증