import { Link } from '@tanstack/react-router'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'

export function ProstLogo() {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
          <Link to="/" className="flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              P
            </div>
            {!isCollapsed && (
              <div className="grid flex-1 text-start">
                <span className="truncate font-bold text-base">PROST SPV</span>
                <span className="truncate text-xs text-muted-foreground">Static Proto View</span>
              </div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}