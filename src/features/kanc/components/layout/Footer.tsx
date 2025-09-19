import { Phone, Mail, MapPin, Youtube, Share2, ExternalLink, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/hooks'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-gradient-to-b from-muted/20 to-muted/40 border-t">
      {/* Quick Links Section */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'privacy', label: t('kanc:footer.quickLinks.privacy'), required: true },
                { key: 'terms', label: t('kanc:footer.quickLinks.terms') },
                { key: 'emailPolicy', label: t('kanc:footer.quickLinks.emailPolicy') },
                { key: 'sitemap', label: t('kanc:footer.quickLinks.sitemap') },
                { key: 'directions', label: t('kanc:footer.quickLinks.directions') }
              ].map((item) => (
                <a
                  key={item.key}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.required && <span className="text-xs text-red-600 font-semibold">{t('kanc:common.required')}</span>}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('kanc:footer.relatedSites')}</span>
              <select className="text-sm border rounded px-2 py-1 bg-popover text-foreground">
                <option>과학기술정보통신부</option>
                <option>한국연구재단</option>
                <option>나노종합기술원</option>
                <option>한국나노기술연구협의회</option>
                <option>나노융합산업연구조합</option>
              </select>
              <Button size="sm" variant="outline">
                {t('kanc:common.go')}
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="https://css.kanc.re.kr/images/kor/logo.png"
                alt="한국나노기술원"
                className="w-auto dark:filter dark:invert"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
              {t('kanc:footer.slogan')}
            </p>

            {/* Certifications */}
            <div className="flex gap-3">
              <div className="bg-white dark:bg-popover rounded px-3 py-2 text-xs font-medium text-gray-700 dark:text-muted-foreground border border-gray-200 dark:border-border">
                ISO 9001
              </div>
              <div className="bg-white dark:bg-popover rounded px-3 py-2 text-xs font-medium text-gray-700 dark:text-muted-foreground border border-gray-200 dark:border-border">
                ISO 14001
              </div>
              <div className="bg-white dark:bg-popover rounded px-3 py-2 text-xs font-medium text-gray-700 dark:text-muted-foreground border border-gray-200 dark:border-border">
                KOLAS {t('kanc:footer.certifications.certification')}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">{t('kanc:footer.services.title')}</h4>
            <ul className="space-y-2">
              {[
                t('kanc:footer.services.fab'),
                t('kanc:footer.services.equipment'),
                t('kanc:footer.services.education'),
                t('kanc:footer.services.consulting'),
                t('kanc:footer.resources.reference')
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">{t('kanc:footer.resources.title')}</h4>
            <ul className="space-y-2">
              {[
                t('kanc:footer.resources.notice'),
                t('kanc:navigation.menu.servicePortal.faq'),
                t('kanc:sections.quickService.items.inquiry.title'),
                t('kanc:footer.resources.download'),
                t('kanc:footer.resources.guide')
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">{t('kanc:footer.contact.title')}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>{t('kanc:footer.contact.zipcode')} {t('kanc:footer.contact.address')}</p>
                  <p className="text-xs">(이의동, 한국나노기술원)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <p>{t('kanc:footer.contact.tel')}: 031-546-6000 / 031-546-6114</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href="mailto:info@kanc.re.kr" className="text-sm text-muted-foreground hover:text-primary">
                  info@kanc.re.kr
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 pt-3">
                <a
                  href="https://blog.naver.com/kanc_info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white dark:bg-popover flex items-center justify-center hover:bg-gray-100 dark:hover:bg-secondary transition-colors border border-gray-200 dark:border-border"
                  aria-label="Blog"
                >
                  <Share2 className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@kanc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white dark:bg-popover flex items-center justify-center hover:bg-gray-100 dark:hover:bg-secondary transition-colors border border-gray-200 dark:border-border"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-border bg-gray-100 dark:bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2">
              <p>{t('kanc:footer.companyInfo.name')}</p>
              <Separator orientation="vertical" className="h-4" />
              <p>{t('kanc:footer.companyInfo.bizNumber')}</p>
              <Separator orientation="vertical" className="h-4" />
              <p>{t('kanc:footer.companyInfo.ceo')}</p>
            </div>
            <div className="text-center md:text-right">
              <p>{t('kanc:footer.copyright')}</p>
              <p className="mt-1">{t('kanc:footer.contactUs')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}