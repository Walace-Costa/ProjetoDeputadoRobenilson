import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FotoHistoria from './components/FotoHistoria';
import Advocacia from './components/Advocacia';
import Mencoes from './components/Mencoes';
import Politica from './components/Politica';
import Contato from './components/Contato';
import Footer from './components/Footer';

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <FotoHistoria />
      <Advocacia />
      <Mencoes />
      <Politica />
      <Contato />
      <Footer />
    </div>
  );
}
