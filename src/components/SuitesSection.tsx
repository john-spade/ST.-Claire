import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomSuite } from '../types';
import { BedDouble, Eye, Layers, Compass } from 'lucide-react';

const SUITES_DATA: RoomSuite[] = [
  {
    id: "gilded-age",
    name: "The Gilded Age Suite",
    type: "suite",
    sqft: 1200,
    occupancy: 2,
    rate: 680,
    view: "Infinite River & Shipping Channel View",
    highlights: ["In-room freestanding copper soaking tub", "Historic 1920s gold-leaf plaster detailing", "Private mahogany spirits cart with rare ryes"],
    image: "/src/assets/images/st_clair_luxury_room_1779727609373.png"
  },
  {
    id: "captains-quarters",
    name: "The Captain’s Quarters",
    type: "suite",
    sqft: 980,
    occupancy: 2,
    rate: 520,
    view: "East-Facing Sunrise River Panorama",
    highlights: ["Sainte-Genevieve limestone hearth fireplace", "Vintage leather writing desk with typewriter", "Full-pane arched steel windows"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hemlock-pavilion",
    name: "The Hemlock Pavilion Room",
    type: "room",
    sqft: 720,
    occupancy: 2,
    rate: 390,
    view: "Bespoke Botanical Garden & Barn View",
    highlights: ["Exposed 200-year-old Michigan Hemlock beams", "Sleek Swiss-plaster bathroom wetroom", "Private courtyard access"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
  }
];

interface SuitesSectionProps {
  onReserveSuite: (suiteName: string) => void;
}

export default function SuitesSection({ onReserveSuite }: SuitesSectionProps) {
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);
  const activeSuite = SUITES_DATA[activeSuiteIndex];

  return (
    <section id="suites" className="relative w-full min-h-screen bg-parchment text-charcoal py-24 px-8 md:px-16 overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-16">
        <div className="md:col-span-6">
          <div className="flex items-center gap-2 text-[9px] font-sans font-bold tracking-[0.25em] text-color-lakes-blue uppercase">
            <Layers size={10} className="stroke-[2.5]" />
            THE SANCTUARIES
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-color-lakes-blue mt-3">
            Lodgings of Stately Rest
          </h2>
        </div>
        <div className="md:col-span-6 flex items-start md:justify-end">
          <p className="text-[11px] md:text-xs font-sans text-charcoal/60 leading-relaxed font-light max-w-sm md:text-right mt-2 md:mt-0">
            A serene transition of 1920s architecture, raw limestone, and crisp premium Italian coordinate linens tailored for perfect river seclusion.
          </p>
        </div>
      </div>

      {/* THREE INTERACTIVE VIEW SPLITS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: ACTIVE VIEW IMAGE SHOWCASE WITH ACCURATE HIGHLIGHT DETAILS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg shadow-2xl border border-charcoal/10 bg-charcoal">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSuite.id}
                src={activeSuite.image}
                alt={activeSuite.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover grayscale brightness-95 saturate-[0.85]"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute top-4 left-4 bg-charcoal/80 text-parchment/90 text-[8px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded backdrop-blur">
              {activeSuite.type} // {activeSuite.sqft} SQ FT
            </div>
          </div>

          {/* DOCK BAR METADATA INFO */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1">
              <span className="text-[8px] font-mono text-charcoal/40 uppercase tracking-[0.1em]">VIEWPOINT OUTLOOK</span>
              <p className="text-xs font-serif text-color-lakes-blue font-medium">{activeSuite.view}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-mono text-charcoal/40 uppercase tracking-[0.1em]">NIGHTLY EXCHANGE</span>
              <p className="text-xs font-sans text-color-lakes-blue font-bold">${activeSuite.rate} USD / NIGHT</p>
            </div>
            <div className="col-span-2 sm:col-span-1 space-y-1">
              <span className="text-[8px] font-mono text-charcoal/40 uppercase tracking-[0.1em]">CAPACITY LIMIT</span>
              <p className="text-xs font-sans text-color-lakes-blue">Strictly {activeSuite.occupancy} Guests Only</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUITE LIST & COMPREHENSIVE BULLET AMENITIES */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
          
          {/* NAVIGATION MATRIX */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-charcoal/40 tracking-[0.2em] uppercase font-bold">SUITE ACCORDION</span>
            <div className="space-y-2">
              {SUITES_DATA.map((suite, index) => {
                const isActive = activeSuiteIndex === index;
                return (
                  <button
                    key={suite.id}
                    onClick={() => setActiveSuiteIndex(index)}
                    className={`w-full text-left py-4 px-5 border rounded-lg transition-all duration-500 cursor-pointer flex items-center justify-between ${isActive ? 'bg-color-lakes-blue text-parchment border-color-lakes-blue' : 'bg-transparent text-charcoal/70 hover:bg-charcoal/5 border-charcoal/10'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-mono tracking-widest ${isActive ? 'text-parchment/60' : 'text-charcoal/40'}`}>
                        0{index + 1}
                      </span>
                      <span className="font-serif font-semibold md:text-lg">{suite.name}</span>
                    </div>
                    <span className="text-[9px] font-sans tracking-[0.1em] font-semibold opacity-80">
                      ${suite.rate}/NIGHT
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE METADATA LIST highlights */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BedDouble size={12} className="text-color-lakes-blue" />
              <span className="text-[10px] tracking-[0.2em] font-sans font-bold text-color-lakes-blue uppercase">BESPOKE SUITE HIGHLIGHTS</span>
            </div>
            <ul className="space-y-3 text-[11px] md:text-xs text-charcoal/75 leading-relaxed font-light">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSuite.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2.5"
                >
                  {activeSuite.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-sans text-charcoal/70">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-color-lakes-blue mt-1.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </motion.div>
              </AnimatePresence>
            </ul>
          </div>

          {/* RESERVE BUTTON TRIGGER */}
          <button
            onClick={() => onReserveSuite(activeSuite.name)}
            data-reveal-image={activeSuite.image}
            data-cursor-text="CONFIRM"
            className="w-full bg-color-lakes-blue text-parchment py-4 rounded-lg font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-500 hover:tracking-[0.25em] hover:bg-opacity-90 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>RESERVE {activeSuite.name.toUpperCase()}</span>
          </button>

        </div>

      </div>

      {/* METRIC DOCK */}
      <div className="w-full mt-16 pt-6 border-t border-charcoal/10 flex justify-between items-center text-[10px] tracking-[0.2em] font-mono text-charcoal/40">
        <div className="flex items-center gap-2">
          <Compass size={11} className="text-color-lakes-blue stroke-[2]" />
          <span>ST. CLAIR ARCHITECTURAL CODE R-19</span>
        </div>
        <span>HISTORIC HOTELS ASSOCIATION</span>
      </div>

    </section>
  );
}
