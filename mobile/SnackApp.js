import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// ==========================================
// TEMA WARNA (Biru & Putih Solid - Sesuai Syarat Ujian)
// ==========================================
const colors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF6FF',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
};

// ==========================================
// DATABASE 8 KURSUS (4 Kategori Praktis)
// ==========================================
const INITIAL_COURSES = [
  {
    _id: 'c1',
    title: 'Dasar Pemrograman Web Modern dengan React & JavaScript',
    category: 'Pemrograman',
    level: 'Pemula',
    duration: '60 Menit',
    summary: 'Pelajari konsep dasar modern JavaScript ES6+, komponen React, State, Props, dan antarmuka web interaktif.',
    articleContent: 'React adalah pustaka JavaScript terpopuler untuk antarmuka web berbasis komponen independen dan reusable. Konsep penting: JSX, useState untuk state lokal, dan useEffect untuk siklus hidup komponen.',
    videoUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    quizQuestions: [
      { id: 1, question: 'Fungsi utama hook useState pada React adalah?', options: ['Mengelola state lokal', 'Menghubungkan database', 'Mengatur CSS', 'Menyimpan cache server'], answer: 0, explanation: 'useState dipakai untuk menyimpan dan memperbarui data reaktif dalam komponen fungsional.' },
      { id: 2, question: 'Ekstensi penulisan sintaks mirip HTML di React disebut?', options: ['JSX', 'XML', 'TypeScript', 'HTML5'], answer: 0, explanation: 'JSX adalah ekstensi sintaks JavaScript yang menyerupai HTML.' },
      { id: 3, question: 'Hook untuk menangani efek samping seperti fetch data adalah?', options: ['useEffect', 'useMemo', 'useRef', 'useCallback'], answer: 0, explanation: 'useEffect dieksekusi setelah render untuk menangani side-effects.' },
      { id: 4, question: 'Data yang dikirimkan dari komponen induk ke anak disebut?', options: ['Props', 'State', 'Context', 'Redux'], answer: 0, explanation: 'Props bersifat read-only untuk mengalirkan data ke komponen anak.' },
    ],
    practiceTitle: 'Latihan Praktik: Counter Interaktif React',
    practiceTask: 'Rancang komponen tombol Tambah, Kurang, dan Reset yang memanipulasi angka counter di layar.',
  },
  {
    _id: 'c2',
    title: 'Membangun RESTful API dengan Node.js & Express',
    category: 'Pemrograman',
    level: 'Menengah',
    duration: '90 Menit',
    summary: 'Kuasai pembuatan backend API berbasis Node.js, Express, routing, middleware auth JWT, dan integrasi database.',
    articleContent: 'Express.js adalah web framework minimalis untuk Node.js. RESTful API menggunakan metode HTTP standar: GET (membaca), POST (membuat), PUT (memperbarui), dan DELETE (menghapus).',
    videoUrl: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
    quizQuestions: [
      { id: 1, question: 'Metode HTTP untuk menambahkan data baru adalah?', options: ['POST', 'GET', 'PUT', 'DELETE'], answer: 0, explanation: 'POST digunakan untuk submit resource baru.' },
      { id: 2, question: 'Middleware Express dipanggil dengan argumen?', options: ['req, res, next', 'get, post, send', 'url, port, host', 'data, error, done'], answer: 0, explanation: 'Fungsi middleware Express menerima parameter request (req), response (res), dan callback next.' },
    ],
    practiceTitle: 'Latihan Praktik: CRUD Endpoint Mahasiswa',
    practiceTask: 'Rancang endpoint GET /api/mahasiswa dan POST /api/mahasiswa dengan validasi JSON.',
  },
  {
    _id: 'c3',
    title: 'Desain Antarmuka Mobile (UI/UX) dengan Figma',
    category: 'Desain Grafis',
    level: 'Pemula',
    duration: '45 Menit',
    summary: 'Panduan merancang wireframe, design system, auto-layout, dan interactive prototype untuk aplikasi seluler.',
    articleContent: 'UI/UX menitikberatkan pada kemudahan interaksi pengguna. Desain harus konsisten dalam warna, tipografi, jarak (spacing), serta memiliki hierarchy visual yang jelas.',
    videoUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
    quizQuestions: [
      { id: 1, question: 'Fitur Figma untuk menyusun tata letak responsif otomatis adalah?', options: ['Auto Layout', 'Component Set', 'Vector Network', 'Smart Animate'], answer: 0, explanation: 'Auto Layout memungkinkan elemen bertambah dan menyesuaikan padding secara otomatis.' },
      { id: 2, question: 'Perbedaan utama UI dan UX adalah?', options: ['UI adalah visual antarmuka, UX adalah pengalaman alur pengguna', 'UI untuk backend, UX untuk frontend', 'UI hanya teks, UX hanya gambar', 'UI dan UX tidak berbeda'], answer: 0, explanation: 'UI fokus pada estetika visual, sedangkan UX fokus pada alur kemudahan dan kenyamanan pengguna.' },
    ],
    practiceTitle: 'Latihan Praktik: Buat Frame Login Mobile',
    practiceTask: 'Gunakan Figma untuk membuat 1 frame mobile yang berisi Logo, 2 Text Field, dan 1 Tombol Utama warna biru.',
  },
  {
    _id: 'c4',
    title: 'Desain Visual Branding & Logo Vektor Profesional',
    category: 'Desain Grafis',
    level: 'Pemula',
    duration: '50 Menit',
    summary: 'Pelajari psikologi warna, pemilihan tipografi, komposisi grid, dan perancangan identitas visual brand.',
    articleContent: 'Logo yang baik harus sederhana, mudah diingat, serbaguna, dan relevan dengan industri bisnis.',
    videoUrl: 'https://www.youtube.com/watch?v=dFSia1LZI4Y',
    quizQuestions: [
      { id: 1, question: 'Format file vektor yang tidak pecah saat diperbesar adalah?', options: ['SVG / EPS', 'JPG', 'PNG', 'GIF'], answer: 0, explanation: 'SVG dan EPS berbasis matematika vektor sehingga bebas resolusi.' },
    ],
    practiceTitle: 'Latihan Praktik: Palet Warna Brand',
    practiceTask: 'Tentukan 1 warna primer, 1 warna aksen, dan 2 warna netral untuk brand edukasi.',
  },
  {
    _id: 'c5',
    title: 'Optimasi SEO & Strategi Content Marketing 2026',
    category: 'Digital Marketing',
    level: 'Pemula',
    duration: '55 Menit',
    summary: 'Trik riset keyword berkonversi tinggi, struktur artikel SEO-friendly, dan strategi backlink organik.',
    articleContent: 'Search Engine Optimization (SEO) bertujuan meningkatkan ranking website di halaman mesin pencari seperti Google secara organik.',
    videoUrl: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ',
    quizQuestions: [
      { id: 1, question: 'Tag HTML judul halaman yang paling berpengaruh di SEO adalah?', options: ['<title> dan <h1>', '<p>', '<div>', '<span>'], answer: 0, explanation: 'Tag title dan heading h1 memberikan sinyal konteks utama topik halaman.' },
    ],
    practiceTitle: 'Latihan Praktik: Riset 5 Kata Kunci Target',
    practiceTask: 'Tuliskan 5 kata kunci long-tail yang relevan untuk platform kursus online.',
  },
  {
    _id: 'c6',
    title: 'Pemasaran Media Sosial & Iklan Berbayar (Meta & TikTok Ads)',
    category: 'Digital Marketing',
    level: 'Menengah',
    duration: '70 Menit',
    summary: 'Rancang kampanye iklan digital, penargetan audiens spesifik, budgeting, dan analisis metrik ROAS.',
    articleContent: 'Metrik terpenting dalam iklan digital mencakup CTR (Click-Through Rate), CPC (Cost Per Click), dan ROAS (Return On Ad Spend).',
    videoUrl: 'https://www.youtube.com/watch?v=oV85h_rU2m8',
    quizQuestions: [
      { id: 1, question: 'Singkatan dari perbandingan omset dengan biaya iklan adalah?', options: ['ROAS', 'SEO', 'CTR', 'PPC'], answer: 0, explanation: 'ROAS adalah Return on Ad Spend.' },
    ],
    practiceTitle: 'Latihan Praktik: Copywriting Iklan Singkat',
    practiceTask: 'Buat 3 baris copywriting headline penawaran diskon pendaftaran kursus.',
  },
  {
    _id: 'c7',
    title: 'Pengantar Cloud Computing & Arsitektur Serverless',
    category: 'Teknologi',
    level: 'Menengah',
    duration: '60 Menit',
    summary: 'Pahami dasar komputasi awan AWS/GCP, storage S3, container Docker, dan deployment serverless.',
    articleContent: 'Cloud computing memungkinkan penggunaan sumber daya komputasi secara on-demand via internet tanpa perlu memiliki server fisik.',
    videoUrl: 'https://www.youtube.com/watch?v=M988_bvSugo',
    quizQuestions: [
      { id: 1, question: 'Model layanan cloud IaaS adalah singkatan dari?', options: ['Infrastructure as a Service', 'Internet as a Service', 'Interface as a System', 'Insight as a Software'], answer: 0, explanation: 'IaaS adalah Infrastructure as a Service.' },
    ],
    practiceTitle: 'Latihan Praktik: Alur Deployment Web',
    practiceTask: 'Tuliskan tahapan deployment aplikasi web dari repository GitHub hingga live di cloud.',
  },
  {
    _id: 'c8',
    title: 'Fundamental Keamanan Siber & Etika Digital untuk Siswa',
    category: 'Teknologi',
    level: 'Pemula',
    duration: '40 Menit',
    summary: 'Lindungi akun dan data pribadi dari phishing, malware, serta terapkan autentikasi 2FA yang aman.',
    articleContent: 'Keamanan siber diawali dari kesadaran individu: jangan sembarang mengklik link mencurigakan dan selalu gunakan kombinasi kata sandi yang kuat.',
    videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
    quizQuestions: [
      { id: 1, question: 'Metode keamanan verifikasi ganda disebut?', options: ['2FA (Two-Factor Authentication)', 'SSL', 'VPN', 'Firewall'], answer: 0, explanation: '2FA mengharuskan dua bukti identitas (sandi + OTP).' },
    ],
    practiceTitle: 'Latihan Praktik: Audit Keamanan Akun',
    practiceTask: 'Periksa pengaturan password dan aktifkan 2FA pada akun email Anda.',
  },
];

