'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import { jobs, candidates, applicants, type ApplicantStatus } from '@/lib/data'
import Link from 'next/link'

export default function EmployerDashboardPage() {
  // MOCK: Assume employerId is 'PT Bangun Jaya'
  const employerCompany = 'PT Bangun Jaya'
  const employerJobs = jobs.filter((job) => job.company === employerCompany)
  const [selectedJobId, setSelectedJobId] = useState(employerJobs[0]?.id)
  
  const jobApplicants = applicants.filter(a => a.jobId === selectedJobId)

  const getCandidateById = (id: string) => candidates.find(c => c.id === id)

  const getStatusVariant = (status: ApplicantStatus) => {
    switch (status) {
        case 'Applied': return 'secondary'
        case 'Accepted': return 'default'
        case 'Working': return 'outline'
        case 'Completed': return 'default'
        case 'Rejected': return 'destructive'
        default: return 'secondary'
    }
  }

  const handleStatusChange = (applicantId: string, newStatus: ApplicantStatus) => {
    // In a real app, you would update the backend here.
    // For now, we just log it.
    console.log(`Changed applicant ${applicantId} to status ${newStatus}`)
    alert(`Status pelamar diubah menjadi ${newStatus}! (Simulasi)`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-headline">
            Dasbor Pelaku Usaha
          </h1>
          <p className="text-muted-foreground">
            Kelola lowongan pekerjaan dan pelamar Anda di sini.
          </p>
        </div>
        <Button asChild>
            <Link href="/employer/jobs/create">
                <PlusCircle className="mr-2" />
                Buat Lowongan Baru
            </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Lowongan Anda</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {employerJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`text-left p-4 hover:bg-muted/50 transition-colors ${selectedJobId === job.id ? 'bg-muted' : ''}`}
                  >
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Pelamar</CardTitle>
                    <CardDescription>
                        {jobs.find(j => j.id === selectedJobId)?.title || 'Pilih pekerjaan untuk melihat pelamar'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nama Pelamar</TableHead>
                            <TableHead>Tanggal Melamar</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Tindakan</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {jobApplicants.map((applicant) => {
                            const candidate = getCandidateById(applicant.candidateId);
                            if (!candidate) return null;
                            
                            return (
                                <TableRow key={applicant.id}>
                                    <TableCell className="font-medium">{candidate.name}</TableCell>
                                    <TableCell>{applicant.appliedDate}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(applicant.status)}>{applicant.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'Accepted')}>
                                                    Terima
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'Working')}>
                                                    Sedang Bekerja
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'Completed')}>
                                                    Selesai Bekerja
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleStatusChange(applicant.id, 'Rejected')}>
                                                    Tolak
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                    {jobApplicants.length === 0 && (
                        <div className="text-center py-10 text-muted-foreground">
                            Belum ada pelamar untuk pekerjaan ini.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
