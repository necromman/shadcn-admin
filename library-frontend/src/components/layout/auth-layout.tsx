import { Outlet } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen">
        {/* Left side - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center">
          <div className="max-w-md text-white">
            <div className="mb-8">
              <BookOpen className="h-16 w-16" />
            </div>
            <h1 className="text-4xl font-bold mb-6">세종샘물도서관</h1>
            <p className="text-xl mb-4">지식과 문화의 샘터</p>
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">7K</span>
                </div>
                <div>
                  <p className="font-semibold">7,000권의 장서</p>
                  <p className="text-sm">다양한 분야의 도서 보유</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <p className="font-semibold">5개 대학 통합 이용</p>
                  <p className="text-sm">세종공동캠퍼스 입주대학 학생/교직원</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">24</span>
                </div>
                <div>
                  <p className="font-semibold">스마트 도서관</p>
                  <p className="text-sm">RFID 기반 자동화 시스템</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}