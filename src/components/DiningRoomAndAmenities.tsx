import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DiningOutlet } from '../types';
import { ArrowUpRight, Compass, UtensilsCrossed } from 'lucide-react';

const OUTLETS_DATA: DiningOutlet[] = [
  {
    id: "dining-room",
    name: "The Anchor Dining Room",
    concept: "HEIRLOOM FINE DINING",
    hours: "17:00 — 22:30",
    description: "Michelin-inspired gastronomy situated directly above the fast-running currents of the St. Clair riverfront. Featuring freshly sourced whitefish, duck ballotine, and heritage wheat tablesmith rolls.",
    image: "/src/assets/images/st_clair_dining_room_1779727593233.png",
    accentQuote: "“Honest craftsmanship, local roots, and a timeless Great Lakes view.”"
  },
  {
    id: "whiskey-cellar",
    name: "The Prohibition Vault",
    concept: "RARE RYE & SPEAKEASY",
    hours: "20:00 — 02:00",
    description: "An underground brick vault storing the finest selection of hand-poured ryes and single malts. Taught by master mixologists who honor the classic 1920s liquor runs across the Canadian border.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    accentQuote: "“Whiskey is a liquid history. We pour ours straight from the source.”"
  },
  {
    id: "riverfront-terrace",
    name: "The Veranda",
    concept: "AL FRESCO CHAMPAGNE",
    hours: "11:00 — 20:00",
    description: "Breathe in the mineral-rich Great Lakes breeze while selecting cold oysters, chilled dry whites, and wood-fired flatbreads on our expansive white plaster terrace.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
    accentQuote: "“Where current meets companion under the lakeside pastel skies.”"
  },
  {
    id: "pavilion-bar",
    name: "The Heritage Pavilion",
    concept: "RUSTIC BOTANICAL BAR",
    hours: "15:00 — 23:00",
    description: "Soaring under the 200-year-old hand-hewn hemlock rafters inside our restored barn, our botanical bar celebrates clean gin distillations and wild-harvested floral bitters.",
    image: "/src/assets/images/st_clair_restored_barn_1779727626592.png",
    accentQuote: "“Deep forest heritage combined with sleek, custom modern glass design.”"
  }
];

export default function DiningRoomAndAmenities() {
  const [hoveredOutlet, setHoveredOutlet] = useState<DiningOutlet | null>(null);
  const [activeOutlet, setActiveOutlet] = useState<DiningOutlet>(OUTLETS_DATA[0]);

  // Use hovered item as visual anchor, fall back to active item
  const currentVisual = hoveredOutlet || activeOutlet;

  return (
    <div id="provisions" className="relative w-full min-h-screen bg-charcoal py-24 px-8 md:px-16 overflow-hidden flex flex-col justify-between">
      
      {/* INTENTIONAL SMOOTH BACKGROUND ATMOSPHERE SHIFT */}
      {/* Blurred atmospheric image layer behind the text, responding to hovered outlet */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-1000 ease-in-out">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentVisual.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.12, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={currentVisual.image} 
              alt="Atmospheric Background" 
              className="w-full h-full object-cover blur-[25px] saturate-[0.8]"
              referrerPolicy="no-referrer"
            />
            {/* Dark heavy vignette for ultra premium contrast */}
            <div className="absolute inset-0 bg-charcoal/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SECTION HEADER */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-16">
        <div className="md:col-span-6">
          <div className="flex items-center gap-2 text-[9px] font-sans font-bold tracking-[0.25em] text-parchment/60 uppercase">
            <UtensilsCrossed size={10} className="text-color-lakes-blue-light" />
            THE CULINARY CHAPTER
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-parchment mt-3">
            Restaurants & Bars of the Inn
          </h2>
        </div>
        <div className="md:col-span-6 flex items-start md:justify-end">
          <p className="text-[11px] md:text-xs font-sans text-parchment/60 leading-relaxed font-light max-w-sm md:text-right mt-2 md:mt-0">
            Hover over any dining room link to experience the immediate atmosphere shift of the space. Every plate tells our historic geographic lineage.
          </p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN BALANCED COMPOSITION */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* LEFT COLUMN: INTERACTIVE NAVIGATION LINKS */}
        <div className="lg:col-span-6 space-y-2">
          {OUTLETS_DATA.map((outlet) => {
            const isSelected = activeOutlet.id === outlet.id;
            const isHovered = hoveredOutlet?.id === outlet.id;

            return (
              <div
                key={outlet.id}
                onMouseEnter={() => setHoveredOutlet(outlet)}
                onMouseLeave={() => setHoveredOutlet(null)}
                onClick={() => setActiveOutlet(outlet)}
                className="group relative block border-b border-parchment/10 py-6 md:py-8 cursor-pointer overflow-hidden transition-all duration-300"
              >
                {/* Horizontal slide link reveal effect */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[9px] font-sans tracking-[0.1em] text-parchment/40 font-mono">
                      0{OUTLETS_DATA.indexOf(outlet) + 1}
                    </span>
                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-serif tracking-tight transition-all duration-500 font-medium ${isSelected || isHovered ? 'text-parchment translate-x-3' : 'text-parchment/50'}`}>
                      {outlet.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="hidden sm:inline text-[9px] font-sans tracking-[0.2em] text-parchment/45 uppercase">
                      {outlet.concept}
                    </span>
                    <motion.div
                      animate={{ rotate: isSelected || isHovered ? 45 : 0 }}
                      className={`transition-colors duration-500 ${isSelected || isHovered ? 'text-parchment' : 'text-parchment/30'}`}
                    >
                      <ArrowUpRight size={18} />
                    </motion.div>
                  </div>
                </div>

                {/* Left high-end line sweep bar */}
                <div className="absolute left-0 bottom-0 h-[1.5px] bg-color-lakes-blue-light w-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: REVEAL PREVIEW FRAMED CANVAS */}
        <div className="lg:col-span-6 h-full flex flex-col justify-center items-center">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-parchment/10 bg-charcoal">
            
            {/* Cinematic Slide Transition */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentVisual.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentVisual.image}
                  alt={currentVisual.name}
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 duration-1000 transition-all scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Vintage dark film tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/15 to-transparent z-10" />

                {/* Display hours/concept on image card */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-baseline z-20 text-parchment">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] bg-charcoal/60 px-3 py-1.5 rounded backdrop-blur border border-parchment/5">
                    {currentVisual.concept}
                  </span>
                  <span className="text-[10px] font-sans tracking-[0.1em] font-light">
                    {currentVisual.hours}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SULTRY QUOTES & DESCRIPTION BLOCK */}
          <div className="w-full max-w-lg mt-8 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVisual.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <p className="text-sm font-serif italic text-parchment/90 font-medium leading-relaxed">
                  {currentVisual.accentQuote}
                </p>
                <p className="text-[11px] font-sans text-parchment/60 font-light leading-relaxed">
                  {currentVisual.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* FOOTER METRICS IN CONFLICT */}
      <div className="relative z-10 w-full mt-16 pt-6 border-t border-parchment/5 flex justify-between items-center text-[10px] tracking-[0.2em] font-mono text-parchment/35">
        <div className="flex items-center gap-2">
          <Compass size={11} className="animate-spin-slow text-color-lakes-blue-light" />
          <span>PORT INLET NAVIGATION CO.</span>
        </div>
        <span>MICHIGAN WATER CULLS</span>
      </div>

    </div>
  );
}
