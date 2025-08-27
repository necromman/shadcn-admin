import { Link } from '@tanstack/react-router'

interface AuthHeaderProps {
  title?: string
  description?: string
  showLogo?: boolean
}

export function AuthHeader({ title, description, showLogo = true }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      {showLogo && (
        <Link 
          to="/" 
          className="mb-6 inline-block text-3xl font-bold tracking-tight hover:text-primary/80 transition-colors"
        >
          BRAND
        </Link>
      )}
      {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}