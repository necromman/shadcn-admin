import { createFileRoute } from '@tanstack/react-router'
import { LibraryHomePage } from '@/features/library/pages/home'

export const Route = createFileRoute('/')({
  component: LibraryHomePage,
})