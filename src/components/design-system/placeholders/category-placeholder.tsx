import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

interface CategoryPlaceholderProps {
  title: string
  description?: string
  height?: string
}

export function CategoryPlaceholder({ 
  title, 
  description,
  height = '200px'
}: CategoryPlaceholderProps) {
  return (
    <div 
      className="relative flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10"
      style={{ minHeight: height }}
    >
      <div className="text-center p-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
          <HiOutlineExclamationTriangle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
            {description}
          </p>
        )}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          개발 예정
        </div>
      </div>
    </div>
  )
}