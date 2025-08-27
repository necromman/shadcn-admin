import {
  HiCheckCircle,
  HiShieldCheck,
  HiClock,
  HiBeaker,
  HiBolt,
  HiCog6Tooth,
  HiMegaphone,
  HiGift,
  HiTrophy,
  HiAcademicCap
} from 'react-icons/hi2'
import type { PopupData } from './types'

export const DEFAULT_POPUP_DATA: PopupData[] = [
  {
    id: 'popup-1',
    type: 'text',
    title: '2025년 1분기 주요 업데이트',
    badge: '중요 공지',
    badgeIcon: HiMegaphone,
    badgeVariant: 'default',
    isVisible: true,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <HiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">새로운 대시보드 UI 출시</h3>
              <p className="text-sm text-muted-foreground">
                더욱 직관적이고 사용하기 쉬운 인터페이스로 업그레이드되었습니다.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <HiShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">보안 강화 업데이트</h3>
              <p className="text-sm text-muted-foreground">
                2단계 인증 및 암호화 기술이 강화되어 더욱 안전해졌습니다.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <HiBeaker className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">AI 기능 베타 테스트</h3>
              <p className="text-sm text-muted-foreground">
                선착순 1,000명에게 AI 어시스턴트 베타 테스트 기회를 제공합니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="flex items-center gap-2 text-sm">
            <HiClock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">업데이트 일정:</span>
            <span className="font-medium">2025년 1월 15일 00:00 KST</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'popup-2',
    type: 'text',
    title: '연말 특별 이벤트 안내',
    badge: '이벤트',
    badgeIcon: HiGift,
    badgeVariant: 'secondary',
    isVisible: true,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <HiTrophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">최대 50% 할인 혜택</h3>
              <p className="text-sm text-muted-foreground">
                모든 프로 플랜을 특별 가격으로 만나보세요. 12월 31일까지!
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <HiGift className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">추가 3개월 무료 제공</h3>
              <p className="text-sm text-muted-foreground">
                연간 구독 시 추가 3개월을 무료로 이용하실 수 있습니다.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <HiAcademicCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">무료 교육 프로그램</h3>
              <p className="text-sm text-muted-foreground">
                신규 가입자를 위한 온라인 교육 프로그램을 무료로 제공합니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4">
          <div className="flex items-center gap-2 text-sm">
            <HiBolt className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="font-medium text-amber-900 dark:text-amber-300">남은 시간: 7일 12시간 34분</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'popup-3',
    type: 'text',
    title: '시스템 점검 안내',
    badge: '공지',
    badgeIcon: HiCog6Tooth,
    badgeVariant: 'outline',
    isVisible: true,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
            <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">정기 시스템 점검</h3>
            <p className="text-sm text-orange-800 dark:text-orange-400">
              서비스 품질 향상을 위한 정기 점검을 실시합니다.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <HiClock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold">점검 일시</div>
                <div className="text-sm text-muted-foreground">
                  2025년 1월 5일 (일) 02:00 - 04:00 (2시간)
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <HiBeaker className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold">점검 내용</div>
                <ul className="text-sm text-muted-foreground list-disc list-inside mt-1 space-y-1">
                  <li>데이터베이스 최적화</li>
                  <li>보안 패치 적용</li>
                  <li>서버 성능 개선</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-dashed bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground text-center">
            점검 시간 동안 서비스 이용이 제한될 수 있습니다
          </p>
        </div>
      </div>
    )
  }
]