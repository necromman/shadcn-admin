import { createFileRoute } from '@tanstack/react-router'
import { InstitutionsPage } from '@/features/moafab/pages/institutions'

export const Route = createFileRoute('/moafab/institutions')({
  component: InstitutionsPage,
})