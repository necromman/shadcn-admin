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
  threshold = 100,
  enabled = true
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  const setLoadingElement = useCallback((element: HTMLDivElement | null) => {
    loadingRef.current = element
  }, [])
  
  useEffect(() => {
    if (!enabled) return
    
    // 이전 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    // 조건 확인
    if (!hasMore || loading || !loadingRef.current) return
    
    // Intersection Observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      {
        rootMargin: `${threshold}px`
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