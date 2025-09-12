import { getInstitutionBySlug } from '../../data/institutions.mock'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface InstitutionFooterProps {
  slug: string
}

export function InstitutionFooter({ slug }: InstitutionFooterProps) {
  const institution = getInstitutionBySlug(slug)

  if (!institution) return null

  return (
    <footer 
      className="border-t"
      style={{
        borderTopColor: `${institution.theme.primaryColor}20`,
        background: `linear-gradient(to bottom, ${institution.theme.primaryColor}05, transparent)`
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Institution Info */}
          <div>
            <h3 
              className="font-bold text-lg mb-4"
              style={{ color: institution.theme.primaryColor }}
            >
              {institution.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {institution.description}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  {institution.contact.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {institution.contact.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {institution.contact.email}
                </span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="font-semibold mb-4">운영 시간</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  평일: 09:00 - 18:00
                </span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                주말 및 공휴일 휴무
              </p>
              <p className="text-sm text-muted-foreground ml-6">
                점심시간: 12:00 - 13:00
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 {institution.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            이 사이트는 MOAFAB 플랫폼을 통해 제공됩니다.
          </p>
        </div>
      </div>
    </footer>
  )
}