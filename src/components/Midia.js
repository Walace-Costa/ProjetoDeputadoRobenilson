import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Adicione novas matérias aqui
const materias = [
  {
    veiculo: 'Blog do Erê',
    logo: '📰',
    titulo: 'Advogado baiano Robenilson Torres representa a Bahia em seminário nacional do MEC sobre políticas para a primeira infância',
    resumo: 'Convidado pelo Ministério da Educação, Robenilson Torres participou do 1º Seminário Nacional de Políticas Públicas para a Primeira Infância, realizado em Brasília no Auditório do TCU.',
    data: '21 de junho de 2026',
    url: 'https://blogdoere.com.br/?p=29484',
    destaque: true,
    tag: 'Destaque nacional',
    tagColor: '#db002c',
    img: 'https://blogdoere.com.br/wp-content/uploads/2026/02/1000227070.jpg',
  },
  {
    veiculo: 'Blog do Erê',
    logo: '📰',
    titulo: 'Robenilson Torres protocola proposta para valorização dos Conselheiros Tutelares na Bahia',
    resumo: 'O presidente da ACTEBA entrou com proposta formal para garantir melhores condições de trabalho e reconhecimento institucional dos conselheiros tutelares no estado.',
    data: 'Julho de 2026',
    url: 'https://blogdoere.com.br/?p=29527',
    destaque: false,
    tag: 'Política pública',
    tagColor: '#100a62',
    img: 'https://blogdoere.com.br/wp-content/uploads/2026/07/1000055564-150x150.jpg',
  },
  {
    veiculo: 'A adicionar',
    logo: '📄',
    titulo: 'Adicione aqui a próxima matéria sobre o candidato',
    resumo: 'Cole o link de uma nova matéria sobre Dr. Robenilson Torres neste espaço. Basta atualizar o arquivo Midia.js com o título, resumo, veículo e URL.',
    data: '2026',
    url: '#',
    destaque: false,
    tag: 'Em breve',
    tagColor: '#F5A623',
    img: null,
  },
];

function CardDestaque({ m }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const isMobile = useMediaQuery('(max-width: 760px)');
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: 0, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(230,59,46,0.3)', background: 'rgba(230,59,46,0.04)' }}>

      {/* Imagem */}
      <div style={{ position: 'relative', minHeight: isMobile ? 200 : 280, background: '#0a1020', overflow: 'hidden' }}>
        {m.img && (
          <img src={m.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, position: 'absolute', inset: 0 }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 40%, #080e1a)' }} />
        <div style={{ position: 'absolute', top: 20, left: 20 }}>
          <div style={{ background: 'var(--red)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.tag}</div>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: '36px 36px 36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>{m.logo}</span>
          <span style={{ color: 'var(--red)', fontSize: 13, fontWeight: 600 }}>{m.veiculo}</span>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{m.data}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem,2vw,1.7rem)', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{m.titulo}</h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.75 }}>{m.resumo}</p>
        <motion.a href={m.url} target="_blank" rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--red)', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginTop: 4 }}>
          Ler matéria completa
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

function CardNormal({ m, i }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      whileHover={{ y: -6, borderColor: m.tagColor }}
      style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s', position: 'relative' }}>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${m.tagColor},transparent)` }} />

      {/* Imagem topo */}
      {m.img && (
        <div style={{ height: 140, overflow: 'hidden', background: '#0a1020' }}>
          <img src={m.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
        </div>
      )}

      <div style={{ padding: '22px 22px 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>{m.logo}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{m.veiculo}</span>
          </div>
          <span style={{ background: `${m.tagColor}22`, color: m.tagColor, fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999 }}>{m.tag}</span>
        </div>
        <h4 style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.35, flex: 1 }}>{m.titulo}</h4>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.65 }}>{m.resumo}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>{m.data}</span>
          {m.url !== '#' && (
            <motion.a href={m.url} target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }}
              style={{ color: m.tagColor, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              Ler
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Midia() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const isMobile = useMediaQuery('(max-width: 760px)');
  const destaque = materias.filter(m => m.destaque);
  const normais = materias.filter(m => !m.destaque);

  return (
    <section id="midia" ref={ref} style={{ background: 'linear-gradient(180deg,#080e1a,#0a1220)', padding: '100px clamp(1rem,4vw,3rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(230,59,46,0.08)', border: '1px solid rgba(230,59,46,0.2)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} />
              <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Na mídia</span>
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              O que a imprensa<br />diz sobre ele
            </h2>
          </div>
          {/* Avatar decorativo */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <img src="/avatar-terno.jpg" alt="Avatar Dr. Robenilson" style={{ width: 100, height: 120, objectFit: 'cover', objectPosition: 'top', borderRadius: 16, border: '2px solid rgba(230,59,46,0.3)', boxShadow: '0 8px 32px rgba(230,59,46,0.2)' }} />
          </motion.div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 20 }}>
          {destaque.map((m, i) => <CardDestaque key={i} m={m} />)}
          {normais.map((m, i) => <CardNormal key={i} m={m} i={i} />)}
        </div>

        {/* Aviso para adicionar matérias */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ marginTop: 32, padding: '16px 20px', background: 'rgba(245,166,35,0.06)', border: '1px dashed rgba(245,166,35,0.25)', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <div>
            <div style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Como adicionar novas matérias</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6 }}>
              Abra o arquivo <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: 4 }}>src/components/Midia.js</code> e adicione um novo objeto no array <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: 4 }}>materias</code> com título, URL, veículo e data.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
