import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import MagneticCursor from './components/MagneticCursor';
import HeaderNavigation from './components/HeaderNavigation';
import HeroSection from './components/HeroSection';
import ScrollRevealText from './components/ScrollRevealText';
import TimelineSection from './components/TimelineSection';
import DiningRoomAndAmenities from './components/DiningRoomAndAmenities';
import SuitesSection from './components/SuitesSection';
import ExtraSections from './components/ExtraSections';
import BookingModal from './components/BookingModal';
import FooterSection from './components/FooterSection';
import { Compass, Ship, Wind, Sparkles } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState('');

  const handleOpenBooking = (suiteName?: string) => {
    setSelectedSuite(suiteName || 'The Gilded Age Suite');
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen grain bg-charcoal text-parchment font-sans antialiased text-shadow-sm selection:bg-color-lakes-blue selection:text-parchment">
      
      {/* MAGENTIC CUSTOM CURSOR CONTROL */}
      <MagneticCursor />

      {/* ADAPTIVE HEADER NAVIGATION BAR */}
      <HeaderNavigation onReserveClick={() => handleOpenBooking()} />

      {/* STICKY TOP BACKGROUND GRADIENT (Subtle Atmospheric Layer) */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-color-lakes-blue/15 via-charcoal to-charcoal pointer-events-none -z-10" />

      {/* HERO SECTION WITH ZOOM-ON-SCROLL & SPLIT TEXT */}
      <HeroSection onReserveClick={() => handleOpenBooking()} />

      {/* INTRODUCTORY GRID BLOCK (THE HERITAGE MANIFEST) */}
      {/* This light parchment section acts as a structural dock directly following the hero slide transition */}
      <section className="relative bg-parchment text-charcoal py-32 px-8 md:px-16 border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Big Prose Typography statement */}
            <div className="lg:col-span-7 space-y-6">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10px] font-mono tracking-[0.25em] text-color-lakes-blue uppercase font-bold block"
              >
                THE MODERN HERITAGE
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight font-medium text-color-lakes-blue">
                <ScrollRevealText 
                  text="An exquisite study in structural duality. Bricks of 1920 meet the sheer glass of Swiss minimalism." 
                  delay={0.1}
                />
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-[1.5px] bg-color-lakes-blue-light" 
              />
            </div>

            {/* Right Detailed Description columns */}
            <div className="lg:col-span-5 space-y-6 mt-4 lg:mt-8">
              <div className="text-xs md:text-sm font-sans text-charcoal/85 leading-relaxed font-light">
                <ScrollRevealText 
                  text="Perched precisely where the clear glacial waters of the St. Clair shipping channels meet the Michigan bedrock, the Inn stands restored. We have preserved the rugged brick-clad Tudor exterior while completely remodeling the internal spaces with an ultra-minimalist, high-symmetry architectural restraint inspired by contemporary Swiss lodges." 
                  delay={0.2}
                  wordClassName="font-light text-charcoal/75"
                />
              </div>
              <div className="text-xs md:text-sm font-sans text-charcoal/85 leading-relaxed font-light pt-2">
                <ScrollRevealText 
                  text="This is a place built for the quietest seekers. No visual clutter. No unneeded noise. Only the perpetual, rhythmic flow of majestic Great Lakes steel tankers sliding silently past your floor-to-ceiling windows." 
                  delay={0.4}
                  wordClassName="font-semibold text-color-lakes-blue"
                />
              </div>
            </div>

          </div>

          {/* THREE-COLUMN BENTO GRID SPECIFICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-charcoal/10 pt-16">
            
            <div className="space-y-4 group">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-charcoal/5 rounded-full group-hover:scale-110 duration-500 transition-all text-color-lakes-blue">
                  <Ship size={16} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.2em] font-black text-color-lakes-blue uppercase">01 / COASTAL WATCH</span>
              </div>
              <h4 className="text-lg font-serif font-medium text-color-lakes-blue">Infinite River Gaze</h4>
              <p className="text-xs text-charcoal/65 leading-relaxed font-light">
                Every dining area and suite points directly east, mirroring the daily sunrises of the harbor.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-charcoal/5 rounded-full group-hover:scale-110 duration-500 transition-all text-color-lakes-blue">
                  <Wind size={16} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.2em] font-black text-color-lakes-blue uppercase">02 / NATURAL AIRS</span>
              </div>
              <h4 className="text-lg font-serif font-medium text-color-lakes-blue">Deep Hemlock Scent</h4>
              <p className="text-xs text-charcoal/65 leading-relaxed font-light">
                Airways are conditioned past historic weathered wood beams, filling the interior with organic, dry pine notes.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-charcoal/5 rounded-full group-hover:scale-110 duration-500 transition-all text-color-lakes-blue">
                  <Compass size={16} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.2em] font-black text-color-lakes-blue uppercase">03 / HISTORICAL VAULT</span>
              </div>
              <h4 className="text-lg font-serif font-medium text-color-lakes-blue">Prohibition Legacy</h4>
              <p className="text-xs text-charcoal/65 leading-relaxed font-light">
                Explore rare, hand-labeled Canadian ryes hidden in our restored underground brick vaults since 1926.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CHRONOLOGY SECION (HORIZONTAL TIMELINE) */}
      <TimelineSection />

      {/* DESIGN BRIEF IMAGE BANNER INSULATION */}
      <section className="relative w-full h-[60vh] bg-charcoal flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/st_clair_dining_room_1779727593233.png" 
            alt="Cinematic Glimpse" 
            className="w-full h-full object-cover scale-105 brightness-50 contrast-105 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-charcoal/70 z-10" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-2xl space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-[8px] font-sans font-bold tracking-[0.3em] text-color-lakes-light-blue uppercase">
            <Sparkles size={11} className="text-color-lakes-blue-light animate-pulse" />
            THE CONVENIENCE OF PLACE
          </div>
          <h3 className="text-3xl md:text-4xl font-serif text-parchment leading-tight font-light">
            “There is a profound luxury in doing exactly one thing perfectly on a clear river shore.”
          </h3>
          <p className="text-[10px] font-sans font-bold tracking-[0.1em] text-parchment/50 uppercase">
            — THE ST. CLAIR CHRONICLES, VOL. I
          </p>
        </div>
      </section>

      {/* GASTRONOMY INTERACTIVE SECTION (DINING & AMENITIES) */}
      <DiningRoomAndAmenities />

      {/* ACCOMMODATIONS & ROOM SUITES */}
      <SuitesSection onReserveSuite={(suiteName) => handleOpenBooking(suiteName)} />

      {/* WEDDINGS, MEETING EVENTS & GALLERY SECTIONS */}
      <ExtraSections />

      {/* FOOTER ANCHOR BLOCK */}
      <FooterSection />

      {/* DYNAMIC RESERVATION BOOKINGS MODAL */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preSelectedSuite={selectedSuite}
      />

    </div>
  );
}
