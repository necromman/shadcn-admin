import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './context/theme-provider'
import { DevSettingsProvider } from './context/dev-settings-provider'
import { DevSettingsFloatingButton, DevSettingsPanel, DevSettingsToggleButton } from './components/dev-settings-panel'
import { MainLayout } from './components/layout/main-layout'
import HomePage from './app/(main)/home/page'
import LoginPage from './app/(auth)/login/page'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

// Placeholder component for pages not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400">이 페이지는 현재 개발 중입니다.</p>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <DevSettingsProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <DevSettingsFloatingButton />
            <DevSettingsToggleButton />
            <DevSettingsPanel />
            <Routes>
            {/* Auth routes - no layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<PlaceholderPage title="회원가입" />} />
            
            {/* Main routes - with layout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<PlaceholderPage title="자료 검색" />} />
              <Route path="search/advanced" element={<PlaceholderPage title="상세 검색" />} />
              <Route path="search/new" element={<PlaceholderPage title="신착자료" />} />
              <Route path="search/popular" element={<PlaceholderPage title="인기자료" />} />
              <Route path="search/browse" element={<PlaceholderPage title="주제별 브라우징" />} />
              <Route path="book/:id" element={<PlaceholderPage title="도서 상세" />} />
              <Route path="facilities/seat" element={<PlaceholderPage title="좌석 예약" />} />
              <Route path="news/notice" element={<PlaceholderPage title="공지사항" />} />
              <Route path="guide/info" element={<PlaceholderPage title="도서관 안내" />} />
              <Route path="services/book-request" element={<PlaceholderPage title="희망도서 신청" />} />
              <Route path="my-library" element={<PlaceholderPage title="My Library" />} />
              <Route path="my-library/loans" element={<PlaceholderPage title="대출 현황" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      </DevSettingsProvider>
    </ThemeProvider>
  )
}

export default App