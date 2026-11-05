import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { historyApi } from '../services/api';
import {
  History,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileText,
  Video,
  HelpCircle,
  PenTool
} from '../components/Icons';

const HistoryPage = () => {
  const [historyList, setHistoryList] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [histRes, sumRes] = await Promise.all([
          historyApi.getAll(),
          historyApi.getSummary(),
        ]);
        setHistoryList(histRes.history || []);
        setSummary(sumRes);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Top Banner - Clean Solid Blue */}
      <section style={{
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '36px 0',
        marginBottom: '28px'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#1d4ed8',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '8px'
          }}>
            <History size={14} />
            <span>Aktivitas Belajar</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
            Riwayat Pembelajaran
          </h1>
          <p style={{ color: '#dbeafe', fontSize: '0.92rem', marginTop: '6px' }}>
            Pantau perkembangan materi yang sedang Anda pelajari, hasil kuis, dan catatan latihan praktik.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Statistics Cards */}
        {summary && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb'
                }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                    {summary.totalCourses}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Materi Diakses
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a'
                }}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                    {summary.completedCourses}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Selesai 100%
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb'
                }}>
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                    {summary.avgQuizScore} / 100
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Rata-rata Skor Kuis
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History List */}
        {loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: '#2563eb', fontWeight: 600 }}>Memuat riwayat belajar...</p>
          </div>
        ) : historyList.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <History size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#334155' }}>
              Belum ada riwayat pembelajaran
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px', marginBottom: '20px' }}>
              Anda belum membuka modul materi apapun. Mulai belajar sekarang!
            </p>
            <Link to="/" className="btn btn-primary">
              <BookOpen size={16} /> Buka Katalog Materi
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {historyList.map((item) => {
              const c = item.course;
              if (!c) return null;
              const courseId = c._id || c.id;
              const cm = item.completedModules || {};

              return (
                <div
                  key={item._id || courseId}
                  className="card"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    padding: '20px 24px'
                  }}
                >
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge badge-blue">{c.category}</span>
                      {item.isCompleted ? (
                        <span className="badge badge-green">
                          <CheckCircle size={12} /> Selesai
                        </span>
                      ) : (
                        <span className="badge badge-slate">Sedang Berlangsung</span>
                      )}
                    </div>

                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '6px'
                    }}>
                      {c.title}
                    </h3>

                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>
                      Terakhir diakses: {formatDate(item.lastAccessed)}
                    </div>

                    {/* Module badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: cm.article ? '#f0fdf4' : '#f1f5f9',
                        color: cm.article ? '#166534' : '#64748b',
                        border: cm.article ? '1px solid #bbf7d0' : '1px solid #e2e8f0'
                      }}>
                        <FileText size={12} /> Artikel {cm.article ? '✓' : ''}
                      </span>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: cm.video ? '#f0fdf4' : '#f1f5f9',
                        color: cm.video ? '#166534' : '#64748b',
                        border: cm.video ? '1px solid #bbf7d0' : '1px solid #e2e8f0'
                      }}>
                        <Video size={12} /> Video {cm.video ? '✓' : ''}
                      </span>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: cm.quiz ? '#f0fdf4' : '#f1f5f9',
                        color: cm.quiz ? '#166534' : '#64748b',
                        border: cm.quiz ? '1px solid #bbf7d0' : '1px solid #e2e8f0'
                      }}>
                        <HelpCircle size={12} /> Kuis: {item.quizScore !== null ? `${item.quizScore}/100` : '-'}
                      </span>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: cm.practice ? '#f0fdf4' : '#f1f5f9',
                        color: cm.practice ? '#166534' : '#64748b',
                        border: cm.practice ? '1px solid #bbf7d0' : '1px solid #e2e8f0'
                      }}>
                        <PenTool size={12} /> Latihan Praktik {cm.practice ? '✓' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Progress & CTA */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563eb' }}>
                        {item.progressPercent}%
                      </div>
                      <div style={{
                        width: '120px',
                        height: '6px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginTop: '4px'
                      }}>
                        <div style={{
                          width: `${item.progressPercent}%`,
                          height: '100%',
                          backgroundColor: item.isCompleted ? '#16a34a' : '#2563eb'
                        }} />
                      </div>
                    </div>

                    <Link
                      to={`/course/${courseId}`}
                      className="btn btn-primary btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <span>Lanjutkan</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
