import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ACCENTS = ['#9C1F2E', '#0F1B4C', '#D4A017'];

const topicos = [
  {
    id: 'origens', emoji: '🏡', tituloCurto: 'Origens e família',
    titulo: 'Origens, família e a missão de uma vida',
    foto: '/historia-1-origens.jpg',
    texto: [
      'A trajetória de Robenilson Torres começa no aconchego e nos desafios da periferia. Nascido e criado no Bairro Santa Inês, em Itabuna, ele é filho da Professora Robélia, com quem aprendeu desde cedo o valor da dignidade, do respeito e o poder transformador do conhecimento. Tendo vivido uma infância difícil, Robenilson sentiu na pele as ausências e os obstáculos que tantas famílias enfrentam diariamente.',
      'Sua formação moral e espiritual se consolidou na juventude, período em que professou sua fé e despontou como líder de jovens da Igreja Presbiteriana do Brasil, da qual faz parte até hoje. Foi essa base sólida, unida à sua própria vivência, que despertou nele uma paixão inabalável pela causa da infância, da juventude e da justiça social. Hoje, casado e pai orgulhoso de três filhos, ele é advogado (OAB/BA 59903), especialista em Proteção Integral de Crianças e Adolescentes, aprovado no exame da Ordem ainda como estudante do 9º semestre de Direito.',
    ],
  },
  {
    id: 'arte-educacao', emoji: '🎭', tituloCurto: 'Arte e educação',
    titulo: 'Arte, educação e o despertar da liderança',
    foto: '/historia-2-educacao.jpg',
    texto: [
      "Aos 14 anos, sua vocação para defender o coletivo já se manifestava no ambiente escolar. À frente do Grêmio Estudantil, Robenilson ajudou a liderar o movimento que reivindicou e conquistou a construção do primeiro colégio de ensino médio para o bairro Califórnia: o Colégio Estadual Presidente Médici. Mais tarde, ele retornou à instituição como professor, dedicando 18 anos de sua vida às salas de aula, lecionando Sociologia, Filosofia e Artes, atuando como Assistente de Direção e coordenando o Programa Federal Mais Cultura nas Escolas.",
      "Em 2004, criou o inovador Projeto Encen'art, iniciativa que aliou arte e cidadania através de oficinas de formação artística e cultural. Sua experiência na área se consolidou ainda mais ao atuar como Educador Social no Projeto Vivart, promovido pela Fundação Itabunense de Cultura e Cidadania (FICC).",
    ],
  },
  {
    id: 'uesc', emoji: '🎓', tituloCurto: 'UESC',
    titulo: 'Inclusão, superação e excelência acadêmica na UESC',
    foto: '/historia-3-uesc.jpg',
    texto: [
      'Em 2003, Robenilson viveu um marco em sua caminhada ao fazer parte do PRUNE (Pré-Universitário para Negros e Excluídos), programa que lhe deu as ferramentas para ser aprovado no concorrido vestibular de Direito da Universidade Estadual de Santa Cruz (UESC), formando-se bacharel em 2018.',
      'Na UESC, sua liderança floresceu: foi eleito Presidente do Centro Acadêmico João Mangabeira (CAJAM), atuou no Diretório Central dos Estudantes como Diretor de Extensão e Diretor de Combate ao Racismo, e representou os estudantes no Conselho Superior da UESC e no Conselho de Transportes de Itabuna. É especialista em Direito Público, Contratos e Licitações e em Proteção Integral de Crianças e Adolescentes, além de mais de dez cursos pela ENAP em Ouvidoria, Gestão Pública, LGPD, Controle Social e Inteligência Artificial no serviço público.',
    ],
  },
  {
    id: 'gestao-publica', emoji: '🏛️', tituloCurto: 'Gestão pública',
    titulo: 'Experiência e gestão pública: testado na prática',
    foto: '/historia-4-gestao.jpg',
    texto: [
      'Robenilson construiu uma carreira administrativa robusta. No combate à pobreza (2021–2022), atuou como Diretor do Departamento de Combate à Pobreza da Secretaria de Promoção Social de Itabuna, gestor do CadÚnico, Bolsa Família, Programas Habitacionais e PAA/Leite.',
      'Na defesa do cidadão (2022–2025), exerceu o cargo de Ouvidor-Geral do Município de Itabuna. Na gestão ambiental (2019–2020), atuou como Assessor Técnico no INEMA, representando o governo no Comitê de Bacias do Rio Cachoeira e na APA da Lagoa Encantada e Rio Almada. Em 2012, já havia dado seus primeiros passos na política formal como candidato a vereador em Itabuna pelo PSB, onde atuou como dirigente municipal e advogado eleitoral.',
    ],
  },
  {
    id: 'infancia', emoji: '🛡️', tituloCurto: 'Defesa da infância',
    titulo: 'Uma das maiores referências em defesa da infância na Bahia',
    foto: '/historia-5-infancia.jpg',
    texto: [
      'A junção entre a vivência das ruas, a bagagem de educador e o conhecimento técnico do Direito transformou Robenilson Torres em uma das maiores autoridades do estado na garantia de direitos das futuras gerações. Atuou (2015–2018) como Conselheiro Tutelar e Coordenador do Conselho Tutelar de Itabuna, foi nomeado Presidente da Comissão dos Direitos da Criança e do Adolescente na OAB Itabuna, e atua como consultor e formador da Rede de Proteção de Crianças e Adolescentes em municípios de toda a Bahia.',
      'É representante do Estado da Bahia no Fórum Nacional de Conselheiros e Ex-Conselheiros Tutelares, e hoje é Presidente da ACTEBA — Associação de Conselheiros Tutelares e Ex-Conselheiros do Estado da Bahia, unificando a rede de proteção infantojuvenil de norte a sul do estado.',
    ],
  },
  {
    id: 'candidatura', emoji: '🗳️', tituloCurto: '#BoraPraALBA',
    titulo: '#BoraPraALBA — o próximo passo',
    foto: '/historia-6-candidatura.jpg',
    texto: [
      'Toda essa trajetória de vivência popular, educação, gestão pública e defesa incansável da infância converge agora em um novo propósito: Robenilson Torres é pré-candidato a Deputado Estadual pelo Partido Democrático Trabalhista (PDT), levando décadas de experiência real para dentro do parlamento baiano.',
    ],
  },
].map((t, i) => ({ ...t, accent: ACCENTS[i % ACCENTS.length] }));

