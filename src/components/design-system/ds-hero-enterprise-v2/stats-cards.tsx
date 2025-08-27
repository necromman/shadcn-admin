export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {/* OpenAI 스타일 카드 */}
      <a className="relative group block" href="#">
        <div className="relative flex flex-col h-full">
          {/* 카드 배경 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
              src="https://webassets.linear.app/images/ornj730p/production/14886f4b7fda983a8bb5ca58f754efe99eb20be4-264x224.svg"
              alt=""
            />
          </div>
          
          {/* 콘텐츠 */}
          <div className="relative flex flex-col h-full p-6 min-h-[280px]">
            {/* 아이콘 */}
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
              <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            
            {/* 텍스트 */}
            <div className="mt-auto space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                빠른 실행과 복잡성 해결: BRAND 규모의 시스템 구축
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                     width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Ramp 스타일 카드 */}
      <a className="relative group block" href="#">
        <div className="relative flex flex-col h-full">
          {/* 카드 배경 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-gray-950 overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
              src="https://webassets.linear.app/images/ornj730p/production/55b5622d01e51e774769e6a1634930514721e481-264x224.svg?q=95&auto=format&dpr=2"
              alt=""
            />
          </div>
          
          {/* 콘텐츠 */}
          <div className="relative flex flex-col h-full p-6 min-h-[280px]">
            {/* 아이콘 */}
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
              <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            {/* 텍스트 */}
            <div className="mt-auto space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                BRAND가 가장 빠른 제품 도구를 선택한 이유
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                     width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Brex 스타일 카드 */}
      <a className="relative group block" href="#">
        <div className="relative flex flex-col h-full">
          {/* 카드 배경 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-gray-950 overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
              src="https://webassets.linear.app/images/ornj730p/production/112f1325621c7c8f895bb3c06b194a8b8ace74f7-264x224.svg?q=95&auto=format&dpr=2"
              alt=""
            />
          </div>
          
          {/* 콘텐츠 */}
          <div className="relative flex flex-col h-full p-6 min-h-[280px]">
            {/* 아이콘 */}
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
              <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 17V7m0 10l3-3m-3 3l-3-3m13 3V7m0 10l-3-3m3 3l3-3" />
                <path d="M3 7h18M3 17h18" />
              </svg>
            </div>
            
            {/* 텍스트 */}
            <div className="mt-auto space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                "하나의 로드맵": BRAND가 분산된 계획을 통합한 방법
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                     width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Scale 스타일 카드 */}
      <a className="relative group block" href="#">
        <div className="relative flex flex-col h-full">
          {/* 카드 배경 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-pink-50 to-pink-100 dark:from-pink-950 dark:to-gray-950 overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
              src="https://webassets.linear.app/images/ornj730p/production/977ec25f3db253d02740e6aee3cce21dc38e3080-264x224.svg?q=95&auto=format&dpr=2"
              alt=""
            />
          </div>
          
          {/* 콘텐츠 */}
          <div className="relative flex flex-col h-full p-6 min-h-[280px]">
            {/* 아이콘 */}
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-auto">
              <svg className="w-7 h-7 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 13h2l3-9 4 18 4-11h5" />
              </svg>
            </div>
            
            {/* 텍스트 */}
            <div className="mt-auto space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
                Linear가 Scale의 고속 성장을 가속화
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">스토리 읽기</span>
                <svg className="w-4 h-4 text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" 
                     width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.3262 4.51988C10.061 4.20167 9.58809 4.15868 9.26988 4.42385C8.95167 4.68903 8.90868 5.16195 9.17385 5.48016L10.6487 7.25L3.75 7.25C3.33579 7.25 3 7.58579 3 8C3 8.41421 3.33579 8.75 3.75 8.75H10.6488L9.17385 10.5199C8.90868 10.8381 8.95167 11.311 9.26988 11.5762C9.58809 11.8414 10.061 11.7984 10.3262 11.4802L12.8262 8.48016C13.058 8.20202 13.058 7.79802 12.8262 7.51988L10.3262 4.51988Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}