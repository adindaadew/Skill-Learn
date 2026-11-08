# SkillLearn - Mini Specialized Learning Platform

Platform pembelajaran mandiri keahlian praktis non-formal yang ditujukan bagi siswa dan mahasiswa untuk menguasai keterampilan di bidang:
1. **Pemrograman**
2. **Desain Grafis**
3. **Digital Marketing**
4. **Teknologi & Keamanan Siber**

Setiap materi dirancang secara terstruktur mencakup 4 pilar pembelajaran utama:
- **Artikel**: Teori konsep, panduan terarah, dan poin penting (*Key Takeaways*).
- **Video Tutorial**: Video panduan interaktif (terintegrasi YouTube embed).
- **Kuis Evaluasi**: Pertanyaan pilihan ganda interaktif, koreksi instan, skor otomatis (0-100), dan pembahasan jawaban.
- **Latihan Praktik**: Skenario studi kasus dunia nyata, langkah pengerjaan tugas, formulir refleksi, dan tautan repositori proyek.

---

## Arsitektur Proyek & Tech Stack

```
Exam-Skill-Learn/
├── server/      -> Backend API Server (Node.js, Express.js, MongoDB / Mongoose)
├── client/      -> Frontend Web (React 19, Vite, React Router, Clean SVG Icons)
├── mobile/      -> Aplikasi Mobile (React Native, Expo SDK 52, React Navigation)
└── DOKUMENTASI_PROYEK_SKILLLEARN.md -> Panduan Lengkap & Bukti Proyek (Word/PDF ready)
```

- **Frontend Web**: React.js (Vite), React Router DOM, Custom SVG Vector Icons (tanpa emoticon).
- **Aplikasi Mobile**: React Native, Expo, React Navigation (Native Stack & Bottom Tabs), Feather Vector Icons.
- **Backend API**: Node.js, Express.js, JWT (JSON Web Token), Bcryptjs, CORS.
- **Database**: MongoDB (Mongoose) + Zero-Config In-Memory Engine Fallback (aplikasi dapat langsung dieksekusi oleh penguji bahkan tanpa perlu instalasi MongoDB lokal).
- **Desain UI**: Bersih, warna dasar Putih dan Biru (`#2563EB`, `#FFFFFF`, `#F8FAFC`).

---

## Panduan Menjalankan Aplikasi

### 1. Menjalankan Backend (`server`)

1. Buka terminal pada folder `server`:
   ```bash
   cd server
   ```
