import jwt from 'jsonwebtoken';
import { getDb } from '../dataStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'skilllearn_super_secret_jwt_key_2026'
      );

      const db = getDb();
      let user;
      if (db.isMongo) {
        user = await db.User.findById(decoded.id).select('-password');
      } else {
        const found = await db.User.findById(decoded.id);
        if (found) {
          const { password, ...rest } = found;
          user = rest;
        }
      }

      if (!user) {
        return res.status(401).json({ message: 'User tidak ditemukan' });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token otentikasi tidak valid atau telah kedaluwarsa' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, silakan login terlebih dahulu' });
  }
};

export const optionalAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'skilllearn_super_secret_jwt_key_2026'
      );
      const db = getDb();
      if (db.isMongo) {
        req.user = await db.User.findById(decoded.id).select('-password');
      } else {
        const found = await db.User.findById(decoded.id);
        if (found) {
          const { password, ...rest } = found;
          req.user = rest;
        }
      }
    } catch (e) {
      req.user = null;
    }
  }
  next();
};
