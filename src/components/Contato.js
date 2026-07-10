import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const WHATSAPP_LINK = 'https://whatsapp.com/channel/0029Vb8mWUh42Dcil6tpiL29';
const INSTAGRAM_LINK = 'https://instagram.com/robenilson.torres.adv';

function WhatsappIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.72.45 3.39 1.3 4.86L2 22l5.36-1.4a9.9 9.9 0 0 0 4.68 1.19h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.02h-.01a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.09.81.82-3.01-.19-.31a8.13 8.13 0 0 1-1.24-4.3c0-4.49 3.66-8.14 8.16-8.14 2.18 0 4.22.85 5.76 2.39a8.08 8.08 0 0 1 2.39 5.76c0 4.49-3.66 8.14-8.16 8.14Zm4.47-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function Contato() {
  const [form, setForm] = useState({ nome: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const enviarWhatsapp = () => {
    if (!form.nome || !form.mensagem) return;
    const texto = `Olá, meu nome é ${form.nome}.\n\n${form.mensagem}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
    setEnviado(true);
  };

  return (
    <section id="contato" ref={ref} style={{ background: '#080e1a', padding: '100px clamp(1rem,4vw,3rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(230,59,46,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(230,59,46,0.08)', border: '1px solid rgba(230,59,46,0.2)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', animation: 'pulseRed 2s infinite' }} />
              <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Participe</span>
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>Faça parte dessa mudança</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>Cada apoio conta. Compartilhe, indique e converse com seus vizinhos sobre o trabalho do Dr. Robenilson.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { Icon: WhatsappIcon, label: 'WhatsApp', val: 'Entre no canal oficial', color: '#25D366', href: WHATSAPP_LINK },
                { Icon: InstagramIcon, label: 'Instagram', val: '@robenilson.torres.adv', color: '#E1306C', href: INSTAGRAM_LINK },
                { Icon: MailIcon, label: 'E-mail', val: 'contato@robenilsontorres.com.br', color: '#1A56DB', href: 'mailto:contato@robenilsontorres.com.br' },
              ].map(c => (
                <motion.a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" whileHover={{ x: 6, borderColor: c.color }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, cursor: 'pointer', transition: 'border-color 0.2s', background: 'rgba(255,255,255,0.02)', textDecoration: 'none' }}>
                  <c.Icon width={22} height={22} style={{ color: c.color, flexShrink: 0 }} />
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>{c.label}</div><div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{c.val}</div></div>
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '40px 36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,var(--red),var(--blue))' }} />
            {enviado ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckIcon width={48} height={48} style={{ color: '#25D366', marginBottom: 16 }} />
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, color: '#fff', marginBottom: 12 }}>Quase lá!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Abrimos o WhatsApp com sua mensagem pronta. É só confirmar o envio por lá.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, color: '#fff', marginBottom: 28 }}>Deixe sua mensagem</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[{ id: 'nome', label: 'Seu nome', type: 'text', ph: 'João da Silva' }].map(f => (
                    <div key={f.id}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph} required value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 14, background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none', fontFamily: 'var(--sans)' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Mensagem</label>
                    <textarea placeholder="Escreva sua mensagem..." required rows={4} value={form.mensagem} onChange={e => setForm({ ...form, mensagem: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 14, background: 'rgba(255,255,255,0.05)', color: '#fff', resize: 'vertical', outline: 'none', fontFamily: 'var(--sans)' }} />
                  </div>
                  <motion.button onClick={enviarWhatsapp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ background: 'linear-gradient(135deg,var(--red),#c0392b)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 30px var(--red-glow)', marginTop: 4 }}>
                    Enviar mensagem pelo WhatsApp
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
