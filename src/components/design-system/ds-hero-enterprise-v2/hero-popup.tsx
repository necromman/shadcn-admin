import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { HiArrowRight, HiXMark, HiRocketLaunch } from 'react-icons/hi2'
import type { PopupProps } from './types'

// 팝업 컴포넌트 (반응형 지원)
export function HeroPopup({ data, onClose, position, zIndex, showDebug = false, animationSpeed = 'normal' }: PopupProps) {
  // 모바일 감지
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // 모바일에서는 풀스크린 모달로 표시
  if (isMobile) {
    return (
      <>
        {/* 메인 컨테이너 */}
        <div 
          className="fixed inset-0 flex items-end z-40"
        >
          {/* 전체 오버레이 */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => onClose(data.id)}
          />
          
          {/* 바텀 시트 */}
          <div className="relative w-full max-h-[90vh] animate-in slide-in-from-bottom duration-300 z-40">
          <Card className="rounded-t-2xl rounded-b-none border-b-0 bg-background overflow-hidden">
            {/* 드래그 핸들 */}
            <div className="flex justify-center py-2">
              <div className="w-12 h-1 rounded-full bg-muted-foreground/20" />
            </div>
            
            {/* 헤더 */}
            <div className="px-6 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant={data.badgeVariant || (data.type === 'image' ? 'secondary' : 'default')} className="mb-2">
                    {data.badgeIcon && <data.badgeIcon className="w-3 h-3 mr-1" />}
                    {data.badge}
                  </Badge>
                  <h2 className="text-xl font-bold">{data.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClose(data.id)
                  }}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* 콘텐츠 */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[60vh]">
              {data.type === 'image' && data.imageUrl && (
                <div className="rounded-lg overflow-hidden bg-muted mb-4">
                  <img 
                    src={data.imageUrl} 
                    alt="Content"
                    className="w-full h-auto"
                  />
                </div>
              )}
              {data.content}
            </div>
            
            {/* 액션 버튼 */}
            <div className="px-6 pb-6">
              <Button className="w-full" size="lg">
                자세히 알아보기
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      </>
    )
  }
  
  // 애니메이션 속도 설정
  const animationDuration = {
    slow: 'duration-1000',
    normal: 'duration-500',
    fast: 'duration-200'
  }[animationSpeed]
  
  // 데스크톱에서는 팝업으로 표시
  if (data.type === 'image') {
    return (
      <div 
        className="absolute"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          zIndex 
        }}
      >
        {/* 디버그 정보 표시 */}
        {showDebug && (
          <div className="absolute -top-8 left-0 text-xs bg-black/80 text-white px-2 py-1 rounded z-50 whitespace-nowrap">
            {position.debug} | X:{position.x} Y:{position.y}
          </div>
        )}
        <div className={`animate-in slide-in-from-top-5 ${animationDuration} group`} style={{ width: '440px' }}>
          <Card className="relative border shadow-lg bg-background overflow-hidden flex flex-col py-0" style={{ height: '580px' }}>
            {/* 오른쪽 상단 X 버튼 (호버시 표시) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose(data.id)
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background border flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
              aria-label="닫기"
            >
              <HiXMark className="w-4 h-4" />
            </button>
            
            {/* 상단 라벨 */}
            <div className="px-6 pt-6 pb-3">
              <Badge variant={data.badgeVariant || 'secondary'} className="mb-3">
                {data.badgeIcon && <data.badgeIcon className="w-3 h-3 mr-1" />}
                {data.badge}
              </Badge>
              <h2 className="text-xl font-bold">
                {data.title}
              </h2>
            </div>
            
            {/* 이미지 영역과 콘텐츠 - 높이 증가 */}
            <div className="px-6 pb-4 flex-1 flex flex-col">
              <div className="relative rounded-lg overflow-hidden bg-muted h-[200px] flex-shrink-0">
                {data.imageUrl ? (
                  <img 
                    src={data.imageUrl} 
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <HiRocketLaunch className="w-16 h-16 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">Product Image</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-3 text-sm text-muted-foreground overflow-y-auto flex-1">
                {data.content}
              </div>
            </div>
            
            {/* CTA 버튼 */}
            <div className="px-6 pb-4">
              <Button className="w-full" size="lg">
                자세히 알아보기
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* 하단 옵션 */}
            <div className="flex border-t bg-background mt-auto">
              <button 
                type="button"
                className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClose(data.id)
                }}
              >
                오늘 하루 보지 않기
              </button>
              <div className="w-px bg-border" />
              <button 
                type="button"
                className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClose(data.id)
                }}
              >
                닫기
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  }
  
  // 텍스트 중심 팝업 (공지사항/업데이트)
  return (
    <div 
      className="absolute"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        zIndex 
      }}
    >
      {/* 디버그 정보 표시 */}
      {showDebug && (
        <div className="absolute -top-8 left-0 text-xs bg-black/80 text-white px-2 py-1 rounded z-50 whitespace-nowrap">
          {position.debug} | X:{position.x} Y:{position.y}
        </div>
      )}
      <div className={`animate-in slide-in-from-top-5 ${animationDuration} group`} style={{ width: '440px' }}>
        <Card className="relative border shadow-lg bg-background overflow-hidden flex flex-col py-0" style={{ height: '580px' }}>
          {/* 오른쪽 상단 X 버튼 (호버시 표시) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose(data.id)
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background border flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
            aria-label="닫기"
          >
            <HiXMark className="w-4 h-4" />
          </button>
          
          {/* 헤더 */}
          <div className="border-b px-6 py-4">
            <Badge variant={data.badgeVariant || 'default'} className="mb-2">
              {data.badgeIcon && <data.badgeIcon className="w-3 h-3 mr-1" />}
              {data.badge}
            </Badge>
            <h2 className="text-2xl font-bold">{data.title}</h2>
          </div>
          
          {/* 콘텐츠 - 높이 증가 */}
          <div className="px-6 pt-6 pb-4 overflow-y-auto flex-1">
            {data.content}
          </div>
          
          {/* 액션 버튼 - 자세히 보기만 남김 */}
          <div className="px-6 pb-4">
            <Button className="w-full" size="lg">
              자세히 보기
            </Button>
          </div>
          
          {/* 하단 옵션 */}
          <div className="flex border-t bg-background mt-auto">
            <button 
              type="button"
              className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose(data.id)
              }}
            >
              오늘 하루 보지 않기
            </button>
            <div className="w-px bg-border" />
            <button 
              type="button"
              className="flex-1 py-5 text-sm text-muted-foreground hover:bg-muted transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose(data.id)
              }}
            >
              닫기
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}