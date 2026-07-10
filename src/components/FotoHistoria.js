import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';

const momentos = [
  { titulo: 'Da militância estudantil à presidência da ACTEBA', texto: 'Advogado formado pela UESC, Robenilson Torres começou na militância estudantil como representante do DCE, sempre ao lado da luta pelos direitos da infância no sul da Bahia. Anos depois, à frente da ACTEBA, levou a maior delegação estadual do país — 60 representantes baianos — ao Congresso Nacional em Brasília.', ano: '2000s–2025', accent: '#db002c', fotoReal: '/foto-discurso.png', avatar: '/avatar-terno.jpg' },
  { titulo: 'Referência nacional, rumo à ALBA', texto: 'Convidado pelo Ministério da Educação para o 1º Seminário Nacional de Políticas para a Primeira Infância, no TCU em Brasília, consolidou-se como uma das maiores autoridades da Bahia na defesa da infância. Agora, a convite do pré-candidato ao Senado Carlos Sodré, leva essa luta para dentro da ALBA como pré-candidato a Deputado Estadual.', ano: '2026', accent: '#100a62', fotoReal: '/foto-campanha.png', avatar: '/avatar-casual.jpg' },
];

function FotoToggle({ fotoReal, avatar, accent }) {
  const [showAvatar, setShowAvatar] = useState(false);
  const isMobile = useMediaQuery('(max-width: 860px)');
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', minHeight: isMobile ? 280 : 340, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <AnimatePresence mode="wait">
        <motion.img key={showAvatar?'av':'real'} src={showAvatar?avatar:fotoReal} alt="Robenilson Torres"
          initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
          transition={{ duration:0.35 }}
          style={{ position:'absolute', maxHeight:400, maxWidth:'80%', objectFit:'contain', objectPosition:'top', borderRadius:16, border:`2px solid ${accent}44`, boxShadow:`0 0 40px ${accent}20` }} />
      </AnimatePresence>
      <motion.button whileHover={{ scale:1.08 }} whileTap={{ scale:0.95 }} onClick={() => setShowAvatar(v=>!v)}
        style={{ position:'absolute', bottom:20, right:20, zIndex:10, background:showAvatar?'rgba(247,242,230,0.88)':`${accent}cc`, border:`1px solid ${accent}55`, borderRadius:10, padding:'9px 15px', color:showAvatar?'var(--navy)':'#fff', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:7, backdropFilter:'blur(8px)' }}>
        <span>{showAvatar?'📸':'🎨'}</span>{showAvatar?'Foto real':'Ver cartoon'}
      </motion.button>
    </div>
  );
}

function Card({ m, i }) {
  const { ref, inView } = useInView({ threshold:0.15, triggerOnce:true });
  const isMobile = useMediaQuery('(max-width: 860px)');
  const isEven = !isMobile && i % 2 === 0;
  const imgOrder = isMobile ? 0 : (isEven ? 0 : 1);
  const textOrder = isMobile ? 1 : (isEven ? 1 : 0);
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:60 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
      style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? undefined : 340 }}>
      <div style={{ order:imgOrder, background:'var(--cream)', position:'relative', overflow:'hidden', minHeight: isMobile ? 280 : 340 }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${m.accent}0c 1px,transparent 1px),linear-gradient(90deg,${m.accent}0c 1px,transparent 1px)`, backgroundSize:'40px 40px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at center,${m.accent}12 0%,transparent 65%)`, pointerEvents:'none' }} />
        <FotoToggle fotoReal={m.fotoReal} avatar={m.avatar} accent={m.accent} />
        <div style={{ position:'absolute', bottom:12, [isEven?'right':'left']:16, fontFamily:'var(--serif)', fontSize:80, fontWeight:700, color:'rgba(16,10,98,0.05)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{m.ano}</div>
        <div style={{ position:'absolute', top:0, bottom:0, [isEven?'right':'left']:0, width:3, background:`linear-gradient(to bottom,transparent,${m.accent},transparent)` }} />
      </div>
      <motion.div initial={{ opacity:0, x:isEven?40:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.2 }}
        style={{ order:textOrder, background:'var(--bg)', display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(2rem,5vw,5rem)', borderBottom:'1px solid rgba(16,10,98,0.07)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <div style={{ height:2, width:40, background:m.accent, borderRadius:1 }} />
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:m.accent }}>{m.ano}</span>
        </div>
        <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,2.4rem)', fontWeight:700, color:'var(--navy)', lineHeight:1.2, marginBottom:20 }}>{m.titulo}</h3>
        <p style={{ color:'rgba(16,10,98,0.65)', fontSize:15, lineHeight:1.85 }}>{m.texto}</p>
        <div style={{ marginTop:28, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:12, color:'rgba(16,10,98,0.35)' }}>↩ Clique em "Ver cartoon" para alternar</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FotoHistoria() {
  return (
    <section id="foto-historia" style={{ background:'var(--dark)' }}>
      <div style={{ background:'var(--cream)', padding:'80px clamp(1rem,4vw,3rem) 72px', textAlign:'center', borderBottom:'1px solid rgba(219,0,44,0.15)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 20px rgba(16,10,98,0.04)' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(219,0,44,0.1)', border:'1px solid rgba(219,0,44,0.25)', borderRadius:999, padding:'5px 14px', marginBottom:20 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--red)' }} />
          <span style={{ color:'var(--red)', fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>A história dele</span>
        </div>
        <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'var(--navy)', lineHeight:1.2, maxWidth:600, margin:'0 auto' }}>
          Uma trajetória construída com propósito
        </h2>
      </div>
      {momentos.map((m,i) => <Card key={i} m={m} i={i} />)}
    </section>
  );
}
