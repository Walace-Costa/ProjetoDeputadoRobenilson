import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'História', href: '#foto-historia' },
  { label: 'Atuação', href: '#advocacia' },
  { label: 'Na Mídia', href: '#midia' },
  { label: 'Depoimentos', href: '#mencoes' },
  { label: 'Propostas', href: '#politica' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(8,14,26,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(230,59,46,0.2)' : 'none',
        transition: 'all 0.4s ease', padding: '0 clamp(1rem,4vw,3rem)',
      }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 8, background: 'linear-gradient(135deg,var(--red),var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulseRed 3s infinite' }}>
            <span style={{ fontFamily: 'var(--serif)', color: '#fff', fontWeight: 700, fontSize: 15 }}>RT</span>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>Robenilson Torres</div>
            <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'linear-gradient(90deg,var(--red),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Deputado Estadual · Bahia 2026
            </div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {links.map(l => (
            <motion.a key={l.href} href={l.href} whileHover={{ color: '#E63B2E' }}
              style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>
              {l.label}
            </motion.a>
          ))}
          <motion.a href="#contato" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ background: 'linear-gradient(135deg,var(--red),#c0392b)', color: '#fff', padding: '9px 22px', borderRadius: 7, fontSize: 13, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 20px var(--red-glow)' }}>
            #BoraPraALBA
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
