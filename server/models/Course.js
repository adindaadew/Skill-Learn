import mongoose from 'mongoose';

const quizItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String, default: '' },
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Pemrograman', 'Desain Grafis', 'Digital Marketing', 'Teknologi'],
    },
    level: {
      type: String,
      enum: ['Pemula', 'Menengah', 'Lanjutan'],
      default: 'Pemula',
    },
    duration: {
      type: String,
      default: '45 Menit',
    },
    summary: {
      type: String,
      required: true,
    },
    instructor: {
      name: { type: String, default: 'Tim Instruktur SkillLearn' },
      role: { type: String, default: 'Praktisi Industri' },
    },
    article: {
      title: { type: String, required: true },
      content: { type: String, required: true },
      keyTakeaways: [{ type: String }],
    },
    video: {
      title: { type: String, required: true },
      youtubeUrl: { type: String, required: true },
      youtubeEmbedId: { type: String, required: true },
      duration: { type: String, default: '15 Menit' },
      description: { type: String, default: '' },
    },
    quiz: [quizItemSchema],
    practice: {
      title: { type: String, required: true },
      scenario: { type: String, required: true },
      tasks: [{ type: String }],
      submissionGuide: { type: String, default: '' },
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
