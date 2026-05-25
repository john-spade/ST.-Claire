import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TimelineItem } from '../types';
import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "1826",
    title: "The Historic Beam",
    location: "The Heritage Barn",
    description: "Centuries before the Inn’s foundation, pioneering craftsmen timbered Michigan hemlock into a colossal barn frame, which stands painstakingly preserved at the center of our master property today.",
    image: "/src/assets/images/st_clair_restored_barn_1779727626592.png"
  },
  {
    year: "1926",
    title: "The Grand Inauguration",
    location: "The Brick Pavilion",
    description: "The St. Clair Inn officially opens its massive carved doors to Gilded Age high society, immediately celebrated as the premiere anchorage for passenger steamliners and yachts cruising the St. Clair River.",
    image: "/src/assets/images/st_clair_inn_hero_1779727576521.png"
  },
  {
    year: "1948",
    title: "Whiskey, Gold & Jazz",
    location: "The Anchor Room",
    description: "During the mid-century shipping boom, the Inn establishes itself as a secretive sanctuary, hosting jazz legends, captains of industry, and storing legendary collections of rare Canadian ryes.",
    image: "/src/assets/images/st_clair_dining_room_1779727593233.png"
  },
  {
    year: "1982",
    title: "Preserved Heritage",
    location: "Riverfront Terraces",
    description: "Declared an official historical monument, the iconic brick masonry, copper details, and Tudor-style gables undergo delicate preservation, preventing architectural intrusion.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2026",
    title: "The Swiss Restoration",
    location: "St. Clair Inn",
    description: "A masterful reconstruction combines raw minimalist spatial luxury with the Inn’s historic bones, pairing vintage 1920s molding with sleek stone blocks and a pristine Great Lakes gaze.",
    image: "/src/assets/images/st_clair_luxury_room_1779727609373.png"
  }
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef
  });

  // Map scroll progress (0 to 1) to transform percentage (0 to -80%)
  // Subtracting the screen size to stop at the last timeline card
  const xTranslation = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  useEffect(() => {
    const handleScrollUpdate = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const absoluteScrolled = -rect.top;
        const totalScrollableHeight = rect.height - window.innerHeight;
        const progress = Math.min(Math.max(absoluteScrolled / totalScrollableHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScrollUpdate);
    return () => window.removeEventListener('scroll', handleScrollUpdate);
  }, []);

  return (
    <div id="history" ref={containerRef} className="relative w-full h-[320vh] bg-parchment text-charcoal">
      
      {/* Dynamic Background Element */}
      <div className="absolute inset-y-0 left-0 w-full pointer-events-none opacity-[0.02]" />

      {/* Sticky Frame for Viewports */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-16">
        
        {/* Section Header */}
        <div className="px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-4 items-end z-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-color-lakes-blue">
              <Bookmark size={10} className="stroke-[2.5]" />
              CHRONOLOGY OF COILED TIME
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight mt-3 text-color-lakes-blue">
              Two Centuries of Stature & Stone
            </h2>
          </div>
          <div className="md:col-span-6 flex flex-col md:items-end justify-end">
            <p className="text-xs font-sans text-charcoal/60 leading-relaxed max-w-sm font-light md:text-right">
              Scroll downward to slide horizontally through the evolution of Michigan’s most prestigious riverfront rest.
            </p>
            {/* Timeline horizontal guide meter */}
            <div className="w-48 h-[2px] bg-charcoal/10 relative overflow-hidden mt-4">
              <div 
                className="absolute left-0 top-0 h-full bg-color-lakes-blue transition-all duration-300 ease-out" 
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal Timeline Slider Frame */}
        <div className="w-full flex-grow flex items-center overflow-hidden h-[55vh]">
          <motion.div 
            style={{ x: xTranslation }} 
            className="flex gap-12 px-8 md:px-16 select-none"
          >
            {TIMELINE_DATA.map((item, index) => (
              <div 
                key={index} 
                className="w-[85vw] md:w-[35vw] flex-shrink-0 flex flex-col justify-between group cursor-grab active:cursor-grabbing"
              >
                
                {/* Year display with large elegant typography */}
                <div className="relative mb-4 flex items-baseline justify-between border-b border-charcoal/10 pb-4">
                  <h3 className="font-serif font-bold text-5xl md:text-6xl tracking-tight text-color-lakes-blue group-hover:scale-105 duration-700 transition-transform origin-left">
                    {item.year}
                  </h3>
                  <span className="text-[9px] font-sans tracking-[0.15em] text-charcoal/50 uppercase font-semibold">
                    {item.location}
                  </span>
                </div>

                {/* Styled image container with hover visual trigger */}
                <div 
                  className="w-full aspect-[16/10] overflow-hidden rounded-lg mb-6 shadow-md border border-charcoal/5 relative"
                  data-reveal-image={item.image}
                  data-cursor-text="EXPAND"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale opacity-[0.9] hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Metadata content */}
                <div>
                  <h4 className="text-lg md:text-xl font-serif font-medium text-color-lakes-blue mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] md:text-xs font-sans text-charcoal/65 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}

            {/* End Spacer */}
            <div className="w-[15vw] md:w-[25vw] flex-shrink-0 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] tracking-[0.2em] font-sans text-charcoal/40 uppercase font-semibold mb-2">CONTINUE</span>
              <p className="text-xl font-serif text-color-lakes-blue italic font-medium">Bespoke luxury awaits...</p>
            </div>

          </motion.div>
        </div>

        {/* Dynamic Timeline Bottom Navigation Row */}
        <div className="px-8 md:px-16 flex items-center justify-between text-[10px] tracking-[0.18em] text-charcoal/40 font-mono z-10 border-t border-charcoal/5 pt-6">
          <div className="flex items-center gap-2 font-sans font-bold">
            <span className="color-lakes-blue font-bold">01</span>
            <div className="w-8 h-[1px] bg-charcoal/25" />
            <span>ERA SELECTION</span>
          </div>
          <span>ST. CLAIR HISTORIC ARCHIVES</span>
          <div className="flex gap-4">
            <span>SCROLL TO VENTURE</span>
          </div>
        </div>

      </div>

    </div>
  );
}
