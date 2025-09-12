import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft,
  ExternalLink,
  Wrench,
  GraduationCap
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { mockInstitutions } from '../data/institutions.mock'
import { MoafabHeader } from '../components/layout/moafab-header'
import { MoafabFooter } from '../components/layout/moafab-footer'
import { MoafabPreHeader } from '../components/layout/moafab-pre-header'

export function InstitutionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredInstitutions = mockInstitutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.contact.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div id="top" className="min-h-screen flex flex-col">
      {/* Pre-Header */}
      <MoafabPreHeader />
      
      {/* Header */}
      <MoafabHeader />

      {/* Main Content */}
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                메인으로 돌아가기
              </Button>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  협의체 참여 기관
                </h1>
                <p className="mt-2 text-muted-foreground">
                  총 {mockInstitutions.length}개 기관이 참여하고 있습니다
                </p>
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="기관명, 지역으로 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Institution List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInstitutions.map((institution) => (
              <Card key={institution.id} variant="default" className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader 
                  variant="default"
                  className="pb-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${institution.theme.primaryColor}15 0%, transparent 100%)` 
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${institution.theme.primaryColor}20` }}
                      >
                        <Building2 
                          className="h-6 w-6"
                          style={{ color: institution.theme.primaryColor }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{institution.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {institution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent variant="default" className="space-y-4">
                  {/* Mission & Vision */}
                  <div className="space-y-2 pb-3 border-b">
                    <div>
                      <span className="text-sm font-medium">미션</span>
                      <p className="text-sm text-muted-foreground">{institution.mission}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">비전</span>
                      <p className="text-sm text-muted-foreground">{institution.vision}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{institution.contact.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{institution.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{institution.contact.email}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t">
                    <Badge variant="secondary" className="gap-1">
                      <Wrench className="h-3 w-3" />
                      장비 {institution.equipment.length}종
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <GraduationCap className="h-3 w-3" />
                      서비스 {institution.services.length}종
                    </Badge>
                    {institution.notices.filter(n => n.isPinned).length > 0 && (
                      <Badge variant="default">
                        공지 {institution.notices.filter(n => n.isPinned).length}건
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link to={`/moafab/institution/${institution.slug}#top` as any} className="block">
                    <Button className="w-full" variant="outline">
                      기관 홈페이지 방문
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredInstitutions.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <MoafabFooter />
    </div>
  )
}