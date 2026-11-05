export const coursesData = [
  // --- BIDANG 1: PEMROGRAMAN ---
  {
    title: 'Dasar Pemrograman Web Modern dengan React & JavaScript',
    slug: 'dasar-pemrograman-web-modern-react',
    category: 'Pemrograman',
    level: 'Pemula',
    duration: '60 Menit',
    summary: 'Pelajari konsep dasar modern JavaScript ES6+, komponen React, State, Props, dan cara membangun antarmuka web interaktif.',
    instructor: {
      name: 'Rian Pratama, S.Kom.',
      role: 'Frontend Web Engineer'
    },
    article: {
      title: 'Pengantar Membangun Antarmuka Modern Menggunakan React',
      content: `React adalah pustaka JavaScript berbasis komponen untuk membangun antarmuka pengguna yang cepat dan dinamis. Konsep utama React berakar pada Component-Driven Development, JSX (JavaScript XML), dan Virtual DOM.

1. Komponen dan JSX
Komponen adalah blok pembangun antarmuka. Anda dapat membuat Functional Component yang mengembalikan elemen JSX. JSX memungkinkan Anda menulis sintaks menyerupai HTML langsung di dalam JavaScript.

2. State dan Props
Props (properties) digunakan untuk mengalirkan data satu arah dari komponen induk (parent) ke komponen anak (child). Sementara State (menggunakan hook useState) digunakan untuk menyimpan data internal komponen yang dapat berubah sesuai interaksi pengguna.

3. Efek Samping dengan useEffect
Saat berinteraksi dengan API atau manipulasi dokumen luar, React menyediakan hook useEffect untuk menangani lifecycle pemuatan dan pembaruan data secara efisien.`,
      keyTakeaways: [
        'React menyusun UI ke dalam komponen modular yang dapat digunakan kembali.',
        'Props bersifat read-only untuk transfer data parent ke child.',
        'State menyimpan data dinamis yang memicu re-render ketika nilainya diperbarui.',
        'Virtual DOM mempercepat performa rendering antarmuka pengguna.'
      ]
    },
    video: {
      title: 'Tutorial Membangun Komponen React Pertama Anda',
      youtubeUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
      youtubeEmbedId: 'SqcY0GlETPk',
      duration: '18 Menit',
      description: 'Panduan langkah demi langkah membuat project React dengan Vite, membuat komponen, serta menangani state counter dan event handling.'
    },
    quiz: [
      {
        question: 'Apa fungsi utama dari hook useState pada React?',
        options: [
          'Menyimpan dan mengelola state data dinamis di dalam komponen fungsional',
          'Mengirimkan request HTTP ke server backend',
          'Mengubah format file HTML menjadi berkas biner',
          'Menghubungkan aplikasi langsung ke database MongoDB'
        ],
        correctAnswerIndex: 0,
        explanation: 'useState adalah React Hook mendasar yang memungkinkan functional component memiliki dan memperbarui state lokal.'
      },
      {
        question: 'Bagaimana sifat aliran data (data flow) default pada React antar komponen?',
        options: [
          'Dua arah secara otomatis (two-way automatic binding)',
          'Satu arah dari parent ke child melalui props (unidirectional data flow)',
          'Acak tergantung urutan deklarasi fungsi',
          'Hanya mengalir dari database langsung ke browser tanpa perantara'
        ],
        correctAnswerIndex: 1,
        explanation: 'React mengadopsi prinsip unidirectional data flow, di mana data mengalir dari komponen atas ke komponen bawah melalui props.'
      },
      {
        question: 'Ekstensi file apa yang paling lazim digunakan untuk komponen React?',
        options: [
          '.sql atau .db',
          '.jsx atau .tsx',
          '.exe atau .bat',
          '.css atau .scss saja'
        ],
        correctAnswerIndex: 1,
        explanation: '.jsx (JavaScript XML) dan .tsx (TypeScript XML) adalah format standar untuk komponen antarmuka React.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Membuat Komponen Counter & Daftar Catatan',
      scenario: 'Anda diminta membuat komponen mini berupa counter tugas dan daftar to-do sederhana menggunakan React hooks (useState).',
      tasks: [
        'Buat state angka untuk menghitung tugas yang telah diselesaikan.',
        'Sediakan tombol tambah (+) dan reset (0) yang memperbarui state tersebut.',
        'Tampilkan pesan dinamis jika counter telah mencapai target minimal 3 tugas.',
        'Tuliskan refleksi kode dan tautan repositori atau ringkasan implementasi Anda.'
      ],
      submissionGuide: 'Ketikkan ringkasan hasil latihan Anda, baris kode penting, atau link repositori GitHub ke formulir di bawah ini.'
    },
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development']
  },

  {
    title: 'Dasar Logika Algoritma & Python Praktis untuk Pemula',
    slug: 'dasar-logika-algoritma-python-praktis',
    category: 'Pemrograman',
    level: 'Pemula',
    duration: '50 Menit',
    summary: 'Kuasai fondasi berpikir komputasional, struktur kontrol percabangan, perulangan, dan pemecahan masalah dengan bahasa Python.',
    instructor: {
      name: 'Budi Santoso, M.T.',
      role: 'Software Engineer & Dosen Komputer'
    },
    article: {
      title: 'Fondasi Logika Komputasi dan Sintaks Bersih Python',
      content: `Logika pemrograman adalah kemampuan untuk menyusun instruksi terstruktur yang dapat dieksekusi oleh komputer untuk menyelesaikan masalah tertentu secara efisien.

1. Variabel dan Tipe Data
Python bersifat dynamically-typed. Tipe data dasar meliputi integer, float, string, boolean, serta struktur data list dan dictionary.

2. Struktur Kontrol Percabangan (If-Elif-Else)
Percabangan memungkinkan program mengambil keputusan berdasarkan kondisi logika tertentu (kondisi true/false).

3. Perulangan (Loops)
Perulangan for dan while digunakan untuk mengulang eksekusi kode terhadap koleksi data tanpa harus menuliskan instruksi berulang secara manual.`,
      keyTakeaways: [
        'Algoritma adalah langkah berurutan yang terdefinisi untuk menyelesaikan masalah.',
        'Python menekankan keterbacaan kode (readability) dengan menggunakan indentasi.',
        'Struktur data list dan dictionary adalah fondasi pemrosesan data di Python.'
      ]
    },
    video: {
      title: 'Tutorial Dasar Logika & Struktur Data Python',
      youtubeUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
      youtubeEmbedId: 'kqtD5dpn9C8',
      duration: '15 Menit',
      description: 'Pengenalan syntax Python, penanganan input pengguna, serta contoh pembuatan program kalkulator logika sederhana.'
    },
    quiz: [
      {
        question: 'Bagaimana cara Python menandai blok kode di dalam fungsi atau percabangan?',
        options: [
          'Menggunakan kurung kurawal { }',
          'Menggunakan indentasi spasi/tab yang konsisten',
          'Menggunakan tag penutup </end>',
          'Menggunakan tanda titik koma ; di setiap akhir baris'
        ],
        correctAnswerIndex: 1,
        explanation: 'Python menggunakan indentasi (whitespace/spasi) untuk menentukan level hirarki atau blok kode.'
      },
      {
        question: 'Tipe data manakah di Python yang bersifat pasangan key-value (kunci-nilai)?',
        options: ['Tuple', 'List', 'Dictionary (dict)', 'Set'],
        correctAnswerIndex: 2,
        explanation: 'Dictionary di Python menyimpan data dalam bentuk pasangan key: value.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Program Penentu Kelulusan Nilai Siswa',
      scenario: 'Buatlah algoritma sederhana yang menerima nilai angka siswa (0-100) lalu mengembalikan predikat (A, B, C, D) dan status lulus/remedial.',
      tasks: [
        'Definisikan fungsi konversi_nilai(skor) dengan parameter nilai.',
        'Gunakan percabangan if, elif, dan else untuk menentukan predikat.',
        'Uji fungsi dengan nilai 85, 70, dan 50 lalu catat hasilnya.'
      ],
      submissionGuide: 'Tuliskan kode program Python atau alur logika yang Anda buat beserta hasil output pengujian.'
    },
    tags: ['Python', 'Algoritma', 'Pemula', 'Logika']
  },

  // --- BIDANG 2: DESAIN GRAFIS ---
  {
    title: 'Prinsip Desain UI/UX & Wireframing dengan Figma',
    slug: 'prinsip-desain-ui-ux-wireframing-figma',
    category: 'Desain Grafis',
    level: 'Pemula',
    duration: '55 Menit',
    summary: 'Pelajari dasar antarmuka pengguna (UI), pengalaman pengguna (UX), sistem grid, hierarki visual, dan pembuatan wireframe digital dengan Figma.',
    instructor: {
      name: 'Nadia Safitri, S.Ds.',
      role: 'Senior Product Designer'
    },
    article: {
      title: 'Memahami UI/UX: Dari Riset Pengguna hingga Wireframe Antarmuka',
      content: `Desain antarmuka bukan sekadar estetika visual, melainkan jembatan komunikasi antara kebutuhan manusia dengan sistem teknologi.

1. Perbedaan UI dan UX
UX (User Experience) berfokus pada alur pemikiran, kemudahan navigasi, dan kenyamanan pengguna saat berinteraksi dengan produk. UI (User Interface) berfokus pada tampilan visual, tipografi, warna, jarak (spacing), dan ikonografi.

2. Prinsip Hierarki Visual
Mata manusia membaca informasi berdasarkan ukuran, kontras warna, dan posisi. Elemen terpenting harus memiliki aksen paling kuat.

3. Pentingnya Wireframing
Wireframe adalah rancangan beresolusi rendah (low-fidelity) yang menitikberatkan pada tata letak komponen sebelum masuk ke pewarnaan mendetail.`,
      keyTakeaways: [
        'Desain yang baik berpusat pada pemecahan masalah pengguna (User-Centered Design).',
        'Hierarki visual membantu pengguna memproses informasi penting tanpa kebingungan.',
        'Wireframe mempercepat validasi konsep sebelum tahap implementasi kode.'
      ]
    },
    video: {
      title: 'Tutorial Dasar Figma untuk Pemula: Membuat Desain Aplikasi Mobile',
      youtubeUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
      youtubeEmbedId: 'c9Wg6Cb_YlU',
      duration: '20 Menit',
      description: 'Langkah pengenalan kanvas Figma, tools shape, text, penataan auto-layout, dan pembuatan prototype interaktif.'
    },
    quiz: [
      {
        question: 'Apa tujuan utama pembuatan wireframe pada tahap awal perancangan aplikasi?',
        options: [
          'Memastikan susunan tata letak dan alur navigasi tanpa terdistraksi warna dan dekorasi',
          'Menggantikan peran kode pemrograman backend seutuhnya',
          'Menentukan harga jual aplikasi di marketplace',
          'Membuat animasi 3D beresolusi tinggi'
        ],
        correctAnswerIndex: 0,
        explanation: 'Wireframe dibuat untuk memvalidasi tata letak, struktur informasi, dan navigasi secara cepat dan hemat biaya.'
      },
      {
        question: 'Fitur Figma manakah yang sangat membantu membuat tata letak tombol dan kartu yang responsif?',
        options: ['Auto Layout', 'Pen Tool saja', 'Color Picker', 'Export PDF'],
        correctAnswerIndex: 0,
        explanation: 'Auto Layout di Figma memungkinkan komponen menyesuaikan padding, margin, dan ukuran konten secara otomatis seperti CSS Flexbox.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Merancang Wireframe Halaman Login Bersih',
      scenario: 'Rancang wireframe layar masuk (login) yang terdiri atas logo, input email, input password, tombol masuk utama, dan tautan daftar.',
      tasks: [
        'Buat frame mobile ukuran 375x812 atau desktop di Figma.',
        'Terapkan grid dan atur hierarki visual antara judul dan formulir.',
        'Pastikan rasio kontras tombol jelas dan jarak elemen rapi (8pt grid system).'
      ],
      submissionGuide: 'Tuliskan tautan proyek Figma publik Anda atau jelaskan konsep tata letak yang Anda buat.'
    },
    tags: ['UI/UX', 'Figma', 'Wireframing', 'Desain']
  },

  {
    title: 'Dasar Desain Grafis Komunikasi Visual & Tipografi',
    slug: 'dasar-desain-grafis-komunikasi-visual',
    category: 'Desain Grafis',
    level: 'Pemula',
    duration: '40 Menit',
    summary: 'Kuasai elemen dasar desain grafis: kontras, keseimbangan, ruang negatif (white space), dan pemilihan jenis huruf untuk media digital.',
    instructor: {
      name: 'Dimas Wicaksono',
      role: 'Creative Director'
    },
    article: {
      title: 'Elemen Kunci Komunikasi Visual dan Harmoni Tipografi',
      content: `Desain komunikasi visual adalah seni menyampaikan pesan verbal dan non-verbal secara efektif melalui media visual.

1. Keseimbangan dan Proporsi
Desain dapat bersifat simetris (formal, stabil) atau asimetris (dinamis, modern). Keduanya membutuhkan keseimbangan bobot visual.

2. Ruang Negatif (White Space)
Ruang kosong di sekitar elemen bukan ruang yang terbuang, melainkan ruang bernafas yang memberi kenyamanan mata pembaca.

3. Anatomi Tipografi
Font Serif memiliki kait dan berkesan formal/klasik. Font Sans-Serif bersih, modern, dan sangat mudah dibaca pada layar perangkat digital.`,
      keyTakeaways: [
        'Komunikasi visual harus mengutamakan kejelasan pesan (clarity).',
        'White space meningkatkan keterbacaan hingga 20%.',
        'Batasi penggunaan jenis huruf maksimal 2 tipe font dalam satu desain.'
      ]
    },
    video: {
      title: 'Prinsip Desain Grafis: Teori Warna & Tipografi',
      youtubeUrl: 'https://www.youtube.com/watch?v=YqQx75OPWA0',
      youtubeEmbedId: 'YqQx75OPWA0',
      duration: '14 Menit',
      description: 'Pahami cara memilih palet warna yang harmonis dan paduan font yang profesional untuk karya visual Anda.'
    },
    quiz: [
      {
        question: 'Kategori font manakah yang paling direkomendasikan untuk teks layar perangkat digital karena bersih tanpa kait?',
        options: ['Sans-serif', 'Blackletter Gothic', 'Script Kaligrafi', 'Decorative Display'],
        correctAnswerIndex: 0,
        explanation: 'Font Sans-serif (tanpa kait) memiliki keterbacaan yang sangat tinggi pada resolusi layar monitor dan smartphone.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Merancang Poster Edukasi Tipografi',
      scenario: 'Pilih kutipan motivasi belajar lalu rancang poster sederhana hanya menggunakan 2 jenis font dan 2 warna kontras.',
      tasks: [
        'Tentukan font judul dan font isi teks.',
        'Atur hierarki ukuran teks agar kalimat utama langsung menarik perhatian.',
        'Beri ruang kosong (white space) yang proporsional di sekeliling teks.'
      ],
      submissionGuide: 'Tuliskan deskripsi kombinasi font yang Anda pilih dan alasan penggunaannya.'
    },
    tags: ['Desain Grafis', 'Tipografi', 'Visual', 'Seni']
  },

  // --- BIDANG 3: DIGITAL MARKETING ---
  {
    title: 'Strategi Digital Marketing & Social Media Strategy',
    slug: 'strategi-digital-marketing-social-media',
    category: 'Digital Marketing',
    level: 'Pemula',
    duration: '45 Menit',
    summary: 'Pelajari dasar pemasaran digital, penentuan buyer persona, customer journey, dan perencanaan konten media sosial yang berdampak tinggi.',
    instructor: {
      name: 'Maya Indriani, S.I.Kom.',
      role: 'Growth Marketing Specialist'
    },
    article: {
      title: 'Membangun Strategi Pemasaran Digital dari Nol',
      content: `Digital marketing memanfaatkan kanal internet untuk menjangkau audiens tertarget secara terukur dan hemat biaya dibandingkan media konvensional.

1. Buyer Persona dan Riset Target Pasar
Sebelum membuat konten atau iklan, kenali profil calon konsumen: usia, masalah yang dihadapi, ketakutan, dan tujuan mereka.

2. Corong Pemasaran (Marketing Funnel)
- Top of Funnel (Awareness): Menarik perhatian audiens baru melalui konten edukasi.
- Middle of Funnel (Consideration): Membangun kepercayaan dan membandingkan solusi.
- Bottom of Funnel (Conversion): Mengajak audiens mengambil tindakan pembelian atau pendaftaran.

3. Metrik Kunci
Keberhasilan kampanye diukur melalui data konkret: Engagement Rate, Click-Through Rate (CTR), dan Return on Ad Spend (ROAS).`,
      keyTakeaways: [
        'Pemasaran yang sukses dimulai dari pemahaman mendalam atas masalah konsumen.',
        'Konten edukatif menghasilkan kepercayaan jangka panjang.',
        'Analisis metrik data berkala adalah kunci perbaikan kampanye digital.'
      ]
    },
    video: {
      title: 'Strategi Social Media Marketing untuk Brand Baru',
      youtubeUrl: 'https://www.youtube.com/watch?v=7uK3W0Qz0_U',
      youtubeEmbedId: '7uK3W0Qz0_U',
      duration: '16 Menit',
      description: 'Panduan menyusun content calendar bulanan dan menentukan pilar konten yang relevan dengan audiens muda.'
    },
    quiz: [
      {
        question: 'Pada marketing funnel, tahap manakah yang bertujuan mengedukasi dan memperkenalkan produk kepada audiens yang belum kenal?',
        options: [
          'Awareness (Top of Funnel)',
          'Conversion (Bottom of Funnel)',
          'Retention (After Purchase)',
          'Upselling langsung'
        ],
        correctAnswerIndex: 0,
        explanation: 'Tahap Awareness mengenalkan keberadaan solusi dan masalah kepada audiens baru.'
      },
      {
        question: 'Apa kepanjangan dan arti dari metrik CTR dalam kampanye digital?',
        options: [
          'Click-Through Rate, rasio jumlah klik terhadap tayangan iklan',
          'Customer Time Run, lama waktu pelanggan membaca iklan',
          'Cash Total Return, laba kotor penjualan tunai',
          'Content Team Role, pembagian tugas pembuat konten'
        ],
        correctAnswerIndex: 0,
        explanation: 'CTR (Click-Through Rate) mengukur seberapa menarik iklan Anda sehingga audiens memutuskan untuk mengkliknya.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Menyusun 3 Pilar Konten Mingguan',
      scenario: 'Anda diminta merancang ide konten media sosial untuk kursus keterampilan daring selama 1 minggu.',
      tasks: [
        'Tentukan 3 pilar konten (contoh: Edukasi, Cerita Alumni, Tanya Jawab).',
        'Tuliskan 1 draft judul postingan dan caption persuasif untuk masing-masing pilar.',
        'Sertakan call-to-action (CTA) yang jelas di akhir postingan.'
      ],
      submissionGuide: 'Tuliskan rancangan tabel jadwal konten dan draf postingan Anda pada kotak jawaban.'
    },
    tags: ['Marketing', 'Social Media', 'Content Strategy', 'Bisnis']
  },

  {
    title: 'Fundamental SEO & Copywriting untuk Pemula',
    slug: 'fundamental-seo-copywriting-pemula',
    category: 'Digital Marketing',
    level: 'Pemula',
    duration: '45 Menit',
    summary: 'Pahami cara kerja mesin pencari Google, riset kata kunci (keyword research), dan teknik menulis naskah iklan (copywriting) dengan formula AIDA.',
    instructor: {
      name: 'Hendra Gunawan',
      role: 'Content Strategist & SEO Lead'
    },
    article: {
      title: 'Menulis Konten yang Ramah Mesin Pencari dan Memikat Pembaca',
      content: `SEO (Search Engine Optimization) membantu situs web Anda tampil di halaman pertama hasil pencarian Google tanpa membayar biaya iklan langsung.

1. Cara Kerja Mesin Pencari: Crawling, Indexing, dan Ranking.
Bot mesin pencari menelusuri halaman web, mengindeks isinya, lalu memberi peringkat berdasarkan relevansi dan otoritas domain.

2. On-Page SEO Essentials
Pastikan kata kunci utama tercantum secara wajar pada Title Tag, Heading H1/H2, URL slug, meta description, dan paragraf pembuka.

3. Formula Copywriting AIDA
- Attention: Tangkap perhatian dengan headline tajam.
- Interest: Tumbuhkan minat dengan fakta atau cerita relevan.
- Desire: Bangkitkan keinginan lewat manfaat produk nyata.
- Action: Ajak bertindak sekarang juga dengan instruksi jelas.`,
      keyTakeaways: [
        'SEO organik menghasilkan traffic berkelanjutan dalam jangka panjang.',
        'Copywriting berfokus pada manfaat (benefit), bukan sekadar fitur teknis.',
        'Formula AIDA adalah struktur dasar paling efektif untuk naskah promosi.'
      ]
    },
    video: {
      title: 'Tutorial Dasar SEO & Riset Keyword Menggunakan Alat Gratis',
      youtubeUrl: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ',
      youtubeEmbedId: 'DvwS7cV9GmQ',
      duration: '15 Menit',
      description: 'Cara menemukan kata kunci yang dicari calon siswa dan mengoptimalkan artikel blog Anda.'
    },
    quiz: [
      {
        question: 'Unsur manakah dalam formula AIDA yang bertugas memicu audiens mengambil tindakan langsung?',
        options: ['Action', 'Attention', 'Interest', 'Affection'],
        correctAnswerIndex: 0,
        explanation: 'Action adalah ajakan bertindak (Call to Action) seperti tombol daftar, beli, atau unduh.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Menulis Naskah Promosi dengan Formula AIDA',
      scenario: 'Tulis naskah promosi singkat untuk kursus desain grafis pemula dengan menerapkan prinsip Attention, Interest, Desire, dan Action.',
      tasks: [
        'Tuliskan headline pemikat perhatian (Attention).',
        'Jelaskan rasa penasaran dan solusi praktis (Interest & Desire).',
        'Tutup dengan tombol ajakan bertindak yang jelas (Action).'
      ],
      submissionGuide: 'Tuliskan teks naskah copy AIDA yang telah Anda susun di kolom jawaban praktik.'
    },
    tags: ['SEO', 'Copywriting', 'AIDA', 'Content']
  },

  // --- BIDANG 4: TEKNOLOGI ---
  {
    title: 'Pengenalan Cloud Computing & Dasar DevOps',
    slug: 'pengenalan-cloud-computing-dasar-devops',
    category: 'Teknologi',
    level: 'Pemula',
    duration: '50 Menit',
    summary: 'Pahami konsep komputasi awan (Cloud Computing), model layanan IaaS/PaaS/SaaS, kontainerisasi dengan Docker, dan siklus CI/CD dasar.',
    instructor: {
      name: 'Fajar Nugraha, S.T., M.Kom.',
      role: 'DevOps & Cloud Architect'
    },
    article: {
      title: 'Dasar Komputasi Awan dan Modern Software Delivery',
      content: `Komputasi awan adalah penyediaan sumber daya komputasi (server, penyimpanan, database, jaringan, perangkat lunak) melalui internet dengan model bayar sesuai pemakaian (pay-as-you-go).

1. Model Layanan Cloud
- IaaS (Infrastructure as a Service): Menyediakan infrastruktur virtual mentah (contoh: AWS EC2, Google Compute Engine).
- PaaS (Platform as a Service): Menyediakan lingkungan siap pakai untuk deploy kode tanpa pusing server (contoh: Vercel, Railway, Heroku).
- SaaS (Software as a Service): Aplikasi siap pakai untuk pengguna akhir (contoh: Google Drive, Office 365).

2. Apa itu DevOps?
DevOps adalah kombinasi filosofi budaya, praktik, dan alat bantu yang meningkatkan kemampuan organisasi untuk merilis aplikasi dengan kecepatan dan stabilitas tinggi.

3. Kontainerisasi (Docker)
Docker membungkus aplikasi beserta seluruh ketergantungannya ke dalam satu container terisolasi, memastikan aplikasi berjalan identik di komputer lokal maupun server produksi.`,
      keyTakeaways: [
        'PaaS memudahkan developer fokus pada kode bisnis tanpa mengelola server fisik.',
        'Docker mengeliminasi masalah umum "it works on my machine".',
        'CI/CD mengotomatiskan pengujian dan deployment aplikasi secara berkala.'
      ]
    },
    video: {
      title: 'Penjelasan Sederhana Cloud Computing & Peran DevOps',
      youtubeUrl: 'https://www.youtube.com/watch?v=M988_bvYCmr',
      youtubeEmbedId: 'M988_bvYCmr',
      duration: '17 Menit',
      description: 'Animasi penjelasan arsitektur cloud, serverless, dan pipeline deployment modern untuk pemula.'
    },
    quiz: [
      {
        question: 'Layanan deployment seperti Vercel yang memungkinkan pengembang langsung men-deploy kode aplikasi tanpa harus merakit OS server disebut kategori...',
        options: [
          'PaaS (Platform as a Service)',
          'IaaS (Infrastructure as a Service)',
          'SaaS (Software as a Service)',
          'Hardware On-Premise'
        ],
        correctAnswerIndex: 0,
        explanation: 'PaaS menyediakan runtime dan platform lengkap sehingga developer cukup men-deploy kode aplikasinya.'
      },
      {
        question: 'Apa manfaat utama dari penggunaan container seperti Docker?',
        options: [
          'Menjamin aplikasi berjalan seragam di semua lingkungan dengan mengemas seluruh dependensinya',
          'Mengganti kebutuhan jaringan internet',
          'Menghilangkan kebutuhan menulis kode algoritma',
          'Mengunci file agar tidak bisa dibaca oleh siapapun'
        ],
        correctAnswerIndex: 0,
        explanation: 'Docker memastikan konsistensi runtime aplikasi dari laptop pengembang hingga server produksi.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Merancang Alur Deployment Web ke Cloud PaaS',
      scenario: 'Gambarkan langkah persiapan aplikasi web frontend/backend dari repository Git lokal hingga tayang online di platform PaaS seperti Vercel.',
      tasks: [
        'Tuliskan langkah push kode ke GitHub.',
        'Sebutkan variabel lingkungan (environment variables) penting yang harus dikonfigurasi di dashboard cloud.',
        'Jelaskan bagaimana proses build otomatis (CI/CD) berjalan ketika ada commit baru.'
      ],
      submissionGuide: 'Tuliskan alur rangkuman deployment yang Anda rancang ke dalam kotak jawaban.'
    },
    tags: ['Cloud', 'DevOps', 'Docker', 'Vercel']
  },

  {
    title: 'Keamanan Siber & Literasi Perlindungan Data Pribadi',
    slug: 'keamanan-siber-literasi-perlindungan-data',
    category: 'Teknologi',
    level: 'Pemula',
    duration: '40 Menit',
    summary: 'Pelajari dasar Cyber Security: mengenali serangan phising, manajemen kredensial, Two-Factor Authentication (2FA), dan keamanan privasi data.',
    instructor: {
      name: 'Agus Setiawan, CISA, CISSP',
      role: 'Cybersecurity Analyst'
    },
    article: {
      title: 'Membangun Kebiasaan Aman Berinternet di Era Digital',
      content: `Keamanan siber bukan hanya urusan pakar IT, melainkan tanggung jawab setiap pengguna internet untuk melindungi identitas dan data pribadinya.

1. Ancaman Phishing dan Rekayasa Sosial (Social Engineering)
Phishing adalah upaya memancing korban untuk memberikan kredensial atau informasi sensitif melalui pesan, email, atau tautan palsu yang menyerupai institusi resmi.

2. Manajemen Kata Sandi yang Kuat
Hindari menggunakan password yang sama untuk banyak akun. Gunakan kombinasi huruf besar, kecil, angka, simbol unik, atau manfaatkan Password Manager.

3. Autentikasi Dua Faktor (2FA)
2FA menambahkan lapisan pengamanan ekstra selain password. Bahkan jika password Anda bocor, penyerang tetap tidak dapat masuk tanpa kode verifikasi fisik perangkat Anda.`,
      keyTakeaways: [
        'Mata rantai terlemah dalam keamanan informasi seringkali adalah faktor manusia (human factor).',
        'Jangan pernah membagikan kode OTP kepada siapapun termasuk pihak yang mengaku petugas.',
        'Aktifkan 2FA pada seluruh akun email dan layanan penting.'
      ]
    },
    video: {
      title: 'Panduan Mencegah Serangan Phishing dan Menjaga Akun Aman',
      youtubeUrl: 'https://www.youtube.com/watch?v=XBkzBrXllBo',
      youtubeEmbedId: 'XBkzBrXllBo',
      duration: '12 Menit',
      description: 'Simulasi kasus nyata serangan phishing di media sosial dan langkah proteksi diri yang praktis.'
    },
    quiz: [
      {
        question: 'Tindakan manakah yang paling tepat jika Anda menerima pesan WhatsApp berisi file berakhiran ".apk" dari nomor tak dikenal yang mengaku kurir paket?',
        options: [
          'Hapus pesan dan jangan pernah mengunduh atau menginstal file tersebut',
          'Langsung klik dan instal untuk membuktikan kebenarannya',
          'Meneruskan file tersebut ke grup keluarga',
          'Mengirimkan nomor rekening untuk konfirmasi'
        ],
        correctAnswerIndex: 0,
        explanation: 'File .apk palsu dari nomor tidak dikenal adalah modus umum malware pencuri SMS OTP perbankan.'
      }
    ],
    practice: {
      title: 'Latihan Praktik: Audit Keamanan Akun Digital Pribadi',
      scenario: 'Lakukan evaluasi mandiri terhadap keamanan akun email utama dan akun media sosial Anda.',
      tasks: [
        'Periksa apakah Two-Factor Authentication (2FA) sudah aktif di akun Anda.',
        'Cek riwayat sesi login perangkat yang terhubung dan keluarkan perangkat yang tidak dikenal.',
        'Ganti kata sandi dengan kombinasi frasa unik (passphrase) minimal 12 karakter.'
      ],
      submissionGuide: 'Tuliskan poin-poin checklist audit yang telah Anda lakukan secara ringkas.'
    },
    tags: ['Cybersecurity', 'Privasi', '2FA', 'Keamanan']
  }
];
