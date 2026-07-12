import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { topicos } from '../data/biografia';

function FotoComPlaceholder({ src, alt, accent, filename }) {
  const [erro, setErro] = useState(false);
  return (
    <div style={{
      width: '100%', height: '100%', minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: erro ? `${accent}14` : `${accent}0d`,
      border: erro ? `2px dashed ${accent}55` : 'none',
      borderRadius: 20,
    }}>
      {erro ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '0 24px' }}>
          <span style={{ fontSize: 40, opacity: 0.45 }}>🖼️</span>
          <span style={{ fontSize: 12, color: 'rgba(16,10,98,0.42)', textAlign: 'center' }}>Foto: {filename}</span>
        </div>
      ) : (
        <img src={src} alt={alt} onError={() => setErro(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      )}
    </div>
  );
}

function TopicBlock({ topico, index, onActive, isMobile }) {
  const { ref, inView } = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inView && onActive) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} style={{
      minHeight: isMobile ? undefined : '65vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: isMobile ? '22px 0 34px' : 'clamp(1.2rem,3.5vw,2.2rem) clamp(1rem,3vw,2.5rem)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <span style={{ fontSize: 30 }}>{topico.emoji}</span>
        <div style={{ height: 2, width: 48, background: topico.accent, borderRadius: 1 }} />
      </div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.25, marginBottom: 18 }}>
        {topico.titulo}
      </h3>
      {topico.resumo.map((p, pi) => (
        <p key={pi} style={{ color: 'rgba(16,10,98,0.68)', fontSize: 15, lineHeight: 1.8, marginBottom: 16, textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto' }}>{p}</p>
      ))}
    </div>
  );
}

function ColunaFoto({ topico, active }) {
  return (
    <div style={{ position: 'sticky', top: 100, height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', gap: 18, padding: '20px 0' }}>
      <div style={{ position: 'relative', flex: 1, borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px rgba(16,10,98,0.14)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={topico.id}
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}>
            <FotoComPlaceholder src={topico.foto} alt={topico.titulo} accent={topico.accent} filename={topico.foto} />
          </motion.div>
        </AnimatePresence>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 20px 18px', background: `linear-gradient(to top, ${topico.accent}dd, transparent)`, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{topico.emoji}</span>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{topico.tituloCurto}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        {topicos.map((t, i) => (
          <div key={t.id} title={t.tituloCurto}
            style={{ width: i === active ? 26 : 8, height: 8, borderRadius: 4, background: i === active ? t.accent : 'rgba(16,10,98,0.15)', transition: 'all 0.35s ease' }} />
        ))}
      </div>
    </div>
  );
}

function HistoriaDesktop() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem,4vw,3rem)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,4rem)' }}>
      <div>
        {topicos.map((t, i) => (
          <TopicBlock key={t.id} topico={t} index={i} onActive={setActive} isMobile={false} />
        ))}
      </div>
      <ColunaFoto topico={topicos[active]} active={active} />
    </div>
  );
}

function HistoriaMobile() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 clamp(1rem,5vw,2rem)' }}>
      {topicos.map((t, i) => (
        <div key={t.id} style={{ borderBottom: i < topicos.length - 1 ? '1px solid rgba(16,10,98,0.08)' : 'none' }}>
          <div style={{ height: 240, borderRadius: 20, overflow: 'hidden', marginTop: 32 }}>
            <FotoComPlaceholder src={t.foto} alt={t.titulo} accent={t.accent} filename={t.foto} />
          </div>
          <TopicBlock topico={t} index={i} isMobile={true} />
        </div>
      ))}
    </div>
  );
}

export default function FotoHistoria() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="foto-historia" style={{ background: 'var(--cream)' }}>
      <div style={{ background: 'var(--cream)', padding: '80px clamp(1rem,4vw,3rem) 72px', textAlign: 'center', borderBottom: '1px solid rgba(219,0,44,0.15)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 20px rgba(16,10,98,0.04)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(219,0,44,0.1)', border: '1px solid rgba(219,0,44,0.25)', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} />
          <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>A história dele</span>
        </div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, maxWidth: 600, margin: '0 auto' }}>
          Uma trajetória construída com propósito
        </h2>
      </div>
      {isMobile ? <HistoriaMobile /> : <HistoriaDesktop />}

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', padding: isMobile ? '8px clamp(1rem,5vw,2rem) 40px' : '8px clamp(1rem,4vw,3rem) 56px' }}>
        <Link to="/biografia"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--navy)', border: '1px solid rgba(16,10,98,0.25)', borderRadius: 8, padding: '13px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', background: 'rgba(16,10,98,0.04)' }}>
          Ler biografia completa →
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
        style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 clamp(1rem,5vw,2rem) 64px' : '0 clamp(1rem,4vw,3rem) 88px' }}>
        <div style={{ background: 'linear-gradient(120deg, var(--navy), #241E76)', borderRadius: 24, padding: isMobile ? '36px 24px' : '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', boxShadow: '0 24px 60px rgba(16,10,98,0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,222,0,0.15) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem,2.6vw,1.8rem)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              Quer ver mais da trajetória dele?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 420 }}>
              Uma galeria com dezenas de registros de bastidores, encontros e conquistas.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{ position: 'relative', zIndex: 1 }}>
            <Link to="/galeria"
              style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '15px 32px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 30px var(--gold-glow)', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              Ver galeria completa →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
