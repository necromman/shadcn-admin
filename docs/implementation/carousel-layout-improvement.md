# 캐러셀 레이아웃 근본 개선안

## 🔍 현재 문제점 분석

### 1. 레이아웃 구조 문제
- **문제**: 캐러셀이 100% 너비이지만, 안전영역(container: 1472px)과 버튼 위치가 불일치
- **원인**: 버튼이 절대 위치로 캐러셀 전체를 기준으로 배치됨
- **영향**: 버튼과 컨텐츠가 정렬되지 않음

### 2. 버튼 위치 문제
- **세로 정렬**: 인디케이터 영역 포함한 전체 높이 기준으로 중앙 정렬되어 실제 컨텐츠와 불일치
- **가로 정렬**: container 영역과 무관하게 배치

### 3. 컨텐츠 패딩 문제
- **좌우 패딩**: 버튼 공간 확보가 불충분
- **버튼과 컨텐츠 간격**: 명확한 분리 없음

## 🎯 개선 목표

### 핵심 원칙
1. **Container 기준 레이아웃**: 모든 요소를 안전영역(1472px) 내에 정렬
2. **정확한 버튼 위치**: 컨텐츠 영역의 정확한 중앙에 버튼 배치
3. **충분한 컨텐츠 패딩**: 버튼 크기만큼 좌우 패딩 확보
4. **인디케이터 좌측 정렬**: 중앙이 아닌 좌측 정렬

## 📐 새로운 레이아웃 구조

```
┌────────────────────────────────────────────────────────┐
│                  캐러셀 (width: 100%)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Container (max-width: 1472px)          │  │
│  │  ┌───┬────────────────────────────────┬───┐     │  │
│  │  │BTN│      컨텐츠 영역                │BTN│     │  │ ← 컨텐츠 높이 중앙
│  │  │ < │   (좌우 패딩: 버튼크기+20px)    │ > │     │  │
│  │  └───┴────────────────────────────────┴───┘     │  │
│  │  [●●●○○] 인디케이터 (좌측 정렬)                  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

## 🔧 구현 상세

### 1. 캐러셀 구조 개선
```typescript
<div className="w-full relative"> // 캐러셀 컨테이너
  <div className="relative overflow-hidden bg-[#151515]">
    
    {/* 슬라이드 영역 */}
    <Carousel>
      <CarouselContent>
        {slides.map(slide => (
          <CarouselItem>
            <div className="h-full">
              <div className="container mx-auto relative h-full"> // 안전영역
                
                {/* 컨텐츠 - 버튼 공간만큼 패딩 */}
                <div style={{ 
                  paddingLeft: buttonSize + 20,
                  paddingRight: buttonSize + 20
                }}>
                  {content}
                </div>
                
                {/* 버튼들 - container 내부에 절대 위치 */}
                <button className="absolute left-0 top-1/2" />
                <button className="absolute right-0 top-1/2" />
                
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    
    {/* 인디케이터 - 좌측 정렬 */}
    <div className="container mx-auto">
      <div className="flex items-center justify-start"> // justify-center → justify-start
        {indicators}
      </div>
    </div>
    
  </div>
</div>
```

### 2. 버튼 위치 계산
```typescript
// 버튼 세로 위치: 컨텐츠 영역 높이의 중앙
const buttonVerticalPosition = {
  top: contentAreaHeight / 2, // 인디케이터 제외한 순수 컨텐츠 높이
  transform: 'translateY(-50%)'
}

// 버튼 가로 위치: container 내부 좌우 끝
const buttonHorizontalPosition = {
  left: 0,  // container 기준
  right: 0  // container 기준
}
```

### 3. 컨텐츠 패딩 계산
```typescript
const getContentPadding = () => {
  const buttonSizes = {
    small: 40,
    medium: 48,
    large: 64, // 기본값으로 설정
    custom: customButtonSize
  }
  
  const currentButtonSize = buttonSizes[navigationSize]
  const buttonSpacing = 20 // 버튼과 컨텐츠 간격
  
  return {
    paddingLeft: currentButtonSize + buttonSpacing,
    paddingRight: currentButtonSize + buttonSpacing
  }
}
```

### 4. 라이트/다크 모드 버튼 스타일
```typescript
const buttonStyles = {
  dark: {
    background: 'bg-white/10 backdrop-blur-sm',
    border: 'border border-white/20',
    hover: 'hover:bg-white/20'
  },
  light: {
    background: 'bg-transparent', // 배경 없음
    border: 'border-0',
    hover: 'hover:bg-black/5' // 매우 연한 호버
  }
}
```

### 5. 인디케이터 정렬
```typescript
// 기존: justify-center
// 개선: justify-start (좌측 정렬)
<div className="container mx-auto">
  <div className="flex items-center justify-start gap-4 px-4">
    <Button>{playPause}</Button>
    <div className="flex gap-2">
      {indicators}
    </div>
  </div>
</div>
```

## 📊 기본값 변경

| 옵션 | 기존 | 변경 |
|------|-----|------|
| navigationSize | medium | large |
| 버튼 배경 (라이트) | 있음 | 없음 |
| 인디케이터 정렬 | 중앙 | 좌측 |
| 컨텐츠 패딩 | 고정값 | 버튼크기 + 20px |

## 🚀 구현 단계

1. **캐러셀 HTML 구조 재구성**
   - Container 기준 레이아웃으로 변경
   - 버튼을 container 내부에 배치

2. **버튼 위치 시스템 개선**
   - 컨텐츠 영역 높이 기준 중앙 정렬
   - Container 좌우 끝 배치

3. **컨텐츠 패딩 동적 계산**
   - 버튼 크기에 따른 자동 패딩
   - 충분한 여백 확보

4. **스타일 시스템 개선**
   - 라이트/다크 모드 분리
   - 라이트 모드 버튼 배경 제거

5. **인디케이터 좌측 정렬**
   - justify-start 적용
   - 적절한 좌측 패딩

## ✅ 예상 결과

- 모든 요소가 안전영역(1472px) 내에 정렬
- 버튼이 컨텐츠 높이의 정확한 중앙에 위치
- 컨텐츠와 버튼 간 충분한 여백
- 라이트 모드에서 깔끔한 버튼 표시
- 인디케이터 좌측 정렬로 균형잡힌 레이아웃