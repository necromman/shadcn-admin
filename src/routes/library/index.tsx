import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/library-frontend/src/app/home/page'

export const Route = createFileRoute('/library/')({
  component: HomePage,
})