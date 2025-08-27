import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/auth/signup/')({
  component: SignupStartPage,
})

function SignupStartPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/auth/signup/terms', replace: true })
  }, [navigate])

  return null
}