2. Pastikan file `.env` sudah ada (dapat melihat `server/.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/skilllearn
   JWT_SECRET=skilllearn_super_secret_jwt_key_2026
   ```
   *(Opsional: Jika menggunakan MongoDB Atlas di cloud, cukup ganti `MONGODB_URI` dengan connection string Atlas Anda).*
3. Jalankan server:
   ```bash
   npm start
   ```
4. Server akan aktif di `http://localhost:5000`. Server otomatis mengimpor 8 modul materi praktis dan akun demo siap pakai.

---

### 2. Menjalankan Frontend Web (`client`)

1. Buka terminal pada folder `client`:
   ```bash
   cd client
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Buka browser pada URL yang ditampilkan (default: `http://localhost:5173`).
4. Untuk build produksi:
   ```bash
   npm run build
   ```

---

### 3. Menjalankan Aplikasi Mobile (`mobile` / Expo Go)

1. Buka terminal pada folder `mobile`:
   ```bash
   cd mobile
   ```
2. Jalankan Expo:
   ```bash
   npm start
   ```
3. Terminal akan menampilkan **QR Code Expo Go**:
   - Buka aplikasi **Expo Go** pada smartphone (Android / iOS).
   - Pindai (scan) QR Code yang muncul di terminal untuk membuka aplikasi langsung di HP.
   - Atau tekan tombol `w` di terminal untuk membuka versi web emulator di browser.

---

## Akun Demo Pengujian Cepat

Tersedia akun demo yang langsung siap digunakan tanpa perlu mengetik manual:
- **Email**: `siswa@skilllearn.id`
- **Password**: `password123`
- **Nama**: Budi Mahasiswa Pratama
- **Status**: Mahasiswa
*(Tersedia tombol satu-klik "Gunakan Akun Demo" di halaman Login web dan mobile).*

---

## 3. Alur Pengguna (User Flow) Aplikasi

```
[Mulai]
   │
   ▼
[Halaman Login / Register]
   │ (Validasi email, password, peran Siswa/Mahasiswa)
   ▼
[Berhasil Autentikasi -> JWT Token Disimpan]
   │
   ├──────────────────────────────┬──────────────────────────────┐
   ▼                              ▼                              ▼
[Halaman Utama / Katalog]    [Halaman Favorit]          [Halaman Riwayat]
   │ (Filter 4 Kategori &          │ (Materi yang disimpan)        │ (Statistik & Progres %)
   │  Pencarian Kata Kunci)        │                               │
   ▼                               ▼                               ▼
   └───────────────────────────────┴───────────────────────────────┘
                                   │
                                   ▼
                         [Halaman Detail Kursus]
                                   │
          ┌────────────────┬───────┴────────┬────────────────┐
          ▼                ▼                ▼                ▼
     [Tab Artikel]    [Tab Video]      [Tab Kuis]      [Tab Praktik]
     (Baca teori)     (Tonton video)   (Jawab soal &    (Skenario kasus &
                                        skor instan)     submit refleksi)
                                   │
                                   ▼
          [Pembaruan Otomatis ke Riwayat Pembelajaran (25% per Modul)]
```

## Halaman & Fitur Aplikasi

| No | Halaman | Web (`/client`) | Mobile (`/mobile`) | Keterangan Fitur |
|---|---|---|---|---|
| 1 | **Login** | `/login` | `LoginScreen` | Form autentikasi, validasi, toggle password, tombol autofill demo |
| 2 | **Register** | `/register` | `RegisterScreen` | Pendaftaran akun (Nama, Email, Sandi, Status Siswa/Mahasiswa, Institusi) |
| 3 | **Halaman Utama** | `/` | `HomeScreen` | Katalog materi, filter 4 kategori, pencarian cepat, kartu modul & progres |
| 4 | **Halaman Detail** | `/course/:id` | `CourseDetailScreen` | 4 Tab: Artikel materi, Video YouTube, Kuis interaktif, Latihan praktik |
| 5 | **Favorit** *(Bonus)* | `/favorites` | `FavoritesScreen` | Menyimpan dan mengelola materi favorit (Bookmark) |
| 6 | **Riwayat** *(Bonus)* | `/history` | `HistoryScreen` | Statistik ringkas belajar, daftar progres modul, dan skor kuis |

---

## Dokumentasi REST API Backend

| Metode | Endpoint | Proteksi Auth | Deskripsi |
|---|---|---|---|
| `POST` | `/api/auth/register` | Publik | Registrasi akun baru (Siswa/Mahasiswa) |
| `POST` | `/api/auth/login` | Publik | Masuk dengan email & password, mengembalikan token JWT |
| `GET` | `/api/auth/me` | Bearer Token | Mengambil identitas profil pengguna yang sedang login |
| `GET` | `/api/courses` | Opsional | Mengambil daftar materi (bisa filter `category` dan `search`) |
| `GET` | `/api/courses/:id` | Opsional | Mengambil detail artikel, video, kuis, dan praktik kursus |
| `GET` | `/api/courses/meta/categories` | Publik | Statistik jumlah materi per kategori |
| `GET` | `/api/favorites` | Bearer Token | Daftar materi yang disimpan pengguna |
| `POST` | `/api/favorites/toggle/:courseId` | Bearer Token | Toggle simpan/hapus materi favorit |
| `GET` | `/api/history` | Bearer Token | Riwayat aktivitas dan progres belajar pengguna |
| `GET` | `/api/history/summary` | Bearer Token | Ringkasan statistik (total diakses, selesai, rata-rata skor) |
| `POST` | `/api/history/update` | Bearer Token | Memperbarui progres modul, kirim kuis, dan kirim latihan |

---
## Struktur Database MongoDB

### A. Koleksi `users`
| Field | Tipe Data | Deskripsi |
|---|---|---|
| `_id` | ObjectId | ID unik pengguna |
| `name` | String | Nama lengkap pengguna |
| `email` | String (Unique) | Alamat email terdaftar |
| `password` | String | Hash kata sandi (Bcryptjs) |
| `role` | String (Enum) | 'Siswa' \| 'Mahasiswa' \| 'Umum' |
| `institution`| String | Nama sekolah atau kampus |
| `createdAt` | Date | Waktu pendaftaran |

### B. Koleksi `courses`
| Field | Tipe Data | Deskripsi |
|---|---|---|
| `_id` | ObjectId | ID unik kursus |
| `title` | String | Judul materi keterampilan |
| `slug` | String (Unique) | Slug URL ramah SEO |
| `category` | String | Pemrograman / Desain Grafis / Digital Marketing / Teknologi |
| `level` | String | Pemula / Menengah / Lanjutan |
| `duration` | String | Estimasi durasi (contoh: '60 Menit') |
| `summary` | String | Ringkasan materi |
| `instructor` | Object | `{ name, role }` |
| `article` | Object | `{ title, content, keyTakeaways: [] }` |
| `video` | Object | `{ title, youtubeUrl, youtubeEmbedId, duration, description }` |
| `quiz` | Array of Objects| `[{ question, options: [], correctAnswerIndex, explanation }]` |
| `practice` | Object | `{ title, scenario, tasks: [], submissionGuide }` |

### C. Koleksi `favorites`
| Field | Tipe Data | Deskripsi |
|---|---|---|
| `_id` | ObjectId | ID favorit |
| `user` | ObjectId (Ref: User) | Pengguna pemilik favorit |
| `course` | ObjectId (Ref: Course) | Kursus yang ditandai |
| `createdAt` | Date | Waktu penyimpanan |

### D. Koleksi `learninghistories`
| Field | Tipe Data | Deskripsi |
|---|---|---|
| `_id` | ObjectId | ID riwayat |
| `user` | ObjectId (Ref: User) | Pengguna terkait |
| `course` | ObjectId (Ref: Course) | Kursus yang dipelajari |
| `completedModules` | Object | `{ article: bool, video: bool, quiz: bool, practice: bool }` |
| `quizScore` | Number | Skor kuis terakhir yang diperoleh (0 - 100) |
| `practiceNotes` | String | Catatan atau refleksi latihan praktik |
| `practiceLink` | String | Tautan repositori atau karya |
| `progressPercent`| Number | Persentase total modul (0% - 100%) |
| `isCompleted` | Boolean | True jika progress telah mencapai 100% |
| `lastAccessed` | Date | Waktu terakhir materi dibuka |

---
