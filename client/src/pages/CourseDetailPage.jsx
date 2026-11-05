import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesApi, favoritesApi, historyApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Video,
  HelpCircle,
  PenTool,
  Bookmark,
  CheckCircle,
  Clock,
  User,
  ArrowLeft,
  Award,
  AlertCircle,
  ExternalLink,
  Send,
  Check
} from '../components/Icons';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [history, setHistory] = useState(null);
  const [activeTab, setActiveTab] = useState('article'); // 'article', 'video', 'quiz', 'practice'
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  // Practice state
  const [practiceNotes, setPracticeNotes] = useState('');
  const [practiceLink, setPracticeLink] = useState('');
  const [practiceSubmitting, setPracticeSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await coursesApi.getById(id);
        setCourse(data.course);
        setIsFavorited(data.isFavorited);
        setHistory(data.history);

        if (data.history) {
          if (data.history.practiceNotes) setPracticeNotes(data.history.practiceNotes);
          if (data.history.practiceLink) setPracticeLink(data.history.practiceLink);
          if (data.history.quizScore !== null && data.history.quizScore !== undefined) {
            setQuizScore(data.history.quizScore);
            setQuizSubmitted(true);
          }
        }
      } catch (err) {
        console.error('Error fetching detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!course) return;
    try {
      const res = await favoritesApi.toggle(course._id);
      setIsFavorited(res.isFavorited);
      showActionMessage(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const showActionMessage = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const markModuleCompleted = async (moduleType) => {
    if (!course) return;
    try {
      const res = await historyApi.update({
        courseId: course._id,
        moduleType,
      });
      setHistory(res.history);
      showActionMessage(`Berhasil menandai modul ${moduleType} sebagai selesai!`);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Quiz
  const handleQuizAnswerSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (!course || !course.quiz) return;

    let correctCount = 0;
    const total = course.quiz.length;

    course.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / total) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    try {
      const res = await historyApi.update({
        courseId: course._id,
        moduleType: 'quiz',
        quizScore: calculatedScore,
        quizTotal: total,
      });
      setHistory(res.history);
      showActionMessage(`Kuis berhasil dinilai! Skor Anda: ${calculatedScore}/100`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  // Submit Practice
  const handleSubmitPractice = async (e) => {
    e.preventDefault();
    if (!course) return;

    try {
      setPracticeSubmitting(true);
      const res = await historyApi.update({
        courseId: course._id,
        moduleType: 'practice',
        practiceNotes,
        practiceLink,
      });
      setHistory(res.history);
      showActionMessage('Jawaban latihan praktik berhasil disimpan ke riwayat!');
    } catch (err) {
      console.error(err);
    } finally {
      setPracticeSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <p style={{ color: '#2563eb', fontWeight: 600 }}>Memuat materi pembelajaran...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2 style={{ color: '#0f172a', marginBottom: '12px' }}>Materi tidak ditemukan</h2>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const completedModules = history?.completedModules || {};
  const progressPercent = history?.progressPercent || 0;

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Top Breadcrumb & Actions Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#475569',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Katalog Materi</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleToggleFavorite}
              className={isFavorited ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Bookmark size={16} fill={isFavorited ? '#ffffff' : 'none'} />
              <span>{isFavorited ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}</span>
            </button>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="container" style={{ marginTop: '16px' }}>
          <div className="alert-success">
            <CheckCircle size={18} />
            <span>{actionMessage}</span>
          </div>
        </div>
      )}

      {/* Course Header Banner - Clean Solid Blue */}
      <section style={{
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '36px 0',
        marginBottom: '28px'
      }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              {course.category}
            </span>
            <span style={{
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              Level: {course.level}
            </span>
            <span style={{
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Clock size={14} />
              {course.duration}
            </span>
          </div>

          <h1 style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            lineHeight: 1.3,
            marginBottom: '12px'
          }}>
            {course.title}
          </h1>

          <p style={{
            fontSize: '0.96rem',
            color: '#dbeafe',
            maxWidth: '800px',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            {course.summary}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.88rem',
            color: '#ffffff'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#1d4ed8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={16} />
            </div>
            <div>
              <span style={{ fontWeight: 700 }}>{course.instructor?.name}</span>
              <span style={{ color: '#bfdbfe' }}> &bull; {course.instructor?.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container">
        {/* Progress & Modules Checklist Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '28px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                Status Pembelajaran Mandiri
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b', marginLeft: '8px' }}>
                ({progressPercent}% selesai)
              </span>
            </div>
            {history?.isCompleted && (
              <span className="badge badge-green">
                <CheckCircle size={14} /> Modul Selesai 100%
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: history?.isCompleted ? '#16a34a' : '#2563eb',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* 4 Pillars Checklist */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px'
          }}>
            <div style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: completedModules.article ? '#f0fdf4' : '#f8fafc',
              border: completedModules.article ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={16} color={completedModules.article ? '#16a34a' : '#94a3b8'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>1. Artikel Materi</span>
            </div>

            <div style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: completedModules.video ? '#f0fdf4' : '#f8fafc',
              border: completedModules.video ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={16} color={completedModules.video ? '#16a34a' : '#94a3b8'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>2. Video Tutorial</span>
            </div>

            <div style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: completedModules.quiz ? '#f0fdf4' : '#f8fafc',
              border: completedModules.quiz ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={16} color={completedModules.quiz ? '#16a34a' : '#94a3b8'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                3. Kuis {history?.quizScore !== null && history?.quizScore !== undefined ? `(${history.quizScore})` : ''}
              </span>
            </div>

            <div style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: completedModules.practice ? '#f0fdf4' : '#f8fafc',
              border: completedModules.practice ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={16} color={completedModules.practice ? '#16a34a' : '#94a3b8'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>4. Latihan Praktik</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #e2e8f0',
          marginBottom: '24px',
          gap: '8px',
          overflowX: 'auto'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('article')}
            style={{
              padding: '12px 18px',
              fontWeight: 700,
              fontSize: '0.92rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'article' ? '#2563eb' : '#64748b',
              borderBottom: activeTab === 'article' ? '3px solid #2563eb' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '-2px'
            }}
          >
            <FileText size={18} />
            <span>Artikel Pembelajaran</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video')}
            style={{
              padding: '12px 18px',
              fontWeight: 700,
              fontSize: '0.92rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'video' ? '#2563eb' : '#64748b',
              borderBottom: activeTab === 'video' ? '3px solid #2563eb' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '-2px'
            }}
          >
            <Video size={18} />
            <span>Video Tutorial</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            style={{
              padding: '12px 18px',
              fontWeight: 700,
              fontSize: '0.92rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'quiz' ? '#2563eb' : '#64748b',
              borderBottom: activeTab === 'quiz' ? '3px solid #2563eb' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '-2px'
            }}
          >
            <HelpCircle size={18} />
            <span>Kuis Evaluasi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            style={{
              padding: '12px 18px',
              fontWeight: 700,
              fontSize: '0.92rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'practice' ? '#2563eb' : '#64748b',
              borderBottom: activeTab === 'practice' ? '3px solid #2563eb' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '-2px'
            }}
          >
            <PenTool size={18} />
            <span>Latihan Praktik</span>
          </button>
        </div>

        {/* Tab 1: Artikel */}
        {activeTab === 'article' && (
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                {course.article?.title}
              </h2>

              <button
                type="button"
                onClick={() => markModuleCompleted('article')}
                className={completedModules.article ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm'}
              >
                <CheckCircle size={16} />
                <span>{completedModules.article ? 'Sudah Dibaca' : 'Tandai Selesai Membaca'}</span>
              </button>
            </div>

            {/* Article Body */}
            <div style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: '#334155',
              whiteSpace: 'pre-line',
              marginBottom: '32px'
            }}>
              {course.article?.content}
            </div>

            {/* Key Takeaways */}
            {course.article?.keyTakeaways && course.article.keyTakeaways.length > 0 && (
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#1e40af',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Award size={18} />
                  <span>Poin Kunci Pembelajaran (Key Takeaways)</span>
                </h3>
                <ul style={{ paddingLeft: '20px', margin: 0, color: '#1e3a8a', lineHeight: 1.7 }}>
                  {course.article.keyTakeaways.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Video Tutorial */}
        {activeTab === 'video' && (
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  {course.video?.title}
                </h2>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  Durasi: {course.video?.duration}
                </div>
              </div>

              <button
                type="button"
                onClick={() => markModuleCompleted('video')}
                className={completedModules.video ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm'}
              >
                <CheckCircle size={16} />
                <span>{completedModules.video ? 'Sudah Ditonton' : 'Tandai Selesai Menonton'}</span>
              </button>
            </div>

            {/* Responsive Video Embed */}
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              marginBottom: '20px'
            }}>
              <iframe
                title={course.video?.title}
                src={`https://www.youtube.com/embed/${course.video?.youtubeEmbedId}?rel=0`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Deskripsi Video Tutorial
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                {course.video?.description}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Kuis Evaluasi */}
        {activeTab === 'quiz' && (
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  Kuis Pemahaman Materi
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  Jawab pertanyaan di bawah ini untuk menguji pemahaman Anda.
                </p>
              </div>

              {quizSubmitted && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    backgroundColor: quizScore >= 70 ? '#f0fdf4' : '#fef2f2',
                    border: quizScore >= 70 ? '1px solid #bbf7d0' : '1px solid #fecaca',
                    color: quizScore >= 70 ? '#16a34a' : '#dc2626',
                    fontWeight: 800,
                    fontSize: '1rem'
                  }}>
                    Skor: {quizScore} / 100
                  </div>
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="btn btn-secondary btn-sm"
                  >
                    Ulangi Kuis
                  </button>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              {course.quiz?.map((q, qIdx) => {
                const selectedOpt = selectedAnswers[qIdx];
                const isCorrect = selectedOpt === q.correctAnswerIndex;

                return (
                  <div
                    key={qIdx}
                    style={{
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      marginBottom: '14px'
                    }}>
                      <span style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {qIdx + 1}
                      </span>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1.5,
                        margin: 0
                      }}>
                        {q.question}
                      </h4>
                    </div>

                    {/* Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '34px' }}>
                      {q.options?.map((opt, optIdx) => {
                        let optBg = '#ffffff';
                        let optBorder = '#cbd5e1';
                        let optColor = '#334155';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswerIndex) {
                            optBg = '#f0fdf4';
                            optBorder = '#86efac';
                            optColor = '#166534';
                          } else if (selectedOpt === optIdx) {
                            optBg = '#fef2f2';
                            optBorder = '#fca5a5';
                            optColor = '#991b1b';
                          }
                        } else if (selectedOpt === optIdx) {
                          optBg = '#eff6ff';
                          optBorder = '#2563eb';
                          optColor = '#1e40af';
                        }

                        return (
                          <label
                            key={optIdx}
                            onClick={() => handleQuizAnswerSelect(qIdx, optIdx)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 14px',
                              borderRadius: '6px',
                              border: `1px solid ${optBorder}`,
                              backgroundColor: optBg,
                              color: optColor,
                              cursor: quizSubmitted ? 'default' : 'pointer',
                              fontSize: '0.9rem',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <input
                              type="radio"
                              name={`question-${qIdx}`}
                              checked={selectedOpt === optIdx}
                              onChange={() => {}}
                              disabled={quizSubmitted}
                              style={{ accentColor: '#2563eb' }}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Explanation after submission */}
                    {quizSubmitted && (
                      <div style={{
                        marginTop: '14px',
                        marginLeft: '34px',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        backgroundColor: isCorrect ? '#f0fdf4' : '#eff6ff',
                        border: isCorrect ? '1px solid #bbf7d0' : '1px solid #bfdbfe',
                        fontSize: '0.85rem'
                      }}>
                        <div style={{ fontWeight: 700, color: isCorrect ? '#166534' : '#1e40af', marginBottom: '4px' }}>
                          {isCorrect ? 'Jawaban Benar!' : 'Pembahasan Jawaban:'}
                        </div>
                        <div style={{ color: isCorrect ? '#14532d' : '#1e3a8a', lineHeight: 1.5 }}>
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted && (
              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="btn btn-primary"
                  disabled={Object.keys(selectedAnswers).length < course.quiz?.length}
                >
                  <Check size={18} />
                  <span>Kirim & Nilai Jawaban Kuis</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Latihan Praktik */}
        {activeTab === 'practice' && (
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  {course.practice?.title}
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  Terapkan pengetahuan ke dalam studi kasus dunia nyata secara mandiri.
                </p>
              </div>

              {completedModules.practice && (
                <span className="badge badge-green">
                  <CheckCircle size={14} /> Tugas Praktik Tersimpan
                </span>
              )}
            </div>

            {/* Scenario & Tasks */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Skenario Studi Kasus:
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginBottom: '16px' }}>
                {course.practice?.scenario}
              </p>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Langkah-Langkah Tugas Praktik:
              </h4>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#334155', lineHeight: 1.7, fontSize: '0.9rem' }}>
                {course.practice?.tasks?.map((t, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmitPractice}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px'
                }}>
                  Refleksi / Ringkasan Hasil Pengerjaan Anda
                </label>
                <textarea
                  rows={5}
                  value={practiceNotes}
                  onChange={(e) => setPracticeNotes(e.target.value)}
                  placeholder="Ketikkan ringkasan hasil latihan, kendala yang dihadapi, atau penjelasan solusi praktis Anda..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    fontSize: '0.92rem',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px'
                }}>
                  Tautan Hasil Karya / Repositori Proyek (Opsional)
                </label>
                <input
                  type="url"
                  value={practiceLink}
                  onChange={(e) => setPracticeLink(e.target.value)}
                  placeholder="https://github.com/username/project atau https://figma.com/file/..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div style={{ textAlign: 'right' }}>
                <button
                  type="submit"
                  disabled={practiceSubmitting || !practiceNotes.trim()}
                  className="btn btn-primary"
                >
                  <Send size={16} />
                  <span>{practiceSubmitting ? 'Menyimpan...' : 'Simpan Jawaban Praktik'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
