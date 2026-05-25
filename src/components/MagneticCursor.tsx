import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function MagneticCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'image-reveal' | 'reserve'>('default');
  const [revealImg, setRevealImg] = useState<string | null>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isMobile, setIsMobile] = useState(true);

  // Smooth cursor follow
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile touch capability
    const handleDeviceCheck = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };
    handleDeviceCheck();
    window.addEventListener('resize', handleDeviceCheck);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find magnetic elements or links with data-cursor attributes
      const clickableElement = target.closest('a, button, [role="button"], .interactive-element');
      const revealElement = target.closest('[data-reveal-image]');
      const reserveElement = target.closest('[data-cursor-reserve]');

      if (reserveElement) {
        setCursorType('reserve');
        setCursorText('BOOKING');
      } else if (revealElement) {
        setCursorType('image-reveal');
        const img = revealElement.getAttribute('data-reveal-image');
        setRevealImg(img);
        setCursorText(revealElement.getAttribute('data-cursor-text') || 'EXPLORE');
      } else if (clickableElement) {
        setCursorType('pointer');
        setCursorText('');
      } else {
        setCursorType('default');
        setRevealImg(null);
        setCursorText('');
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('resize', handleDeviceCheck);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Spring Cursor Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-parchment/60 pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: cursorType === 'pointer' ? 1.5 : cursorType === 'image-reveal' ? 2.5 : cursorType === 'reserve' ? 3.0 : 1.0,
          backgroundColor: cursorType === 'image-reveal' ? 'rgba(253, 251, 247, 0.15)' : cursorType === 'reserve' ? 'rgba(82, 108, 131, 0.2)' : 'transparent',
          borderColor: cursorType === 'pointer' ? 'rgba(253, 251, 247, 0.9)' : cursorType === 'reserve' ? '#526C83' : 'rgba(253, 251, 247, 0.4)',
          mixBlendMode: cursorType === 'pointer' ? 'difference' : 'normal',
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 300 }}
      >
        {cursorText && (
          <div className="absolute inset-0 flex items-center justify-center text-[7px] font-sans font-semibold uppercase tracking-[0.2em] text-parchment">
            {cursorText}
          </div>
        )}
      </motion.div>

      {/* Inner Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-parchment pointer-events-none z-[101] transform -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          x: cursorX,
          y: cursorY,
          scale: cursorType === 'default' ? 1.0 : 0.5,
          opacity: cursorType === 'image-reveal' || cursorType === 'reserve' ? 0.3 : 1.0,
        }}
      />

      {/* Floating Image Reveal Preview window offset from cursor */}
      {cursorType === 'image-reveal' && revealImg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed pointer-events-none z-[99] w-48 h-64 rounded-lg overflow-hidden shadow-2xl border border-parchment/10 bg-charcoal"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            // Offset slightly so it hovers next to the cursor instead of blocking
            marginLeft: '40px',
            marginTop: '-120px',
          }}
        >
          <img
            src={revealImg}
            alt="Reveal Preview"
            className="w-full h-full object-cover grayscale brightness-90 contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        </motion.div>
      )}
    </>
  );
}
