import { useParams } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getInstitutionBySlug } from '../../data/institutions.mock'
import { InstitutionHeader } from '../../components/institution/institution-header'
import { InstitutionFooter } from '../../components/institution/institution-footer'
import { HeroSection } from '../../components/institution/sections/hero-section'
import { QuickLinks } from '../../components/institution/sections/quick-links'
import { NoticePreview } from '../../components/institution/sections/notice-preview'
import { EquipmentTabs } from '../../components/institution/sections/equipment-tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Building2, ArrowLeft } from 'lucide-react'

export function InstitutionHomePage() {
  const { slug } = useParams({ from: '/moafab/institution/$slug' })
  const institution = getInstitutionBySlug(slug)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!institution) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Card variant="default" className="max-w-md w-full mx-4">
          <CardContent variant="default" className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">기관을 찾을 수 없습니다</h2>
            <p className="text-muted-foreground text-center mb-6">
              요청하신 기관 정보를 찾을 수 없습니다.
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                메인으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div id="top" className="min-h-screen flex flex-col">
      {/* Header */}
      <InstitutionHeader slug={slug} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection institution={institution} />

        {/* Quick Links */}
        <QuickLinks institution={institution} />

        {/* Notice Preview */}
        <NoticePreview institution={institution} />

        {/* Equipment Tabs */}
        <EquipmentTabs institution={institution} />

        {/* Archive Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">자료실</h2>
              <p className="text-muted-foreground mb-6">
                {institution.name}에서 제공하는 다양한 자료를 다운로드하실 수 있습니다.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {institution.archives.slice(0, 3).map((archive) => (
                  <Card key={archive.id} variant="compact" className="flex-1 min-w-[250px] max-w-[350px]">
                    <CardContent variant="compact">
                      <h3 className="font-medium text-sm mb-1">{archive.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {archive.category} · {archive.fileSize}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        style={{ 
                          borderColor: institution.theme.primaryColor,
                          color: institution.theme.primaryColor
                        }}
                      >
                        다운로드
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Link to={`/moafab/institution/${slug}/archive` as any}>
                <Button variant="ghost" className="mt-6">
                  자료실 전체보기
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <InstitutionFooter slug={slug} />
    </div>
  )
}