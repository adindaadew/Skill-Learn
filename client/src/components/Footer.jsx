import React from 'react';
import { BookOpen } from './Icons';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '32px',
      paddingBottom: '32px',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem'
          }}>
            <BookOpen size={16} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
              SkillLearn Platform
            </div>
            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
              Mini Specialized Platform Pembelajaran Keterampilan Praktis Non-Formal
            </div>
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.82rem' }}>
          Materi: Pemrograman &bull; Desain Grafis &bull; Digital Marketing &bull; Teknologi
        </div>
      </div>
    </footer>
  );
};

export default Footer;
