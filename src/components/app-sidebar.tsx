'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  User,
  Fingerprint,
  Settings,
  HelpCircle,
} from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Logo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-primary">
      <path fill="currentColor" d="M8.5,7.5A3.5,3.5 0 0,1 12,11A3.5,3.5 0 0,1 8.5,14.5A3.5,3.5 0 0,1 5,11A3.5,3.5 0 0,1 8.5,7.5M8.5,9A2,2 0 0,0 6.5,11A2,2 0 0,0 8.5,13A2,2 0 0,0 10.5,11A2,2 0 0,0 8.5,9M18.5,15.5L16,13L13.5,15.5L15.53,12.8L13.4,11H16.4L17,8.5L17.6,11H20.6L18.47,12.8L20.5,15.5L18.5,14.06L16.5,15.5V18H13.5V16.5L15.5,15L14,13.25L12,15V11C12,8.62 13.55,6.53 15.76,5.84L15.5,5.5L13,3L10.5,5.5L12.53,8.2L10.4,10H7.4L8,7.5L8.6,5H5.6L4,8.2L6,10H3V13H5.09C5.03,13.16 5,13.33 5,13.5A3.5,3.5 0 0,0 8.5,17A3.5,3.5 0 0,0 12,13.5C12,13.33 11.97,13.16 11.91,13H21V10H18.91C18.97,10.16 19,10.33 19,10.5C19,11.42 18.5,12.25 17.74,12.76L19.5,14.06L18.5,15.5Z" />
    </svg>
)

export default function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutGrid },
    { href: '/verification', label: 'KTP Verification', icon: Fingerprint, badge: 'Required' },
    { href: '/profile', label: 'Profile', icon: User },
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold font-headline">IndoJobLink</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref asChild>
                <SidebarMenuButton as="a" isActive={isActive(item.href)} tooltip={{children: item.label}}>
                  <item.icon />
                  <span>{item.label}</span>
                  {item.badge && <Badge variant="destructive" className="ml-auto">{item.badge}</Badge>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{children: "Help & Support"}}>
                    <HelpCircle />
                    <span>Help & Support</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton tooltip={{children: "Settings"}}>
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
