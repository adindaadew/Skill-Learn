import express from 'express';
import { getDb } from '../dataStore.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// @route   GET /api/history
// @desc    Mendapatkan daftar seluruh riwayat pembelajaran pengguna
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const currentUserId = (req.user._id || req.user.id).toString();

    let histories = await db.LearningHistory.find({ user: currentUserId });
    if (histories.items) histories = histories.items;

    const populated = await Promise.all(
      histories.map(async (hist) => {
        let course = hist.course;
        if (typeof course === 'string' || (course && !course.title)) {
          const cId = course.toString();
          course = await db.Course.findById(cId);
        }
        return {
          ...hist,
          course: course || null,
        };
      })
    );

    const validHistories = populated.filter((h) => h.course !== null);

    return res.json({
      count: validHistories.length,
      history: validHistories,
    });
  } catch (error) {
    console.error('Fetch history error:', error);
    return res.status(500).json({ message: 'Gagal memuat riwayat pembelajaran' });
  }
});

// @route   GET /api/history/summary
// @desc    Mendapatkan ringkasan statistik belajar pengguna
router.get('/summary', async (req, res) => {
  try {
    const db = getDb();
    const currentUserId = (req.user._id || req.user.id).toString();

    let histories = await db.LearningHistory.find({ user: currentUserId });
    if (histories.items) histories = histories.items;

    const totalCourses = histories.length;
    const completedCourses = histories.filter((h) => h.isCompleted).length;

    const quizzes = histories.filter(
      (h) => h.quizScore !== null && h.quizScore !== undefined
    );
    let avgQuizScore = 0;
    if (quizzes.length > 0) {
      const sum = quizzes.reduce((acc, curr) => acc + curr.quizScore, 0);
      avgQuizScore = Math.round(sum / quizzes.length);
    }

    return res.json({
      totalCourses,
      completedCourses,
      inProgressCourses: Math.max(0, totalCourses - completedCourses),
      avgQuizScore,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Gagal memuat statistik belajar' });
  }
});

// @route   POST /api/history/update
// @desc    Mencatat / memperbarui progres belajar, kuis, atau latihan praktik
router.post('/update', async (req, res) => {
  try {
    const {
      courseId,
      moduleType, // 'article' | 'video' | 'quiz' | 'practice'
      quizScore,
      quizTotal,
      practiceNotes,
      practiceLink,
    } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: 'ID Kursus wajib disertakan' });
    }

    const db = getDb();
    const currentUserId = (req.user._id || req.user.id).toString();

    const course = await db.Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan' });
    }

    let history = await db.LearningHistory.findOne({
      user: currentUserId,
      course: courseId,
    });

    if (!history) {
      history = await db.LearningHistory.create({
        user: currentUserId,
        course: courseId,
        completedModules: {
          article: false,
          video: false,
          quiz: false,
          practice: false,
        },
        quizScore: null,
        quizTotal: null,
        practiceNotes: '',
        practiceLink: '',
        progressPercent: 0,
        isCompleted: false,
        lastAccessed: new Date(),
      });
    }

    history.lastAccessed = new Date();

    if (!history.completedModules) {
      history.completedModules = {
        article: false,
        video: false,
        quiz: false,
        practice: false,
      };
    }

    if (moduleType && ['article', 'video', 'quiz', 'practice'].includes(moduleType)) {
      history.completedModules[moduleType] = true;
    }

    if (quizScore !== undefined && quizScore !== null) {
      history.quizScore = Number(quizScore);
      history.quizTotal = Number(quizTotal) || (course.quiz ? course.quiz.length : 3);
      history.completedModules.quiz = true;
    }

    if (practiceNotes !== undefined) {
      history.practiceNotes = practiceNotes;
      if (practiceNotes.trim().length > 0) {
        history.completedModules.practice = true;
      }
    }

    if (practiceLink !== undefined) {
      history.practiceLink = practiceLink;
    }

    // Hitung progress persentase (tiap modul berbobot 25%)
    let completedCount = 0;
    if (history.completedModules.article) completedCount++;
    if (history.completedModules.video) completedCount++;
    if (history.completedModules.quiz) completedCount++;
    if (history.completedModules.practice) completedCount++;

    history.progressPercent = Math.round((completedCount / 4) * 100);
    history.isCompleted = history.progressPercent === 100;

    if (history.save) {
      await history.save();
    }

    return res.json({
      message: 'Progres belajar berhasil diperbarui',
      history,
    });
  } catch (error) {
    console.error('Update history error:', error);
    return res.status(500).json({ message: 'Gagal memperbarui progres belajar' });
  }
});

export default router;
