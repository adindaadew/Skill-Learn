import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const DEFAULT_API_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

let activeApiUrl = DEFAULT_API_URL;

export const setApiUrl = (url) => {
  activeApiUrl = url;
};

export const getApiUrl = () => activeApiUrl;

const TOKEN_KEY = '@skilllearn_mobile_token';
const USER_KEY = '@skilllearn_mobile_user';
const FAV_KEY = '@skilllearn_mobile_favs';
const HIST_KEY = '@skilllearn_mobile_hist';

export const storage = {
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch {}
  },
};

// Fallback courses data if offline or remote server not connected yet
const FALLBACK_COURSES = [
  {
    _id: 'c1',
    title: 'Dasar Pemrograman Web Modern dengan React & JavaScript',
    slug: 'dasar-pemrograman-web-modern-react',
    category: 'Pemrograman',
    level: 'Pemula',
    duration: '60 Menit',
    summary: 'Pelajari konsep dasar modern JavaScript ES6+, komponen React, State, Props, dan cara membangun antarmuka web interaktif.',
    instructor: { name: 'Rian Pratama, S.Kom.', role: 'Frontend Web Engineer' },
    article: {
      title: 'Pengantar Membangun Antarmuka Modern Menggunakan React',
      content: 'React adalah pustaka JavaScript berbasis komponen untuk membangun antarmuka pengguna yang cepat dan dinamis. Konsep utama React berakar pada Component-Driven Development, JSX (JavaScript XML), dan Virtual DOM.\n\n1. Komponen dan JSX\nKomponen adalah blok pembangun antarmuka.\n\n2. State dan Props\nProps untuk mengalirkan data, State untuk data internal yang dinamis.\n\n3. Lifecycle & Hooks\nReact Hooks memudahkan pengelolaan logika fungsional.',
      keyTakeaways: [
        'React menyusun UI ke dalam komponen modular yang dapat digunakan kembali.',
        'Props bersifat read-only untuk transfer data parent ke child.',
        'State menyimpan data dinamis yang memicu re-render ketika nilainya diperbarui.',
      ],
    },
    video: {
      title: 'Tutorial Membangun Komponen React Pertama Anda',
      youtubeUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
      youtubeEmbedId: 'SqcY0GlETPk',
      duration: '18 Menit',
      description: 'Panduan langkah demi langkah membuat project React dengan Vite dan hooks.',
    },
    quiz: [
      {
        question: 'Apa fungsi utama dari hook useState pada React?',
        options: [
          'Menyimpan dan mengelola state data dinamis di dalam komponen fungsional',
          'Mengirimkan request HTTP ke server backend',
          'Mengubah format file HTML menjadi biner',
        ],
        correctAnswerIndex: 0,
        explanation: 'useState adalah React Hook mendasar untuk mengelola state lokal pada functional component.',
      },
      {
        question: 'Bagaimana sifat aliran data default pada React antar komponen?',
        options: [
          'Dua arah secara otomatis',
          'Satu arah dari parent ke child melalui props',
          'Acak tergantung deklarasi',
        ],
        correctAnswerIndex: 1,
        explanation: 'React mengadopsi unidirectional data flow dari atas ke bawah melalui props.',
      },
    ],
    practice: {
      title: 'Latihan Praktik: Membuat Komponen Counter & Daftar Catatan',
      scenario: 'Anda diminta membuat komponen counter tugas sederhana menggunakan React hooks useState.',
      tasks: [
        'Buat state angka untuk menghitung tugas selesai.',
        'Sediakan tombol tambah dan reset.',
        'Tuliskan refleksi hasil pengerjaan Anda.',
      ],
    },
    isFavorited: false,
    progressPercent: 0,
    isCompleted: false,
  },
  {
    _id: 'c2',
    title: 'Prinsip Desain UI/UX & Wireframing dengan Figma',
    slug: 'prinsip-desain-ui-ux-wireframing-figma',
    category: 'Desain Grafis',
    level: 'Pemula',
    duration: '55 Menit',
    summary: 'Pelajari dasar antarmuka pengguna (UI), pengalaman pengguna (UX), sistem grid, hierarki visual, dan pembuatan wireframe digital dengan Figma.',
    instructor: { name: 'Nadia Safitri, S.Ds.', role: 'Senior Product Designer' },
    article: {
      title: 'Memahami UI/UX: Dari Riset Pengguna hingga Wireframe Antarmuka',
      content: 'Desain antarmuka berfokus pada kemudahan navigasi, hierarki visual, dan pengalaman pengguna yang efisien.\n\n1. Perbedaan UI dan UX\n2. Prinsip Hierarki Visual\n3. Pentingnya Wireframe',
      keyTakeaways: [
        'Desain yang baik berpusat pada pemecahan masalah pengguna.',
        'Hierarki visual membantu memproses informasi penting tanpa kebingungan.',
      ],
    },
    video: {
      title: 'Tutorial Dasar Figma untuk Pemula',
      youtubeUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
      youtubeEmbedId: 'c9Wg6Cb_YlU',
      duration: '20 Menit',
      description: 'Langkah pengenalan kanvas Figma, tools, auto-layout, dan pembuatan prototype.',
    },
    quiz: [
      {
        question: 'Apa tujuan utama pembuatan wireframe pada tahap awal perancangan?',
        options: [
          'Memastikan susunan tata letak dan alur navigasi tanpa terdistraksi warna',
          'Menggantikan kode pemrograman backend',
          'Menentukan harga jual aplikasi',
        ],
        correctAnswerIndex: 0,
        explanation: 'Wireframe dibuat untuk memvalidasi tata letak dan navigasi sebelum detail visual dibuat.',
      },
    ],
    practice: {
      title: 'Latihan Praktik: Merancang Wireframe Halaman Login',
      scenario: 'Rancang wireframe layar masuk yang terdiri dari logo, input email, input password, dan tombol masuk.',
      tasks: ['Buat frame ukuran mobile di Figma.', 'Terapkan jarak elemen 8pt grid.'],
    },
    isFavorited: false,
    progressPercent: 0,
    isCompleted: false,
  },
  {
    _id: 'c3',
    title: 'Strategi Digital Marketing & Social Media Strategy',
    slug: 'strategi-digital-marketing-social-media',
    category: 'Digital Marketing',
    level: 'Pemula',
    duration: '45 Menit',
    summary: 'Pelajari dasar pemasaran digital, penentuan buyer persona, customer journey, dan perencanaan konten media sosial yang berdampak tinggi.',
    instructor: { name: 'Maya Indriani, S.I.Kom.', role: 'Growth Marketing Specialist' },
    article: {
      title: 'Membangun Strategi Pemasaran Digital dari Nol',
      content: 'Digital marketing memanfaatkan kanal internet untuk menjangkau audiens tertarget secara terukur.\n\n1. Buyer Persona\n2. Marketing Funnel\n3. Metrik Kunci (CTR, ROAS)',
      keyTakeaways: ['Pemasaran sukses dimulai dari riset persona audiens.', 'Analisis metrik data berkala adalah kunci perbaikan.'],
    },
    video: {
      title: 'Strategi Social Media Marketing',
      youtubeUrl: 'https://www.youtube.com/watch?v=7uK3W0Qz0_U',
      youtubeEmbedId: '7uK3W0Qz0_U',
      duration: '16 Menit',
      description: 'Panduan menyusun kalender konten dan pilar konten promosi edukatif.',
    },
    quiz: [
      {
        question: 'Pada marketing funnel, tahap manakah yang bertujuan mengedukasi audiens baru?',
        options: ['Awareness (Top of Funnel)', 'Conversion (Bottom)', 'Retention'],
        correctAnswerIndex: 0,
        explanation: 'Awareness mengenalkan solusi kepada audiens yang belum mengetahui produk Anda.',
      },
    ],
    practice: {
      title: 'Latihan Praktik: Menyusun 3 Pilar Konten Mingguan',
      scenario: 'Rancang ide konten media sosial selama 1 minggu dengan 3 pilar konten.',
      tasks: ['Tentukan 3 pilar konten.', 'Tulis 1 draf caption beserta ajakan bertindak (CTA).'],
    },
    isFavorited: false,
    progressPercent: 0,
    isCompleted: false,
  },
  {
    _id: 'c4',
    title: 'Pengenalan Cloud Computing & Dasar DevOps',
    slug: 'pengenalan-cloud-computing-dasar-devops',
    category: 'Teknologi',
    level: 'Pemula',
    duration: '50 Menit',
    summary: 'Pahami konsep komputasi awan (Cloud Computing), model layanan IaaS/PaaS/SaaS, kontainerisasi dengan Docker, dan siklus CI/CD dasar.',
    instructor: { name: 'Fajar Nugraha, S.T., M.Kom.', role: 'DevOps & Cloud Architect' },
    article: {
      title: 'Dasar Komputasi Awan dan Modern Software Delivery',
      content: 'Komputasi awan menyediakan sumber daya server, database, dan runtime secara fleksibel melalui internet.\n\n1. Model Layanan Cloud (IaaS, PaaS, SaaS)\n2. Konsep DevOps dan CI/CD\n3. Manfaat Kontainerisasi Docker',
      keyTakeaways: [
        'PaaS memudahkan developer mendeploy aplikasi tanpa merakit server fisik.',
        'Docker mengeliminasi masalah perbedaan lingkungan sistem operasi.',
      ],
    },
    video: {
      title: 'Penjelasan Sederhana Cloud Computing & DevOps',
      youtubeUrl: 'https://www.youtube.com/watch?v=M988_bvYCmr',
      youtubeEmbedId: 'M988_bvYCmr',
      duration: '17 Menit',
      description: 'Animasi arsitektur cloud serverless dan pipeline deployment modern.',
    },
    quiz: [
      {
        question: 'Layanan platform cloud seperti Vercel termasuk ke dalam kategori...',
        options: ['PaaS (Platform as a Service)', 'IaaS', 'SaaS'],
        correctAnswerIndex: 0,
        explanation: 'PaaS menyediakan runtime siap pakai untuk deployment aplikasi.',
      },
    ],
    practice: {
      title: 'Latihan Praktik: Merancang Alur Deployment Web ke Cloud',
      scenario: 'Gambarkan langkah persiapan aplikasi web hingga tayang online di PaaS cloud.',
      tasks: ['Langkah push repositori ke GitHub.', 'Pengaturan environment variables.'],
    },
    isFavorited: false,
    progressPercent: 0,
    isCompleted: false,
  },
];

