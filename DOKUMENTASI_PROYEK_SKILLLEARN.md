# LAPORAN DOKUMENTASI PROYEK SKILLLEARN
## Mini Specialized Learning Platform Keterampilan Praktis Siswa & Mahasiswa

---

### Informasi Proyek
- **Nama Aplikasi**: SkillLearn
- **Kategori**: Mini Specialized Educational Web & Mobile Platform
- **Target Pengguna**: Siswa (SMA/SMK) & Mahasiswa
- **Bidang Keterampilan**: Pemrograman, Desain Grafis, Digital Marketing, dan Teknologi
- **Teknologi Utama**:
  - Frontend Web: React.js (Vite)
  - Mobile App: React Native (Expo SDK 52)
  - Backend API: Node.js & Express.js
  - Database: MongoDB (Mongoose)

---

## 1. Ringkasan & Latar Belakang Aplikasi

SkillLearn dirancang khusus sebagai platform mandiri yang memfasilitasi pelajar tingkat sekolah menengah dan perguruan tinggi dalam mengasah keterampilan praktis siap kerja di luar kurikulum formal. 

Berbeda dengan sistem manajemen pembelajaran konvensional yang kerap bertele-tele, SkillLearn mengadopsi model **4 Pilar Pembelajaran Komprehensif** untuk setiap modul keahlian:
1. **Artikel Edukatif**: Bacaan ringkas berbobot yang menguraikan konsep dasar, anatomi teknologi, serta poin kunci (*Key Takeaways*).
2. **Video Tutorial**: Demonstrasi visual interaktif langkah demi langkah terintegrasi player YouTube.
3. **Kuis Evaluasi**: Pertanyaan pilihan ganda interaktif dengan koreksi jawaban langsung, kalkulasi skor otomatis (skala 0 - 100), dan penjelasan evaluasi.
4. **Latihan Praktik**: Skenario studi kasus industri, instruksi pengerjaan terarah, kolom refleksi pemecahan masalah, serta pengumpulan tautan repositori proyek.

Sistem dilengkapi mekanisme **Autentikasi (Register & Login)** untuk melindungi materi, fitur **Penyimpanan Materi Favorit (Bookmark)**, dan pencatatan **Riwayat Pembelajaran (Learning History & Progress Tracking)** secara persisten.

---

## 2. Struktur Desain & Antarmuka (UI/UX)

Sesuai instruksi dan panduan spesifikasi:
- **Tema Warna**: Dominan Putih (`#FFFFFF`, `#F8FAFC`) dan Biru (`#2563EB`, `#1D4ED8`, `#EFF6FF`).
- **Tanpa Gradasi**: Seluruh tata letak menggunakan flat design murni dengan border halus (`#E2E8F0`) untuk keterbacaan optimal.
- **Tanpa Ikon Emoticon**: Seluruh antarmuka menggunakan *Vector SVG Icons* (Feather / Lucide).

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

---

## 4. Struktur Database MongoDB

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

## 5. Dokumentasi REST API Backend

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

## 6. Bukti Pengujian & Checklist Persyaratan

### A. Aplikasi Web (Minimal 4 Halaman)
- [x] **Halaman 1: Login** (`/login`) — Autentikasi email, validasi, toggle password, autofill akun demo cepat.
- [x] **Halaman 2: Register** (`/register`) — Input nama, email, password, peran Siswa/Mahasiswa, institusi.
- [x] **Halaman 3: Halaman Utama / Katalog** (`/`) — Banner biru flat, filter 4 kategori (Pemrograman, Desain Grafis, Digital Marketing, Teknologi), input pencarian materi, kartu modul dengan tombol favorit.
- [x] **Halaman 4: Halaman Detail Kursus** (`/course/:id`) — 4 Tab interaktif (Artikel lengkap, Video player, Kuis evaluasi dengan skor instan, Latihan praktik studi kasus).
- [x] **Halaman Tambahan: Koleksi Favorit** (`/favorites`) — Menampilkan daftar materi yang disimpan.
- [x] **Halaman Tambahan: Riwayat Belajar** (`/history`) — Statistik materi selesai dan riwayat progres.

### B. Aplikasi Mobile React Native (Minimal 4 Halaman)
- [x] **Layar 1: LoginScreen** — Autentikasi mobile, tombol autofill akun demo.
- [x] **Layar 2: RegisterScreen** — Pendaftaran akun mobile.
- [x] **Layar 3: HomeScreen** — Katalog materi mobile dengan horizontal category chips dan search bar.
- [x] **Layar 4: CourseDetailScreen** — Tab switcher mobile (Artikel, Video, Kuis pilihan ganda interaktif, Form kirim praktik).
- [x] **Layar Tambahan: FavoritesScreen & HistoryScreen** — Tab bar navigasi bawah untuk favorit dan riwayat.

### C. Server dan Database
- [x] Node.js & Express.js dengan middleware CORS dan JWT Auth.
- [x] Mongoose models & integrasi MongoDB (dengan In-Memory Fallback untuk pengujian instan penguji).
- [x] Seeding data lengkap 8 materi kursus industri dan akun demo `siswa@skilllearn.id`.

---

## 7. Bukti Tautan & Asset Mockup Figma

Platform dilengkapi **15 Berkas Desain Mockup Vector SVG Siap Pakai** di folder `figma-mockups/`:
- **Web UI**: Login, Register, Home Catalog, Detail Artikel, Detail Video, Detail Kuis, Detail Praktik, Halaman Favorit, Halaman Riwayat Belajar.
- **Mobile UI**: LoginScreen, RegisterScreen, HomeScreen, Detail Video, Detail Kuis, Detail Praktik, FavoritesScreen, HistoryScreen.

> **Catatan Pengumpulan**: Sisipkan tautan online storage / hosting Anda di bawah ini sebelum menyimpan ke format Word/PDF:

- **Link Repositori GitHub**: `https://github.com/username/SkillLearn-Platform` *(Sesuaikan)*
- **Link Hosting Web Vercel**: `https://skilllearn-app.vercel.app` *(Sesuaikan)*
- **Link Backend API Hosting**: `https://skilllearn-api.onrender.com` *(Sesuaikan)*
- **Link Desain Figma**: `https://www.figma.com/design/.../SkillLearn-UI` *(Sesuaikan)*
- **Link Google Drive / Online Storage (ZIP Source Code & APK)**: `https://drive.google.com/drive/folders/...` *(Sesuaikan)*

---

## 8. Panduan Menjalankan dengan Expo Go (QR Code)

1. Buka folder `mobile`:
   ```bash
   cd mobile
   npm start
   ```
2. Terminal akan memunculkan **Metro Bundler** beserta **QR Code Expo**.
3. Di smartphone Anda:
   - Unduh aplikasi **Expo Go** dari Google Play Store atau Apple App Store.
   - Pindai (Scan) QR Code yang ada di terminal melalui Expo Go (pada iOS gunakan aplikasi Kamera bawaan).
   - Aplikasi SkillLearn Mobile akan langsung dimuat secara otomatis di smartphone.

---

*(Dokumen ini dapat diekspor langsung ke berkas .docx menggunakan Microsoft Word atau dicetak menjadi PDF untuk pengumpulan).*
