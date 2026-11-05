import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../dataStore.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign(
    { id: id.toString() },
    process.env.JWT_SECRET || 'skilllearn_super_secret_jwt_key_2026',
    { expiresIn: '7d' }
  );
};

// @route   POST /api/auth/register
// @desc    Registrasi akun baru (Siswa / Mahasiswa)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, institution } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan kata sandi wajib diisi' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Kata sandi minimal 6 karakter' });
    }

    const db = getDb();
    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await db.User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar. Silakan login atau gunakan email lain.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: role || 'Mahasiswa',
      institution: institution ? institution.trim() : '',
    });

    const userId = user._id || user.id;
    const token = generateToken(userId);

    return res.status(201).json({
      message: 'Registrasi berhasil',
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat registrasi' });
  }
});

// @route   POST /api/auth/login
// @desc    Masuk / Login pengguna
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan kata sandi wajib diisi' });
    }

    const db = getDb();
    const cleanEmail = email.toLowerCase().trim();

    const user = await db.User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ message: 'Email atau kata sandi tidak sesuai' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau kata sandi tidak sesuai' });
    }

    const userId = user._id || user.id;
    const token = generateToken(userId);

    return res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat login' });
  }
});

// @route   GET /api/auth/me
// @desc    Mendapatkan data pengguna saat ini
router.get('/me', protect, async (req, res) => {
  const userId = req.user._id || req.user.id;
  return res.json({
    user: {
      id: userId,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      institution: req.user.institution,
    },
  });
});

export default router;
