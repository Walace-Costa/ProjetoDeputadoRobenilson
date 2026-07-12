import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import Particles from './Particles';

const LINK_GRUPO_WHATSAPP = "https://chat.whatsapp.com/GUfcNuF8IHBEvKTGyXOV7C?s=sw&p=a&ilr=0&amv=0";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);
  const isMobile = useMediaQuery('(max-width: 860px)');
  useEffect(() => {
    const fn = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section style={{ minHeight:'100vh', background:'#EEF1FA', display:'flex', alignItems:'center', position:'relative', overflow:'hidden' }}>
      <Particles />
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(15,27,76,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(15,27,76,0.06) 1px,transparent 1px)', backgroundSize:'60px 60px', transform:`translateY(${offsetY*0.12}px)` }} />
      <div style={{ position:'absolute', top:'-10%', left:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(219,0,44,0.08) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,222,0,0.15) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', left:0, right:0, height:2, zIndex:1, pointerEvents:'none', background:'linear-gradient(90deg,transparent,rgba(219,0,44,0.3),transparent)', animation:'scanline 6s linear infinite' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', position:'relative', zIndex:2, padding: isMobile ? '110px clamp(1rem,4vw,3rem) 60px' : '120px clamp(1rem,4vw,3rem) 80px', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems:'center' }}>
        <div>
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.2 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(219,0,44,0.35)', borderRadius:999, padding:'5px 14px', marginBottom:28, background:'rgba(219,0,44,0.08)' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--red)', animation:'pulseRed 2s infinite' }} />
            <span style={{ color:'var(--red)', fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>Pré-candidato a Deputado Estadual · Bahia 2026</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.4 }} style={{ position:'relative', marginBottom:24 }}>
            <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.4rem,5vw,3.8rem)', fontWeight:700, lineHeight:1.12, color:'var(--navy)' }}>
              Defensor da infância,<br />
              <span style={{ background:'linear-gradient(90deg,#D4A017,#9C1F2E,#D4A017)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'gradientShift 3s ease infinite' }}>
                advogado do povo,
              </span><br />
              <span style={{ color:'rgba(16,10,98,0.85)' }}>#BoraPraALBA</span>
            </h1>
          </motion.div>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.65 }}
            style={{ color:'rgba(16,10,98,0.68)', fontSize:16, lineHeight:1.85, maxWidth:420, marginBottom:40 }}>
            Advogado, presidente da ACTEBA e especialista em proteção da criança e do adolescente. Itabuna, Bahia. Agora candidato a Deputado Estadual pelo PDT para levar essa luta ao parlamento baiano.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.8 }} style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <motion.a href="#politica" whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}
              style={{ background:'var(--gold)', color:'var(--navy)', padding:'14px 30px', borderRadius:8, fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 6px 30px var(--gold-glow)', display:'inline-flex', alignItems:'center', gap:8 }}>
              Ver propostas
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>
            <motion.a href="#foto-historia" whileHover={{ scale:1.03 }}
              style={{ background:'transparent', color:'var(--navy)', padding:'14px 28px', borderRadius:8, fontSize:14, textDecoration:'none', border:'1px solid rgba(16,10,98,0.25)' }}>
              Conhecer a história
            </motion.a>
          </motion.div>
        </div>

        {/* Foto real no cartão */}
        <motion.div initial={{ opacity:0, x:50, scale:0.95 }} animate={{ opacity:1, x:0, scale:1 }} transition={{ duration:0.9, delay:0.5 }} style={{ display:'flex', justifyContent:'center' }}>
          <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
            style={{ border:'1px solid rgba(15,27,76,0.1)', borderRadius:24, width:'100%', maxWidth:370, aspectRatio:'3/4', boxShadow:'0 20px 60px rgba(15,27,76,0.25), 0 4px 16px rgba(15,27,76,0.15)', position:'relative', overflow:'hidden' }}>
            <img src="/newProfile3.jpeg" alt="Robenilson Torres" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />

            <div style={{ position:'absolute', left:0, right:0, bottom:0, padding:'60px 24px 22px', background:'linear-gradient(to top, rgba(10,8,40,0.88) 0%, rgba(10,8,40,0.55) 55%, transparent 100%)' }}>
              <div style={{ color:'#FFFFFF', fontSize:19, fontWeight:700, marginBottom:12, fontFamily:'var(--serif)', textShadow:'0 2px 8px rgba(0,0,0,0.4)' }}>Robenilson Torres</div>
              <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,222,0,0.18)', border:'1px solid rgba(255,222,0,0.4)', borderRadius:999, padding:'6px 14px' }}>
                  <span style={{ color:'var(--gold)', fontSize:12, fontWeight:700 }}>#BoraPraALBA</span>
                </div>
                <motion.a href={LINK_GRUPO_WHATSAPP} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
                  style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(37,211,102,0.9)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:999, padding:'6px 12px', textDecoration:'none' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.42-.71-2.9-1.15-4.75-4.13-4.9-4.32-.14-.2-1.17-1.56-1.17-2.97 0-1.42.74-2.11 1.01-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.29.75 1.24 1.61 2.01 1.11 1 2.04 1.31 2.34 1.46.29.15.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.68-.17 1.36z"/></svg>
                  <span style={{ color:'#fff', fontSize:11, fontWeight:700 }}>Entrar no grupo</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:0.6 }} transition={{ delay:1.5 }}
        style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:24, height:40, border:'1px solid rgba(16,10,98,0.25)', borderRadius:12, display:'flex', justifyContent:'center', paddingTop:6 }}>
          <motion.div animate={{ y:[0,14,0], opacity:[1,0,1] }} transition={{ duration:1.8, repeat:Infinity }}
            style={{ width:3, height:8, background:'var(--red)', borderRadius:2 }} />
        </div>
      </motion.div>
    </section>
  );
}
