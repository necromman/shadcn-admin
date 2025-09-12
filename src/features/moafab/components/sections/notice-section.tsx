import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiArrowRight, HiMegaphone, HiNewspaper, HiQuestionMarkCircle } from 'react-icons/hi2'
import { useTranslation } from '@/lib/i18n/hooks'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'

interface NoticeItem {
  id: string
  title: string
  date: string
  isNew?: boolean
  isImportant?: boolean
}

export function NoticeSection() {
  const { t } = useTranslation()
  const { settings } = useMoafabDevSettings()
  const [activeTab, setActiveTab] = useState('notice')

  // 샘플 데이터 (실제로는 API에서 가져옴)
  const notices: NoticeItem[] = useMemo(() => [
    { id: '1', title: '2024년 상반기 나노팹 서비스 이용 안내', date: '2024-01-15', isNew: true, isImportant: true },
    { id: '2', title: '장비 정기 점검 일정 공지', date: '2024-01-12', isNew: true },
    { id: '3', title: '신규 EUV 장비 도입 안내', date: '2024-01-10' },
    { id: '4', title: '서비스 이용료 개정 안내', date: '2024-01-08', isImportant: true },
    { id: '5', title: '연말연시 운영 시간 변경 안내', date: '2024-01-05' },
  ], [])

  const pressReleases: NoticeItem[] = useMemo(() => [
    { id: '1', title: '한국나노기술원, 차세대 반도체 공정 개발 성공', date: '2024-01-14', isNew: true },
    { id: '2', title: 'MOAFAB 플랫폼 사용자 10만명 돌파', date: '2024-01-11' },
    { id: '3', title: '글로벌 나노팹 컨퍼런스 2024 개최', date: '2024-01-09' },
    { id: '4', title: '산학연 협력 MOU 체결', date: '2024-01-07' },
  ], [])

  const faqs: NoticeItem[] = useMemo(() => [
    { id: '1', title: '서비스 이용 신청은 어떻게 하나요?', date: '2024-01-15' },
    { id: '2', title: '장비 예약 취소 및 변경 방법', date: '2024-01-13' },
    { id: '3', title: '이용료 결제 방법 안내', date: '2024-01-10' },
    { id: '4', title: '기술 지원 서비스 신청 절차', date: '2024-01-08' },
  ], [])

  const getItemsByTab = () => {
    switch (activeTab) {
      case 'press':
        return pressReleases.slice(0, settings.notice.itemsPerTab)
      case 'faq':
        return faqs.slice(0, settings.notice.itemsPerTab)
      default:
        return notices.slice(0, settings.notice.itemsPerTab)
    }
  }

  const renderNoticeItem = (item: NoticeItem) => (
    <a
      key={item.id}
      href={`/moafab/support/${activeTab}/${item.id}`}
      className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors group cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {item.isNew && settings.notice.showBadge && (
            <Badge variant="secondary" className="text-xs">
              {t('moafab.notice.new')}
            </Badge>
          )}
          {item.isImportant && settings.notice.showBadge && (
            <Badge variant="destructive" className="text-xs">
              {t('moafab.notice.important')}
            </Badge>
          )}
        </div>
        <h4 className="text-sm font-medium truncate group-hover:text-primary">
          {item.title}
        </h4>
        {settings.notice.showDate && (
          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
        )}
      </div>
      <HiArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </a>
  )

  return (
    <section className="py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('moafab.notice.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notice" className="flex items-center gap-2">
                <HiMegaphone className="h-4 w-4" />
                {t('moafab.notice.tabs.notice')}
              </TabsTrigger>
              <TabsTrigger value="press" className="flex items-center gap-2">
                <HiNewspaper className="h-4 w-4" />
                {t('moafab.notice.tabs.press')}
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HiQuestionMarkCircle className="h-4 w-4" />
                {t('moafab.notice.tabs.faq')}
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value={activeTab} className="space-y-2">
                {getItemsByTab().map(renderNoticeItem)}
                
                <div className="pt-4 border-t">
                  <Button variant="ghost" className="w-full" asChild>
                    <a href={`/moafab/support/${activeTab}`}>
                      {t('moafab.notice.viewMore')}
                      <HiArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}