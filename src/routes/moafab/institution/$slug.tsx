import { createFileRoute } from '@tanstack/react-router'
import { InstitutionHomePage } from '@/features/moafab/pages/institution/institution-home'

export const Route = createFileRoute('/moafab/institution/$slug')({
  component: InstitutionHomePage,
})