'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  Home,
  Sun,
  User,
  LogOut,
  Settings,
  Moon,
  Briefcase,
  X,
  Check,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from './ui/badge'
import Image from 'next/image'
import { jobs } from '@/lib/data'

export default function AppHeader() {
  const { isMobile } = useSidebar()
  const { toast } = useToast()
  const [isOnline, setIsOnline] = useState(false)
  const [showMatchDialog, setShowMatchDialog] = useState(false)

  // Find a sample job to show in the dialog
  const matchedJob = jobs.find(j => j.id === '2')

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isOnline) {
      // Simulate finding a job after 5 seconds
      timeoutId = setTimeout(() => {
        setShowMatchDialog(true)
      }, 5000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isOnline])


  const handleGoOnline = (online: boolean) => {
    setIsOnline(online)
    toast({
      title: online ? 'Anda sekarang online!' : 'Anda sekarang offline.',
      description: online
        ? 'Sistem sedang mencarikan pekerjaan untuk Anda.'
        : 'Anda tidak akan lagi menerima perjodohan pekerjaan.',
    })
  }

  const handleAcceptJob = () => {
    setShowMatchDialog(false)
    toast({
        title: 'Pekerjaan Diterima!',
        description: `Anda telah menerima pekerjaan "${matchedJob?.title}". Detail lebih lanjut telah dikirimkan.`,
        variant: 'default',
    })
    setIsOnline(false) // Turn off matchmaking after action
  }
  
  const handleDeclineJob = () => {
      setShowMatchDialog(false)
      toast({
          title: 'Pekerjaan Ditolak',
          description: `Anda menolak pekerjaan "${matchedJob?.title}". Kami akan terus mencari yang lain.`,
          variant: 'destructive'
      })
      // Keep user online to find next job
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        {isMobile && <SidebarTrigger />}
        <div className="flex-1">
          {/* Can add breadcrumbs or page title here */}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="go-online-switch">Go Online</Label>
            <Switch id="go-online-switch" checked={isOnline} onCheckedChange={handleGoOnline} />
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

      {matchedJob && (
        <AlertDialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Briefcase className="text-primary" />
                Pekerjaan Baru Ditemukan!
              </AlertDialogTitle>
              <AlertDialogDescription>
                Sebuah pekerjaan yang cocok dengan profil Anda telah ditemukan. Harap tinjau dan tanggapi segera.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4">
                <div className="relative h-40 w-full rounded-lg overflow-hidden">
                    <Image src={matchedJob.posterImage} alt={matchedJob.title} layout="fill" objectFit="cover" data-ai-hint={matchedJob.imageHint} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-bold font-headline">{matchedJob.title}</h3>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">{matchedJob.company}</Badge>
                        <Badge variant="outline">{matchedJob.location}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{matchedJob.description.substring(0, 100)}...</p>
                    <div className="text-lg font-semibold text-primary">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                        }).format(matchedJob.salary)}{' '}
                        <span className="text-sm font-normal text-muted-foreground">/{matchedJob.salaryType}</span>
                    </div>
                </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline" onClick={handleDeclineJob}>
                    <X className="mr-2"/> Tolak
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleAcceptJob}>
                    <Check className="mr-2"/> Terima Pekerjaan
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
