'use client'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  HiInformationCircle,
  HiRefresh 
} from 'react-icons/hi'
import { HiExclamationTriangle, HiXCircle } from 'react-icons/hi2'

interface BoardErrorProps {
  error?: {
    title?: string
    message?: string
    code?: string | number
    type?: 'error' | 'warning' | 'info'
  }
  onRetry?: () => void
  onGoBack?: () => void
}

export const BoardError = React.memo(({ 
  error = {
    type: 'error',
    title: '오류가 발생했습니다',
    message: '게시글을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'
  },
  onRetry,
  onGoBack
}: BoardErrorProps) => {
  const getIcon = () => {
    switch (error.type) {
      case 'warning':
        return <HiExclamationTriangle className="h-5 w-5" />
      case 'info':
        return <HiInformationCircle className="h-5 w-5" />
      default:
        return <HiXCircle className="h-5 w-5" />
    }
  }

  const getVariant = () => {
    switch (error.type) {
      case 'warning':
        return 'default' as const  // warning variant 제거
      case 'info':
        return 'default' as const
      default:
        return 'destructive' as const
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <Alert variant={getVariant()}>
            <div className="flex items-center gap-2">
              {getIcon()}
              <AlertTitle>{error.title}</AlertTitle>
            </div>
            <AlertDescription className="mt-2">
              {error.message}
              {error.code && (
                <span className="block mt-1 text-xs opacity-70">
                  오류 코드: {error.code}
                </span>
              )}
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-2 mt-4">
            {onRetry && (
              <Button 
                onClick={onRetry} 
                variant="outline" 
                className="flex-1"
              >
                <HiRefresh className="mr-2 h-4 w-4" />
                다시 시도
              </Button>
            )}
            {onGoBack && (
              <Button 
                onClick={onGoBack} 
                variant="outline"
                className="flex-1"
              >
                뒤로 가기
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
})
BoardError.displayName = 'BoardError'

// 빈 상태 컴포넌트
interface BoardEmptyProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export const BoardEmpty = React.memo(({ 
  title = '게시글이 없습니다',
  message = '아직 작성된 게시글이 없습니다. 첫 게시글을 작성해보세요!',
  actionLabel = '글쓰기',
  onAction
}: BoardEmptyProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <HiInformationCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {message}
          </p>
        </div>
        {onAction && (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
})
BoardEmpty.displayName = 'BoardEmpty'