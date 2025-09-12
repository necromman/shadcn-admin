import { useTranslation } from '@/lib/i18n/hooks'
import { Separator } from '@/components/ui/separator'

export function MoafabFooter() {
  const { t } = useTranslation()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 섹션 */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">{t('moafab.footer.companyInfo.title')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t('moafab.footer.companyInfo.address')}</p>
              <p>{t('moafab.footer.companyInfo.tel')}</p>
              <p>{t('moafab.footer.companyInfo.fax')}</p>
              <p>{t('moafab.footer.companyInfo.email')}</p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-bold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/moafab/guide" className="text-muted-foreground hover:text-primary transition-colors">
                  이용 가이드
                </a>
              </li>
              <li>
                <a href="/moafab/apply/service" className="text-muted-foreground hover:text-primary transition-colors">
                  서비스 신청
                </a>
              </li>
              <li>
                <a href="/moafab/search" className="text-muted-foreground hover:text-primary transition-colors">
                  장비 검색
                </a>
              </li>
              <li>
                <a href="/moafab/support/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  자주 묻는 질문
                </a>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h3 className="text-lg font-bold mb-4">고객 지원</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/moafab/support/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  문의하기
                </a>
              </li>
              <li>
                <a href="/moafab/support/notice" className="text-muted-foreground hover:text-primary transition-colors">
                  공지사항
                </a>
              </li>
              <li>
                <a href="/moafab/support/news" className="text-muted-foreground hover:text-primary transition-colors">
                  보도자료
                </a>
              </li>
              <li>
                <a href="/moafab/apply/consult" className="text-muted-foreground hover:text-primary transition-colors">
                  상담 예약
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        {/* 하단 섹션 */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                {t('moafab.footer.links.privacy')}
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                {t('moafab.footer.links.terms')}
              </a>
              <a href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">
                {t('moafab.footer.links.sitemap')}
              </a>
              <a href="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
                {t('moafab.footer.links.accessibility')}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('moafab.footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}