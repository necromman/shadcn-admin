import { useEffect, useRef, useCallback, useState } from 'react'

interface UseInfiniteScrollOptions {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  threshold?: number
  enabled?: boolean
}

export function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  threshold = 200,
  enabled = true
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const isLoadingRef = useRef(false)
  
  const setLoadingElement = useCallback((element: HTMLDivElement | null) => {
    loadingRef.current = element
  }, [])
  
  // loading 상태 추적
  useEffect(() => {
    isLoadingRef.current = loading
  }, [loading])
  
  useEffect(() => {
    if (!enabled) {
      // 무한스크롤이 비활성화되면 observer 정리
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      return
    }
    
    // 이전 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    // 조건 확인
    if (!loadingRef.current) {
      return
    }
    
    // Intersection Observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible && hasMore && !isLoadingRef.current) {
          onLoadMore()
        }
      },
      {
        root: null,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: 0
      }
    )
    
    // 관찰 시작
    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current)
    }
    
    // 클린업
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, onLoadMore, threshold, enabled])
  
  return {
    setLoadingElement,
    isIntersecting
  }
}