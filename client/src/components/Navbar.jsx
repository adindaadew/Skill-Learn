import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Bookmark, History, LogOut, User, Compass } from './Icons';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}>
          <div style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            <BookOpen size={20} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#2563eb',
              letterSpacing: '-0.5px'
            }}>
              SkillLearn
            </span>
            <span style={{
              fontSize: '0.68rem',
              color: '#64748b',
              fontWeight: 500,
              marginTop: '-4px'
            }}>
              Praktis & Terarah
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/"
                end
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : '#475569',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                })}
              >
                <Compass size={18} />
                <span>Katalog Materi</span>
              </NavLink>

              <NavLink
                to="/favorites"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : '#475569',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                })}
              >
                <Bookmark size={18} />
                <span>Favorit</span>
              </NavLink>

              <NavLink
                to="/history"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : '#475569',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                })}
              >
                <History size={18} />
                <span>Riwayat Belajar</span>
              </NavLink>
            </>
          ) : null}
        </nav>

        {/* User Action / Auth CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '6px',
                fontSize: '0.85rem'
              }}>
                <User size={16} color="#2563eb" />
                <span style={{ fontWeight: 600, color: '#1e40af' }}>{user?.name}</span>
                <span style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 700
                }}>
                  {user?.role || 'Siswa'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                title="Keluar dari akun"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogOut size={16} color="#64748b" />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Masuk
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Daftar Akun
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
