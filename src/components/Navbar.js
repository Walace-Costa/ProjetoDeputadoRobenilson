import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Nav has 48px side padding (clamp caps at 3rem by 1200px) and content maxWidth:1200 centered inside it,
// so the true empty gutter per side is 48 + max(0,(100vw-1296)/2). Width below keeps a 16px safety margin
// from that gutter, scaling from ~104px at the 1440px show-breakpoint up to a 380px cap (reached ~1992px wide).
const EDGE_ART_WIDTH = 'clamp(90px, calc(32px + (100vw - 1296px) / 2), 380px)';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const showEdgeArt = useMediaQuery('(min-width: 1440px)');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? '#132FA8' : '#0C2490',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
        transition: 'all 0.4s ease', padding: '0 clamp(1rem,4vw,3rem)',
      }}>
      {showEdgeArt && (
        <>
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: EDGE_ART_WIDTH, pointerEvents: 'none',
            backgroundImage: 'url(/formas.png)', backgroundRepeat: 'repeat-x', backgroundSize: 'auto 100%', backgroundPosition: 'left center',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, bottom: 0, right: 0, width: EDGE_ART_WIDTH, pointerEvents: 'none',
            backgroundImage: 'url(/formas.png)', backgroundRepeat: 'repeat-x', backgroundSize: 'auto 100%', backgroundPosition: 'right center',
          }} />
        </>
      )}
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo_colorido_robenilson_deputado_estadual.png" alt="Robenilson Torres" style={{ height: 72, width: 'auto', display: 'block', flexShrink: 0 }} />
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#F5D77E' }}>
            Deputado Estadual · Bahia 2026
          </div>
        </Link>

        {isMobile ? (
          <button onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menu" aria-expanded={menuOpen}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, padding: 8, width: 40, height: 40 }}>
            <span style={{ width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {links.map(l => (
              isHome ? (
                <motion.a key={l.href} href={l.href} whileHover={{ color: '#D4A017' }}
                  style={{ color: '#fff', textDecoration: 'none', fontSize: 13 }}>
                  {l.label}
                </motion.a>
              ) : (
                <motion.div key={l.href} whileHover={{ color: '#D4A017' }}>
                  <Link to={`/${l.href}`}
                    style={{ color: '#fff', textDecoration: 'none', fontSize: 13 }}>
                    {l.label}
                  </Link>
                </motion.div>
              )
            ))}
            {isHome ? (
              <motion.a href="#contato" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '9px 22px', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px var(--gold-glow)' }}>
                #BoraPraALBA
              </motion.a>
            ) : (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/#contato"
                  style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '9px 22px', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px var(--gold-glow)', display: 'inline-block' }}>
                  #BoraPraALBA
                </Link>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '8px clamp(1rem,4vw,3rem) 28px', gap: 2 }}>
              {links.map(l => (
                isHome ? (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    style={{ color: '#fff', textDecoration: 'none', fontSize: 15, padding: '13px 4px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.href} to={`/${l.href}`} onClick={() => setMenuOpen(false)}
                    style={{ color: '#fff', textDecoration: 'none', fontSize: 15, padding: '13px 4px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                    {l.label}
                  </Link>
                )
              ))}
              {isHome ? (
                <a href="#contato" onClick={() => setMenuOpen(false)}
                  style={{ marginTop: 18, textAlign: 'center', background: 'var(--gold)', color: 'var(--navy)', padding: '13px 22px', borderRadius: 7, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  #BoraPraALBA
                </a>
              ) : (
                <Link to="/#contato" onClick={() => setMenuOpen(false)}
                  style={{ marginTop: 18, textAlign: 'center', background: 'var(--gold)', color: 'var(--navy)', padding: '13px 22px', borderRadius: 7, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  #BoraPraALBA
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
