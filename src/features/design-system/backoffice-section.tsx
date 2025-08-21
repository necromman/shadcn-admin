import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function BackofficeSection() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Backoffice Components</h2>
        <p className="text-muted-foreground">
          Admin dashboard components for data management and analytics.
        </p>
      </div>

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
  )
}