const getHeaders = async () => {
  const token = await storage.getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const safeFetch = async (url, options = {}, timeoutMs = 2500) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const api = {
  login: async (email, password) => {
    try {
      const res = await safeFetch(`${activeApiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login gagal');
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data;
    } catch (err) {
      // Seamless offline demo login fallback
      if (email.toLowerCase().includes('siswa') || email.toLowerCase().includes('demo')) {
        const demoUser = {
          id: 'demo-user-1',
          name: 'Budi Mahasiswa Pratama',
          email: 'siswa@skilllearn.id',
          role: 'Mahasiswa',
          institution: 'Universitas Pendidikan Indonesia',
        };
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(demoUser));
        return { token: 'mock-jwt-token-mobile', user: demoUser };
      }
      throw err;
    }
  },

  register: async (userData) => {
    try {
      const res = await safeFetch(`${activeApiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registrasi gagal');
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data;
    } catch (err) {
      const newUser = {
        id: 'user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'Mahasiswa',
        institution: userData.institution || '',
      };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
      return { token: 'mock-jwt-token-mobile', user: newUser };
    }
  },

  getMe: async () => {
    try {
      const headers = await getHeaders();
      const res = await safeFetch(`${activeApiUrl}/auth/me`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch {
      const cached = await AsyncStorage.getItem(USER_KEY);
      if (cached) return { user: JSON.parse(cached) };
      throw new Error('User tidak ditemukan');
    }
  },

  getCourses: async (category = '', search = '') => {
    try {
      const headers = await getHeaders();
      const params = [];
      if (category && category !== 'Semua') params.push(`category=${encodeURIComponent(category)}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      const q = params.length > 0 ? `?${params.join('&')}` : '';
      const res = await safeFetch(`${activeApiUrl}/courses${q}`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error();
      return data;
    } catch {
      // Return filtered fallback courses
      let list = [...FALLBACK_COURSES];
      if (category && category !== 'Semua') {
        list = list.filter((c) => c.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(
          (c) => c.title.toLowerCase().includes(s) || c.summary.toLowerCase().includes(s)
        );
      }
      return { count: list.length, courses: list };
    }
  },

  getCourseDetail: async (id) => {
    try {
      const headers = await getHeaders();
      const res = await safeFetch(`${activeApiUrl}/courses/${id}`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error();
      return data;
    } catch {
      const c = FALLBACK_COURSES.find((item) => item._id === id || item.slug === id) || FALLBACK_COURSES[0];
      return { course: c, isFavorited: false, history: null };
    }
  },

  getFavorites: async () => {
    try {
      const headers = await getHeaders();
      const res = await safeFetch(`${activeApiUrl}/favorites`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error();
      return data;
    } catch {
      const stored = await AsyncStorage.getItem(FAV_KEY);
      const list = stored ? JSON.parse(stored) : [];
      return { count: list.length, favorites: list };
    }
  },

  toggleFavorite: async (courseId) => {
    try {
      const headers = await getHeaders();
      const res = await safeFetch(`${activeApiUrl}/favorites/toggle/${courseId}`, {
        method: 'POST',
        headers,
      });
      const data = await res.json();
      return data;
    } catch {
      const stored = await AsyncStorage.getItem(FAV_KEY);
      let list = stored ? JSON.parse(stored) : [];
      const idx = list.findIndex((x) => (x.course._id || x.course.id) === courseId);
      let isFavorited = false;
      if (idx !== -1) {
        list.splice(idx, 1);
        isFavorited = false;
      } else {
        const c = FALLBACK_COURSES.find((item) => item._id === courseId) || FALLBACK_COURSES[0];
        list.push({ favoriteId: 'fav-' + Date.now(), course: c });
        isFavorited = true;
      }
      await AsyncStorage.setItem(FAV_KEY, JSON.stringify(list));
      return {
        isFavorited,
        message: isFavorited ? 'Materi berhasil disimpan ke favorit' : 'Materi dihapus dari favorit',
      };
    }
  },

  getHistory: async () => {
    try {
      const headers = await getHeaders();
      const res = await safeFetch(`${activeApiUrl}/history`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error();
      return data;
    } catch {
      const stored = await AsyncStorage.getItem(HIST_KEY);
      const list = stored ? JSON.parse(stored) : [];
      return { count: list.length, history: list };
    }
  },

  getHistorySummary: async () => {
    try {
      const headers = await getHeaders();
      const res = await safeFetch(`${activeApiUrl}/history/summary`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error();
      return data;
    } catch {
      const stored = await AsyncStorage.getItem(HIST_KEY);
      const list = stored ? JSON.parse(stored) : [];
      const total = list.length;
      const completed = list.filter((x) => x.isCompleted).length;
      return {
        totalCourses: total,
        completedCourses: completed,
        avgQuizScore: 85,
      };
    }
  },

  updateHistory: async (data) => {
    try {
      const headers = await getHeaders();
      const res = await safeFetch(`${activeApiUrl}/history/update`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error();
      return resData;
    } catch {
      const stored = await AsyncStorage.getItem(HIST_KEY);
      let list = stored ? JSON.parse(stored) : [];
      let item = list.find((x) => (x.course._id || x.course.id) === data.courseId);
      if (!item) {
        const c = FALLBACK_COURSES.find((x) => x._id === data.courseId) || FALLBACK_COURSES[0];
        item = {
          _id: 'hist-' + Date.now(),
          course: c,
          completedModules: { article: false, video: false, quiz: false, practice: false },
          quizScore: null,
          progressPercent: 25,
          isCompleted: false,
          lastAccessed: new Date().toISOString(),
        };
        list.push(item);
      }
      if (data.moduleType) item.completedModules[data.moduleType] = true;
      if (data.quizScore !== undefined) {
        item.quizScore = data.quizScore;
        item.completedModules.quiz = true;
      }
      let count = 0;
      if (item.completedModules.article) count++;
      if (item.completedModules.video) count++;
      if (item.completedModules.quiz) count++;
      if (item.completedModules.practice) count++;
      item.progressPercent = Math.round((count / 4) * 100);
      item.isCompleted = item.progressPercent === 100;

      await AsyncStorage.setItem(HIST_KEY, JSON.stringify(list));
      return { history: item };
    }
  },
};
