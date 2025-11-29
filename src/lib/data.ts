export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: 'Harian Lepas' | 'Proyek' | 'Part-time'
  salary: number
  salaryType: 'day' | 'hour' | 'project'
  description: string
  requirements: string[]
  posterImage: string
  imageHint: string
}

export type Candidate = {
  id: string
  name: string
  avatar: string
  skills: string[]
  rating: number
  completedJobs: number
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Pekerja Konstruksi Harian',
    company: 'PT Bangun Jaya',
    location: 'Jakarta Selatan',
    type: 'Harian Lepas',
    salary: 250000,
    salaryType: 'day',
    description: 'Dibutuhkan pekerja harian untuk proyek pembangunan ruko di area Jakarta Selatan. Pekerjaan meliputi angkat bahan, aduk semen, dan tugas konstruksi dasar lainnya. Disediakan makan siang.',
    requirements: ['Pria, usia 18-45 tahun', 'Fisik kuat dan sehat', 'Bersedia bekerja di bawah sinar matahari', 'Memiliki KTP valid'],
    posterImage: 'https://picsum.photos/seed/job1/600/400',
    imageHint: 'construction site',
  },
  {
    id: '2',
    title: 'Waiter/Waitress Event',
    company: 'Catering Berkah',
    location: 'Surabaya',
    type: 'Proyek',
    salary: 300000,
    salaryType: 'project',
    description: 'Dibutuhkan waiter/waitress untuk acara pernikahan pada hari Sabtu, 28 September 2024. Tugas melayani tamu, menyajikan makanan dan minuman. Pakaian seragam disediakan.',
    requirements: ['Pria/Wanita, usia 18-30 tahun', 'Berpenampilan menarik', 'Komunikatif dan ramah', 'Pengalaman di bidang F&B diutamakan'],
    posterImage: 'https://picsum.photos/seed/job2/600/400',
    imageHint: 'restaurant event',
  },
  {
    id: '3',
    title: 'Asisten Rumah Tangga (Part-time)',
    company: 'Keluarga Bpk. Hartono',
    location: 'Bandung',
    type: 'Part-time',
    salary: 75000,
    salaryType: 'day',
    description: 'Mencari asisten rumah tangga paruh waktu untuk bersih-bersih rumah (menyapu, mengepel, lap kaca). Jadwal kerja 3 kali seminggu (Senin, Rabu, Jumat) jam 9 pagi - 12 siang.',
    requirements: ['Wanita, usia 25-50 tahun', 'Jujur dan rajin', 'Bisa mengendarai motor (nilai plus)', 'Domisili Bandung'],
    posterImage: 'https://picsum.photos/seed/job3/600/400',
    imageHint: 'clean house',
  },
  {
    id: '4',
    title: 'Tukang Kebun',
    company: 'Perumahan Green Hills',
    location: 'Bogor',
    type: 'Harian Lepas',
    salary: 150000,
    salaryType: 'day',
    description: 'Dibutuhkan tukang kebun untuk merawat taman di area perumahan. Pekerjaan meliputi potong rumput, menyiram tanaman, dan membersihkan area taman. Peralatan disediakan.',
    requirements: ['Pria, usia 20-55 tahun', 'Mengerti tentang tanaman', 'Rajin dan telaten', 'Memiliki KTP valid'],
    posterImage: 'https://picsum.photos/seed/job4/600/400',
    imageHint: 'beautiful garden',
  },
    {
    id: '5',
    title: 'Kurir Paket Lepas',
    company: 'Cepat Express',
    location: 'Medan',
    type: 'Harian Lepas',
    salary: 180000,
    salaryType: 'day',
    description: 'Dicari kurir harian untuk pengantaran paket di area Medan. Motor dan bensin disediakan oleh perusahaan. Dibutuhkan yang hafal jalanan Medan.',
    requirements: ['Pria, usia 18-40 tahun', 'Memiliki SIM C aktif', 'Jujur dan bertanggung jawab', 'Bisa menggunakan Google Maps'],
    posterImage: 'https://picsum.photos/seed/job5/600/400',
    imageHint: 'delivery courier',
  },
  {
    id: '6',
    title: 'Jaga Stand Bazaar Makanan',
    company: 'Dapur Mama',
    location: 'Yogyakarta',
    type: 'Proyek',
    salary: 120000,
    salaryType: 'day',
    description: 'Dibutuhkan penjaga stand makanan untuk event bazaar di Malioboro. Tugas melayani pembeli dan menjaga kebersihan stand. Event berlangsung selama 3 hari.',
    requirements: ['Pria/Wanita, usia 17-28 tahun', 'Ramah dan energik', 'Bisa berhitung dengan cepat', 'Bersedia bekerja di akhir pekan'],
    posterImage: 'https://picsum.photos/seed/job6/600/400',
    imageHint: 'food stall',
  },
  {
    id: '7',
    title: 'Pekerja Pengepakan Gudang',
    company: 'Logistik Maju',
    location: 'Bekasi',
    type: 'Harian Lepas',
    salary: 200000,
    salaryType: 'day',
    description: 'Dibutuhkan tenaga pengepakan untuk gudang online shop. Pekerjaan meliputi mengambil barang, membungkus, dan menempelkan resi. Jam kerja 8 pagi - 5 sore.',
    requirements: ['Pria/Wanita, usia 18-35 tahun', 'Teliti dan cekatan', 'Bisa bekerja dalam tim', 'Fisik sehat'],
    posterImage: 'https://picsum.photos/seed/job7/600/400',
    imageHint: 'warehouse worker',
  },
  {
    id: '8',
    title: 'Crew Cuci Mobil',
    company: 'Kinclong Car Wash',
    location: 'Tangerang',
    type: 'Part-time',
    salary: 80000,
    salaryType: 'day',
    description: 'Dicari crew cuci mobil untuk shift sore (jam 2 siang - 8 malam). Pengalaman tidak diutamakan, akan ada training. Dapat bonus jika mencapai target.',
    requirements: ['Pria, usia 18-30 tahun', 'Mau belajar dan pekerja keras', 'Tidak masalah basah-basahan', 'Jujur'],
    posterImage: 'https://picsum.photos/seed/job8/600/400',
    imageHint: 'car wash',
  },
]

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
    skills: ['Konstruksi', 'Angkat Berat', 'Disiplin'],
    rating: 4.8,
    completedJobs: 25,
  },
  {
    id: '2',
    name: 'Agus Setiawan',
    avatar: 'https://picsum.photos/seed/avatar4/100/100',
    skills: ['Tukang Kayu', 'Konstruksi', 'Cepat'],
    rating: 4.9,
    completedJobs: 32,
  },
  {
    id: '3',
    name: 'Joko Susilo',
    avatar: 'https://picsum.photos/seed/avatar5/100/100',
    skills: ['Kerja Tim', 'Konstruksi', 'Kuat'],
    rating: 4.7,
    completedJobs: 18,
  },
]
