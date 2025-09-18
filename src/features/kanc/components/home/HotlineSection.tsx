import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '../common/SectionWrapper'

export function HotlineSection() {
  return (
    <SectionWrapper background="gray">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            고객 지원
          </h2>
          <p className="text-sm text-muted-foreground">
            다양한 채널로 편리하게 문의하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 전화 상담 */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                전화 상담
              </div>
              <div className="text-2xl font-bold text-primary">
                042-123-4567
              </div>
              <div className="text-sm text-muted-foreground">
                평일 09:00 - 18:00
              </div>
            </div>
          </Card>

          {/* 온라인 채팅 */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                온라인 채팅
              </div>
              <Button className="w-full" size="sm">
                실시간 상담
              </Button>
              <div className="text-sm text-muted-foreground">
                365일 24시간
              </div>
            </div>
          </Card>

          {/* 이메일 */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                이메일 문의
              </div>
              <div className="text-lg font-medium">
                help@kanc.re.kr
              </div>
              <div className="text-sm text-muted-foreground">
                1영업일 내 답변
              </div>
            </div>
          </Card>
        </div>
    </SectionWrapper>
  )
}