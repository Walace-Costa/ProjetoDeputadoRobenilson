import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
const items = [
  { num:15, suffix:'+', label:'Anos de atuação social', color:'#E63B2E' },
  { num:60, suffix:'', label:'Delegados baianos em Brasília', color:'#10B959' },
  { num:100, suffix:'+', label:'Municípios capacitados na Bahia', color:'#F5A623' },
  { num:1, suffix:'º', label:'Seminário Nacional MEC 2026', color:'#1A56DB' },
];
export default function Stats() {
  const { ref, inView } = useInView({ threshold:0.3, triggerOnce:true });
  return (
    <section ref={ref} style={{ background:'linear-gradient(135deg,#0a1020,#0d1828)', borderTop:'1px solid rgba(230,59,46,0.15)', borderBottom:'1px solid rgba(26,86,219,0.15)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
        {items.map((item,i) => (
          <motion.div key={i} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:i*0.1 }}
            style={{ padding:'48px 28px', textAlign:'center', borderRight:i<3?'1px solid rgba(255,255,255,0.05)':'none', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at center,${item.color}0a 0%,transparent 70%)` }} />
            <div style={{ fontFamily:'var(--serif)', fontSize:48, fontWeight:700, color:item.color, lineHeight:1, marginBottom:10 }}>
              {inView?<CountUp end={item.num} duration={2} delay={i*0.1} suffix={item.suffix} />:`0${item.suffix}`}
            </div>
            <div style={{ color:'rgba(255,255,255,0.45)', fontSize:13 }}>{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
