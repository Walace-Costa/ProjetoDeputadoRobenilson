import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const LINK_GRUPO_WHATSAPP = "https://chat.whatsapp.com/GUfcNuF8IHBEvKTGyXOV7C?s=sw&p=a&ilr=0&amv=0";

function WhatsappIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="#fff">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.42-.71-2.9-1.15-4.75-4.13-4.9-4.32-.14-.2-1.17-1.56-1.17-2.97 0-1.42.74-2.11 1.01-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.29.75 1.24 1.61 2.01 1.11 1 2.04 1.31 2.34 1.46.29.15.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

export default function WhatsappFloat() {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={LINK_GRUPO_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Entrar no grupo do WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed', bottom: 20, right: 20, zIndex: 300,
            width: 56, height: 56, borderRadius: '50%',
            background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(37,211,102,0.5)', textDecoration: 'none',
          }}
        >
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: '#25D366',
            animation: 'pulseWhatsapp 2s infinite',
          }} />
          <WhatsappIcon width={30} height={30} style={{ position: 'relative' }} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
