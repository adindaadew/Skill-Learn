import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesApi, favoritesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Bookmark,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Code,
  Palette,
  TrendingUp,
  Cpu,
  Layers,
  Filter
} from '../components/Icons';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [favoriteLoadingId, setFavoriteLoadingId] = useState(null);

  const { isAuthenticated } = useAuth();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await coursesApi.getAll({
        category: selectedCategory,
        search: searchTerm,
      });
      setCourses(res.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await coursesApi.getCategories();
        setCategories(res.categories || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  const handleToggleFavorite = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return;

    try {
      setFavoriteLoadingId(courseId);
      const res = await favoritesApi.toggle(courseId);
      setCourses((prev) =>
        prev.map((c) =>
          c._id === courseId ? { ...c, isFavorited: res.isFavorited } : c
        )
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setFavoriteLoadingId(null);
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Pemrograman':
        return <Code size={16} />;
      case 'Desain Grafis':
        return <Palette size={16} />;
      case 'Digital Marketing':
        return <TrendingUp size={16} />;
      case 'Teknologi':
        return <Cpu size={16} />;
      default:
        return <Layers size={16} />;
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Banner - Solid Blue (No Gradient!) */}
      <section style={{
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '48px 0 44px 0',
        marginBottom: '36px'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1d4ed8',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '16px'
            }}>
              <BookOpen size={16} />
              <span>Platform Pembelajaran Keterampilan Praktis</span>
            </div>
            <h1 style={{
              fontSize: '2.1rem',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '12px',
              letterSpacing: '-0.5px'
            }}>
              Kuasai Keahlian Nyata di Luar Pembelajaran Formal
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#dbeafe',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              Tingkatkan daya saing Anda dengan materi terstruktur berupa artikel mendalam, video tutorial, kuis evaluasi, serta latihan praktik berbasis studi kasus industri.
            </p>

            {/* Quick Stats */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              borderTop: '1px solid #3b82f6',
              paddingTop: '20px'
            }}>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>4 Bidang</div>
                <div style={{ fontSize: '0.8rem', color: '#bfdbfe' }}>Pemrograman, Desain, Marketing, & Teknologi</div>
              </div>
              <div style={{ width: '1px', backgroundColor: '#3b82f6' }} />
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>4 Format</div>
                <div style={{ fontSize: '0.8rem', color: '#bfdbfe' }}>Artikel, Video, Kuis, & Latihan Praktik</div>
              </div>
              <div style={{ width: '1px', backgroundColor: '#3b82f6' }} />
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>100%</div>
                <div style={{ fontSize: '0.8rem', color: '#bfdbfe' }}>Praktik Mandiri Terarah</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container">
        {/* Search & Category Filter Controls */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <span style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }}>
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari materi keterampilan (contoh: React, Figma, SEO, Cloud, dsb)..."
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#475569',
              marginBottom: '10px'
            }}>
              <Filter size={16} />
              <span>Pilih Bidang Keterampilan:</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Semua', 'Pemrograman', 'Desain Grafis', 'Digital Marketing', 'Teknologi'].map(
                (cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: isSelected ? '1px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: isSelected ? '#2563eb' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#334155',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {getCategoryIcon(cat)}
                      <span>{cat}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              Daftar Materi Keterampilan
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Menampilkan {courses.length} modul pembelajaran siap dipelajari
            </p>
          </div>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div style={{
            padding: '60px 0',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ color: '#2563eb', fontWeight: 600 }}>Memuat daftar materi kursus...</p>
          </div>
        ) : courses.length === 0 ? (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            <BookOpen size={36} color="#94a3b8" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155' }}>
              Tidak ada materi yang cocok
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px' }}>
              Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {courses.map((course) => {
              const isFav = course.isFavorited;
              const isCompleted = course.isCompleted;

              return (
                <div
                  key={course._id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  {/* Card Header Bar (Solid Blue or Slate) */}
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f8fafc'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-blue">
                        {getCategoryIcon(course.category)}
                        <span>{course.category}</span>
                      </span>
                      <span className="badge badge-slate">
                        {course.level}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(e, course._id)}
                      disabled={favoriteLoadingId === course._id}
                      title={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isFav ? '#2563eb' : '#94a3b8',
                        backgroundColor: isFav ? '#eff6ff' : 'transparent',
                      }}
                    >
                      <Bookmark size={20} fill={isFav ? '#2563eb' : 'none'} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '8px',
                      lineHeight: 1.4
                    }}>
                      {course.title}
                    </h3>

                    <p style={{
                      fontSize: '0.88rem',
                      color: '#64748b',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                      flex: 1
                    }}>
                      {course.summary}
                    </p>

                    {/* Progress indicator if started */}
                    {course.progressPercent > 0 && (
                      <div style={{ marginBottom: '14px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.78rem',
                          color: '#475569',
                          marginBottom: '4px',
                          fontWeight: 600
                        }}>
                          <span>Progres Belajar</span>
                          <span>{course.progressPercent}%</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${course.progressPercent}%`,
                            height: '100%',
                            backgroundColor: course.isCompleted ? '#16a34a' : '#2563eb',
                          }} />
                        </div>
                      </div>
                    )}

                    {/* Meta info: duration & instructor */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '12px',
                      fontSize: '0.82rem',
                      color: '#64748b'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={14} />
                        <span>{course.instructor?.name?.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div style={{ padding: '0 20px 20px 20px' }}>
                    <Link
                      to={`/course/${course._id}`}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <span>{course.progressPercent > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}</span>
                      <ArrowRight size={16} />
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

export default HomePage;
