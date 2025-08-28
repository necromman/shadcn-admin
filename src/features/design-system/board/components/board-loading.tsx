'use client'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

interface BoardLoadingProps {
  viewType?: 'table' | 'card' | 'gallery' | 'list'
  itemCount?: number
}

export const BoardLoading = React.memo(({ 
  viewType = 'table',
  itemCount = 5 
}: BoardLoadingProps) => {
  // 테이블 로딩
  if (viewType === 'table') {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[120px]">작성자</TableHead>
              <TableHead className="w-[100px]">작성일</TableHead>
              <TableHead className="w-[80px] text-center">조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: itemCount }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[40px] mx-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // 카드 로딩
  if (viewType === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-[60px]" />
                </div>
                <Skeleton className="h-3 w-[40px]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  // 갤러리 로딩
  if (viewType === 'gallery') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  // 리스트 로딩
  return (
    <div className="space-y-3">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-12 w-12 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <Skeleton className="h-3 w-[60px]" />
        </div>
      ))}
    </div>
  )
})
BoardLoading.displayName = 'BoardLoading'