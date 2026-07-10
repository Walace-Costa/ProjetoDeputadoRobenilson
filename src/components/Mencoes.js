import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';

const mencoes = [
  { veiculo:'Pimenta Blog', data:'Jun 2013', titulo:'Pensamento crítico e coragem opinativa marcando a nossa história', resumo:'Liderança de verdade se constrói com consistência e capacidade de analisar a realidade sem medo. Neste artigo autoral publicado em 2013 no Pimenta Blog, o advogado Robenilson Torres destrincha as contradições da gestão pública da época, apontando caminhos para uma política mais coerente e transparente. O olhar técnico e a firmeza ideológica de quem estuda e debate o nosso cenário há anos.', url:'https://pimenta.blog.br/2013/06/07/a-logica-da-contradicao/', img:null, tag:'Artigo', tagColor:'#db002c' },
  { veiculo:'Diário Bahia', data:'Jan 2017', titulo:'A voz da experiência e do ECA em defesa das famílias baianas', resumo:'O conhecimento técnico deve estar sempre a serviço de quem mais precisa. Unindo sua vivência jurídica ao Sistema de Garantia de Direitos, Robenilson Torres usou as páginas da imprensa regional para trazer uma orientação vital sobre segurança pública e proteção infantojuvenil. Liderança presente e pautada na responsabilidade social.', url:'https://diariobahia.com.br/conselheiro-tutelar-alerta-nao-precisa-esperar-24-horas-para-comunicar-desaparecimentos/', img:'https://diariobahia.com.br/wp-content/uploads/2017/01/1-Robenilson.jpg', tag:'ECA', tagColor:'#ffde00' },
  { veiculo:'iPolítica', data:'Mai 2025', titulo:'Defesa permanente das nossas famílias nas páginas do iPolítica', resumo:"A voz de quem conhece a realidade dos municípios baianos ocupando os principais espaços de opinião. Neste artigo no iPolítica, Robenilson Torres aprofunda os desafios do 'Maio Laranja' e cobra ações estruturais para além das datas comemorativas. Conhecimento técnico da lei e coragem política para defender nossas crianças todos os dias.", url:'https://ipolitica.blog.br/infancia-em-risco-laranja-a-rede-de-protecao-tem-respostas-para-alem-do-18-de-maio/', img:'https://ipolitica.blog.br/wp-content/uploads/2025/05/IMG-20250515-WA0374.jpg', tag:'Maio Laranja', tagColor:'#fff4d4' },
  { veiculo:'iPolítica', data:'Mai 2024', titulo:'Qualificação de ponta para a rede de proteção do Sul da Bahia', resumo:'A proteção da infância exige preparo constante. Com a chegada da Escola de Conselhos da Bahia aos nossos municípios, damos um salto de qualidade na formação de quem está na linha de frente dos direitos. Trabalhamos para que o Sul da Bahia seja referência em gestão e defesa da criança e do adolescente. Um passo fundamental para uma rede de proteção forte, técnica e eficiente.', url:'https://ipolitica.blog.br/itabuna-e-ilheus-serao-contempladas-com-polo-da-escola-de-conselhos-da-bahia/', img:'https://ipolitica.blog.br/wp-content/uploads/2024/05/7C78A2C6-C1FB-4476-81F7-D2306570F224.jpeg', tag:'Formação', tagColor:'#ffde00' },
  { veiculo:'Notícias de Itabuna', data:'Mai 2012', titulo:'Uma trajetória de liderança que começou ainda na universidade', resumo:"Já cursando Direito na UESC, Robenilson Torres discursou em Aracaju ao lado de universitários de todo o Nordeste em defesa do meio ambiente e da educação pública, mostrando que 'a juventude está organizada e quer mostrar, através de ações, que é possível mudar a realidade'. Um retrato de uma liderança forjada ainda nos bancos da universidade.", url:'https://noticiasdeitabuna.blogspot.com/2012/05/professor-robenilson-discursa-em.html', img:'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIWkyy1M0aTz3Hy3vYgzeM4VhXihOvxgCt3lVYj3E-D7iXMAOS-cLPPcMIBLxyOPPxJM6cp5WARnQbukfNCuBdVOIu8Zy7uuRBshrSwuczvXsevBmoGzdk5l7_MEzObF_8Jq5Jk7_fFCw/s1600/BLOG+2.JPG', tag:'Trajetória', tagColor:'#db002c' },
  { veiculo:'Costa do Cacau', data:'Jul 2020', titulo:'Referência em debate: 30 anos do ECA na TV', resumo:'Conhecimento técnico e reconhecimento público. O advogado Robenilson Torres foi o especialista convidado pelo programa Bom Dia Bahia para analisar as três décadas do ECA, dividindo a bancada com o respeitado jurista Marcos Bandeira. Um debate de alto nível na televisão baiana que reafirma Robenilson como uma das vozes mais qualificadas do estado na defesa do futuro das nossas crianças.', url:'https://costadocacau.blog.br/marcos-bandeira-e-robenilson-torres-analisam-os-30-anos-do-eca-no-bom-dia-bahia-deste-sabado/', img:null, tag:'TV', tagColor:'#fff4d4' },
  { veiculo:'Diário Bahia', data:'Jul 2017', titulo:'Presença e ação quando a comunidade mais precisa', resumo:'Liderança se demonstra na prática e nos momentos de desafio. Esta matéria do Diário Bahia registra a atuação firme de Robenilson Torres e do Conselho Tutelar de Itabuna, orientando, acolhendo e prestando o socorro necessário à nossa população. Um trabalho de ponta, focado em estender a mão e garantir direitos para quem mais precisa.', url:'https://diariobahia.com.br/conselho-tutelar-de-itabuna-esclarece-como-socorrer-comunidade/', img:'https://diariobahia.com.br/wp-content/uploads/2017/07/NACT-okok.jpg', tag:'Conselho Tutelar', tagColor:'#ffde00' },
  { veiculo:'Facebook', data:'Vídeo', titulo:'Diálogo aberto e propostas para o futuro', resumo:'A boa política se faz de forma transparente e olhando no olho. Assista a este importante registro em vídeo onde Robenilson Torres debate temas cruciais para o desenvolvimento social e a garantia de direitos. Uma demonstração clara de firmeza, preparo técnico e facilidade de se conectar com o que a nossa população realmente precisa.', url:'https://www.facebook.com/watch/?v=1750153119729036', img:null, tag:'Vídeo', tagColor:'#db002c' },
  { veiculo:'Elo Social BA', data:'2025', titulo:'Reconhecimento e Liderança em Defesa dos Direitos Sociais', resumo:'A nomeação de Robenilson Torres como Diretor do Elo Social na Bahia consolida sua posição como uma das lideranças mais respeitadas do estado.', url:'https://www.elosocialba.org/post/robenilson-sena-torres', img:'https://static.wixstatic.com/media/8307fe_47d4ecf8474b46c6b614262280dfafef~mv2.jpeg', tag:'Liderança', tagColor:'#ffde00' },
  { veiculo:'Pauta.Blog', data:'2024', titulo:'Advogado Robenilson Torres assume a Ouvidoria Geral do Município de Itabuna', resumo:'Ao assumir a Ouvidoria Geral de Itabuna, colocou sua experiência jurídica e sensibilidade social a serviço da população com gestão moderna.', url:'https://pauta.blog.br/cidades/itabuna/advogado-robenilson-torres-assume-a-ouvidoria-geral-do-municipio-de-itabuna/', img:null, tag:'Itabuna', tagColor:'#db002c' },
  { veiculo:'Camacan BA Gov', data:'2024', titulo:'Referência em formação e proteção social — capacitação em 100+ municípios da Bahia', resumo:'Robenilson Torres foi o especialista convidado para conduzir a formação dos novos conselheiros tutelares do estado em mais de 100 municípios baianos.', url:'https://camacan.ba.gov.br/37081-camaca-futuros-conselheiros-tutelares-recebem-treinamento-e-capacitacao', img:'https://camacan.ba.gov.br/wp-content/uploads/materias/%7BCCAAD35D-EDED-E13B-4ADB-EBB0C2ECDBEA%7D.jpeg', tag:'Capacitação', tagColor:'#fff4d4' },
  { veiculo:'Camaçari Gov', data:'2025', titulo:'Camaçari vai sediar XVIII Seminário da ACTEBA', resumo:'A ACTEBA, presidida por Robenilson Torres, leva seu seminário estadual a Camaçari, reunindo conselheiros tutelares de toda a Bahia.', url:'https://www.camacari.ba.gov.br/camacari-vai-sediar-xviii-seminario-da-acteba/', img:'https://www.camacari.ba.gov.br/wp-content/uploads/2024/02/sedes-camacari-vai-sediar-xviii-seminario-ateba-tiago-pacheco-22.2.24---5-1024x683.jpg', tag:'Seminário', tagColor:'#ffde00' },
  { veiculo:'Cacau News', data:'2025', titulo:'Robenilson Torres em destaque na defesa dos direitos da criança no sul da Bahia', resumo:'Advogado e presidente da ACTEBA é reconhecido como referência regional na proteção integral da infância e adolescência no sul baiano.', url:'https://cacaunews.com/?p=6876', img:null, tag:'Sul da Bahia', tagColor:'#db002c' },
];

