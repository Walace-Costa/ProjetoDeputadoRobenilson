import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';

const mencoes = [
  { veiculo:'Pimenta Blog', data:'Jun 2013', titulo:'Pensamento crítico e coragem opinativa marcando a nossa história', resumo:'Liderança de verdade se constrói com consistência e capacidade de analisar a realidade sem medo. Neste artigo autoral publicado em 2013 no Pimenta Blog, o advogado Robenilson Torres destrincha as contradições da gestão pública da época, apontando caminhos para uma política mais coerente e transparente. O olhar técnico e a firmeza ideológica de quem estuda e debate o nosso cenário há anos.', url:'https://pimenta.blog.br/2013/06/07/a-logica-da-contradicao/', img:null, tag:'Artigo', tagColor:'#db002c' },
  { veiculo:'Diário Bahia', data:'Jan 2017', titulo:'A voz da experiência e do ECA em defesa das famílias baianas', resumo:'O conhecimento técnico deve estar sempre a serviço de quem mais precisa. Unindo sua vivência jurídica ao Sistema de Garantia de Direitos, Robenilson Torres usou as páginas da imprensa regional para trazer uma orientação vital sobre segurança pública e proteção infantojuvenil. Liderança presente e pautada na responsabilidade social.', url:'https://diariobahia.com.br/conselheiro-tutelar-alerta-nao-precisa-esperar-24-horas-para-comunicar-desaparecimentos/', img:'https://diariobahia.com.br/wp-content/uploads/2017/01/1-Robenilson.jpg', tag:'ECA', tagColor:'#176939' },
  { veiculo:'iPolítica', data:'Mai 2025', titulo:'Defesa permanente das nossas famílias nas páginas do iPolítica', resumo:"A voz de quem conhece a realidade dos municípios baianos ocupando os principais espaços de opinião. Neste artigo no iPolítica, Robenilson Torres aprofunda os desafios do 'Maio Laranja' e cobra ações estruturais para além das datas comemorativas. Conhecimento técnico da lei e coragem política para defender nossas crianças todos os dias.", url:'https://ipolitica.blog.br/infancia-em-risco-laranja-a-rede-de-protecao-tem-respostas-para-alem-do-18-de-maio/', img:'https://ipolitica.blog.br/wp-content/uploads/2025/05/IMG-20250515-WA0374.jpg', tag:'Maio Laranja', tagColor:'#100a62' },
  { veiculo:'iPolítica', data:'Mai 2024', titulo:'Qualificação de ponta para a rede de proteção do Sul da Bahia', resumo:'A proteção da infância exige preparo constante. Com a chegada da Escola de Conselhos da Bahia aos nossos municípios, damos um salto de qualidade na formação de quem está na linha de frente dos direitos. Trabalhamos para que o Sul da Bahia seja referência em gestão e defesa da criança e do adolescente. Um passo fundamental para uma rede de proteção forte, técnica e eficiente.', url:'https://ipolitica.blog.br/itabuna-e-ilheus-serao-contempladas-com-polo-da-escola-de-conselhos-da-bahia/', img:'https://ipolitica.blog.br/wp-content/uploads/2024/05/7C78A2C6-C1FB-4476-81F7-D2306570F224.jpeg', tag:'Formação', tagColor:'#176939' },
  { veiculo:'Notícias de Itabuna', data:'Mai 2012', titulo:'Uma trajetória de liderança que começou ainda na universidade', resumo:"Já cursando Direito na UESC, Robenilson Torres discursou em Aracaju ao lado de universitários de todo o Nordeste em defesa do meio ambiente e da educação pública, mostrando que 'a juventude está organizada e quer mostrar, através de ações, que é possível mudar a realidade'. Um retrato de uma liderança forjada ainda nos bancos da universidade.", url:'https://noticiasdeitabuna.blogspot.com/2012/05/professor-robenilson-discursa-em.html', img:'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIWkyy1M0aTz3Hy3vYgzeM4VhXihOvxgCt3lVYj3E-D7iXMAOS-cLPPcMIBLxyOPPxJM6cp5WARnQbukfNCuBdVOIu8Zy7uuRBshrSwuczvXsevBmoGzdk5l7_MEzObF_8Jq5Jk7_fFCw/s1600/BLOG+2.JPG', tag:'Trajetória', tagColor:'#db002c' },
  { veiculo:'Costa do Cacau', data:'Jul 2020', titulo:'Referência em debate: 30 anos do ECA na TV', resumo:'Conhecimento técnico e reconhecimento público. O advogado Robenilson Torres foi o especialista convidado pelo programa Bom Dia Bahia para analisar as três décadas do ECA, dividindo a bancada com o respeitado jurista Marcos Bandeira. Um debate de alto nível na televisão baiana que reafirma Robenilson como uma das vozes mais qualificadas do estado na defesa do futuro das nossas crianças.', url:'https://costadocacau.blog.br/marcos-bandeira-e-robenilson-torres-analisam-os-30-anos-do-eca-no-bom-dia-bahia-deste-sabado/', img:null, tag:'TV', tagColor:'#100a62' },
  { veiculo:'Diário Bahia', data:'Jul 2017', titulo:'Presença e ação quando a comunidade mais precisa', resumo:'Liderança se demonstra na prática e nos momentos de desafio. Esta matéria do Diário Bahia registra a atuação firme de Robenilson Torres e do Conselho Tutelar de Itabuna, orientando, acolhendo e prestando o socorro necessário à nossa população. Um trabalho de ponta, focado em estender a mão e garantir direitos para quem mais precisa.', url:'https://diariobahia.com.br/conselho-tutelar-de-itabuna-esclarece-como-socorrer-comunidade/', img:'https://diariobahia.com.br/wp-content/uploads/2017/07/NACT-okok.jpg', tag:'Conselho Tutelar', tagColor:'#176939' },
  { veiculo:'Facebook', data:'Vídeo', titulo:'Diálogo aberto e propostas para o futuro', resumo:'A boa política se faz de forma transparente e olhando no olho. Assista a este importante registro em vídeo onde Robenilson Torres debate temas cruciais para o desenvolvimento social e a garantia de direitos. Uma demonstração clara de firmeza, preparo técnico e facilidade de se conectar com o que a nossa população realmente precisa.', url:'https://www.facebook.com/watch/?v=1750153119729036', img:null, tag:'Vídeo', tagColor:'#db002c' },
  { veiculo:'Elo Social BA', data:'2025', titulo:'Reconhecimento e Liderança em Defesa dos Direitos Sociais', resumo:'A nomeação de Robenilson Torres como Diretor do Elo Social na Bahia consolida sua posição como uma das lideranças mais respeitadas do estado.', url:'https://www.elosocialba.org/post/robenilson-sena-torres', img:'https://static.wixstatic.com/media/8307fe_47d4ecf8474b46c6b614262280dfafef~mv2.jpeg', tag:'Liderança', tagColor:'#176939' },
  { veiculo:'Pauta.Blog', data:'2024', titulo:'Advogado Robenilson Torres assume a Ouvidoria Geral do Município de Itabuna', resumo:'Ao assumir a Ouvidoria Geral de Itabuna, colocou sua experiência jurídica e sensibilidade social a serviço da população com gestão moderna.', url:'https://pauta.blog.br/cidades/itabuna/advogado-robenilson-torres-assume-a-ouvidoria-geral-do-municipio-de-itabuna/', img:null, tag:'Itabuna', tagColor:'#db002c' },
  { veiculo:'Camacan BA Gov', data:'2024', titulo:'Referência em formação e proteção social — capacitação em 100+ municípios da Bahia', resumo:'Robenilson Torres foi o especialista convidado para conduzir a formação dos novos conselheiros tutelares do estado em mais de 100 municípios baianos.', url:'https://camacan.ba.gov.br/37081-camaca-futuros-conselheiros-tutelares-recebem-treinamento-e-capacitacao', img:'https://camacan.ba.gov.br/wp-content/uploads/materias/%7BCCAAD35D-EDED-E13B-4ADB-EBB0C2ECDBEA%7D.jpeg', tag:'Capacitação', tagColor:'#100a62' },
  { veiculo:'Camaçari Gov', data:'2025', titulo:'Camaçari vai sediar XVIII Seminário da ACTEBA', resumo:'A ACTEBA, presidida por Robenilson Torres, leva seu seminário estadual a Camaçari, reunindo conselheiros tutelares de toda a Bahia.', url:'https://www.camacari.ba.gov.br/camacari-vai-sediar-xviii-seminario-da-acteba/', img:'https://www.camacari.ba.gov.br/wp-content/uploads/2024/02/sedes-camacari-vai-sediar-xviii-seminario-ateba-tiago-pacheco-22.2.24---5-1024x683.jpg', tag:'Seminário', tagColor:'#176939' },
  { veiculo:'Cacau News', data:'2025', titulo:'Robenilson Torres em destaque na defesa dos direitos da criança no sul da Bahia', resumo:'Advogado e presidente da ACTEBA é reconhecido como referência regional na proteção integral da infância e adolescência no sul baiano.', url:'https://cacaunews.com/?p=6876', img:null, tag:'Sul da Bahia', tagColor:'#db002c' },
  { veiculo:'Prefeitura de Itabuna', data:'Fev 2022', titulo:'Ouvidoria Pública Municipal prestará serviços itinerantes nos bairros de Itabuna', resumo:'Como Ouvidor-Geral do Município, Robenilson Torres anunciou os atendimentos itinerantes da Ouvidoria nos bairros de Itabuna, levando o canal de reclamações, solicitações e denúncias para mais perto da população.', url:'https://itabuna.ba.gov.br/2022/02/17/ouvidoria-publica-municipal-prestara-servicos-itinerantes-nos-bairros-de-itabuna/', img:'https://itabuna.ba.gov.br/wp-content/uploads/2022/02/G-1024x812.jpeg', tag:'Ouvidoria', tagColor:'#100a62' },
  { veiculo:'Blog do Val Cabral', data:'Jul 2026', titulo:'Robenilson Torres pretende ser a voz de propostas, não de oportunismo', resumo:'Uma análise que separa quem tem projeto de quem só surfa a política. Assinada pelo jornalista Val Cabral — uma das vozes mais críticas e independentes da região, reconhecido por não medir palavras — a matéria avalia com propriedade a pré-candidatura de Robenilson Torres, destacando um trabalho pautado por propostas concretas em meio a um cenário de oportunismo político.', url:'https://valcabral.blogspot.com/2026/07/robenilson-torres-pretende-ser-voz.html', img:null, tag:'Pré-candidatura', tagColor:'#176939' },
];

