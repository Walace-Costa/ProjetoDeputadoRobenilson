import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      c: Math.random() > 0.5 ? 'rgba(230,59,46,' : 'rgba(26,86,219,',
      o: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.c}${p.o})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(230,59,46,${0.07*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />;
}

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);
  const isMobile = useMediaQuery('(max-width: 860px)');
  useEffect(() => {
    const fn = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section style={{ minHeight:'100vh', background:'var(--dark)', display:'flex', alignItems:'center', position:'relative', overflow:'hidden' }}>
      <Particles />
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(230,59,46,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(230,59,46,0.04) 1px,transparent 1px)', backgroundSize:'60px 60px', transform:`translateY(${offsetY*0.12}px)` }} />
      <div style={{ position:'absolute', top:'-10%', left:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(230,59,46,0.1) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(26,86,219,0.1) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', left:0, right:0, height:2, zIndex:1, pointerEvents:'none', background:'linear-gradient(90deg,transparent,rgba(230,59,46,0.3),transparent)', animation:'scanline 6s linear infinite' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', position:'relative', zIndex:2, padding:'120px clamp(1rem,4vw,3rem) 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
        <div>
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.2 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(230,59,46,0.4)', borderRadius:999, padding:'5px 14px', marginBottom:28, background:'rgba(230,59,46,0.08)' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--red)', animation:'pulseRed 2s infinite' }} />
            <span style={{ color:'var(--red)', fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>Pré-candidato a Deputado Estadual · Bahia 2026</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.4 }} style={{ position:'relative', marginBottom:24 }}>
            <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.4rem,5vw,3.8rem)', fontWeight:700, lineHeight:1.12, color:'#fff' }}>
              Defensor da infância,<br />
              <span style={{ background:'linear-gradient(90deg,var(--red),var(--gold),var(--red))', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'gradientShift 3s ease infinite' }}>
                advogado do povo,
              </span><br />
              <span style={{ color:'rgba(255,255,255,0.85)' }}>#BoraPraALBA</span>
            </h1>
          </motion.div>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.65 }}
            style={{ color:'rgba(255,255,255,0.58)', fontSize:16, lineHeight:1.85, maxWidth:420, marginBottom:40 }}>
            Advogado, presidente da ACTEBA e especialista em proteção da criança e do adolescente. Itabuna, Bahia. Agora candidato a Deputado Estadual pela ALBA para levar essa luta ao parlamento baiano.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.8 }} style={{ display:'flex', gap:14 }}>
            <motion.a href="#politica" whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}
              style={{ background:'linear-gradient(135deg,var(--red),#c0392b)', color:'#fff', padding:'14px 30px', borderRadius:8, fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 6px 30px var(--red-glow)', display:'inline-flex', alignItems:'center', gap:8 }}>
              Ver propostas
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>
            <motion.a href="#foto-historia" whileHover={{ scale:1.03 }}
              style={{ background:'transparent', color:'#fff', padding:'14px 28px', borderRadius:8, fontSize:14, textDecoration:'none', border:'1px solid rgba(255,255,255,0.15)' }}>
              Conhecer a história
            </motion.a>
          </motion.div>
        </div>

        {/* Foto real no cartão */}
        <motion.div initial={{ opacity:0, x:50, scale:0.95 }} animate={{ opacity:1, x:0, scale:1 }} transition={{ duration:0.9, delay:0.5 }} style={{ display:'flex', justifyContent:'center' }}>
          <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
            style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(230,59,46,0.25)', borderRadius:24, padding:'32px 28px', textAlign:'center', width:'100%', maxWidth:320, backdropFilter:'blur(12px)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', width:280, height:280, marginLeft:-140, marginTop:-140, borderRadius:'50%', border:'1px solid transparent', borderTopColor:'rgba(230,59,46,0.2)', borderRightColor:'rgba(26,86,219,0.2)', animation:'rotateRing 8s linear infinite', pointerEvents:'none' }} />

            {/* Foto real terno verde */}
            <div style={{ width:160, height:190, borderRadius:14, margin:'0 auto 20px', overflow:'hidden', border:'2px solid rgba(230,59,46,0.4)', position:'relative' }}>
              <img src="/foto-terno-verde.png" alt="Robenilson Torres" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />
            </div>

            <div style={{ color:'#fff', fontSize:18, fontWeight:700, marginBottom:4, fontFamily:'var(--serif)' }}>Robenilson Torres</div>
            <div style={{ fontSize:11, letterSpacing:'0.08em', marginBottom:4, background:'linear-gradient(90deg,var(--red),var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>OAB/BA · Presidente ACTEBA</div>
            <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11, marginBottom:20 }}>Itabuna, Bahia</div>

            <div style={{ background:'rgba(230,59,46,0.1)', border:'1px solid rgba(230,59,46,0.25)', borderRadius:10, padding:'14px 0', marginBottom:20 }}>
              <div style={{ color:'rgba(255,255,255,0.3)', fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:8 }}>Número nas urnas</div>
              <div style={{ fontFamily:'var(--serif)', fontSize:44, fontWeight:700, letterSpacing:8, background:'linear-gradient(90deg,var(--red),var(--gold),var(--red))', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'gradientShift 3s ease infinite' }}>XXXX</div>
            </div>

            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(230,59,46,0.15)', border:'1px solid rgba(230,59,46,0.3)', borderRadius:999, padding:'6px 14px' }}>
              <span style={{ color:'var(--red)', fontSize:12, fontWeight:700 }}>#BoraPraALBA</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:0.6 }} transition={{ delay:1.5 }}
        style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:24, height:40, border:'1px solid rgba(230,59,46,0.3)', borderRadius:12, display:'flex', justifyContent:'center', paddingTop:6 }}>
          <motion.div animate={{ y:[0,14,0], opacity:[1,0,1] }} transition={{ duration:1.8, repeat:Infinity }}
            style={{ width:3, height:8, background:'var(--red)', borderRadius:2 }} />
        </div>
      </motion.div>
    </section>
  );
}
