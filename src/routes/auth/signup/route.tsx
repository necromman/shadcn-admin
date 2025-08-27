import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
  component: SignupLayout,
})

function SignupLayout() {
  return <Outlet />
}