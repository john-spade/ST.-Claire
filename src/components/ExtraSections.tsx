import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Landmark, Wine, ShieldCheck, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function ExtraSections() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const galleryImages = [
    {
      url: '/src/assets/images/st_clair_inn_hero_1779727576521.png',
      caption: 'Main Tudor Estate overlooking the St. Clair Shipping Channels',
      tag: 'ARCHITECTURE'
    },
    {
      url: '/src/assets/images/st_clair_dining_room_1779727593233.png',
      caption: 'The Anchor Dining Room - Intimate Lakeside Gastronomy',
      tag: 'GASTRONOMY'
    },
    {
      url: '/src/assets/images/st_clair_luxury_room_1779727609373.png',
      caption: 'The Gilded Age Suite - Exposed Beam & Copper Restoration',
      tag: 'SUITES'
    },
    {
      url: '/src/assets/images/st_clair_restored_barn_1779727626592.png',
      caption: 'The 200-Year-Old Recovered Timber Barn & Prohibition Speakeasy',
      tag: 'HERITAGE'
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      caption: 'Waterfront Ceremony at Dusk - St. Clair River Boardwalk',
      tag: 'WEDDINGS'
    },
    {
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
      caption: 'Executive Meetings Setup under Cathedral Hemlock Arches',
      tag: 'MEETINGS'
    }
  ];

  const handleNextImage = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="w-full bg-charcoal text-parchment overflow-hidden">
      
      {/* 1. WEDDINGS SECTION */}
      <section id="weddings" className="relative bg-parchment text-charcoal py-32 px-8 md:px-16 border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" 
                  alt="St. Clair Waterfront Wedding" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent p-8 text-parchment">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-color-lakes-blue-light block mb-2">WATERFRONT PROMENADE</span>
                  <p className="font-serif italic text-lg leading-snug">
                    “The shipping channels paint an ever-changing cinematic backdrop for eternal bonds.”
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-color-lakes-blue/15 rounded-full -z-10 pointer-events-none hidden md:block" />
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-color-lakes-blue uppercase font-bold">
                  <Heart size={12} className="text-color-lakes-blue-light" />
                  Weddings & Ceremonies
                </div>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight font-medium text-color-lakes-blue">
                  A timeless setting for historic unions.
                </h2>
                <div className="w-24 h-[1.5px] bg-color-lakes-blue-light" />
              </div>

              <div className="space-y-6 text-xs md:text-sm font-sans text-charcoal/75 leading-relaxed font-light">
                <p>
                  Host your celebration direct on the shoreline where passenger steamliners once sailed. Our pristine boardwalk and meticulously groomed lawns provide uninterrupted panoramas of the deep blue waters, offering an atmosphere of Gilded Age grandeur refined by clean, modern architectural restraint.
                </p>
                <p>
                  From candlelit rehearsals inside our majestic 200-Year-Old Barn to grand outdoor dinners on the whitewashed Riverfront Terrace, we adapt our spaces with artistic high symmetry. Your vows are paired with the majestic visual of great steel vessels gliding silently toward the horizon.
                </p>
              </div>

              {/* Unique Offerings Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-charcoal/10 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-color-lakes-blue/10 flex items-center justify-center text-color-lakes-blue">
                    ✓
                  </div>
                  <span className="font-medium text-color-lakes-blue">Up to 250 Waterfront Guests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-color-lakes-blue/10 flex items-center justify-center text-color-lakes-blue">
                    ✓
                  </div>
                  <span className="font-medium text-color-lakes-blue">Custom Chef Curated Tastings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-color-lakes-blue/10 flex items-center justify-center text-color-lakes-blue">
                    ✓
                  </div>
                  <span className="font-medium text-color-lakes-blue">Private Suite Blocks Integrated</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-color-lakes-blue/10 flex items-center justify-center text-color-lakes-blue">
                    ✓
                  </div>
                  <span className="font-medium text-color-lakes-blue">Speakeasy Afterparties Allowed</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. EVENTS & MEETINGS SECTION */}
      <section id="events" className="relative bg-charcoal text-parchment py-32 px-8 md:px-16 border-t border-parchment/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-color-lakes-blue-light uppercase font-bold">
                  <Landmark size={12} className="text-color-lakes-blue-light" />
                  Events & Elite Meetings
                </div>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight font-medium text-parchment">
                  Impeccable privacy.<br/>Inspiring perspective.
                </h2>
                <div className="w-24 h-[1px] bg-parchment/30" />
              </div>

              <div className="space-y-6 text-xs md:text-sm font-sans text-parchment/75 leading-relaxed font-light">
                <p>
                  For summits that demand high mental clarity, the Inn offers bespoke meeting spaces free of municipal distraction. With clean Swiss design styling and quiet harbor positioning, our state-of-the-art quarters serve as the ultimate staging grounds for board meetings, executive retreats, and private family reunions.
                </p>
                <p>
                  Step out of the board session onto our sweeping wood-trimmed terraces to discuss matters over a fine whiskey. We coordinate seamless digital frameworks with premium architectural dignity, surrounding your teams with absolute focus.
                </p>
              </div>

              {/* Custom specs cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-parchment/10">
                <div className="p-4 bg-parchment/5 rounded-xl border border-parchment/10">
                  <div className="text-color-lakes-blue-light font-mono text-xs uppercase tracking-wider mb-1">CAPACITY</div>
                  <div className="text-xl font-serif text-parchment">15 - 120</div>
                  <div className="text-[9px] text-parchment/40">Seated Directors</div>
                </div>
                <div className="p-4 bg-parchment/5 rounded-xl border border-parchment/10">
                  <div className="text-color-lakes-blue-light font-mono text-xs uppercase tracking-wider mb-1">AUDIO/VISUAL</div>
                  <div className="text-xl font-serif text-parchment">Retractable</div>
                  <div className="text-[9px] text-parchment/40">4K Laser Integration</div>
                </div>
                <div className="p-4 bg-parchment/5 rounded-xl border border-parchment/10">
                  <div className="text-color-lakes-blue-light font-mono text-xs uppercase tracking-wider mb-1">CATERING</div>
                  <div className="text-xl font-serif text-parchment">Silver Plates</div>
                  <div className="text-[9px] text-parchment/40">Fine Vault Sommeliers</div>
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 relative group order-1 lg:order-2">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" 
                  alt="Elite Business Boardroom" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent p-8 text-parchment">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-color-lakes-blue-light block mb-2">EXECUTIVE INTRO</span>
                  <p className="font-serif italic text-lg leading-snug">
                    “Absolute structural seclusion guarantees pristine executive outcomes.”
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. PHOTO GALLERY SECTION */}
      <section id="gallery" className="relative bg-charcoal text-parchment py-32 px-8 md:px-16 border-t border-parchment/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-color-lakes-blue-light uppercase font-bold block">
                Visual Sanctuary
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-none font-medium">
                Sovereign Lens
              </h2>
              <div className="w-16 h-[1.5px] bg-color-lakes-blue-light" />
            </div>
            <p className="text-xs md:text-sm font-sans font-light text-parchment/65 max-w-md leading-relaxed">
              Slide through the visual chronicles of St. Clair Inn—reflecting its century of maritime watch, bespoke structural textures, and tranquil light play on the water.
            </p>
          </div>

          {/* ACTIVE IMAGE STYLISH SLIDESHOW FRAME */}
          <div className="relative w-full aspect-video md:aspect-[16/7] overflow-hidden rounded-3xl shadow-2xl group border border-parchment/10 bg-black">
            
            <AnimatePresence mode="wait">
              <motion.img
                key={activeGalleryIndex}
                src={galleryImages[activeGalleryIndex].url}
                alt={galleryImages[activeGalleryIndex].caption}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover brightness-[0.75] contrast-[1.02]"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Gradient Dark Grids */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />

            {/* Float Metadata Pill */}
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-charcoal/85 text-[10px] tracking-[0.2em] font-mono text-parchment/90 border border-parchment/10">
              {galleryImages[activeGalleryIndex].tag} // 0{activeGalleryIndex + 1}
            </div>

            {/* Chevron Navigation Triggers */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button 
                onClick={handlePrevImage}
                className="p-3 rounded-full bg-charcoal/90 hover:bg-parchment hover:text-charcoal border border-parchment/10 text-parchment transition-all duration-300 scale-90 group-hover:scale-100 cursor-pointer"
                aria-label="Previous gallery image"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextImage}
                className="p-3 rounded-full bg-charcoal/90 hover:bg-parchment hover:text-charcoal border border-parchment/10 text-parchment transition-all duration-300 scale-90 group-hover:scale-100 cursor-pointer"
                aria-label="Next gallery image"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Slide Metadata Copy */}
            <div className="absolute bottom-6 inset-x-6 md:inset-x-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 text-parchment pointer-events-none">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-color-lakes-blue-light block mb-2">CAPTURED HARBOR NOTES</span>
                <p className="font-serif italic text-lg md:text-xl text-parchment/95">
                  {galleryImages[activeGalleryIndex].caption}
                </p>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-parchment/50">
                ST. CLAIR CHRONICLES © 1926 — 2026
              </div>
            </div>

          </div>

          {/* DOT SELECTORS INDICATORS */}
          <div className="flex justify-center gap-3 mt-8">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveGalleryIndex(index)}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-500 cursor-pointer flex items-center justify-center ${
                  activeGalleryIndex === index 
                    ? 'border-parchment w-10 bg-parchment/30' 
                    : 'border-parchment/20 bg-parchment/5 hover:border-parchment/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className={`w-1 h-1 rounded-full bg-parchment ${activeGalleryIndex === index ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
