import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Heart, Star, Moon, Feather } from 'lucide-react';
import { DISCOVERIES, Discovery } from '../data/discoveries.ts';
import { soundEngine } from '../utils/audioSynthesizer.ts';

interface Page2GardenProps {
  onTransitionToPoetry: () => void;
}

export const Page2Garden: React.FC<Page2GardenProps> = ({ onTransitionToPoetry }) => {
  const [openedDiscovery, setOpenedDiscovery] = useState<Discovery | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<number[]>([]);
  const [isOpeningSeal, setIsOpeningSeal] = useState(false);
  const [isChestOpen, setIsChestOpen] = useState(false);

  const handleOpenDiscovery = (discovery: Discovery) => {
    setIsOpeningSeal(true);
    soundEngine.playParchmentOpen();
    setTimeout(() => {
      setOpenedDiscovery(discovery);
      setIsOpeningSeal(false);
      if (!discoveredIds.includes(discovery.id)) {
        setDiscoveredIds((prev) => [...prev, discovery.id]);
      }
    }, 450);
  };

  const handleCloseDiscovery = () => {
    setOpenedDiscovery(null);
  };

  const getSymbolIcon = (symbol: string) => {
    switch (symbol) {
      case 'heart':
        return <Heart className="w-4 h-4 text-rose-300" />;
      case 'crescent':
        return <Moon className="w-4 h-4 text-indigo-300" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-300" />;
      case 'leaf':
        return <Feather className="w-4 h-4 text-emerald-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-300" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-16 px-4 md:px-8 z-10 overflow-hidden">
      {/* Garden Header */}
      <div className="max-w-2xl mx-auto text-center my-4 animate-fadeIn">
        <p className="font-serif text-lg md:text-2xl text-emerald-200/90 font-light tracking-wide leading-relaxed">
          There are beautiful things the world walks past without ever noticing.
        </p>
        <p className="text-xs md:text-sm font-sans text-slate-400 mt-2">
          Gently wander through the twilight garden · Tap the glowing blossoms to reveal what is cherished
        </p>
      </div>

      {/* Enchanted Garden Interactive Canvas / Layout Area */}
      <div className="relative max-w-5xl w-full mx-auto my-6 h-[440px] md:h-[520px] rounded-3xl border border-emerald-900/40 bg-radial from-emerald-950/20 via-slate-950/80 to-slate-950 p-6 shadow-2xl overflow-hidden">
        {/* Soft garden foliage silhouettes & fireflies */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl" />
        </div>

        {/* Guided winding garden trail (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <path
            d="M 120 450 Q 250 200 480 320 T 820 220"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeDasharray="6,8"
          />
        </svg>

        {/* The 7 Interactive Hidden Discoveries Scattered in the Garden */}
        {DISCOVERIES.map((item) => {
          const isFound = discoveredIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
              style={{
                left: `${item.xPercent}%`,
                top: `${item.yPercent}%`,
              }}
            >
              <button
                onClick={() => handleOpenDiscovery(item)}
                className={`group relative p-3 md:p-4 rounded-full transition-transform duration-300 hover:scale-125 focus:outline-none ${
                  isOpeningSeal ? 'pointer-events-none' : ''
                }`}
                aria-label={`Unfold discovery: ${item.title}`}
              >
                {/* Glow ring */}
                <div
                  className={`absolute inset-0 rounded-full blur-md transition-all ${
                    isFound
                      ? 'bg-amber-400/30'
                      : 'bg-emerald-400/25 animate-pulse'
                  }`}
                />
                {/* Floral icon with glowing wax seal */}
                <div
                  className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border shadow-lg transition-colors ${
                    isFound
                      ? 'bg-amber-950/80 border-amber-400/60 text-amber-200'
                      : 'bg-emerald-950/80 border-emerald-400/40 text-emerald-200 group-hover:border-amber-300'
                  }`}
                >
                  {getSymbolIcon(item.symbol)}
                </div>
              </button>
            </div>
          );
        })}

        {/* Physical Keepsake Chest in the Garden */}
        <div className="absolute bottom-4 right-6 z-20">
          <button
            onClick={() => setIsChestOpen(true)}
            aria-label="Open the garden Keepsake Chest"
            className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/30 text-amber-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-900/60 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-left font-serif">
              <div className="text-xs font-semibold tracking-wide text-amber-200">Keepsake Chest</div>
              <div className="text-[10px] font-sans text-amber-400/70">
                {discoveredIds.length} of 7 gathered
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom invitation leading to Page 3 */}
      <div className="max-w-md mx-auto text-center mt-4">
        <button
          onClick={onTransitionToPoetry}
          className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-400/30 bg-slate-900/80 hover:bg-amber-950/40 text-amber-200 font-serif text-sm tracking-wider transition-all duration-300 hover:border-amber-300/60 cursor-pointer shadow-lg"
        >
          <span>Continue to the Poetry Collection</span>
          <ArrowRight className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Letter Unfold Modal (Single Discovery) */}
      {openedDiscovery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 md:p-8 rounded-2xl parchment-paper text-slate-800 shadow-2xl border border-amber-700/20 max-h-[85vh] overflow-y-auto">
            <button
              onClick={handleCloseDiscovery}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 rounded-full transition-colors"
              aria-label="Close letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poetic Wax Seal badge header */}
            <div className="flex items-center justify-center mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-amber-200 text-white font-serif text-sm"
                style={{ backgroundColor: openedDiscovery.sealColor }}
              >
                {getSymbolIcon(openedDiscovery.symbol)}
              </div>
            </div>

            <div className="text-center mb-6">
              <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900/70 font-semibold">
                Garden Discovery #{openedDiscovery.id}
              </span>
              <h3 className="font-serif text-2xl font-bold text-amber-950 mt-1">
                {openedDiscovery.title}
              </h3>
            </div>

            <div className="font-serif text-base md:text-lg text-stone-800 leading-relaxed space-y-4 px-2">
              {openedDiscovery.content.map((paragraph, idx) => (
                <p key={idx} className={idx === 1 && openedDiscovery.id === 6 ? 'font-medium text-amber-950' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-amber-900/15 flex justify-center">
              <button
                onClick={handleCloseDiscovery}
                className="px-6 py-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 font-serif text-sm tracking-wide transition-colors"
              >
                Return to the Garden
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keepsake Chest Modal (Envelopes with symbols only - NO TITLES displayed on envelopes!) */}
      {isChestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl p-6 md:p-8 rounded-3xl bg-slate-900/95 border border-amber-500/30 text-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsChestOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-200 rounded-full"
              aria-label="Close Keepsake Chest"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl md:text-3xl text-amber-200 font-bold tracking-wide">
                The Keepsake Chest
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Each delicate envelope carries an intimate truth. Tap any envelope symbol to open and reread.
              </p>
            </div>

            {/* Individual Envelopes - strictly symbols only, no titles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-2">
              {DISCOVERIES.map((item) => {
                const isFound = discoveredIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsChestOpen(false);
                      handleOpenDiscovery(item);
                    }}
                    className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 text-center ${
                      isFound
                        ? 'border-amber-500/40 bg-amber-950/20 hover:bg-amber-900/30 hover:scale-105 cursor-pointer shadow-lg'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:scale-105 cursor-pointer'
                    }`}
                    aria-label={`Open letter with symbol ${item.symbol}`}
                  >
                    {/* Envelope icon visual */}
                    <div className="relative w-14 h-11 rounded-lg border border-amber-400/30 bg-gradient-to-b from-stone-200 to-stone-300 flex items-center justify-center shadow-md mb-3">
                      {/* Envelope flap triangle */}
                      <div className="absolute top-0 left-0 right-0 h-4 border-b border-amber-700/20 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-stone-300/80" />
                      {/* Wax Seal Symbol */}
                      <div
                        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-inner border border-amber-200"
                        style={{ backgroundColor: item.sealColor }}
                      >
                        {getSymbolIcon(item.symbol)}
                      </div>
                    </div>

                    {/* Envelope label: Tiny symbol text only, NO titles as mandated */}
                    <span className="text-[11px] font-serif text-amber-200/80 uppercase tracking-widest">
                      Letter {item.id}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-center">
              <button
                onClick={() => setIsChestOpen(false)}
                className="px-6 py-2 rounded-full border border-amber-500/30 bg-amber-950/30 text-amber-200 font-serif text-xs tracking-wider hover:bg-amber-900/50 transition-colors"
              >
                Close Keepsake Chest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
