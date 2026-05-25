import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation } from '../types';
import { X, Calendar, User, Users, Mail, CheckCircle2, Ticket, Printer } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedSuite: string;
}

export default function BookingModal({ isOpen, onClose, preSelectedSuite }: BookingModalProps) {
  const [formData, setFormData] = useState<Partial<Reservation>>({
    checkIn: '2026-06-15',
    checkOut: '2026-06-20',
    guests: 2,
    roomType: preSelectedSuite || 'The Gilded Age Suite',
    guestName: '',
    guestEmail: '',
    specialRequests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Auto-sync room selection changes from parent parameters
  React.useEffect(() => {
    if (preSelectedSuite) {
      setFormData((prev) => ({ ...prev, roomType: preSelectedSuite }));
    }
  }, [preSelectedSuite]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName || !formData.guestEmail) return;

    // Generate historic ledger serial key (e.g. SCC-1926-XXXX)
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`SCC-1926-${randomHex}`);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setBookingRef('');
    setFormData({
      checkIn: '2026-06-15',
      checkOut: '2026-06-20',
      guests: 2,
      roomType: 'The Gilded Age Suite',
      guestName: '',
      guestEmail: '',
      specialRequests: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Elegant Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-md cursor-pointer"
          />

          {/* Luxury Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-parchment text-charcoal rounded-xl shadow-2xl overflow-hidden border border-charcoal/15 z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            
            {/* Elegant Header */}
            <div className="border-b border-charcoal/10 px-8 py-6 flex justify-between items-center text-charcoal bg-charcoal text-parchment">
              <div>
                <span className="text-[8px] font-mono tracking-[0.25em] text-parchment/65 uppercase">LEDGER OF SECLUSION</span>
                <h3 className="text-xl font-serif font-semibold tracking-tight uppercase">ST. CLAIR MANIFEST</h3>
              </div>
              <button 
                onClick={resetForm} 
                className="p-1 rounded-full text-parchment/60 hover:text-parchment transition-colors border border-parchment/15 hover:scale-105 active:scale-95 duration-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT AREA */}
            <div className="p-8">
              
              {!isSubmitted ? (
                /* RESERVATION INPUT FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Dates Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold tracking-[0.1em] text-color-lakes-blue uppercase flex items-center gap-1.5">
                        <Calendar size={12} className="text-color-lakes-blue-light" />
                        CHECK-IN ARRIVAL
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="w-full bg-transparent border border-charcoal/20 rounded px-4 py-2.5 text-xs font-sans font-medium text-charcoal focus:border-color-lakes-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold tracking-[0.1em] text-color-lakes-blue uppercase flex items-center gap-1.5">
                        <Calendar size={12} className="text-color-lakes-blue-light" />
                        CHECK-OUT DEPARTURE
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full bg-transparent border border-charcoal/20 rounded px-4 py-2.5 text-xs font-sans font-medium text-charcoal focus:border-color-lakes-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Guests & Suite */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold tracking-[0.1em] text-color-lakes-blue uppercase flex items-center gap-1.5">
                        <Users size={12} className="text-color-lakes-blue-light" />
                        GUEST COUNT
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="w-full bg-parchment border border-charcoal/20 rounded px-4 py-2.5 text-xs font-sans font-medium text-charcoal focus:outline-none focus:border-color-lakes-blue transition-colors"
                      >
                        <option value={1}>1 Patron</option>
                        <option value={2}>2 Patrons (Limit)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold tracking-[0.1em] text-color-lakes-blue uppercase flex items-center gap-1.5">
                        <Ticket size={12} className="text-color-lakes-blue-light" />
                        ACCOMMODATION VESSEL
                      </label>
                      <select
                        value={formData.roomType}
                        onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                        className="w-full bg-parchment border border-charcoal/20 rounded px-4 py-2.5 text-xs font-sans font-medium text-charcoal focus:outline-none focus:border-color-lakes-blue transition-colors"
                      >
                        <option value="The Gilded Age Suite">The Gilded Age Suite</option>
                        <option value="The Captain’s Quarters">The Captain’s Quarters</option>
                        <option value="The Hemlock Pavilion Room">The Hemlock Pavilion Room</option>
                      </select>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="h-[1px] bg-charcoal/10" />

                  {/* Row 3: Personal Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold tracking-[0.1em] text-color-lakes-blue uppercase flex items-center gap-1.5">
                        <User size={12} className="text-color-lakes-blue-light" />
                        PATRON FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Benjamin Sinclair"
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        className="w-full bg-transparent border border-charcoal/20 rounded px-4 py-2.5 text-xs font-sans text-charcoal placeholder-charcoal/30 focus:border-color-lakes-blue focus:outline-none transition-colors font-medium"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold tracking-[0.1em] text-color-lakes-blue uppercase flex items-center gap-1.5">
                        <Mail size={12} className="text-color-lakes-blue-light" />
                        SECURE INTACT EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. benjamin@sinclair.com"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                        className="w-full bg-transparent border border-charcoal/20 rounded px-4 py-2.5 text-xs font-sans text-charcoal placeholder-charcoal/30 focus:border-color-lakes-blue focus:outline-none transition-colors font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold tracking-[0.1em] text-color-lakes-blue uppercase">
                        SPECIAL REQUESTS & ALIGNMENTS (OPTIONAL)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Write details of rare whiskey reserves, luggage transfers, or dining requests..."
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="w-full bg-transparent border border-charcoal/20 rounded px-4 py-2.5 text-xs font-sans text-charcoal placeholder-charcoal/35 focus:border-color-lakes-blue focus:outline-none transition-colors font-medium resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-color-lakes-blue hover:bg-opacity-95 text-parchment text-xs font-sans tracking-[0.2em] font-semibold py-4 rounded transition-all duration-300 transform uppercase shadow-xl hover:shadow-2xl cursor-pointer"
                    >
                      LEDGER RESERVATION SECURELY
                    </button>
                    <p className="text-[9px] text-center text-charcoal/40 font-mono mt-3 uppercase tracking-wider">
                      BY CLICKING, YOU ENTER A HISTORIC COVENANT OF ARCHITECTURAL CARE
                    </p>
                  </div>

                </form>
              ) : (
                /* RESERVATION CONFIRMATION / MANIFEST BOARDING PASS */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8 text-center py-4"
                >
                  
                  {/* Success Stamp Icon Header */}
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 size={44} className="text-color-lakes-blue-light animate-bounce" />
                    <h4 className="text-xl font-serif font-bold text-color-lakes-blue uppercase tracking-tight mt-2">
                      MANIFEST APPROVED SECURELY
                    </h4>
                    <p className="text-xs font-sans text-charcoal/65 font-light">
                      The St. Clair Inn harbor reserves your presence. Your placement has been entered in Ledger 1926.
                    </p>
                  </div>

                  {/* PHYSICAL BOARDING PASS STYLE SHEET CARD */}
                  <div className="mx-auto max-w-md bg-charcoal text-parchment text-left rounded-lg overflow-hidden border border-parchment/10 shadow-2xl relative">
                    
                    {/* Security stamp background layout */}
                    <div className="absolute right-6 top-10 w-24 h-24 border border-dashed border-parchment/5 rounded-full flex items-center justify-center -rotate-12 pointer-events-none text-[8px] font-mono tracking-widest text-parchment/10 text-center uppercase">
                      ST. CLAIR<br/>APPROVED<br/>1926
                    </div>

                    <div className="px-6 py-4 bg-color-lakes-blue border-b border-parchment/5 flex justify-between items-center text-[10px] tracking-[0.18em] font-mono">
                      <span>ST. CLAIR MANIFEST</span>
                      <span className="text-parchment font-bold">{bookingRef}</span>
                    </div>

                    <div className="p-6 space-y-4 font-sans">
                      
                      <div className="grid grid-cols-2 gap-4 border-b border-parchment/10 pb-4">
                        <div className="space-y-0.5">
                          <span className="text-[7px] text-parchment/40 uppercase tracking-widest font-mono">PATRON PRESENCE</span>
                          <p className="text-[11px] font-bold tracking-tight">{formData.guestName}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[7px] text-parchment/40 uppercase tracking-widest font-mono">DESTINATION CHAMBER</span>
                          <p className="text-[11px] font-semibold tracking-tight text-white">{formData.roomType}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 border-b border-parchment/10 pb-4">
                        <div className="space-y-0.5">
                          <span className="text-[7px] text-parchment/40 uppercase tracking-widest font-mono">ARRIVAL DAY</span>
                          <p className="text-[11px] font-medium">{formData.checkIn}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[7px] text-parchment/40 uppercase tracking-widest font-mono">DEPARTURE DAY</span>
                          <p className="text-[11px] font-medium">{formData.checkOut}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[7px] text-parchment/40 uppercase tracking-widest font-mono">PARTY SIZE</span>
                          <p className="text-[11px] font-medium">{formData.guests} Patrons</p>
                        </div>
                      </div>

                      {formData.specialRequests && (
                        <div className="space-y-0.5 border-b border-parchment/10 pb-4">
                          <span className="text-[7px] text-parchment/40 uppercase tracking-widest font-mono">LEDGER NOTES</span>
                          <p className="text-[10px] text-parchment/70 font-light italic leading-tight">"{formData.specialRequests}"</p>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-[8px] font-mono text-parchment/40 uppercase tracking-[0.2em] pt-1">
                        <span>ESTABLISHED MCMXXVI</span>
                        <span>CHECK-IN 15:00</span>
                      </div>

                    </div>
                  </div>

                  {/* Manifest Bottom Actions */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => window.print()}
                      className="border border-charcoal/20 px-5 py-2.5 rounded text-[10px] tracking-widest hover:bg-charcoal hover:text-parchment transition-all duration-300 font-semibold uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer size={12} />
                      PRINT COVENANT
                    </button>
                    <button
                      onClick={resetForm}
                      className="bg-color-lakes-blue text-parchment px-5 py-2.5 rounded text-[10px] tracking-widest font-semibold uppercase hover:bg-opacity-90 transition-all duration-300 cursor-pointer"
                    >
                      RETURN TO INN ENTRY
                    </button>
                  </div>

                </motion.div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
