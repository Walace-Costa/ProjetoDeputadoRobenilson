import { motion } from 'framer-motion';
export default function Footer() {
  return (
    <footer style={{ background: '#050b14', borderTop: '1px solid rgba(230,59,46,0.15)', padding: '56px clamp(1rem,4vw,3rem) 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: 'linear-gradient(135deg,var(--red),var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--serif)', color: '#fff', fontWeight: 700, fontSize: 17 }}>RT</span>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Dr. Robenilson Torres</div>
                <div style={{ fontSize: 10, letterSpacing: '0.1em', background: 'linear-gradient(90deg,var(--red),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Deputado Estadual · Bahia 2026</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.7 }}>Defensor dos direitos da infância. Presidente da ACTEBA. Candidato a Deputado Estadual para levar essa luta à ALBA.</p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {[{ titulo: 'Candidatura', items: ['História', 'Propostas', 'Apoiar'] }, { titulo: 'Atuação', items: ['ACTEBA', 'OAB Itabuna', 'Conselho Tutelar'] }, { titulo: 'Contato', items: ['WhatsApp', 'Instagram', 'E-mail'] }].map(col => (
              <div key={col.titulo}>
                <div style={{ color: 'var(--red)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{col.titulo}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.items.map(item => (
                    <motion.a key={item} href="#" whileHover={{ x: 4, color: '#fff' }} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}>{item}</motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>© 2026 Dr. Robenilson Torres · OAB/BA · Presidente ACTEBA</div>
          <div style={{ background: 'rgba(230,59,46,0.1)', border: '1px solid rgba(230,59,46,0.2)', borderRadius: 6, padding: '4px 12px', color: 'rgba(230,59,46,0.7)', fontSize: 11, fontWeight: 500 }}>Material de divulgação eleitoral</div>
        </div>
      </div>
    </footer>
  );
}
