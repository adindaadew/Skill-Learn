import express from 'express';
import { getDb } from '../dataStore.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Mendapatkan daftar materi/kursus dengan filter kategori & pencarian
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== 'Semua') {
      query.category = category;
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { summary: searchRegex },
        { tags: searchRegex },
      ];
    }

    const db = getDb();
    let courses = await db.Course.find(query);
    if (courses.items) courses = courses.items;

    let favoritesSet = new Set();
    let historyMap = new Map();

    const currentUserId = req.user ? (req.user._id || req.user.id).toString() : null;

    if (currentUserId) {
      let favorites = await db.Favorite.find({ user: currentUserId });
      if (favorites.items) favorites = favorites.items;
      favorites.forEach((fav) => {
        const cId = fav.course ? fav.course.toString() : '';
        favoritesSet.add(cId);
      });

      let histories = await db.LearningHistory.find({ user: currentUserId });
      if (histories.items) histories = histories.items;
      histories.forEach((hist) => {
        const cId = hist.course ? hist.course.toString() : '';
        historyMap.set(cId, hist);
      });
    }

    const formattedCourses = courses.map((c) => {
      const courseIdStr = (c._id || c.id).toString();
      const history = historyMap.get(courseIdStr);

      return {
        _id: courseIdStr,
        title: c.title,
        slug: c.slug,
        category: c.category,
        level: c.level,
        duration: c.duration,
        summary: c.summary,
        instructor: c.instructor,
        tags: c.tags,
        isFavorited: favoritesSet.has(courseIdStr),
        progressPercent: history ? history.progressPercent : 0,
        isCompleted: history ? history.isCompleted : false,
      };
    });

    return res.json({
      count: formattedCourses.length,
      courses: formattedCourses,
    });
  } catch (error) {
    console.error('Fetch courses error:', error);
    return res.status(500).json({ message: 'Gagal memuat daftar kursus' });
  }
});

// @route   GET /api/courses/meta/categories
// @desc    Mendapatkan daftar kategori dan jumlah materi
router.get('/meta/categories', async (req, res) => {
  try {
    const db = getDb();
    const categories = ['Pemrograman', 'Desain Grafis', 'Digital Marketing', 'Teknologi'];
    const counts = await Promise.all(
      categories.map(async (cat) => {
        const count = await db.Course.countDocuments({ category: cat });
        return { name: cat, count };
      })
    );
    const totalCount = await db.Course.countDocuments();
    return res.json({
      total: totalCount,
      categories: [{ name: 'Semua', count: totalCount }, ...counts],
    });
  } catch (error) {
    console.error('Meta categories error:', error);
    return res.status(500).json({ message: 'Gagal memuat kategori' });
  }
});

// @route   GET /api/courses/:id
// @desc    Mendapatkan detail kursus lengkap (artikel, video, kuis, latihan praktik)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    let course = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      course = await db.Course.findById(id);
    }
    if (!course) {
      course = await db.Course.findOne({ slug: id });
    }
    if (!course) {
      course = await db.Course.findById(id);
    }

    if (!course) {
      return res.status(404).json({ message: 'Materi kursus tidak ditemukan' });
    }

    let isFavorited = false;
    let history = null;
    const currentUserId = req.user ? (req.user._id || req.user.id).toString() : null;
    const courseId = (course._id || course.id).toString();

    if (currentUserId) {
      const fav = await db.Favorite.findOne({
        user: currentUserId,
        course: courseId,
      });
      isFavorited = !!fav;

      history = await db.LearningHistory.findOne({
        user: currentUserId,
        course: courseId,
      });
    }

    return res.json({
      course,
      isFavorited,
      history,
    });
  } catch (error) {
    console.error('Fetch course detail error:', error);
    return res.status(500).json({ message: 'Gagal memuat detail kursus' });
  }
});

export default router;
