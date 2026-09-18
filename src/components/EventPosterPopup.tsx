import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
// TODO: swap this placeholder for the actual "Peer Listening Circle" poster
// artwork once it's available as a project asset.
import posterImage from '../assets/images/peer-poster.jpeg';

// Poster stops popping up after this moment — end of day, coming Monday
// (2026-09-21) for the "A Peer Listening Circle" event.
const POSTER_EXPIRY = new Date('2026-09-22T00:00:00');

export const EventPosterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Date.now() < POSTER_EXPIRY.getTime()) {
      setIsOpen(true);
    }
  }, []);

  useScrollLock(isOpen);

  const handleClose = () => setIsOpen(false);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0A1F44]/75 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-fit max-w-[95vw] max-h-[92vh] bg-[#F8F6F0] border-2 border-[#0A1F44]/20 shadow-[0_25px_70px_rgba(10,31,68,0.4)] overflow-hidden"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 p-2 bg-[#0A1F44] hover:bg-[#132D5E] text-white rounded-full shadow-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={posterImage}
              alt="Event poster"
              className="w-auto h-auto max-w-[95vw] max-h-[92vh] block object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
