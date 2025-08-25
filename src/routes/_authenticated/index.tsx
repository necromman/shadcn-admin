import { createFileRoute } from '@tanstack/react-router'
import { DesignSystemPage } from '@/features/design-system'

export const Route = createFileRoute('/_authenticated/')({
  component: DesignSystemPage,
})