import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function BackofficeSection() {
  return (
    <div className="w-full">
      {/* Hero Section - 1st Section (odd) */}
      <section className="bg-gray-50 dark:bg-gray-900/50">
        <div className="container py-16">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <span className="mr-2">🏢</span>
              Enterprise Admin Components
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Backoffice Components</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Admin dashboard components for data management and analytics.
              Built for enterprise-grade applications with advanced features.
            </p>
          </div>
        </div>
      </section>

      {/* Components Section - 2nd Section (even) */}
      <section className="bg-white dark:bg-gray-950">
        <div className="container py-16">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                Backoffice components including data tables, charts, and dashboard widgets will be added here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will showcase components like:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>Data tables with sorting and filtering</li>
                <li>Dashboard widgets and stats cards</li>
                <li>Charts and analytics components</li>
                <li>Form builders and validators</li>
                <li>Admin navigation and layouts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}