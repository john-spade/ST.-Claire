import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Mail, MapPin, Phone, Send, Check } from 'lucide-react';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="footer" className="relative w-full bg-charcoal text-parchment pt-24 pb-12 px-8 md:px-16 overflow-hidden border-t border-parchment/10">
      
      {/* Background visual motif */}
      <div className="absolute right-0 bottom-0 w-[40vw] h-[40vw] rounded-full bg-color-lakes-blue opacity-5 blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
        
        {/* COL 1: THE DISPATCH NEWSLETTER (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-parchment/50 uppercase">JOINT MAILING LIST</span>
            <h3 className="text-2xl font-serif font-medium tracking-tight">The St. Clair Dispatch</h3>
          </div>
          <p className="text-xs font-sans text-parchment/65 font-light leading-relaxed max-w-sm">
            Sign up to receive periodic dispatches regarding culinary rotations, new historical restorations, and private harbor rates.
          </p>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form 
                key="form"
                onSubmit={handleSubscribe} 
                className="flex items-center border-b border-parchment/30 pb-2 max-w-md relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your secure email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-xs font-sans placeholder-parchment/30 text-parchment focus:outline-none flex-grow w-full py-1 pr-4"
                />
                <button 
                  type="submit" 
                  className="p-1 hover:text-color-lakes-blue-light transition-colors relative z-10 cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                className="flex items-center gap-2 text-color-lakes-blue-light text-xs font-sans font-semibold py-1.5"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Check size={14} className="stroke-[3]" />
                <span>YOU HAVE BEEN LEDGERED SECURELY.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* COL 2: COORDINATES / LOCATION DETAILS (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-parchment/50 uppercase">COORDINATES</span>
            <h3 className="text-xl font-serif font-medium tracking-tight">Our Riverfront Station</h3>
          </div>

          <div className="space-y-4 text-xs font-sans font-light text-parchment/80">
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-color-lakes-blue-light mt-0.5 flex-shrink-0" />
              <div>
                <p>St. Clair Inn Monolith</p>
                <p className="text-parchment/60">500 N Riverside Avenue</p>
                <p className="text-parchment/60">St. Clair, Michigan 48079</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={14} className="text-color-lakes-blue-light flex-shrink-0" />
              <p className="hover:text-parchment transition-colors cursor-pointer">+1 (810) 329-2222</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={14} className="text-color-lakes-blue-light flex-shrink-0" />
              <p className="hover:text-parchment transition-colors cursor-pointer">concierge@stclairinn1926.com</p>
            </div>
          </div>
        </div>

        {/* COL 3: NAVIGATION INDICES (4 columns) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <span className="text-[9px] font-mono tracking-[0.2em] text-parchment/40 uppercase font-black">THE NAVIGATION</span>
            <ul className="space-y-2 text-xs font-sans text-parchment/70 font-light">
              <li className="hover:text-parchment transition-colors cursor-pointer"><a href="#hero">The Inn Entry</a></li>
              <li className="hover:text-parchment transition-colors cursor-pointer"><a href="#history">Chronology</a></li>
              <li className="hover:text-parchment transition-colors cursor-pointer"><a href="#provisions">The Gastronomy</a></li>
              <li className="hover:text-parchment transition-colors cursor-pointer"><a href="#suites">Master Lodgings</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="text-[9px] font-mono tracking-[0.2em] text-parchment/40 uppercase font-black">THE JOURNAL</span>
            <ul className="space-y-2 text-xs font-sans text-parchment/70 font-light">
              <li className="hover:text-parchment transition-colors cursor-pointer">Instagram Index</li>
              <li className="hover:text-parchment transition-colors cursor-pointer">Press Releases</li>
              <li className="hover:text-parchment transition-colors cursor-pointer">Harbor Dock Rates</li>
              <li className="hover:text-parchment transition-colors cursor-pointer">Historical Vaults</li>
            </ul>
          </div>
        </div>

      </div>

      {/* CURATED EXPERIENCES METADATA PANEL - Bold Typography template style block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-parchment/15 pt-12 pb-12">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-parchment/40 mb-3 font-mono">Curated Experiences</div>
          <div className="font-serif italic text-lg mb-2 text-parchment">"The 200-Year Old Barn"</div>
          <p className="text-xs text-parchment/60 leading-relaxed font-light">
            Reconstructed beam-by-beam from original timber logs sourced along the Canadian border, now hosting candlelit whiskey tastings.
          </p>
        </div>
        
        <div className="flex flex-col justify-center items-center text-center py-4 md:py-0 border-y md:border-y-0 md:border-x border-parchment/10">
          <div className="relative flex h-3 w-3 mb-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color-lakes-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-color-lakes-blue"></span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-black text-parchment">Live From Michigan Coast</div>
          <div className="text-[9px] text-parchment/40 mt-1 uppercase font-mono">Camera Feed // Online</div>
        </div>
        
        <div className="text-left md:text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-parchment/40 mb-2 font-mono">Local Weather</div>
          <div className="font-serif italic text-lg mb-2 text-parchment">41°F / Overcast // Port 1926</div>
          <div className="text-[9px] text-parchment/50 uppercase tracking-widest font-mono">Current Time: 17:34 EST</div>
        </div>
      </div>

      {/* FOOTER LOWEST METRICS ROW */}
      <div className="border-t border-parchment/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.25em] font-mono text-parchment/35 space-y-4 md:space-y-0 text-center md:text-left">
        <div className="flex items-center gap-2">
          <Compass size={12} className="text-color-lakes-blue-light animate-spin-slow" />
          <span>© 1926–2026 ST. CLAIR LUXURY LLC // SWISS DESIGN CODE</span>
        </div>
        <span>BUILT WITH MONOCHROME SOVEREIGNTY</span>
        <div className="flex gap-4">
          <span className="hover:text-parchment transition-colors cursor-pointer">TERMS OF ACCORD</span>
          <span className="hover:text-parchment transition-colors cursor-pointer">PRIVACY PROTECTION</span>
        </div>
      </div>

    </footer>
  );
}
