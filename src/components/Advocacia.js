import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';
const areas = [
  { icon: '👶', area: 'Proteção da Infância', desc: 'Especialista em Proteção Integral da Criança e do Adolescente. Presidente da Comissão da OAB Itabuna dedicada à defesa dos direitos de crianças e adolescentes.', num: '15+', color: '#db002c', glow: 'rgba(219,0,44,0.2)' },
  { icon: '⚖️', area: 'Advocacia e Cidadania', desc: 'Formado em Direito com atuação voltada para as causas sociais. Combina o conhecimento jurídico com a militância ativa em políticas públicas para a primeira infância.', num: 'OAB/BA', color: '#100a62', glow: 'rgba(16,10,98,0.15)' },
  { icon: '🏛️', area: 'Políticas Públicas', desc: 'Representante da Bahia no 1º Seminário Nacional de Políticas Públicas para a Primeira Infância do MEC. Integrante do Fórum Colegiado Nacional de Conselheiros Tutelares.', num: 'MEC', color: '#176939', glow: 'rgba(23,105,57,0.2)' },
];
export default function Advocacia() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 960px)');
  return (
    <section id="advocacia" ref={ref} style={{ background: 'var(--bg)', padding: '100px clamp(1rem,4vw,3rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ maxWidth: 600, marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(219,0,44,0.08)', border: '1px solid rgba(219,0,44,0.2)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} />
            <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Atuação profissional</span>
          </div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 16 }}>
            Uma vida dedicada à proteção dos mais vulneráveis
          </h2>
          <p style={{ color: 'rgba(16,10,98,0.6)', fontSize: 15, lineHeight: 1.8 }}>
            Professor, conselheiro tutelar, gestor social, advogado e presidente da ACTEBA. Cada cargo ocupado com o mesmo propósito: garantir direitos a quem mais precisa.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 24 }}>
          {areas.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -8, boxShadow: `0 20px 60px ${a.glow}` }}
              style={{ background: 'var(--cream)', border: '1px solid rgba(16,10,98,0.08)', borderRadius: 16, padding: '36px 28px', cursor: 'default', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${a.color},transparent)` }} />
              <div style={{ fontSize: 36, marginBottom: 20 }}>{a.icon}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 700, color: a.color, lineHeight: 1, marginBottom: 8 }}>{a.num}</div>
              <h3 style={{ color: 'var(--navy)', fontSize: 18, fontWeight: 600, marginBottom: 12, fontFamily: 'var(--serif)' }}>{a.area}</h3>
              <p style={{ color: 'rgba(16,10,98,0.6)', fontSize: 14, lineHeight: 1.7 }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
