import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  tagline: string;
  subtitle: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "ST. CLAIR INN",
    tagline: "EST. 1926",
    subtitle: "A monument of 1920s architecture restored on the St. Clair River, designed for seekers of quiet luxury and historic depth.",
    image: "/src/assets/images/st_clair_inn_hero_1779727576521.png"
  },
  {
    id: 2,
    title: "THE PROVISIONS",
    tagline: "FINE GASTRONOMY",
    subtitle: "Sophisticated candlelit settings overlooking the sweeping currents, featuring locally sourced heritage grains, custom whiskeys, and legendary culinary poise.",
    image: "/src/assets/images/st_clair_dining_room_1779727593233.png"
  },
  {
    id: 3,
    title: "THE SANCTUARY",
    tagline: "BOUTIQUE SUITES",
    subtitle: "A seamless transition of historic rich millwork, polished plaster walls, and hand-woven premium linens aligned with raw Swiss minimalist restraint.",
    image: "/src/assets/images/st_clair_luxury_room_1779727609373.png"
  }
];

interface HeroProps {
  onReserveClick: () => void;
}

export default function HeroSection({ onReserveClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(800);
  const [canvasWave, setCanvasWave] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync scroll positioning
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Slide interval loop of 7.5 seconds for cinematic effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Canvas Liquid Distortion Effect simulation
  // Render high-grain and custom wavy water shader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const img = new Image();
    img.src = SLIDES[currentSlide].image;

    let transitionProgress = 1.0;
    let currentImg = img;
    let isTransitioning = false;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw active image with slight liquid wavy displacement on vertices
      const waveOffset = Math.sin(time * 0.001) * 8;
      
      // Calculate high quality cover aspect ratio
      const imgAspect = currentImg.width / currentImg.height;
      const canvasAspect = width / height;
      let drawW = width;
      let drawH = height;
      let drawX = 0;
      let drawY = 0;

      if (canvasAspect > imgAspect) {
        drawH = width / imgAspect;
        drawY = (height - drawH) / 2;
      } else {
        drawW = height * imgAspect;
        drawX = (width - drawW) / 2;
      }

      // Draw Image with heatwave distortion effect using slicing
      const slices = 40;
      for (let i = 0; i < slices; i++) {
        const sliceH = height / slices;
        const sourceOffsetY = (currentImg.height / slices) * i;
        const destOffsetY = sliceH * i;
        
        // Calculate variable horizontal offset based on sine functions to simulate liquid currents of the Great Lakes
        const xOffset = Math.sin(i * 0.25 + time * 0.002) * (4 + (scrollY * 0.015));

        ctx.drawImage(
          currentImg,
          0,
          sourceOffsetY,
          currentImg.width,
          currentImg.height / slices,
          drawX + xOffset,
          drawY + destOffsetY,
          drawW,
          sliceH
        );
      }

      // Add high-end vignettes and warm organic tint
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width / 4,
        width / 2,
        height / 2,
        width * 0.7
      );
      gradient.addColorStop(0, 'rgba(17, 18, 21, 0.0)');
      gradient.addColorStop(0.5, 'rgba(17, 18, 21, 0.25)');
      gradient.addColorStop(1, 'rgba(17, 18, 21, 0.85)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    img.onload = () => {
      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentSlide, scrollY]);

  // Calculate zoom on scroll progression:
  // Starts with full width/height (0px padding), goes down to 10% vertical / 12% horizontal padding, and 24px border radius.
  const scrollLimit = 500;
  const scrollRatio = Math.min(scrollY / scrollLimit, 1);
  
  // Custom styled parameters based on scroll ratio
  const containerPaddingX = scrollRatio * 80; // up to 80px
  const containerPaddingY = scrollRatio * 80; // up to 80px
  const containerBorderRadius = scrollRatio * 24; // up to 24px
  const textSplitLeft = scrollRatio * -250; // text moves left
  const textSplitRight = scrollRatio * 250; // text moves right
  const textScale = 1 + scrollRatio * 0.25; // text grows
  const textOpacity = 1 - scrollRatio * 1.5; // fades early

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section id="hero" className="relative w-full h-[155vh] bg-charcoal overflow-visible">
      
      {/* FULL-VIEWPORT HERO FRAME CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Zooming dynamic frame */}
        <div
          className="relative w-full h-full ease-out transition-all duration-75 flex items-center justify-center bg-charcoal border-b border-parchment/5"
          style={{
            paddingLeft: `${containerPaddingX}px`,
            paddingRight: `${containerPaddingX}px`,
            paddingTop: `${containerPaddingY}px`,
            paddingBottom: `${containerPaddingY}px`,
          }}
        >
          <div 
            className="w-full h-full relative overflow-hidden transition-all duration-300 shadow-2xl"
            style={{ borderRadius: `${containerBorderRadius}px` }}
          >
            {/* Liquid Distortion WebGL style Canvas */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-[0.70]"
            />

            {/* Static Image Fallback behind transparent canvas */}
            <div className="absolute inset-0 -z-10 bg-charcoal" />

            {/* DARK GRADIENT OVERLAYS */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-charcoal/65 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent pointer-events-none" />

            {/* SWISS EDITORIAL VERTICAL RAIL */}
            <div className="absolute right-6 md:right-12 top-0 vertical-rail h-full flex justify-between py-24 text-[10px] uppercase tracking-[0.25em] opacity-40 text-parchment pointer-events-none z-20">
              <span>Modern Heritage</span>
              <div className="flex-1 border-r border-parchment/25 mx-auto my-12"></div>
              <span>Est. 1926</span>
            </div>

            {/* TEXT REVEAL & HERO COPY WITH PARALLAX TYPOGRAPHY SPLITTING */}
            <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-24 z-20">
              
              {/* Splitting Header Block */}
              <div 
                className="w-full text-center relative pointer-events-none select-none mb-10 overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-parchment/60 font-semibold mb-2 block">
                    {SLIDES[currentSlide].tagline}
                  </span>
                  
                  {/* SPLITTING LETTERS */}
                  <div className="flex flex-col items-center justify-center font-serif font-black tracking-tight leading-[0.85] text-parchment select-none text-shadow-md">
                    <div className="text-6xl sm:text-8xl lg:text-[140px] flex gap-8">
                      <motion.span 
                        style={{ 
                          x: textSplitLeft, 
                          scale: textScale, 
                          transformOrigin: 'right center'
                        }}
                        className="inline-block"
                      >
                        ST.
                      </motion.span>
                      <motion.span 
                        style={{ 
                          x: textSplitRight, 
                          scale: textScale, 
                          transformOrigin: 'left center'
                        }}
                        className="inline-block italic opacity-20"
                      >
                        CLAIR
                      </motion.span>
                    </div>
                    
                    <div className="text-6xl sm:text-8xl lg:text-[140px] -mt-2 sm:-mt-5">
                      <span className="text-color-lakes-blue">INN</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Bottom Row Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end text-parchment">
                
                {/* Active Slide Text Description */}
                <div className="md:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-[9px] tracking-[0.3em] font-semibold text-color-lakes-blue-light">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-parchment/80 animate-pulse" />
                    THE EXPERIENCE
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h2 className="text-2xl md:text-3xl font-serif tracking-tight font-medium mb-3">
                        {SLIDES[currentSlide].title}
                      </h2>
                      <p className="text-xs md:text-sm font-sans font-light text-parchment/70 leading-relaxed max-w-md">
                        {SLIDES[currentSlide].subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Center Control Actions */}
                <div className="md:col-span-3 flex justify-start md:justify-center items-center gap-4">
                  <button 
                    onClick={handlePrev}
                    className="p-3/2 rounded-full border border-parchment/10 hover:border-parchment/50 text-parchment/70 hover:text-parchment transition-all hover:scale-105 active:scale-95 duration-500 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3/2 rounded-full border border-parchment/10 hover:border-parchment/50 text-parchment/70 hover:text-parchment transition-all hover:scale-105 active:scale-95 duration-500 flex items-center justify-center cursor-pointer"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button 
                    onClick={handleNext}
                    className="p-3/2 rounded-full border border-parchment/10 hover:border-parchment/50 text-parchment/70 hover:text-parchment transition-all hover:scale-105 active:scale-95 duration-500 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Progress Indicators & Slide Selector */}
                <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3 justify-end">
                  <div className="flex gap-2">
                    {SLIDES.map((slide, index) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(index)}
                        className="group flex flex-col items-start gap-1 py-1 text-left cursor-pointer"
                      >
                        <div className="w-12 h-[2px] bg-parchment/15 relative overflow-hidden">
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-parchment" 
                            initial={{ width: "0%" }}
                            animate={{ 
                              width: currentSlide === index 
                                ? "100%" 
                                : "0%"
                            }}
                            transition={{ 
                              duration: currentSlide === index ? 7.5 : 0.3,
                              ease: "linear"
                            }}
                          />
                        </div>
                        <span className={`text-[8px] font-sans tracking-widest transition-colors duration-500 ${currentSlide === index ? 'text-parchment font-semibold' : 'text-parchment/40'}`}>
                          0{slide.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
              
            </div>

            {/* Scroll indicator overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 z-20 pointer-events-none">
              <span className="text-[7px] tracking-[0.25em] font-sans uppercase">SCROLL DOWN</span>
              <motion.div 
                animate={{ y: [0, 4, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowDown size={12} className="text-parchment/70" />
              </motion.div>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER ANCHOR SPACE FOR DOCK IN (Negative margin flow setup to pull the rest of the layout smoothly over scroll context) */}
      <div className="absolute bottom-0 w-full h-[55vh] pointer-events-none flex items-end">
        <div className="w-full py-12 px-8 flex justify-between tracking-[0.12em] text-[9px] text-parchment/40 pointer-events-auto">
          <span>PORT 1926 // ST. CLAIR RIVERFRONT</span>
          <span>ST. CLAIR COUNTY, MICHIGAN</span>
        </div>
      </div>
      
    </section>
  );
}
