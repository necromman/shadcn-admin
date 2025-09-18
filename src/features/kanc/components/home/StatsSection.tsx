import { Card } from '@/components/ui/card'
import { SectionWrapper } from '../common/SectionWrapper'

const stats = [
  {
    id: '1',
    title: '누적 이용자',
    value: '12,345',
    change: '+12%',
    description: '전년 대비'
  },
  {
    id: '2',
    title: '보유 장비',
    value: '234',
    change: '+8대',
    description: '신규 도입'
  },
  {
    id: '3',
    title: '연구 성과',
    value: '567',
    change: '+23%',
    description: '논문/특허'
  },
  {
    id: '4',
    title: '기업 지원',
    value: '89',
    change: '+15개',
    description: '협력 기업'
  }
]

export function StatsSection() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <p className="text-3xl font-bold mb-1 text-primary">
                {stat.value}
              </p>
              <p className="text-sm font-medium mb-1">
                {stat.title}
              </p>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}