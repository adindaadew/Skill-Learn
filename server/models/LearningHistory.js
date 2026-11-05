import mongoose from 'mongoose';

const learningHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    completedModules: {
      article: { type: Boolean, default: false },
      video: { type: Boolean, default: false },
      quiz: { type: Boolean, default: false },
      practice: { type: Boolean, default: false },
    },
    quizScore: {
      type: Number,
      default: null,
    },
    quizTotal: {
      type: Number,
      default: null,
    },
    practiceNotes: {
      type: String,
      default: '',
    },
    practiceLink: {
      type: String,
      default: '',
    },
    progressPercent: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

learningHistorySchema.index({ user: 1, course: 1 }, { unique: true });

const LearningHistory = mongoose.model('LearningHistory', learningHistorySchema);
export default LearningHistory;