const metade = Math.ceil(mencoes.length / 2);
const metadeMencoes1 = mencoes.slice(0, metade);
const metadeMencoes2 = mencoes.slice(metade);

const row1 = [...metadeMencoes1, ...metadeMencoes1];
const row2 = [...metadeMencoes2, ...metadeMencoes2];

function Card({ m, style }) {
  return (
    <a href={m.url} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration:'none', display:'block', flexShrink:0, width:300, ...style }}>
      <motion.div whileHover={{ y:-6, borderColor:m.tagColor, boxShadow:`0 12px 40px ${m.tagColor}30` }}
        style={{ background:'var(--cream)', border:'1px solid rgba(15,27,76,0.08)', borderRadius:14, overflow:'hidden', boxShadow:'0 6px 20px rgba(0,0,0,0.25)', transition:'border-color 0.25s, box-shadow 0.25s', height:'100%', cursor:'pointer', position:'relative' }}>
        <div style={{ height:3, background:`linear-gradient(90deg,${m.tagColor},${m.tagColor}55,transparent)` }} />
        {m.img ? (
          <div style={{ height:120, overflow:'hidden', background:'var(--cream)' }}>
            <img src={m.img} alt="" draggable={false} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.9 }} onError={e=>{e.target.parentNode.style.display='none';}} />
          </div>
        ) : (
          <div style={{ height:64, background:`linear-gradient(135deg,${m.tagColor}14,transparent)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:28 }}>📰</span>
          </div>
        )}
        <div style={{ padding:'14px 16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <span style={{ color:'rgba(15,27,76,0.55)', fontSize:10 }}>{m.veiculo} · {m.data}</span>
            <span style={{ background:`${m.tagColor}1f`, color:m.tagColor, fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:999, whiteSpace:'nowrap' }}>{m.tag}</span>
          </div>
          <h4 style={{ fontFamily:'var(--serif)', fontSize:13, fontWeight:700, color:'#0F1B4C', lineHeight:1.4, marginBottom:8 }}>{m.titulo}</h4>
          <p style={{ color:'rgba(15,27,76,0.75)', fontSize:11, lineHeight:1.6, marginBottom:12 }}>{m.resumo}</p>
          <div style={{ display:'flex', alignItems:'center', gap:5, color:m.tagColor, fontSize:11, fontWeight:600 }}>
            Ler matéria
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

function ArrowButton({ dir, onClick, disabled }) {
  const isLeft = dir === 'left';
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={isLeft ? 'Anterior' : 'Próximo'}
      style={{
        position:'absolute', top:'50%', [isLeft ? 'left' : 'right']:6, transform:'translateY(-50%)',
        zIndex:3, width:40, height:40, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.3)',
        background:'rgba(16,10,98,0.5)', backdropFilter:'blur(6px)', WebkitBackdropFilter:'blur(6px)',
        color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
        cursor: disabled ? 'default' : 'pointer', padding:0,
        opacity: disabled ? 0 : 1, pointerEvents: disabled ? 'none' : 'auto', transition:'opacity 0.25s',
      }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

function InfiniteRow({ items, toLeft = false, speed = 40 }) {
  const cardW = 316;
  const totalW = (items.length / 2) * cardW;
  const edgeW = 100;
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ dragging:false, startX:0, startOffset:0, moved:false });

  useEffect(() => {
    const pxPerSec = totalW / speed;
    const dir = toLeft ? -1 : 1;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!isPaused && !dragState.current.dragging) {
        offsetRef.current += dir * pxPerSec * dt;
        if (offsetRef.current <= -totalW) offsetRef.current += totalW;
        if (offsetRef.current > 0) offsetRef.current -= totalW;
      }
      if (trackRef.current) trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, totalW, speed, toLeft]);

  const wrapOffset = (val) => {
    let next = val;
    while (next <= -totalW) next += totalW;
    while (next > 0) next -= totalW;
    return next;
  };

  const onPointerDown = (e) => {
    dragState.current = { dragging:true, startX:e.clientX, startOffset:offsetRef.current, moved:false, pointerId:e.pointerId, captured:false };
    setIsDragging(true);
    setIsPaused(true);
  };
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) {
      if (!dragState.current.moved) {
        dragState.current.moved = true;
        dragState.current.captured = true;
        e.currentTarget.setPointerCapture(dragState.current.pointerId);
      }
      offsetRef.current = wrapOffset(dragState.current.startOffset + dx);
    }
  };
  const endDrag = (e) => {
    if (!dragState.current.dragging) return;
    if (dragState.current.captured && e?.currentTarget?.releasePointerCapture) {
      e.currentTarget.releasePointerCapture(dragState.current.pointerId);
    }
    dragState.current.dragging = false;
    setIsDragging(false);
    setIsPaused(false);
  };
  const onClickCapture = (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div style={{ overflow:'hidden', position:'relative' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { if (!dragState.current.dragging) setIsPaused(false); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:edgeW, background:'linear-gradient(90deg,#1B316E,transparent)', zIndex:2, pointerEvents:'none' }} />
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:edgeW, background:'linear-gradient(-90deg,#1B316E,transparent)', zIndex:2, pointerEvents:'none' }} />
      <div
        ref={trackRef}
        onDragStart={(e) => e.preventDefault()}
        style={{
          display:'flex', gap:16, width:'max-content', paddingBottom:4,
          cursor: isDragging ? 'grabbing' : 'grab', userSelect:'none', touchAction:'pan-y',
        }}>
        {items.map((m,i) => <Card key={i} m={m} />)}
      </div>
    </div>
  );
}

function MobileCarousel({ items }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (idx) => {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(items.length - 1, idx));
    const card = container.children[clamped];
    if (!card) return;
    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior:'smooth' });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0, closestDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const dist = Math.abs((child.offsetLeft + child.clientWidth / 2) - center);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <div style={{ position:'relative' }}>
      <div ref={scrollRef} onScroll={handleScroll}
        style={{ display:'flex', overflowX:'auto', scrollSnapType:'x mandatory', WebkitOverflowScrolling:'touch', padding:'4px 0' }}>
        {items.map((m,i) => (
          <div key={i} style={{ flex:'0 0 100%', scrollSnapAlign:'center', padding:'0 16px', boxSizing:'border-box' }}>
            <Card m={m} style={{ width:'100%', maxWidth:340, margin:'0 auto' }} />
          </div>
        ))}
      </div>
      <ArrowButton dir="left" onClick={() => scrollToIndex(activeIndex - 1)} disabled={activeIndex === 0} />
      <ArrowButton dir="right" onClick={() => scrollToIndex(activeIndex + 1)} disabled={activeIndex === items.length - 1} />
      <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:7, marginTop:18 }}>
        {items.map((_,i) => (
          <button key={i} type="button" onClick={() => scrollToIndex(i)} aria-label={`Ir para menção ${i + 1}`}
            style={{
              width: i === activeIndex ? 20 : 7, height:7, borderRadius:999, border:'none', padding:0, cursor:'pointer',
              background: i === activeIndex ? 'var(--gold)' : 'rgba(255,255,255,0.3)', transition:'width 0.25s, background 0.25s',
            }} />
        ))}
      </div>
    </div>
  );
}

export default function Mencoes() {
  const { ref, inView } = useInView({ threshold:0.05, triggerOnce:true });
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <section id="mencoes" ref={ref} style={{
      background:'linear-gradient(160deg, #2A459A 0%, #1B316E 50%, #101B4A 100%)',
      padding:'90px 0', position:'relative', overflow:'hidden',
      borderTop:'1px solid rgba(16,10,98,0.25)',
      borderBottom:'1px solid rgba(16,10,98,0.25)',
      boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.15)',
    }}>
      {/* Orbes azuis */}
      <div style={{ position:'absolute', top:'-20%', right:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(45,77,180,0.35) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,222,0,0.12) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(1rem,4vw,3rem)', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
          style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:999, padding:'5px 14px', marginBottom:20 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--gold)', animation:'pulseGreen 2s infinite' }} />
            <span style={{ color:'#C7D2F5', fontSize:11, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }}>Na imprensa & menções</span>
          </div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2rem,3.5vw,2.8rem)', fontWeight:700, color:'#FFFFFF', lineHeight:1.2, marginBottom:12 }}>
            O que a mídia diz sobre ele
          </h2>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15, maxWidth:480, margin:'0 auto' }}>
            Clique em qualquer card para ler a matéria completa.
          </p>
        </motion.div>
      </div>

      {isMobile ? (
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2 }}>
          <MobileCarousel items={mencoes} />
        </motion.div>
      ) : (
        <>
          {/* Fileira 1 → */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.2 }} style={{ marginBottom:16 }}>
            <InfiniteRow items={row1} toLeft={true} speed={45} />
          </motion.div>

          {/* Fileira 2 ← */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.35 }}>
            <InfiniteRow items={row2} toLeft={false} speed={38} />
          </motion.div>
        </>
      )}

      {/* Contador */}
      <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.5 }}
        style={{ textAlign:'center', marginTop:44, padding:'0 clamp(1rem,4vw,3rem)' }}>
        <div style={{ display:'inline-flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:12, background:'#EEF3EA', border:'1px solid rgba(23,105,57,0.2)', borderRadius:12, padding:'12px 28px', boxShadow:'0 4px 20px rgba(0,0,0,0.2)' }}>
          <span style={{ fontFamily:'var(--serif)', fontSize:32, fontWeight:700, color:'var(--green)' }}>{mencoes.length}+</span>
          <span style={{ color:'rgba(16,10,98,0.6)', fontSize:14 }}>matérias e menções na imprensa regional e nacional</span>
        </div>
      </motion.div>

      <style>{`
        @keyframes pulseGreen{0%,100%{box-shadow:0 0 0 0 rgba(23,105,57,0.35)}50%{box-shadow:0 0 0 9px rgba(23,105,57,0)}}
      `}</style>
    </section>
  );
}
