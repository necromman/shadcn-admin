import { createFileRoute } from '@tanstack/react-router'
import { LmsHomePage } from '@/features/lms/pages/LmsHomePage'

export const Route = createFileRoute('/')({
  component: LmsHomePage,
})