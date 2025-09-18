import { createFileRoute } from '@tanstack/react-router'
import { KancMainPage } from '@/features/kanc/pages/KancMainPage'

export const Route = createFileRoute('/')({
  component: KancMainPage,
})