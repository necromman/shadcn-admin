import { createFileRoute } from '@tanstack/react-router'
import { ThemeEditorWindow } from '@/features/design-system/theme/editor/theme-editor-window'

export const Route = createFileRoute('/theme-editor')({
  component: ThemeEditorWindow,
})