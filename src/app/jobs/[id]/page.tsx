'use client'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { jobs, candidates } from '@/lib/data'
import {
  MapPin,
  Briefcase,
  Wallet,
  CheckCircle,
  Sparkles,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CandidateCard from '@/components/candidate-card'
import { useToast } from '@/hooks/use-toast'

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id)
  const { toast } = useToast()

  if (!job) {
    notFound()
  }

  // MOCK: Assume the current user is an employer for this job
  const isEmployer = true 

  const handleMarkComplete = () => {
    toast({
        title: 'Job Marked as Complete!',
        description: `Payment of ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(job.salary)} is being processed.`,
        variant: 'default'
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative h-64 md:h-80 w-full mb-8">
        <Image
          src={job.posterImage}
          alt={job.title}
          fill
          className="object-cover rounded-lg"
          data-ai-hint={job.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
        <div className="absolute bottom-6 left-6 text-white">
          <Badge variant="secondary">{job.company}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 font-headline">{job.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{job.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Wallet className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Salary</p>
                  <p className="text-muted-foreground">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(job.salary)}{' '}
                    / {job.salaryType}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">{job.location}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Job Type</p>
                  <p className="text-muted-foreground">{job.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {isEmployer ? (
            <Card>
              <CardHeader>
                <CardTitle>Employer Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={handleMarkComplete}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI Candidate Recommendations
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary" />
                        AI-Powered Recommendations
                      </DialogTitle>
                      <DialogDescription>
                        Our AI has found these candidates to be a great fit for your job.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                      {candidates.map(c => <CandidateCard key={c.id} candidate={c} />)}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="secondary" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    View Applicants (3)
                </Button>

              </CardContent>
            </Card>
          ) : (
            <Button size="lg" className="w-full">Apply Now</Button>
          )}
        </div>
      </div>
    </div>
  )
}
