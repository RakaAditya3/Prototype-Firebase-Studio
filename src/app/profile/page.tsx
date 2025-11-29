
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Edit } from 'lucide-react'

const jobHistory = [
  {
    id: 'JH001',
    jobTitle: 'Pekerja Konstruksi Harian',
    date: '2024-07-20',
    status: 'Completed',
    payment: 'Paid',
    amount: 250000,
  },
  {
    id: 'JH002',
    jobTitle: 'Waiter/Waitress Event',
    date: '2024-07-15',
    status: 'Completed',
    payment: 'Paid',
    amount: 300000,
  },
  {
    id: 'JH003',
    jobTitle: 'Tukang Kebun',
    date: '2024-07-12',
    status: 'In Progress',
    payment: 'Pending',
    amount: 150000,
  },
]

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
         <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src="https://picsum.photos/seed/avatar2/100/100" alt="User" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
             <h1 className="text-3xl md:text-4xl font-bold text-foreground font-headline">
                Joko Dwi
            </h1>
            <p className="text-muted-foreground">Job Seeker | Jakarta, Indonesia</p>
          </div>
          <Button variant="outline" size="icon" className="ml-auto">
            <Edit className="w-4 h-4"/>
          </Button>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="history">Job History</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <p className="font-semibold">Joko Dwi</p>
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <p className="font-semibold">joko.dwi@example.com</p>
                </div>
                <div className="space-y-1">
                  <Label>Phone</Label>
                  <p className="font-semibold">+62 812 3456 7890</p>
                </div>
                 <div className="space-y-1">
                  <Label>KTP Status</Label>
                  <Badge variant="outline" className="border-green-500 text-green-600">Verified</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Payments</CardTitle>
              <CardDescription>
                Link your bank account or e-wallet to receive automated payments upon job completion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select defaultValue="bca">
                        <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bca">Bank BCA</SelectItem>
                            <SelectItem value="mandiri">Bank Mandiri</SelectItem>
                            <SelectItem value="gopay">GoPay</SelectItem>
                            <SelectItem value="ovo">OVO</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="account-number">Account / Phone Number</Label>
                    <Input id="account-number" placeholder="Enter your account number" defaultValue="1234567890"/>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                <Button>Save Payment Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Job & Payment History</CardTitle>
              <CardDescription>
                A record of all your completed and ongoing jobs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobHistory.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.jobTitle}</TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>
                        <Badge variant={job.status === 'Completed' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <Badge variant={job.payment === 'Paid' ? 'outline' : 'destructive'}>
                          {job.payment}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        }).format(job.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