const CATEGORIES = ['Semua', 'Pemrograman', 'Desain Grafis', 'Digital Marketing', 'Teknologi'];

// ==========================================
// APLIKASI UTAMA (ZERO-DEPENDENCY NAVIGATOR)
// ==========================================
export default function App() {
  // Auth State
  const [user, setUser] = useState(null); // null = belum login
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('Siswa');
  const [authError, setAuthError] = useState('');

  // App Navigation State
  const [currentTab, setCurrentTab] = useState('katalog'); // 'katalog' | 'favorit' | 'riwayat'
  const [selectedCourse, setSelectedCourse] = useState(null); // null = daftar kursus, object = detail kursus

  // Course & User Data State
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [favorites, setFavorites] = useState(['c1']);
  const [history, setHistory] = useState([
    { courseId: 'c1', progress: 85, quizScore: 100, lastAccessed: 'Hari ini' },
  ]);

  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Course Detail Tab State
  const [detailTab, setDetailTab] = useState('article'); // 'article' | 'video' | 'quiz' | 'practice'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [practiceNotes, setPracticeNotes] = useState('');
  const [practiceSaved, setPracticeSaved] = useState(false);

  // AUTH ACTIONS
  const handleLogin = () => {
    setAuthError('');
    if (!loginEmail.trim() || !loginPassword) {
      setAuthError('Harap isi alamat email dan kata sandi.');
      return;
    }
    const name = loginEmail.includes('siswa') ? 'Dinda Siswa' : 'Pelajar Mandiri';
    setUser({ name, email: loginEmail.trim(), role: 'Siswa' });
  };

  const handleRegister = () => {
    setAuthError('');
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setAuthError('Semua kolom formulir wajib diisi.');
      return;
    }
    setUser({ name: regName.trim(), email: regEmail.trim(), role: regRole });
  };

  const autofillDemo = () => {
    setLoginEmail('siswa@skilllearn.id');
    setLoginPassword('password123');
    setAuthError('');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCourse(null);
    setCurrentTab('katalog');
  };

  // FAVORITE & PROGRESS ACTIONS
  const toggleFavorite = (courseId) => {
    setFavorites((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    setDetailTab('article');
    setSelectedAnswers({});
    const h = history.find((x) => x.courseId === course._id);
    if (h) {
      setQuizScore(h.quizScore !== undefined ? h.quizScore : null);
      setPracticeNotes(h.practiceNotes || '');
      setPracticeSaved(!!h.practiceNotes);
    } else {
      setQuizScore(null);
      setPracticeNotes('');
      setPracticeSaved(false);
    }
  };

  const handleGradeQuiz = () => {
    if (!selectedCourse) return;
    const questions = selectedCourse.quizQuestions || [];
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        score += 100 / questions.length;
      }
    });
    const finalScore = Math.round(score);
    setQuizScore(finalScore);
    saveProgress(selectedCourse._id, 75, finalScore, practiceNotes);
    Alert.alert('Hasil Kuis', `Skor Anda: ${finalScore}/100!`);
  };

  const handleSavePractice = () => {
    if (!selectedCourse) return;
    if (!practiceNotes.trim()) {
      Alert.alert('Peringatan', 'Harap tuliskan catatan latihan Anda.');
      return;
    }
    setPracticeSaved(true);
    saveProgress(selectedCourse._id, 100, quizScore || 80, practiceNotes);
    Alert.alert('Berhasil', 'Tugas latihan praktik Anda berhasil disimpan!');
  };

  const saveProgress = (courseId, progress, score, notes) => {
    setHistory((prev) => {
      const existing = prev.find((h) => h.courseId === courseId);
      if (existing) {
        return prev.map((h) =>
          h.courseId === courseId
            ? { ...h, progress: Math.max(h.progress, progress), quizScore: score !== undefined ? score : h.quizScore, practiceNotes: notes }
            : h
        );
      }
      return [...prev, { courseId, progress, quizScore: score, practiceNotes: notes, lastAccessed: 'Baru saja' }];
    });
  };

  // ==========================================
  // VIEW: 1. AUTH SCREEN (LOGIN & REGISTER)
  // ==========================================
  if (!user) {
    return (
      <SafeAreaView style={styles.authContainer}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <ScrollView contentContainerStyle={styles.authScroll}>
          {/* Logo & Header */}
          <View style={styles.authHeader}>
            <View style={styles.logoBadge}>
              <Feather name="book-open" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.appTitle}>SkillLearn</Text>
            <Text style={styles.appSubtitle}>Mini Specialized Learning Platform</Text>
          </View>

          {authMode === 'login' ? (
            /* FORM LOGIN */
            <View style={styles.card}>
              <Text style={styles.formTitle}>Masuk ke Akun</Text>
              <Text style={styles.formSubtitle}>Gunakan akun siswa/mahasiswa Anda</Text>

              {authError ? (
                <View style={styles.errorBox}>
                  <Feather name="alert-circle" size={16} color={colors.danger} />
                  <Text style={styles.errorText}>{authError}</Text>
                </View>
              ) : null}

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Alamat Email</Text>
                <View style={styles.inputWrap}>
                  <Feather name="mail" size={18} color={colors.textMuted} style={styles.fieldIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="nama@email.com"
                    value={loginEmail}
                    onChangeText={setLoginEmail}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Kata Sandi</Text>
                <View style={styles.inputWrap}>
                  <Feather name="lock" size={18} color={colors.textMuted} style={styles.fieldIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    secureTextEntry
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
                <Text style={styles.btnPrimaryText}>Masuk Sekarang</Text>
                <Feather name="arrow-right" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnOutline} onPress={autofillDemo}>
                <Feather name="user-check" size={16} color={colors.primary} />
                <Text style={styles.btnOutlineText}>Pakai Akun Demo (siswa@skilllearn.id)</Text>
              </TouchableOpacity>

              <View style={styles.switchAuthRow}>
                <Text style={styles.switchAuthText}>Belum punya akun?</Text>
                <TouchableOpacity onPress={() => { setAuthMode('register'); setAuthError(''); }}>
                  <Text style={styles.switchAuthLink}>Daftar Sekarang</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* FORM REGISTER */
            <View style={styles.card}>
              <Text style={styles.formTitle}>Pendaftaran Akun</Text>
              <Text style={styles.formSubtitle}>Daftar gratis untuk akses semua materi</Text>

              {authError ? (
                <View style={styles.errorBox}>
                  <Feather name="alert-circle" size={16} color={colors.danger} />
                  <Text style={styles.errorText}>{authError}</Text>
                </View>
              ) : null}

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Nama Lengkap</Text>
                <View style={styles.inputWrap}>
                  <Feather name="user" size={18} color={colors.textMuted} style={styles.fieldIcon} />
                  <TextInput style={styles.textInput} placeholder="Nama Anda" value={regName} onChangeText={setRegName} />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Alamat Email</Text>
                <View style={styles.inputWrap}>
                  <Feather name="mail" size={18} color={colors.textMuted} style={styles.fieldIcon} />
                  <TextInput style={styles.textInput} placeholder="email@domain.com" value={regEmail} onChangeText={setRegEmail} autoCapitalize="none" />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Status Pembelajar</Text>
                <View style={styles.roleRow}>
                  {['Siswa', 'Mahasiswa'].map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.roleBtn, regRole === r && styles.roleBtnActive]}
                      onPress={() => setRegRole(r)}
                    >
                      <Text style={[styles.roleBtnText, regRole === r && styles.roleBtnTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Kata Sandi</Text>
                <View style={styles.inputWrap}>
                  <Feather name="lock" size={18} color={colors.textMuted} style={styles.fieldIcon} />
                  <TextInput style={styles.textInput} placeholder="Minimal 6 karakter" secureTextEntry value={regPassword} onChangeText={setRegPassword} />
                </View>
              </View>

              <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
                <Text style={styles.btnPrimaryText}>Daftar & Masuk</Text>
              </TouchableOpacity>

              <View style={styles.switchAuthRow}>
                <Text style={styles.switchAuthText}>Sudah punya akun?</Text>
                <TouchableOpacity onPress={() => { setAuthMode('login'); setAuthError(''); }}>
                  <Text style={styles.switchAuthLink}>Masuk di sini</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // VIEW: 2. COURSE DETAIL (4 TAB: ARTIKEL, VIDEO, KUIS, PRAKTIK)
  // ==========================================
  if (selectedCourse) {
    const isFav = favorites.includes(selectedCourse._id);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {/* Top Header Detail */}
        <View style={styles.topNavbar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedCourse(null)}>
            <Feather name="arrow-left" size={20} color={colors.primary} />
            <Text style={styles.backBtnText}>Katalog</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(selectedCourse._id)}>
            <Feather name="bookmark" size={22} color={isFav ? colors.primary : colors.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
          <View style={styles.badgeCategory}>
            <Text style={styles.badgeCategoryText}>{selectedCourse.category}</Text>
          </View>
          <Text style={styles.detailTitle}>{selectedCourse.title}</Text>
        </View>

        {/* 4 SEGMENTED TABS */}
        <View style={styles.tabBar}>
          {[
            { key: 'article', label: 'Artikel', icon: 'file-text' },
            { key: 'video', label: 'Video', icon: 'play-circle' },
            { key: 'quiz', label: 'Kuis', icon: 'check-square' },
            { key: 'practice', label: 'Praktik', icon: 'edit' },
          ].map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabButton, detailTab === t.key && styles.tabButtonActive]}
              onPress={() => setDetailTab(t.key)}
            >
              <Feather name={t.icon} size={15} color={detailTab === t.key ? colors.primary : colors.textMuted} />
              <Text style={[styles.tabButtonText, detailTab === t.key && styles.tabButtonTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* TAB 1: ARTIKEL */}
          {detailTab === 'article' && (
            <View style={styles.tabContentCard}>
              <Text style={styles.sectionHeading}>Uraian Pembelajaran</Text>
              <Text style={styles.articleBody}>{selectedCourse.articleContent}</Text>
              <View style={styles.tipBox}>
                <Feather name="info" size={18} color={colors.primary} />
                <Text style={styles.tipText}>
                  Baca artikel secara seksama, lalu beralih ke tab Video dan Kuis untuk menguji pemahaman Anda.
                </Text>
              </View>
            </View>
          )}

          {/* TAB 2: VIDEO TUTORIAL */}
          {detailTab === 'video' && (
            <View style={styles.tabContentCard}>
              <Text style={styles.sectionHeading}>Video Tutorial Interaktif</Text>
              <View style={styles.videoMockPlayer}>
                <Feather name="play" size={42} color="#FFFFFF" />
                <Text style={styles.videoPlayerText}>Putar Video Materi</Text>
              </View>
              <Text style={styles.videoUrlText}>Tautan Video: {selectedCourse.videoUrl}</Text>
            </View>
          )}

          {/* TAB 3: KUIS */}
          {detailTab === 'quiz' && (
            <View style={styles.tabContentCard}>
              <Text style={styles.sectionHeading}>Kuis Pemahaman Materi</Text>
              {quizScore !== null ? (
                <View style={styles.scoreBanner}>
                  <Text style={styles.scoreBannerTitle}>Skor Kuis Anda: {quizScore}/100</Text>
                  <Text style={styles.scoreBannerSub}>
                    {quizScore >= 70 ? 'Selamat! Anda lulus kuis materi ini.' : 'Pelajari kembali materi untuk skor maksimal.'}
                  </Text>
                </View>
              ) : null}

              {(selectedCourse.quizQuestions || []).map((q, qIdx) => (
                <View key={q.id} style={styles.questionBlock}>
                  <Text style={styles.questionText}>{qIdx + 1}. {q.question}</Text>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[qIdx] === optIdx;
                    const isCorrect = q.answer === optIdx;
                    let optStyle = styles.optionBtn;
                    if (quizScore !== null) {
                      if (isCorrect) optStyle = styles.optionBtnCorrect;
                      else if (isSelected && !isCorrect) optStyle = styles.optionBtnWrong;
                    } else if (isSelected) {
                      optStyle = styles.optionBtnSelected;
                    }

                    return (
                      <TouchableOpacity
                        key={optIdx}
                        style={optStyle}
                        onPress={() => {
                          if (quizScore === null) {
                            setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
                          }
                        }}
                      >
                        <Text style={styles.optionText}>{opt}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}

              {quizScore === null ? (
                <TouchableOpacity style={styles.btnPrimary} onPress={handleGradeQuiz}>
                  <Text style={styles.btnPrimaryText}>Kirim Jawaban Kuis</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}

          {/* TAB 4: LATIHAN PRAKTIK */}
          {detailTab === 'practice' && (
            <View style={styles.tabContentCard}>
              <Text style={styles.sectionHeading}>{selectedCourse.practiceTitle}</Text>
              <Text style={styles.practiceTaskText}>{selectedCourse.practiceTask}</Text>

              <Text style={styles.fieldLabel}>Catatan & Hasil Praktik Anda:</Text>
              <TextInput
                style={styles.practiceInput}
                placeholder="Tuliskan ringkasan hasil latihan atau link project GitHub Anda..."
                multiline
                numberOfLines={4}
                value={practiceNotes}
                onChangeText={setPracticeNotes}
              />

              <TouchableOpacity style={styles.btnPrimary} onPress={handleSavePractice}>
                <Feather name="check-circle" size={18} color="#FFFFFF" />
                <Text style={styles.btnPrimaryText}>{practiceSaved ? 'Perbarui Hasil Praktik' : 'Simpan Tugas Praktik'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // VIEW: 3. MAIN TABS (KATALOG, FAVORIT, RIWAYAT)
  // ==========================================
  const filteredCourses = courses.filter((c) => {
    const matchCat = selectedCategory === 'Semua' || c.category === selectedCategory;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const favCourses = courses.filter((c) => favorites.includes(c._id));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Top Header Navbar */}
      <View style={styles.topNavbar}>
        <View>
          <Text style={styles.navGreeting}>Halo, {user.name}!</Text>
          <Text style={styles.navSub}>Tingkatkan skill praktismu ({user.role})</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={18} color={colors.danger} />
        </TouchableOpacity>
      </View>

      {/* TAB 1 CONTENT: KATALOG */}
      {currentTab === 'katalog' && (
        <View style={{ flex: 1 }}>
          <View style={styles.searchBarWrap}>
            <Feather name="search" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
            <TextInput
              style={{ flex: 1, fontSize: 14 }}
              placeholder="Cari materi pemrograman, desain, marketing..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Feather name="x" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.categoryScrollWrap}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, selectedCategory === cat && styles.chipActive]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => {
              const isFav = favorites.includes(item._id);
              return (
                <TouchableOpacity style={styles.courseCard} onPress={() => openCourseDetail(item)}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.badgeCategory}>
                      <Text style={styles.badgeCategoryText}>{item.category}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(item._id)}>
                      <Feather name="bookmark" size={20} color={isFav ? colors.primary : colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text style={styles.courseSummary} numberOfLines={2}>{item.summary}</Text>

                  <View style={styles.cardFooterRow}>
                    <View style={styles.metaItem}>
                      <Feather name="clock" size={14} color={colors.textMuted} />
                      <Text style={styles.metaText}>{item.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Feather name="bar-chart" size={14} color={colors.textMuted} />
                      <Text style={styles.metaText}>{item.level}</Text>
                    </View>
                    <Text style={styles.readMoreText}>Buka Materi ›</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {/* TAB 2 CONTENT: FAVORIT */}
      {currentTab === 'favorit' && (
        <View style={{ flex: 1 }}>
          <View style={styles.simpleHeader}>
            <Text style={styles.simpleHeaderTitle}>Materi Favorit</Text>
            <Text style={styles.simpleHeaderSub}>{favCourses.length} materi disimpan</Text>
          </View>

          {favCourses.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Feather name="bookmark" size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Belum ada materi favorit</Text>
              <Text style={styles.emptySub}>Tekan ikon bookmark pada katalog untuk menyimpan materi.</Text>
            </View>
          ) : (
            <FlatList
              data={favCourses}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.courseCard} onPress={() => openCourseDetail(item)}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.badgeCategory}>
                      <Text style={styles.badgeCategoryText}>{item.category}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(item._id)}>
                      <Feather name="trash-2" size={18} color={colors.danger} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text style={styles.courseSummary}>{item.summary}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}

      {/* TAB 3 CONTENT: RIWAYAT */}
      {currentTab === 'riwayat' && (
        <View style={{ flex: 1 }}>
          <View style={styles.simpleHeader}>
            <Text style={styles.simpleHeaderTitle}>Riwayat Pembelajaran</Text>
            <Text style={styles.simpleHeaderSub}>Pantau perkembangan skill Anda</Text>
          </View>

          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {history.map((h, idx) => {
              const course = courses.find((c) => c._id === h.courseId);
              if (!course) return null;
              return (
                <View key={idx} style={styles.historyCard}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.badgeCategoryText}>{course.category}</Text>
                    <Text style={styles.historyTimeText}>{h.lastAccessed || 'Aktif'}</Text>
                  </View>
                  <Text style={styles.courseTitle}>{course.title}</Text>

                  <View style={styles.progressBarWrap}>
                    <View style={[styles.progressBarFill, { width: `${h.progress || 50}%` }]} />
                  </View>
                  <View style={styles.historyStatsRow}>
                    <Text style={styles.historyStatText}>Progres: {h.progress}%</Text>
                    {h.quizScore !== undefined && (
                      <Text style={styles.historyStatText}>Skor Kuis: {h.quizScore}/100</Text>
                    )}
                  </View>

                  <TouchableOpacity style={styles.resumeBtn} onPress={() => openCourseDetail(course)}>
                    <Text style={styles.resumeBtnText}>Lanjutkan Belajar ›</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomNav}>
        {[
          { key: 'katalog', label: 'Katalog', icon: 'book-open' },
          { key: 'favorit', label: 'Favorit', icon: 'bookmark' },
          { key: 'riwayat', label: 'Riwayat', icon: 'clock' },
        ].map((tab) => {
          const isActive = currentTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.navTabItem}
              onPress={() => setCurrentTab(tab.key)}
            >
              <Feather name={tab.icon} size={20} color={isActive ? colors.primary : colors.textMuted} />
              <Text style={[styles.navTabLabel, isActive && styles.navTabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  authContainer: { flex: 1, backgroundColor: colors.primary },
  authScroll: { padding: 24, justifyContent: 'center' },
  authHeader: { alignItems: 'center', marginBottom: 24, marginTop: 16 },
  logoBadge: { width: 64, height: 64, borderRadius: 16, backgroundColor: colors.primaryDark, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  appTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  appSubtitle: { fontSize: 13, color: '#DBEAFE', marginTop: 4 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 20, elevation: 4 },
  formTitle: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 4 },
  formSubtitle: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  fieldGroup: { marginBottom: 14 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, height: 46 },
  fieldIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 14, color: colors.text },
  btnPrimary: { flexDirection: 'row', backgroundColor: colors.primary, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 8, gap: 8 },
  btnPrimaryText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  btnOutline: { flexDirection: 'row', borderWidth: 1, borderColor: colors.primary, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, gap: 8 },
  btnOutlineText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  switchAuthRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, gap: 6 },
  switchAuthText: { fontSize: 13, color: colors.textMuted },
  switchAuthLink: { fontSize: 13, fontWeight: '700', color: colors.primary },
  errorBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEE2E2', padding: 10, borderRadius: 8, marginBottom: 12, gap: 8 },
  errorText: { fontSize: 12, color: colors.danger, flex: 1 },
  roleRow: { flexDirection: 'row', gap: 10 },
  roleBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  roleBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  roleBtnText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  roleBtnTextActive: { color: colors.primary, fontWeight: '700' },
  topNavbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: colors.border },
  navGreeting: { fontSize: 18, fontWeight: '800', color: colors.text },
  navSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  logoutBtn: { padding: 8, backgroundColor: '#FEE2E2', borderRadius: 8 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtnText: { fontSize: 14, fontWeight: '700', color: colors.primary },
  searchBarWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', margin: 16, marginBottom: 10, paddingHorizontal: 12, height: 44, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  categoryScrollWrap: { marginBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.border, marginRight: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
  chipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  courseCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badgeCategory: { alignSelf: 'flex-start', backgroundColor: colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeCategoryText: { fontSize: 11, fontWeight: '700', color: colors.primary },
  courseTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 6 },
  courseSummary: { fontSize: 13, color: colors.textMuted, lineHeight: 18, marginBottom: 12 },
  cardFooterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: colors.textMuted },
  readMoreText: { fontSize: 12, fontWeight: '700', color: colors.primary },
  detailTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginVertical: 8 },
  tabBar: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: colors.border },
  tabButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, gap: 6, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabButtonActive: { borderBottomColor: colors.primary },
  tabButtonText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
  tabButtonTextActive: { color: colors.primary, fontWeight: '700' },
  tabContentCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: colors.border },
  sectionHeading: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 10 },
  articleBody: { fontSize: 14, color: colors.text, lineHeight: 22 },
  tipBox: { flexDirection: 'row', backgroundColor: colors.primaryLight, padding: 12, borderRadius: 8, marginTop: 14, gap: 10, alignItems: 'center' },
  tipText: { fontSize: 12, color: colors.primaryDark, flex: 1, lineHeight: 18 },
  videoMockPlayer: { backgroundColor: '#0F172A', height: 160, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginVertical: 12 },
  videoPlayerText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginTop: 8 },
  videoUrlText: { fontSize: 12, color: colors.textMuted, marginTop: 6 },
  scoreBanner: { backgroundColor: '#DCFCE7', padding: 12, borderRadius: 8, marginBottom: 14 },
  scoreBannerTitle: { fontSize: 15, fontWeight: '700', color: colors.success },
  scoreBannerSub: { fontSize: 12, color: '#166534', marginTop: 2 },
  questionBlock: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingBottom: 14 },
  questionText: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 8 },
  optionBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 6 },
  optionBtnSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  optionBtnCorrect: { borderColor: colors.success, backgroundColor: '#DCFCE7' },
  optionBtnWrong: { borderColor: colors.danger, backgroundColor: '#FEE2E2' },
  optionText: { fontSize: 13, color: colors.text },
  practiceTaskText: { fontSize: 13, color: colors.textMuted, lineHeight: 20, marginBottom: 12 },
  practiceInput: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 10, fontSize: 13, textAlignVertical: 'top', height: 90, marginBottom: 14 },
  simpleHeader: { padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: colors.border },
  simpleHeaderTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  simpleHeaderSub: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 12 },
  emptySub: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 6 },
  historyCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  historyTimeText: { fontSize: 11, color: colors.textMuted },
  progressBarWrap: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, marginVertical: 10, overflow: 'hidden' },
  progressBarFill: { height: 8, backgroundColor: colors.primary, borderRadius: 4 },
  historyStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  historyStatText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  resumeBtn: { alignSelf: 'flex-start', paddingVertical: 4 },
  resumeBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  bottomNav: { flexDirection: 'row', height: 56, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: colors.border },
  navTabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navTabLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2, fontWeight: '600' },
  navTabLabelActive: { color: colors.primary, fontWeight: '700' },
});
