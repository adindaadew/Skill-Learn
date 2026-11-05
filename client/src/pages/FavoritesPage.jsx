import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { favoritesApi } from '../services/api';
import { Bookmark, Clock, ArrowRight, BookOpen, Trash2, Code, Palette, TrendingUp, Cpu, Layers } from '../components/Icons';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await favoritesApi.getAll();
      setFavorites(res.favorites || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (courseId) => {
    try {
      await favoritesApi.toggle(courseId);
      setFavorites((prev) => prev.filter((f) => (f.course._id || f.course.id) !== courseId));
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Pemrograman':
        return <Code size={14} />;
      case 'Desain Grafis':
        return <Palette size={14} />;
      case 'Digital Marketing':
        return <TrendingUp size={14} />;
      case 'Teknologi':
        return <Cpu size={14} />;
      default:
        return <Layers size={14} />;
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Top Header */}
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
            <Bookmark size={14} />
            <span>Koleksi Disimpan</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
            Materi Favorit Saya
          </h1>
          <p style={{ color: '#dbeafe', fontSize: '0.92rem', marginTop: '6px' }}>
            Akses cepat materi-materi pilihan yang telah Anda tandai sebagai favorit.
          </p>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: '#2563eb', fontWeight: 600 }}>Memuat daftar materi favorit...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Bookmark size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#334155' }}>
              Belum ada materi favorit
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px', marginBottom: '20px' }}>
              Klik ikon bookmark pada kartu materi untuk menyimpannya ke halaman ini.
            </p>
            <Link to="/" className="btn btn-primary">
              <BookOpen size={16} /> Jelajahi Materi Sekarang
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {favorites.map((fav) => {
              const c = fav.course;
              const courseId = c._id || c.id;

              return (
                <div
                  key={fav.favoriteId || courseId}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f8fafc'
                  }}>
                    <span className="badge badge-blue">
                      {getCategoryIcon(c.category)}
                      <span>{c.category}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemove(courseId)}
                      title="Hapus dari daftar favorit"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: '#94a3b8',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {c.title}
                    </h3>
                    <p style={{
                      fontSize: '0.86rem',
                      color: '#64748b',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                      flex: 1
                    }}>
                      {c.summary}
                    </p>

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
                        <span>{c.duration}</span>
                      </div>
                      <span className="badge badge-slate">{c.level}</span>
                    </div>
                  </div>

                  <div style={{ padding: '0 20px 20px 20px' }}>
                    <Link
                      to={`/course/${courseId}`}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <span>Buka Pembelajaran</span>
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

export default FavoritesPage;
