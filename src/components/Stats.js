import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
const items = [
  { num:15, suffix:'+', label:'Anos de atuação social', color:'#db002c' },
  { num:60, suffix:'', label:'Delegados baianos em Brasília', color:'#176939' },
  { num:100, suffix:'+', label:'Municípios capacitados na Bahia', color:'#100a62' },
  { num:1, suffix:'º', label:'Seminário Nacional MEC 2026', color:'#176939' },
];
export default function Stats() {
  const { ref, inView } = useInView({ threshold:0.3, triggerOnce:true });
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const cols = isMobile ? 1 : isTablet ? 2 : 4;
  return (
    <section ref={ref} style={{ background:'var(--cream)', borderTop:'1px solid rgba(219,0,44,0.15)', borderBottom:'1px solid rgba(16,10,98,0.12)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:`repeat(${cols},1fr)` }}>
        {items.map((item,i) => (
          <motion.div key={i} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:i*0.1 }}
            style={{ padding:'48px 28px', textAlign:'center', borderRight:(i+1)%cols!==0?'1px solid rgba(16,10,98,0.08)':'none', borderBottom: cols<4 && i<items.length-cols ? '1px solid rgba(16,10,98,0.08)' : 'none', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at center,${item.color}14 0%,transparent 70%)` }} />
            <div style={{ fontFamily:'var(--serif)', fontSize:48, fontWeight:700, color:item.color, lineHeight:1, marginBottom:10 }}>
              {inView?<CountUp end={item.num} duration={2} delay={i*0.1} suffix={item.suffix} />:`0${item.suffix}`}
            </div>
            <div style={{ color:'rgba(16,10,98,0.6)', fontSize:13 }}>{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
