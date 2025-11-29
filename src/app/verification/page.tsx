'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Upload, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'

export default function VerificationPage() {
  const [status, setStatus] = useState<VerificationStatus>('unverified')
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('pending')
    toast({
      title: 'Verification Submitted',
      description: 'Your KTP information is being reviewed. This usually takes a few minutes.',
    })
  }

  const StatusAlert = () => {
    switch (status) {
      case 'pending':
        return (
          <Alert className="bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-400">
            <Clock className="h-4 w-4 !text-blue-700 dark:!text-blue-400" />
            <AlertTitle>Pending Review</AlertTitle>
            <AlertDescription>
              Your verification is under review. We will notify you once it's complete.
            </AlertDescription>
          </Alert>
        )
      case 'verified':
        return (
          <Alert className="bg-green-500/10 border-green-500 text-green-700 dark:text-green-400">
            <CheckCircle className="h-4 w-4 !text-green-700 dark:!text-green-400" />
            <AlertTitle>You're Verified!</AlertTitle>
            <AlertDescription>
              Your identity has been successfully verified. You can now access all features.
            </AlertDescription>
          </Alert>
        )
      case 'rejected':
         return (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Verification Rejected</AlertTitle>
            <AlertDescription>
              There was an issue with your submission. Please double-check your KTP photo and number, and resubmit.
            </AlertDescription>
          </Alert>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-headline">
          KTP Verification
        </h1>
        <p className="text-muted-foreground">
          Verify your identity to ensure a safe and trustworthy community.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit Your KTP</CardTitle>
            <CardDescription>
              Please upload a clear photo of your KTP and enter your KTP number.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ktp-number">KTP Number (NIK)</Label>
                <Input
                  id="ktp-number"
                  placeholder="e.g., 3171234567890001"
                  required
                  disabled={status === 'pending' || status === 'verified'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ktp-photo">KTP Photo</Label>
                <div className="relative">
                  <Input
                    id="ktp-photo"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                    disabled={status === 'pending' || status === 'verified'}
                  />
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="font-semibold">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, or JPEG (max. 5MB)</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={status === 'pending' || status === 'verified'}>
                {status === 'pending' ? 'Submitting...' : 'Submit for Verification'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="space-y-4">
          <Image
            src="https://picsum.photos/seed/ktpcard/400/250"
            alt="KTP Example"
            width={400}
            height={250}
            className="rounded-lg shadow-md mx-auto"
            data-ai-hint="ID card"
          />
           <p className="text-center text-sm text-muted-foreground">Make sure your photo is clear and not blurry.</p>
           <StatusAlert />
        </div>
      </div>
    </div>
  )
}
