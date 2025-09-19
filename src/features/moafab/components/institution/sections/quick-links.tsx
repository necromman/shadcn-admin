import { type Institution } from '../../../data/institutions.mock'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Calendar, GraduationCap, MessageSquare, Building, Package, Lightbulb, Users, Microscope, Shield } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface QuickLinksProps {
  institution: Institution
}

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  GraduationCap,
  MessageSquare,
  Building,
  Package,
  Lightbulb,
  Users,
  Microscope,
  Shield
}

export function QuickLinks({ institution }: QuickLinksProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">주요 서비스</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {institution.services.map((service) => {
            const Icon = iconMap[service.icon] || Package
            return (
              <Link
                key={service.id}
                to={`/moafab/institution/${institution.slug}/service` as any}
                className="block group"
              >
                <Card variant="compact" className="h-full transition-all hover:shadow-md hover:-translate-y-1">
                  <CardContent variant="compact">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${institution.theme.primaryColor}20` }}
                    >
                      <Icon 
                        className="h-6 w-6"
                        style={{ color: institution.theme.primaryColor }}
                      />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}