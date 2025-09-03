import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './context/theme-provider'
import { MainLayout } from './components/layout/main-layout'
import HomePage from './app/(main)/home/page'
import LoginPage from './app/(auth)/login/page'

const queryClient = new QueryClient()

// Placeholder component for pages not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">이 페이지는 현재 개발 중입니다.</p>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Auth routes - no layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<PlaceholderPage title="회원가입" />} />
            
            {/* Main routes - with layout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<PlaceholderPage title="자료 검색" />} />
              <Route path="book/:id" element={<PlaceholderPage title="도서 상세" />} />
              <Route path="facilities/seat" element={<PlaceholderPage title="좌석 예약" />} />
              <Route path="news/notice" element={<PlaceholderPage title="공지사항" />} />
              <Route path="guide/info" element={<PlaceholderPage title="도서관 안내" />} />
              <Route path="services/book-request" element={<PlaceholderPage title="희망도서 신청" />} />
              <Route path="my-library" element={<PlaceholderPage title="My Library" />} />
            </Route>
          </Routes>
          {/* <Toaster /> */}
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App