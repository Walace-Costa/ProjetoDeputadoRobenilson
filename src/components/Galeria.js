import { useState, useEffect, useMemo, useRef } from 'react';
import {
  motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useMediaQuery } from '../hooks/useMediaQuery';
import Navbar from './Navbar';
import Footer from './Footer';
import Particles from './Particles';

const PALETTE = {
  navy: '#0F1B4C',
  gold: '#D4A017',
  wine: '#9C1F2E',
  olive: '#2D4A2B',
  creamBlue: '#EEF1FA',
  creamGreen: '#EEF3EA',
};

const CATEGORIAS = ['Educação', 'Meio Ambiente', 'Vida Política', 'Advocacia e Gestão', 'Comunidade'];
const ACCENTS = [PALETTE.gold, PALETTE.wine, PALETTE.olive, PALETTE.navy];
const CATEGORIA_COR = Object.fromEntries(CATEGORIAS.map((c, i) => [c, ACCENTS[i % ACCENTS.length]]));
const ASPECTS = [0.75, 1, 1.3, 0.85, 1.15, 0.95];
const TOTAL_FOTOS = 53;

// Edite a categoria e a legenda de cada foto abaixo conforme o conteúdo real de cada imagem
const fotos = Array.from({ length: TOTAL_FOTOS }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, '0');
  const categoria = CATEGORIAS[i % CATEGORIAS.length];
  return {
    id: n,
    src: `/galeria/galeria-${num}.jpeg`,
    categoria,
    cor: CATEGORIA_COR[categoria],
    legenda: `Registro da trajetória — foto ${num}`,
  };
});

