import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Job } from '@/lib/data'
import { MapPin, Briefcase, Bookmark } from 'lucide-react'

type JobCardProps = {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Link href={`/jobs/${job.id}`}>
          <Image
            src={job.posterImage}
            alt={job.title}
            width={600}
            height={400}
            className="w-full h-40 object-cover"
            data-ai-hint={job.imageHint}
          />
        </Link>
        <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full bg-background/70 hover:bg-background">
            <Bookmark className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="space-y-2">
            <Badge variant="outline">{job.company}</Badge>
            <CardTitle className="text-lg font-bold font-headline leading-tight">
              <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors">
                {job.title}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-primary">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(job.salary)}
          <span className="text-sm font-normal text-muted-foreground">/{job.salaryType}</span>
        </div>
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
