'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { HiArrowTrendingUp, HiCube, HiOutlineShoppingBag, HiTruck, HiUsers, HiCurrencyDollar, HiChartBar, HiArrowUp, HiArrowDown, HiMinus } from 'react-icons/hi2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface StatData {
  title: string
  value: number | string
  unit?: string
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  color: string
  target?: number
}

export function DSStatsCards() {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})

  const statsData: StatData[] = useMemo(() => [
    {
      title: '연간 화물 처리량',
      value: 2847650,
      unit: 'TEU',
      change: 15.3,
      trend: 'up',
      icon: <HiCube className="h-5 w-5" />,
      color: 'text-blue-500',
      target: 3000000
    },
    {
      title: '선박 입항',
      value: 1234,
      unit: '척',
      change: -2.1,
      trend: 'down',
      icon: <HiOutlineShoppingBag className="h-5 w-5" />,
      color: 'text-green-500'
    },
    {
      title: '일일 트럭 운송',
      value: 856,
      unit: '대',
      change: 8.7,
      trend: 'up',
      icon: <HiTruck className="h-5 w-5" />,
      color: 'text-orange-500'
    },
    {
      title: '고용 인원',
      value: 3420,
      unit: '명',
      change: 0,
      trend: 'neutral',
      icon: <HiUsers className="h-5 w-5" />,
      color: 'text-purple-500'
    }
  ], [])

  const revenueData = {
    monthly: 458000000,
    quarterly: 1374000000,
    yearly: 5496000000,
    yearlyTarget: 6000000000
  }

  // Number animation effect
  useEffect(() => {
    const animateNumbers = () => {
      statsData.forEach((stat) => {
        if (typeof stat.value === 'number') {
          const duration = 2000
          const steps = 60
          const stepValue = stat.value / steps
          let currentStep = 0

          const interval = setInterval(() => {
            currentStep++
            setAnimatedValues(prev => ({
              ...prev,
              [stat.title]: Math.floor(stepValue * currentStep)
            }))

            if (currentStep >= steps) {
              clearInterval(interval)
              setAnimatedValues(prev => ({
                ...prev,
                [stat.title]: stat.value as number
              }))
            }
          }, duration / steps)
        }
      })
    }

    animateNumbers()
  }, [statsData])

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR')
  }

  const formatCurrency = (num: number) => {
    if (num >= 100000000) {
      return `${(num / 100000000).toFixed(1)}억원`
    } else if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}천만원`
    }
    return `${formatNumber(num)}원`
  }

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <HiArrowUp className="h-4 w-4" />
      case 'down':
        return <HiArrowDown className="h-4 w-4" />
      default:
        return <HiMinus className="h-4 w-4" />
    }
  }

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* Main Stats Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">주요 운영 지표</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  <span>{stat.title}</span>
                  <span className={stat.color}>{stat.icon}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {typeof stat.value === 'number' 
                      ? formatNumber(animatedValues[stat.title] || 0)
                      : stat.value}
                    {stat.unit && <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>}
                  </div>
                  
                  {stat.change !== undefined && (
                    <div className={`flex items-center gap-1 text-sm ${getTrendColor(stat.trend)}`}>
                      {getTrendIcon(stat.trend)}
                      <span>{Math.abs(stat.change)}%</span>
                      <span className="text-muted-foreground">전년 대비</span>
                    </div>
                  )}
                  
                  {stat.target && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>목표 달성률</span>
                        <span>{Math.round((stat.value as number / stat.target) * 100)}%</span>
                      </div>
                      <Progress value={(stat.value as number / stat.target) * 100} className="h-1.5" />
                    </div>
                  )}
                </div>
              </CardContent>
              
              {/* Background decoration */}
              <div className={`absolute -right-8 -bottom-8 ${stat.color} opacity-5`}>
                <div className="w-32 h-32 flex items-center justify-center">
                  <div className="w-full h-full">{stat.icon}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">수익 현황</h3>
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiCurrencyDollar className="h-5 w-5 text-blue-500" />
              매출 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">월간 매출</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.monthly)}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <HiArrowTrendingUp className="h-4 w-4" />
                  <span>12.5% 증가</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">분기 매출</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.quarterly)}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <HiArrowTrendingUp className="h-4 w-4" />
                  <span>8.3% 증가</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">연간 매출</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.yearly)}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>목표: {formatCurrency(revenueData.yearlyTarget)}</span>
                    <span>{Math.round((revenueData.yearly / revenueData.yearlyTarget) * 100)}%</span>
                  </div>
                  <Progress value={(revenueData.yearly / revenueData.yearlyTarget) * 100} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">기간별 비교</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <HiChartBar className="h-5 w-5 text-orange-500" />
                월별 물동량 추이
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['1월', '2월', '3월'].map((month, idx) => {
                  const value = 234500 + idx * 12000
                  const percentage = 70 + idx * 10
                  return (
                    <div key={month} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{month}</span>
                        <span className="font-medium">{formatNumber(value)} TEU</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <HiOutlineShoppingBag className="h-5 w-5 text-blue-500" />
                선사별 처리 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'MSC', value: 35, color: 'bg-blue-500' },
                  { name: 'Maersk', value: 28, color: 'bg-green-500' },
                  { name: 'CMA CGM', value: 22, color: 'bg-orange-500' },
                  { name: '기타', value: 15, color: 'bg-gray-500' }
                ].map((company) => (
                  <div key={company.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{company.name}</span>
                      <span className="font-medium">{company.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${company.color} transition-all duration-1000`}
                        style={{ width: `${company.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}