import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DSBoard } from '@/components/design-system/ds-board'

export const Route = createFileRoute('/_authenticated/board/$type')({
  component: BoardPage,
})

function BoardPage() {
  const { type } = Route.useParams()
  
  // 게시판 타입에 따른 제목 설정
  const getBoardTitle = (boardType: string) => {
    switch(boardType) {
      case 'notice': return '공지사항'
      case 'general': return '자유게시판'  // 'free' -> 'general'로 변경
      case 'free': return '자유게시판'     // 호환성 유지
      case 'qna': return 'Q&A'
      case 'faq': return 'FAQ'
      case 'gallery': return '갤러리'
      case 'download': return '자료실'
      default: return '게시판'
    }
  }
  
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      
      <Main>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold tracking-tight'>{getBoardTitle(type)}</h2>
          <p className='text-muted-foreground'>
            {type === 'notice' && '중요한 공지사항과 업데이트를 확인하세요'}
            {(type === 'general' || type === 'free') && '자유롭게 의견을 나누는 공간입니다'}
            {type === 'qna' && '궁금한 점을 질문하고 답변을 받아보세요'}
            {type === 'faq' && '자주 묻는 질문과 답변을 확인하세요'}
            {type === 'gallery' && '사진과 이미지를 공유하는 갤러리입니다'}
            {type === 'download' && '유용한 자료를 다운로드할 수 있습니다'}
            {!['notice', 'general', 'free', 'qna', 'faq', 'gallery', 'download'].includes(type) && '게시판을 이용해 소통하세요'}
          </p>
        </div>
        <DSBoard boardType={type} />
      </Main>
    </>
  )
}