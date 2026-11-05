import express from 'express';
import { getDb } from '../dataStore.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// @route   GET /api/favorites
// @desc    Mendapatkan seluruh materi favorit pengguna
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const currentUserId = (req.user._id || req.user.id).toString();

    let favorites = await db.Favorite.find({ user: currentUserId });
    if (favorites.items) favorites = favorites.items;

    const populatedFavorites = await Promise.all(
      favorites.map(async (fav) => {
        let course = fav.course;
        if (typeof course === 'string' || (course && !course.title)) {
          const cId = course.toString();
          course = await db.Course.findById(cId);
        }
        return {
          favoriteId: fav._id || fav.id,
          savedAt: fav.createdAt,
          course: course || null,
        };
      })
    );

    const validFavorites = populatedFavorites.filter((f) => f.course !== null);

    return res.json({
      count: validFavorites.length,
      favorites: validFavorites,
    });
  } catch (error) {
    console.error('Fetch favorites error:', error);
    return res.status(500).json({ message: 'Gagal memuat materi favorit' });
  }
});

// @route   POST /api/favorites/toggle/:courseId
// @desc    Tambah / Hapus materi dari favorit (Bookmark)
router.post('/toggle/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const db = getDb();
    const currentUserId = (req.user._id || req.user.id).toString();

    const course = await db.Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan' });
    }

    const existingFav = await db.Favorite.findOne({
      user: currentUserId,
      course: courseId,
    });

    if (existingFav) {
      const favId = existingFav._id || existingFav.id;
      await db.Favorite.findByIdAndDelete(favId);
      return res.json({
        message: 'Materi berhasil dihapus dari daftar favorit',
        isFavorited: false,
      });
    } else {
      await db.Favorite.create({
        user: currentUserId,
        course: courseId,
      });
      return res.json({
        message: 'Materi berhasil disimpan ke favorit',
        isFavorited: true,
      });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return res.status(500).json({ message: 'Gagal memperbarui status favorit' });
  }
});

export default router;
