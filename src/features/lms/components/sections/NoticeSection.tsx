import { ArrowRight } from 'lucide-react'

interface Notice {
  id: string
  title: string
  content: string
  date: string
  category?: string
}

const noticeData: Notice[] = [
  {
    id: '1',
    category: '조치 완료',
    title: 'STEP-VT런칭 오류 안내 [25.11.11.(화) 오전 ~ 현재]',
    content: '학습자님, 안녕하세요. 가상훈련 담당자입니다. STEP-VT런칭 오류의 원인을 파악하여 조치 완료하였습니다. 현재 정상 이용 가능하시며, 이용에 불편을 드려 죄송합니다.',
    date: '2025.11.11'
  },
  {
    id: '2',
    category: '당선작 발표',
    title: 'STEP 학습 우수사례 공모전 당선작 발표',
    content: '안녕하세요, 한국기술교육대학교 온라인평생교육원입니다. [2025년 STEP 학습 우수사례 공모전]에 참여해주신 모든 분들께 진심으로 감사드립니다.',
    date: '2025.11.07'
  },
  {
    id: '3',
    title: '2025년도 STEP 오픈마켓(B2B) 판매과정 목록 (2025년 11월 기준)',
    content: '안녕하세요, 온라인평생교육원입니다. STEP 오픈마켓(B2B)에서 판매중인 전체 운영과정 목록을 안내해드립니다. 첨부파일을 확인하시기 바랍니다.',
    date: '2025.11.03'
  },
  {
    id: '4',
    category: '당첨자 발표',
    title: 'AI과정 수강신청 이벤트 당첨자 발표 (60명)',
    content: '안녕하세요, 스마트 직업훈련 플랫폼 STEP입니다. AI과정 수강후기 이벤트에 참여해 주신 모든 분들께 감사드리며, 당첨자를 발표합니다.',
    date: '2025.10.31'
  }
]

export function NoticeSection() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-10 dark:border-gray-800 pb-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            공지사항
          </h2>
          <a
            href="/notices"
            className="group inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
          >
            더보기
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4컬럼 그리드 레이아웃 - 카드 경계 제거 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {noticeData.map((notice) => (
            <div
              key={notice.id}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* 카테고리 태그 - 고정 높이 */}
              <div className="h-6 mb-2">
                {notice.category && (
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    # {notice.category}
                  </span>
                )}
              </div>

              {/* 제목 - 고정 2줄 높이 */}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {notice.title}
              </h3>

              {/* 내용 미리보기 - 고정 3줄 높이 */}
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed min-h-[3.5rem] flex-grow">
                {notice.content}
              </p>

              {/* 날짜 - 하단 고정 */}
              <div className="mt-3 pt-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {notice.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 모바일용 단일 컬럼 레이아웃 */}
        <div className="space-y-6 md:hidden">
          {noticeData.map((notice, index) => (
            <div
              key={notice.id}
              className={`pb-6 ${index !== noticeData.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                {notice.category && (
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    # {notice.category}
                  </span>
                )}
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {notice.date}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {notice.title}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}