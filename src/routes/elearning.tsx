import { createFileRoute } from '@tanstack/react-router'
import { ElearningPage } from '@/features/lms/pages/ElearningPage'

export const Route = createFileRoute('/elearning')({
  component: ElearningPage,
})