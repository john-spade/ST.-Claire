import { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderNavigationProps {
  onReserveClick: () => void;
}

export default function HeaderNavigation({ onReserveClick }: HeaderNavigationProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 50;

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Accommodations', href: '#suites' },
    { name: 'Restaurants & Bars', href: '#provisions' },
    { name: 'Weddings', href: '#weddings' },
    { name: 'Events & Meetings', href: '#events' },
    { name: 'Photo Gallery', href: '#gallery' },
  ];

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-charcoal/95 backdrop-blur-md border-b border-parchment/10 py-3 md:py-4 shadow-2xl'
            : 'bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <a
            href="#hero"
            className="flex items-center gap-2 group pointer-events-auto shrink-0 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="whitespace-nowrap text-base sm:text-lg md:text-xl font-serif font-black tracking-[0.18em] text-parchment select-none block transition-transform group-hover:scale-[1.02] duration-300">
              ST. CLAIR <span className="font-serif italic font-light text-color-lakes-blue-light">INN</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-6 2xl:gap-8 flex-1 min-w-0 justify-center max-w-3xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap text-[9px] xl:text-[11px] uppercase tracking-[0.06em] xl:tracking-[0.2em] font-semibold text-parchment/90 hover:text-parchment transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-color-lakes-blue-light transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
            <span className="hidden xl:inline text-[9px] uppercase tracking-[0.15em] font-mono opacity-50 text-parchment whitespace-nowrap">
              Est. 1926
            </span>
            <div className="hidden xl:block w-px h-4 bg-parchment/20" />
            <button
              onClick={onReserveClick}
              className="border border-parchment/35 hover:border-parchment/95 px-4 xl:px-5 py-2 rounded-full text-[9px] xl:text-[10px] tracking-[0.15em] xl:tracking-[0.18em] hover:bg-parchment hover:text-charcoal duration-500 transition-all font-semibold uppercase cursor-pointer text-parchment whitespace-nowrap"
            >
              Reserve
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <button
              onClick={onReserveClick}
              className="border border-parchment/30 hover:border-parchment px-3 py-1.5 rounded-full text-[8px] sm:text-[9px] tracking-[0.12em] font-semibold uppercase text-parchment bg-charcoal/40 whitespace-nowrap"
            >
              Reserve
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-parchment hover:text-color-lakes-blue-light transition-colors z-50 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 h-screen bg-charcoal/95 backdrop-blur-lg z-40 flex flex-col justify-between p-8 pt-32 text-parchment border-b border-parchment/10"
          >
            <div className="flex flex-col gap-6 uppercase tracking-[0.2em] text-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif italic text-parchment/85 hover:text-parchment"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 text-center pb-8 border-t border-parchment/10 pt-8">
              <p className="text-[10px] font-mono uppercase tracking-widest text-parchment/50">
                St. Clair Inn — Established 1926
              </p>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="w-full max-w-xs border border-parchment/40 py-3 rounded-full text-xs tracking-widest uppercase font-semibold text-parchment flex items-center justify-center gap-2 hover:bg-parchment hover:text-charcoal transition-all duration-300"
              >
                <Calendar size={14} />
                <span>RESERVE INSTANTLY</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
