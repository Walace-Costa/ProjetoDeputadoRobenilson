import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import Galeria from './components/Galeria';
import Biografia from './components/Biografia';

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Home() {
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </BrowserRouter>
  );
}
