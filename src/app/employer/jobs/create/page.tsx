'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'

const formSchema = z.object({
  jobTitle: z.string().min(5, { message: "Judul pekerjaan minimal 5 karakter." }),
  location: z.string().min(3, { message: "Lokasi minimal 3 karakter." }),
  jobType: z.enum(["Harian Lepas", "Proyek", "Part-time"]),
  salary: z.coerce.number().min(10000, { message: "Gaji minimal 10,000." }),
  salaryType: z.enum(["day", "hour", "project"]),
  description: z.string().min(20, { message: "Deskripsi pekerjaan minimal 20 karakter." }),
  requirements: z.string().min(10, { message: "Persyaratan minimal 10 karakter." }),
})

export default function CreateJobPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      location: "",
      jobType: "Harian Lepas",
      salary: 0,
      salaryType: "day",
      description: "",
      requirements: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
        title: "Lowongan Berhasil Dibuat!",
        description: `Lowongan pekerjaan "${values.jobTitle}" telah berhasil dipublikasikan.`,
    })
    form.reset();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-headline">
            Buat Lowongan Pekerjaan Baru
            </h1>
            <p className="text-muted-foreground">
            Isi detail di bawah ini untuk mempublikasikan kesempatan kerja baru.
            </p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                 <Card>
                    <CardHeader>
                        <CardTitle>Detail Pekerjaan</CardTitle>
                        <CardDescription>Berikan informasi yang jelas dan lengkap agar menarik pelamar yang tepat.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Judul Pekerjaan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contoh: Pekerja Konstruksi Harian" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Lokasi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Jakarta Selatan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="jobType"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Tipe Pekerjaan</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih tipe pekerjaan" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Harian Lepas">Harian Lepas</SelectItem>
                                                <SelectItem value="Proyek">Proyek</SelectItem>
                                                <SelectItem value="Part-time">Part-time</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <FormField
                                control={form.control}
                                name="salary"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Gaji (IDR)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Contoh: 250000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="salaryType"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Tipe Gaji</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih tipe gaji" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="day">Per Hari</SelectItem>
                                                <SelectItem value="hour">Per Jam</SelectItem>
                                                <SelectItem value="project">Per Proyek</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Deskripsi Pekerjaan</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Jelaskan tanggung jawab dan detail pekerjaan..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="requirements"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Persyaratan</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Sebutkan kualifikasi yang dibutuhkan. Pisahkan setiap poin dengan baris baru."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                 <FormDescription>
                                    Setiap baris baru akan dianggap sebagai satu poin persyaratan.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="ghost" asChild><Link href="/employer/dashboard">Batal</Link></Button>
                        <Button type="submit">Publikasikan Lowongan</Button>
                    </CardFooter>
                 </Card>
            </form>
        </Form>
    </div>
  )
}
