'use client'

import {
  Bell,
  Home,
  Sun,
  User,
  LogOut,
  Settings,
  Moon,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

export default function AppHeader() {
  const { isMobile } = useSidebar()
  const { toast } = useToast()

  const handleGoOnline = (isOnline: boolean) => {
    toast({
      title: isOnline ? 'You are now online!' : 'You are now offline.',
      description: isOnline
        ? 'You will now be matched with available employers.'
        : 'You will no longer receive real-time job matches.',
    })
  }
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      {isMobile && <SidebarTrigger />}
      <div className="flex-1">
        {/* Can add breadcrumbs or page title here */}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-muted-foreground" />
          <Label htmlFor="go-online-switch">Go Online</Label>
          <Switch id="go-online-switch" onCheckedChange={handleGoOnline} />
          <Moon className="h-5 w-5 text-muted-foreground" />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/avatar2/100/100" alt="User" data-ai-hint="person portrait" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
