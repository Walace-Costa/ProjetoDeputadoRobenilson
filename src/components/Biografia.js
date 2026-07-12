import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { topicosCompletos } from '../data/biografia';

// TEMPORÁRIO: link direto para WhatsApp pessoal. Substituir por link de vaquinha virtual quando disponível.
const LINK_APOIO = "https://wa.me/5573991985050?text=Ol%C3%A1%2C%20quero%20apoiar%20a%20campanha%20do%20Robenilson%20Torres%21";

export default function Biografia() {
  return (
    <div>
      <Navbar />
      <section style={{ background: 'var(--cream)', paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(1rem,5vw,2rem)' }}>
          <Link to="/#foto-historia"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--navy)', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 32 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Voltar
          </Link>

          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 48 }}>
            Biografia completa
          </h1>

          {topicosCompletos.map((t, i) => (
            <div key={t.id} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <span style={{ fontSize: 26 }}>{t.emoji}</span>
                <div style={{ height: 2, width: 40, background: t.accent, borderRadius: 1 }} />
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem,2.4vw,1.7rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3, marginBottom: 16 }}>
                {t.titulo}
              </h2>
              {t.completo.map((p, pi) => (
                <p key={pi} style={{ color: 'rgba(16,10,98,0.72)', fontSize: 16, lineHeight: 1.85, marginBottom: 16, textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div style={{ background: 'linear-gradient(120deg, var(--navy), #241E76)', borderRadius: 24, padding: '44px 36px', textAlign: 'center', boxShadow: '0 24px 60px rgba(16,10,98,0.25)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,222,0,0.15) 0%,transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem,2.6vw,1.8rem)', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
                Apoie essa campanha
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 26 }}>
                Sua contribuição ajuda a levar essa causa até a ALBA.
              </p>
              <a href={LINK_APOIO} target="_blank" rel="noopener noreferrer"
                style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '15px 32px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 30px var(--gold-glow)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Quero apoiar
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