function FotoComPlaceholder({ src, alt, accent, filename }) {
  const [erro, setErro] = useState(false);
  return (
    <div style={{
      width: '100%', height: '100%', minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: erro ? `${accent}14` : `${accent}0d`,
      border: erro ? `2px dashed ${accent}55` : 'none',
      borderRadius: 20,
    }}>
      {erro ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '0 24px' }}>
          <span style={{ fontSize: 40, opacity: 0.45 }}>🖼️</span>
          <span style={{ fontSize: 12, color: 'rgba(16,10,98,0.42)', textAlign: 'center' }}>Foto: {filename}</span>
        </div>
      ) : (
        <img src={src} alt={alt} onError={() => setErro(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      )}
    </div>
  );
}

function TopicBlock({ topico, index, onActive, isMobile }) {
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && onActive) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} style={{
      minHeight: isMobile ? undefined : '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: isMobile ? '36px 0 56px' : 'clamp(2rem,6vw,4rem) clamp(1rem,3vw,2.5rem)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <span style={{ fontSize: 30 }}>{topico.emoji}</span>
        <div style={{ height: 2, width: 48, background: topico.accent, borderRadius: 1 }} />
      </div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.25, marginBottom: 18 }}>
        {topico.titulo}
      </h3>
      {topico.texto.map((p, pi) => (
        <p key={pi} style={{ color: 'rgba(16,10,98,0.68)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
      ))}
    </div>
  );
}

function ColunaFoto({ topico, active }) {
  return (
    <div style={{ position: 'sticky', top: 100, height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', gap: 18, padding: '20px 0' }}>
      <div style={{ position: 'relative', flex: 1, borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px rgba(16,10,98,0.14)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={topico.id}
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}>
            <FotoComPlaceholder src={topico.foto} alt={topico.titulo} accent={topico.accent} filename={topico.foto} />
          </motion.div>
        </AnimatePresence>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 20px 18px', background: `linear-gradient(to top, ${topico.accent}dd, transparent)`, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{topico.emoji}</span>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{topico.tituloCurto}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        {topicos.map((t, i) => (
          <div key={t.id} title={t.tituloCurto}
            style={{ width: i === active ? 26 : 8, height: 8, borderRadius: 4, background: i === active ? t.accent : 'rgba(16,10,98,0.15)', transition: 'all 0.35s ease' }} />
        ))}
      </div>
    </div>
  );
}

function HistoriaDesktop() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem,4vw,3rem)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,4rem)' }}>
      <div>
        {topicos.map((t, i) => (
          <TopicBlock key={t.id} topico={t} index={i} onActive={setActive} isMobile={false} />
        ))}
      </div>
      <ColunaFoto topico={topicos[active]} active={active} />
    </div>
  );
}

function HistoriaMobile() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 clamp(1rem,5vw,2rem)' }}>
      {topicos.map((t, i) => (
        <div key={t.id} style={{ borderBottom: i < topicos.length - 1 ? '1px solid rgba(16,10,98,0.08)' : 'none' }}>
          <div style={{ height: 240, borderRadius: 20, overflow: 'hidden', marginTop: 32 }}>
            <FotoComPlaceholder src={t.foto} alt={t.titulo} accent={t.accent} filename={t.foto} />
          </div>
          <TopicBlock topico={t} index={i} isMobile={true} />
        </div>
      ))}
    </div>
  );
}

export default function FotoHistoria() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="foto-historia" style={{ background: 'var(--cream)' }}>
      <div style={{ background: 'var(--cream)', padding: '80px clamp(1rem,4vw,3rem) 72px', textAlign: 'center', borderBottom: '1px solid rgba(219,0,44,0.15)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 20px rgba(16,10,98,0.04)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(219,0,44,0.1)', border: '1px solid rgba(219,0,44,0.25)', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} />
          <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>A história dele</span>
        </div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, maxWidth: 600, margin: '0 auto' }}>
          Uma trajetória construída com propósito
        </h2>
      </div>
      {isMobile ? <HistoriaMobile /> : <HistoriaDesktop />}

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
        style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 clamp(1rem,5vw,2rem) 64px' : '0 clamp(1rem,4vw,3rem) 88px' }}>
        <div style={{ background: 'linear-gradient(120deg, var(--navy), #241E76)', borderRadius: 24, padding: isMobile ? '36px 24px' : '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', boxShadow: '0 24px 60px rgba(16,10,98,0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,222,0,0.15) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem,2.6vw,1.8rem)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              Quer ver mais da trajetória dele?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 420 }}>
              Uma galeria com dezenas de registros de bastidores, encontros e conquistas.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{ position: 'relative', zIndex: 1 }}>
            <Link to="/galeria"
              style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '15px 32px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 30px var(--gold-glow)', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              Ver galeria completa →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