const row1 = [...mencoes, ...mencoes];
const row2 = [...[...mencoes].reverse(), ...[...mencoes].reverse()];

function Card({ m }) {
  return (
    <a href={m.url} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration:'none', display:'block', flexShrink:0, width:300 }}>
      <motion.div whileHover={{ y:-6, borderColor:m.tagColor, boxShadow:`0 12px 40px ${m.tagColor}30` }}
        style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden', transition:'border-color 0.25s, box-shadow 0.25s', height:'100%', cursor:'pointer', position:'relative' }}>
        <div style={{ height:3, background:`linear-gradient(90deg,${m.tagColor},${m.tagColor}55,transparent)` }} />
        {m.img ? (
          <div style={{ height:120, overflow:'hidden', background:'#0a2e17' }}>
            <img src={m.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.65 }} onError={e=>{e.target.parentNode.style.display='none';}} />
          </div>
        ) : (
          <div style={{ height:64, background:`linear-gradient(135deg,${m.tagColor}12,transparent)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:28 }}>📰</span>
          </div>
        )}
        <div style={{ padding:'14px 16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <span style={{ color:'rgba(255,255,255,0.35)', fontSize:10 }}>{m.veiculo} · {m.data}</span>
            <span style={{ background:`${m.tagColor}22`, color:m.tagColor, fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:999, whiteSpace:'nowrap' }}>{m.tag}</span>
          </div>
          <h4 style={{ fontFamily:'var(--serif)', fontSize:13, fontWeight:700, color:'#fff', lineHeight:1.4, marginBottom:8 }}>{m.titulo}</h4>
          <p style={{ color:'rgba(255,255,255,0.38)', fontSize:11, lineHeight:1.6, marginBottom:12 }}>{m.resumo}</p>
          <div style={{ display:'flex', alignItems:'center', gap:5, color:m.tagColor, fontSize:11, fontWeight:600 }}>
            Ler matéria
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

function InfiniteRow({ items, toLeft = false, speed = 40 }) {
  const cardW = 316;
  const totalW = (items.length / 2) * cardW;
  const isMobile = useMediaQuery('(max-width: 640px)');
  const edgeW = isMobile ? 32 : 100;
  return (
    <div style={{ overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:edgeW, background:'linear-gradient(90deg,#0a2e17,transparent)', zIndex:2, pointerEvents:'none' }} />
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:edgeW, background:'linear-gradient(-90deg,#0a2e17,transparent)', zIndex:2, pointerEvents:'none' }} />
      <motion.div
        animate={{ x: toLeft ? [0, -totalW] : [-totalW, 0] }}
        transition={{ duration:speed, repeat:Infinity, ease:'linear', repeatType:'loop' }}
        style={{ display:'flex', gap:16, width:'max-content', paddingBottom:4 }}>
        {items.map((m,i) => <Card key={i} m={m} />)}
      </motion.div>
    </div>
  );
}

export default function Mencoes() {
  const { ref, inView } = useInView({ threshold:0.05, triggerOnce:true });
  return (
    <section id="mencoes" ref={ref} style={{
      background:'linear-gradient(160deg,#0d3d20 0%,#134025 50%,#0a2e17 100%)',
      padding:'90px 0', position:'relative', overflow:'hidden',
      borderTop:'1px solid rgba(23,105,57,0.4)',
      borderBottom:'1px solid rgba(23,105,57,0.3)',
    }}>
      {/* Orbes verdes */}
      <div style={{ position:'absolute', top:'-20%', right:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(23,105,57,0.25) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,222,0,0.06) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,244,212,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,244,212,0.03) 1px,transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(1rem,4vw,3rem)', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
          style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,222,0,0.12)', border:'1px solid rgba(255,222,0,0.35)', borderRadius:999, padding:'5px 14px', marginBottom:20 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#ffde00', animation:'pulseGreen 2s infinite' }} />
            <span style={{ color:'#ffde00', fontSize:11, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }}>Na imprensa & menções</span>
          </div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2rem,3.5vw,2.8rem)', fontWeight:700, color:'#fff', lineHeight:1.2, marginBottom:12 }}>
            O que a mídia diz sobre ele
          </h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:15, maxWidth:480, margin:'0 auto' }}>
            Clique em qualquer card para ler a matéria completa.
          </p>
        </motion.div>
      </div>

      {/* Fileira 1 → */}
      <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.2 }} style={{ marginBottom:16 }}>
        <InfiniteRow items={row1} toLeft={true} speed={45} />
      </motion.div>

      {/* Fileira 2 ← */}
      <motion.div initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.35 }}>
        <InfiniteRow items={row2} toLeft={false} speed={38} />
      </motion.div>

      {/* Contador */}
      <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.5 }}
        style={{ textAlign:'center', marginTop:44, padding:'0 clamp(1rem,4vw,3rem)' }}>
        <div style={{ display:'inline-flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:12, background:'rgba(255,222,0,0.08)', border:'1px solid rgba(255,222,0,0.25)', borderRadius:12, padding:'12px 28px' }}>
          <span style={{ fontFamily:'var(--serif)', fontSize:32, fontWeight:700, color:'#ffde00' }}>{mencoes.length}+</span>
          <span style={{ color:'rgba(255,255,255,0.55)', fontSize:14 }}>matérias e menções na imprensa regional e nacional</span>
        </div>
      </motion.div>

      <style>{`@keyframes pulseGreen{0%,100%{box-shadow:0 0 0 0 rgba(255,222,0,0.35)}50%{box-shadow:0 0 0 9px rgba(255,222,0,0)}}`}</style>
    </section>
  );
}
