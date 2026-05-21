'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';
import { SITE } from '@/data/site';

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold shadow-lg shadow-[#25D366]/30 hover:scale-105 transition"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ delay: 0.05 }}
              href={`viber://chat?number=%2B${SITE.viber}`}
              className="flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full bg-[#7360F2] text-white font-semibold shadow-lg shadow-[#7360F2]/30 hover:scale-105 transition"
            >
              <MessageCircle className="w-4 h-4" />
              Viber
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ delay: 0.1 }}
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold shadow-lg hover:scale-105 transition"
            >
              <Phone className="w-4 h-4" />
              Pozovi
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? { rotate: 0 } : { rotate: 0 }}
        className="w-14 h-14 rounded-full bg-brand-orange text-white shadow-lg shadow-brand-orange/40 flex items-center justify-center animate-pulse-orange"
        aria-label={open ? 'Zatvori meni' : 'Otvori brzi kontakt'}
      >
        {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
