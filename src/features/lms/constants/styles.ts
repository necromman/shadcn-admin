// LMS 스타일 상수
export const LMS_STYLES = {
  // 이미지 border-radius 설정 (픽셀 값으로 직접 설정 - CSS 변수 충돌 방지)
  imageRadius: 'rounded-[8px]', // 커스텀 8px 값 (--radius CSS 변수와 충돌 방지)

  // 다른 옵션들 (픽셀 값으로 직접 설정):
  // imageRadius: 'rounded-[0px]',     // 0px (각진 모서리)
  // imageRadius: 'rounded-[2px]',     // 2px
  // imageRadius: 'rounded-[4px]',     // 4px
  // imageRadius: 'rounded-[6px]',     // 6px
  // imageRadius: 'rounded-[8px]',     // 8px (현재 설정)
  // imageRadius: 'rounded-[10px]',    // 10px
  // imageRadius: 'rounded-[12px]',    // 12px
  // imageRadius: 'rounded-[16px]',    // 16px
  // imageRadius: 'rounded-[20px]',    // 20px
  // imageRadius: 'rounded-[24px]',    // 24px
  // imageRadius: 'rounded-[9999px]',  // 완전히 둥글게

  // 섹션 배경색 설정
  sectionBg: {
    even: 'bg-gray-50/50 dark:bg-card/30',      // 짝수 섹션
    odd: 'bg-white dark:bg-background'          // 홀수 섹션
  },

  // 카드 너비 설정
  cardWidth: 'w-[300px]',

  // 간격 설정
  cardGap: 'gap-4',

  // 애니메이션 설정
  imageHoverScale: 'group-hover:scale-105',
  transitionDuration: 'duration-300'
} as const