import { motion } from 'framer-motion';
export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,222,0,0.35)', padding: '56px clamp(1rem,4vw,3rem) 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.12)', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: 'linear-gradient(135deg,var(--red),var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--serif)', color: '#fff', fontWeight: 700, fontSize: 17 }}>RT</span>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Dr. Robenilson Torres</div>
                <div style={{ fontSize: 10, letterSpacing: '0.1em', background: 'linear-gradient(90deg,var(--red),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Deputado Estadual · Bahia 2026</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>Defensor dos direitos da infância. Presidente da ACTEBA. Candidato a Deputado Estadual para levar essa luta à ALBA.</p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {[
              { titulo: 'Candidatura', items: [{ label: 'História', href: '#foto-historia' }, { label: 'Propostas', href: '#politica' }, { label: 'Apoiar', href: '#contato' }] },
              { titulo: 'Atuação', items: [{ label: 'ACTEBA', href: '#advocacia' }, { label: 'OAB Itabuna', href: '#advocacia' }, { label: 'Conselho Tutelar', href: '#advocacia' }] },
              { titulo: 'Contato', items: [{ label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029Vb8mWUh42Dcil6tpiL29', external: true }, { label: 'Instagram', href: 'https://instagram.com/robenilson.torres.adv', external: true }, { label: 'E-mail', href: 'mailto:contato@robenilsontorres.com.br' }] },
            ].map(col => (
              <div key={col.titulo}>
                <div style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{col.titulo}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.items.map(item => (
                    <motion.a key={item.label} href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} whileHover={{ x: 4, color: '#fff' }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}>{item.label}</motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>© 2026 Dr. Robenilson Torres · OAB/BA · Presidente ACTEBA</div>
          <div style={{ background: 'rgba(255,222,0,0.15)', border: '1px solid rgba(255,222,0,0.35)', borderRadius: 6, padding: '4px 12px', color: 'var(--gold)', fontSize: 11, fontWeight: 600 }}>Material de divulgação eleitoral</div>
        </div>
      </div>
    </footer>
  );
}
