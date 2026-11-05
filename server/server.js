import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

import CourseMongoose from './models/Course.js';
import UserMongoose from './models/User.js';
import { coursesData } from './data/coursesData.js';
import { setMongooseActive, seedMemoryData } from './dataStore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialization
async function initDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllearn';

  try {
    console.log(`[Database] Mencoba terhubung ke MongoDB (${uri})...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('[Database] Sukses terhubung ke MongoDB Database Server!');
    setMongooseActive(true);

    // Inisialisasi seed data di MongoDB
    const courseCount = await CourseMongoose.countDocuments();
    if (courseCount === 0) {
      console.log('[Database] Mengisi data materi kursus SkillLearn ke MongoDB...');
      await CourseMongoose.insertMany(coursesData);
      console.log(`[Database] Berhasil mengimpor ${coursesData.length} materi kursus.`);
    }

    const demoUser = await UserMongoose.findOne({ email: 'siswa@skilllearn.id' });
    if (!demoUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      await UserMongoose.create({
        name: 'Budi Mahasiswa Pratama',
        email: 'siswa@skilllearn.id',
        password: hashedPassword,
        role: 'Mahasiswa',
        institution: 'Universitas Pendidikan Indonesia',
      });
      console.log('[Database] Akun demo siap: siswa@skilllearn.id / password123');
    }
  } catch (error) {
    console.warn('[Database] Peringatan: Layanan MongoDB lokal tidak aktif.');
    console.log('[Database] Mengaktifkan Smart In-Memory Store bawaan agar aplikasi web dan mobile dapat langsung dieksekusi tanpa konfigurasi manual...');
    setMongooseActive(false);
    await seedMemoryData();
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'SkillLearn Backend API',
    database: mongoose.connection.readyState === 1 ? 'MongoDB' : 'In-Memory Engine (Ready)',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di API SkillLearn - Mini Specialized Learning Platform',
    status: 'active',
    endpoints: {
      auth: ['/api/auth/register', '/api/auth/login', '/api/auth/me'],
      courses: ['/api/courses', '/api/courses/:id', '/api/courses/meta/categories'],
      favorites: ['/api/favorites', '/api/favorites/toggle/:courseId'],
      history: ['/api/history', '/api/history/update', '/api/history/summary'],
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Rute API tidak ditemukan' });
});

// Start Server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`Server SkillLearn aktif di: http://localhost:${PORT}`);
    console.log(`API Health: http://localhost:${PORT}/api/health`);
    console.log(`Akun Demo : siswa@skilllearn.id | password123`);
    console.log(`====================================================`);
  });
});

export default app;
