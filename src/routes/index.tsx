import { createFileRoute } from '@tanstack/react-router'
import { MoafabHomePage } from '@/features/moafab/pages/home'

export const Route = createFileRoute('/')({
  component: MoafabHomePage,
})