const titleContainer = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const titleWord = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
const noiseDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}`;

function GaleriaHeader({ scrollY, totalFotos, isMobile }) {
  const { ref: countRef, inView: countInView } = useInView({ threshold: 0.4, triggerOnce: true });
  const title = 'Momentos de uma trajetória';

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: PALETTE.navy, minHeight: isMobile ? 420 : 520, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '-15%', left: 0, right: 0, height: '140%', transform: `translateY(${scrollY * 0.3}px)` }}>
        <Particles />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%, rgba(212,160,23,0.14), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 80%, rgba(156,31,46,0.14), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, height: 2, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg,transparent,rgba(212,160,23,0.35),transparent)', animation: 'scanline 6s linear infinite' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%', padding: isMobile ? '130px clamp(1rem,4vw,3rem) 48px' : '150px clamp(1rem,4vw,3rem) 64px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(212,160,23,0.4)', borderRadius: 999, padding: '5px 14px', marginBottom: 24, background: 'rgba(212,160,23,0.1)' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: PALETTE.gold, animation: 'pulseRed 2s infinite' }} />
          <span style={{ color: PALETTE.gold, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Galeria de Fotos</span>
        </motion.div>

        <motion.h1 variants={titleContainer} initial="hidden" animate="show"
          style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.35em', marginBottom: 20 }}>
          {title.split(' ').map((w, i) => (
            <motion.span key={i} variants={titleWord}>{w}</motion.span>
          ))}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, maxWidth: 520, margin: '0 auto 32px' }}>
          Um mosaico de bastidores, encontros e conquistas — os momentos que constroem uma trajetória a serviço das pessoas.
        </motion.p>

        <div ref={countRef} style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: PALETTE.gold }}>
          {countInView ? <CountUp end={totalFotos} duration={2} /> : 0}
          <span style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginLeft: 10 }}>
            registros de uma trajetória
          </span>
        </div>
      </div>
    </section>
  );
}

function CategoryFilter({ categories, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
      {categories.map(cat => {
        const isActive = cat === active;
        const color = cat === 'Todas' ? PALETTE.gold : CATEGORIA_COR[cat];
        return (
          <motion.button key={cat} onClick={() => onChange(cat)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ position: 'relative', padding: '10px 20px', borderRadius: 999, border: `1px solid ${isActive ? color : 'rgba(16,10,98,0.15)'}`, background: isActive ? 'transparent' : 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: isActive ? color : 'var(--navy)', overflow: 'hidden' }}>
            {isActive && (
              <motion.div layoutId="pillActiveBg" animate={{ opacity: [0.85, 1, 0.85] }} transition={{ opacity: { duration: 2, repeat: Infinity }, layout: { type: 'spring', stiffness: 380, damping: 32 } }}
                style={{ position: 'absolute', inset: 0, background: `${color}1f`, boxShadow: `0 0 18px ${color}55`, zIndex: 0 }} />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function ShimmerSkeleton({ color }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `${color}18` }}>
      <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: 0, bottom: 0, width: '60%', background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }} />
    </div>
  );
}

function TiltCard({ foto, index, onOpen }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 15, mass: 0.4 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 15, mass: 0.4 });
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlightBg = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, ${foto.cor}45, transparent 60%)`;
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const aspect = ASPECTS[foto.id % ASPECTS.length];

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    spotX.set(px * 100);
    spotY.set(py * 100);
  }
  function handleLeave() {
    x.set(0); y.set(0); setHover(false);
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 36, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.86 }}
      transition={{ duration: 0.5, delay: (index % 12) * 0.045, ease: [0.22, 1, 0.36, 1] }}
      style={{ breakInside: 'avoid', marginBottom: 20 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleLeave}
        onClick={onOpen}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{ rotateX, rotateY, transformPerspective: 900, cursor: 'pointer', position: 'relative', borderRadius: 16 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, borderRadius: 16, overflow: 'hidden', boxShadow: hover ? `0 22px 46px ${foto.cor}4d` : '0 6px 20px rgba(16,10,98,0.1)', transition: 'box-shadow 0.35s ease' }}>
          {!loaded && <ShimmerSkeleton color={foto.cor} />}
          <motion.img
            layoutId={`photo-${foto.id}`}
            src={foto.src} alt={foto.legenda} loading="lazy" onLoad={() => setLoaded(true)}
            animate={{ opacity: loaded ? 1 : 0, filter: loaded ? 'blur(0px)' : 'blur(20px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: spotlightBg, opacity: hover ? 1 : 0, transition: 'opacity 0.3s' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: hover ? 1 : 0, transition: 'opacity 0.3s', background: `linear-gradient(to top, ${foto.cor}e6, transparent 55%)`, display: 'flex', alignItems: 'flex-end', padding: '16px 14px' }}>
            <div>
              <div style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4, opacity: 0.85 }}>{foto.categoria}</div>
              <div style={{ color: '#fff', fontSize: 12.5 }}>{foto.legenda}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Lightbox({ current, index, total, direction, onClose, onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,27,76,0.94)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5vh 5vw' }}>

      <motion.button onClick={(e) => { e.stopPropagation(); onClose(); }} whileHover={{ scale: 1.1 }}
        style={{ position: 'absolute', top: 24, right: 24, width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ✕
      </motion.button>

      <motion.button onClick={(e) => { e.stopPropagation(); onPrev(); }} whileHover={{ scale: 1.15, x: -2 }}
        style={{ position: 'absolute', left: 'clamp(8px, 3vw, 32px)', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 26, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ‹
      </motion.button>
      <motion.button onClick={(e) => { e.stopPropagation(); onNext(); }} whileHover={{ scale: 1.15, x: 2 }}
        style={{ position: 'absolute', right: 'clamp(8px, 3vw, 32px)', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 26, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ›
      </motion.button>

      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '88vw', maxHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', maxWidth: '88vw', maxHeight: '72vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.img
              key={current.id}
              layoutId={`photo-${current.id}`}
              src={current.src} alt={current.legenda}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: '88vw', maxHeight: '72vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 30px 90px rgba(0,0,0,0.55)', display: 'block' }} />
          </AnimatePresence>
        </div>
        <motion.div key={`cap-${current.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          style={{ textAlign: 'center', marginTop: 20 }}>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginBottom: 6 }}>{index + 1} / {total}</div>
          <div style={{ color: '#fff', fontSize: 15, marginBottom: 4 }}>{current.legenda}</div>
          <div style={{ color: current.cor, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{current.categoria}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Galeria() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setVisibleCount(12); }, [activeCategory]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const filteredFotos = useMemo(
    () => (activeCategory === 'Todas' ? fotos : fotos.filter(f => f.categoria === activeCategory)),
    [activeCategory]
  );
  const visibleFotos = filteredFotos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFotos.length;

  function openLightbox(foto) {
    const idx = filteredFotos.findIndex(f => f.id === foto.id);
    setDirection(0);
    setLightboxIndex(idx);
  }
  function closeLightbox() { setLightboxIndex(null); }
  function next() { setDirection(1); setLightboxIndex(i => (i + 1) % filteredFotos.length); }
  function prev() { setDirection(-1); setLightboxIndex(i => (i - 1 + filteredFotos.length) % filteredFotos.length); }

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filteredFotos.length]);

  const current = lightboxIndex !== null ? filteredFotos[lightboxIndex] : null;
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <div style={{ background: PALETTE.creamBlue, position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', opacity: 0.03, backgroundImage: `url("${noiseDataUri}")` }} />

      <Navbar />
      <GaleriaHeader scrollY={scrollY} totalFotos={fotos.length} isMobile={isMobile} />

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 1rem 80px' : '64px clamp(1rem,4vw,3rem) 100px' }}>
        <CategoryFilter categories={['Todas', ...CATEGORIAS]} active={activeCategory} onChange={setActiveCategory} />

        <div style={{ columnCount: cols, columnGap: 20, marginTop: 40 }}>
          <AnimatePresence mode="popLayout">
            {visibleFotos.map((foto, i) => (
              <TiltCard key={foto.id} foto={foto} index={i} onOpen={() => openLightbox(foto)} />
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: `0 8px 30px ${PALETTE.gold}66` }} whileTap={{ scale: 0.96 }}
              onClick={() => setVisibleCount(v => v + 12)}
              style={{ background: PALETTE.gold, color: PALETTE.navy, border: 'none', padding: '14px 34px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Carregar mais fotos
            </motion.button>
          </div>
        )}
      </section>

      <Footer />

      <AnimatePresence>
        {current && (
          <Lightbox current={current} index={lightboxIndex} total={filteredFotos.length} direction={direction}
            onClose={closeLightbox} onNext={next} onPrev={prev} />
        )}
      </AnimatePresence>
    </div>
  );
}
