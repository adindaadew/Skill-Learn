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

// Cache connection promise for serverless environments (Vercel)
let isConnected = false;
let dbConnectPromise = null;

async function ensureDatabaseConnected() {
  if (isConnected && mongoose.connection.readyState === 1) {
    setMongooseActive(true);
    return;
  }

  if (dbConnectPromise) {
    return dbConnectPromise;
  }

  dbConnectPromise = (async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('[Database] MONGODB_URI tidak ditemukan di environment variables! Mengaktifkan In-Memory Store.');
      setMongooseActive(false);
      await seedMemoryData();
      return;
    }

    try {
      console.log('[Database] Menghubungkan ke MongoDB Atlas...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      isConnected = true;
      setMongooseActive(true);
      console.log('[Database] Sukses terhubung ke MongoDB Database Server (Atlas)!');

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
      console.warn('[Database] Gagal terhubung ke MongoDB Atlas:', error.message);
      setMongooseActive(false);
      await seedMemoryData();
    } finally {
      dbConnectPromise = null;
    }
  })();

  return dbConnectPromise;
}

// CRITICAL SERVERLESS MIDDLEWARE:
// Pastikan koneksi MongoDB Atlas tersambung dan aktif SEBELUM setiap request API diproses!
app.use(async (req, res, next) => {
  try {
    await ensureDatabaseConnected();
  } catch (e) {
    console.error('[Middleware Error]', e);
  }
  next();
});

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
    database: mongoose.connection.readyState === 1 ? 'MongoDB Atlas (Connected)' : 'In-Memory Engine (Ready)',
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    mongooseReadyState: mongoose.connection.readyState,
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di API SkillLearn - Mini Specialized Learning Platform',
    status: 'active',
    database: mongoose.connection.readyState === 1 ? 'MongoDB Atlas' : 'In-Memory Engine',
    hasMongoUri: Boolean(process.env.MONGODB_URI),
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

// Start Server for local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  ensureDatabaseConnected().then(() => {
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`Server SkillLearn aktif di: http://localhost:${PORT}`);
      console.log(`API Health: http://localhost:${PORT}/api/health`);
      console.log(`Akun Demo : siswa@skilllearn.id | password123`);
      console.log(`====================================================`);
    });
  });
}

export default app;
