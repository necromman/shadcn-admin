import type { PopupPosition, PopupLayout } from './types'

// 개선된 위치 계산 함수 - 단순하고 명확한 로직
export const calculatePosition = (
  index: number, 
  position: PopupPosition, 
  layout: PopupLayout, 
  totalPopups: number
) => {
  // 모바일에서는 위치 계산 불필요
  if (window.innerWidth < 768) {
    return { x: 0, y: 0, debug: 'mobile' }
  }
  
  // 데스크톱 팝업 크기와 간격 상수
  const POPUP_WIDTH = 440     // 팝업 고정 너비
  const POPUP_HEIGHT = 580    // 팝업 고정 높이
  const POPUP_GAP = 10        // 팝업 간 간격 (줄임)
  const SCREEN_MARGIN = 40    // 화면 가장자리 여백 (왼쪽/오른쪽용)
  const HERO_HEIGHT = 700     // 히어로 영역 높이
  const CONTAINER_PADDING = 100  // 컨테이너 좌우 패딩 보정값 (중앙/오른쪽 정렬시 사용)
  
  // 기본 Y 위치는 항상 중앙 정렬
  const baseY = (HERO_HEIGHT - POPUP_HEIGHT) / 2
  
  // 레이아웃별 위치 계산
  let x = 0
  let y = baseY
  
  if (layout === 'stack') {
    // 겹치기: 계단형 배치
    const STACK_OFFSET = 40  // 각 팝업마다 오프셋
    
    // 전체 스택 너비 계산 (마지막 팝업 기준)
    const totalStackWidth = POPUP_WIDTH + ((totalPopups - 1) * STACK_OFFSET)
    
    switch (position) {
      case 'left':
        // 왼쪽: 왼쪽 여백에서 시작
        x = SCREEN_MARGIN + (index * STACK_OFFSET)
        break
      case 'center': {
        // 중앙: 스택 전체를 중앙 정렬 (컨테이너 패딩 고려)
        const centerStart = (window.innerWidth - totalStackWidth - CONTAINER_PADDING) / 2
        x = centerStart + (index * STACK_OFFSET)
        break
      }
      case 'right': {
        // 오른쪽: 오른쪽 여백에서 시작 (컨테이너 패딩 고려)
        const rightStart = window.innerWidth - SCREEN_MARGIN - totalStackWidth - CONTAINER_PADDING
        x = rightStart + (index * STACK_OFFSET)
        break
      }
    }
    y = baseY + (index * STACK_OFFSET)
    
  } else if (layout === 'horizontal') {
    // 가로 배치: 일렬로 배치
    const totalWidth = (totalPopups * POPUP_WIDTH) + ((totalPopups - 1) * POPUP_GAP)
    
    switch (position) {
      case 'left':
        // 왼쪽: 왼쪽 여백에서 시작
        x = SCREEN_MARGIN + (index * (POPUP_WIDTH + POPUP_GAP))
        break
      case 'center': {
        // 중앙: 전체 너비를 중앙 정렬 (컨테이너 패딩 고려)
        const centerStart = (window.innerWidth - totalWidth - CONTAINER_PADDING) / 2
        x = centerStart + (index * (POPUP_WIDTH + POPUP_GAP))
        break
      }
      case 'right': {
        // 오른쪽: 오른쪽 여백 기준으로 정렬 (컨테이너 패딩 고려)
        const rightStart = window.innerWidth - SCREEN_MARGIN - totalWidth - CONTAINER_PADDING
        x = rightStart + (index * (POPUP_WIDTH + POPUP_GAP))
        break
      }
    }
    
    // 화면 벗어남 방지 - 필요시 2열로
    const maxX = window.innerWidth - POPUP_WIDTH - SCREEN_MARGIN
    if (x > maxX || x < SCREEN_MARGIN) {
      // 화면 범위 내로 제한
      if (position === 'center') {
        // 중앙 정렬일 때 2열 처리 (컨테이너 패딩 고려)
        const availableWidth = window.innerWidth - CONTAINER_PADDING
        const itemsPerRow = Math.floor(availableWidth / (POPUP_WIDTH + POPUP_GAP))
        const row = Math.floor(index / itemsPerRow)
        const col = index % itemsPerRow
        const rowItems = Math.min(totalPopups - row * itemsPerRow, itemsPerRow)
        const rowWidth = (rowItems * POPUP_WIDTH) + ((rowItems - 1) * POPUP_GAP)
        
        x = (window.innerWidth - rowWidth - CONTAINER_PADDING) / 2 + (col * (POPUP_WIDTH + POPUP_GAP))
        y = baseY + (row * (POPUP_HEIGHT / 2))
      } else {
        // 왼쪽/오른쪽은 화면 범위 내로 제한
        x = Math.max(SCREEN_MARGIN, Math.min(x, maxX))
      }
    }
    
  } else if (layout === 'vertical') {
    // 세로 배치: 위아래로 배치
    const VERTICAL_OVERLAP = POPUP_HEIGHT * 0.3  // 30% 겹침
    const effectiveHeight = POPUP_HEIGHT - VERTICAL_OVERLAP
    const totalHeight = POPUP_HEIGHT + ((totalPopups - 1) * effectiveHeight)
    
    // X 위치 설정
    switch (position) {
      case 'left':
        x = SCREEN_MARGIN
        break
      case 'center':
        x = (window.innerWidth - POPUP_WIDTH - CONTAINER_PADDING) / 2
        break
      case 'right':
        x = window.innerWidth - POPUP_WIDTH - SCREEN_MARGIN - CONTAINER_PADDING / 2
        break
    }
    
    // Y 위치: 전체 높이를 중앙 정렬
    const startY = (HERO_HEIGHT - totalHeight) / 2
    y = startY + (index * effectiveHeight)
  }
  
  // 최종 범위 체크 (안전장치)
  x = Math.max(20, Math.min(x, window.innerWidth - POPUP_WIDTH - 20))
  y = Math.max(20, Math.min(y, HERO_HEIGHT - POPUP_HEIGHT - 20))
  
  return { 
    x: Math.round(x),  // 정수로 반올림
    y: Math.round(y), 
    debug: `${position}-${layout}-${index+1}/${totalPopups}`
  }
}