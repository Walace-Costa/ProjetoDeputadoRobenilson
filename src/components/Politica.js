import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';
const propostas = [
  { area: 'Infância & Adolescência', titulo: 'Rede municipal de proteção integral', desc: 'Criar uma rede integrada de serviços para crianças e adolescentes em situação de vulnerabilidade, unindo saúde, educação e assistência social.', tag: 'PL', color: '#db002c' },
  { area: 'Transparência', titulo: 'Câmara aberta e transmitida ao vivo', desc: 'Transmissão em tempo real de todas as sessões e divulgação mensal detalhada de gastos do mandato. O cidadão tem direito de saber.', tag: 'Fiscal.', color: '#100a62' },
  { area: 'Conselho Tutelar', titulo: 'Valorização dos conselheiros tutelares', desc: 'Garantir condições dignas de trabalho, formação continuada e reconhecimento institucional para os conselheiros tutelares do município.', tag: 'PL', color: '#176939' },
  { area: 'Políticas Públicas', titulo: 'Plano Municipal da Primeira Infância', desc: 'Elaborar e implementar um plano integrado de políticas públicas para crianças de 0 a 6 anos, alinhado ao Plano Nacional (PNIPI) do MEC.', tag: 'PL', color: '#db002c' },
  { area: 'Educação', titulo: 'Educação em direitos nas escolas', desc: 'Incluir conteúdo sobre direitos da criança e do adolescente (ECA) nas escolas públicas municipais, desde o ensino fundamental.', tag: 'PL', color: '#100a62' },
  { area: 'Fiscalização', titulo: 'Controle de contratos com o município', desc: 'Fiscalizar ativamente contratos públicos e denunciar irregularidades — usando o conhecimento jurídico para proteger o dinheiro público.', tag: 'Fiscal.', color: '#176939' },
];
export default function Politica() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const isMobile = useMediaQuery('(max-width: 860px)');
  const isTablet = useMediaQuery('(max-width: 640px)');
  return (
    <section id="politica" ref={ref} style={{ background: 'var(--bg)', padding: '100px clamp(1rem,4vw,3rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(219,0,44,0.08)', border: '1px solid rgba(219,0,44,0.2)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} />
              <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Plataforma política</span>
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,2.6rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 20 }}>Propostas com raiz na realidade</h2>
            <p style={{ color: 'rgba(16,10,98,0.6)', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>Não são promessas de palanque. São projetos baseados em experiência real com políticas públicas e defesa dos direitos de crianças.</p>
            {/* Avatar decorativo */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <img src="/avatar-casual.jpg" alt="" style={{ width: 120, height: 150, objectFit: 'cover', objectPosition: 'top', borderRadius: 16, border: '2px solid rgba(219,0,44,0.3)', boxShadow: '0 8px 32px rgba(219,0,44,0.15)', display: 'block', marginBottom: 24 }} />
            </motion.div>
            <div style={{ background: 'rgba(219,0,44,0.06)', border: '1px solid rgba(219,0,44,0.2)', borderRadius: 12, padding: '20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>🔒</span>
              <div><div style={{ color: 'var(--navy)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Mandato transparente</div><div style={{ color: 'rgba(16,10,98,0.55)', fontSize: 13, lineHeight: 1.6 }}>Todo real do mandato publicado mensalmente com nota fiscal.</div></div>
            </div>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: 16 }}>
            {propostas.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4, borderColor: p.color }}
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '24px 20px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: p.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.area}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: `${p.color}22`, color: p.color }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.35 }}>{p.titulo}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.65 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
