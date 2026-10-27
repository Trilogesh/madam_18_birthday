import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Heart, Moon, Shield, Compass, Bike } from 'lucide-react';
import { CHAMBER_LETTERS, ChamberLetter } from '../data/letters.ts';
import { soundEngine } from '../utils/audioSynthesizer.ts';

interface Page5LettersProps {
  onTransitionToFinalReveal: () => void;
}

export const Page5Letters: React.FC<Page5LettersProps> = ({ onTransitionToFinalReveal }) => {
  const [activeLetter, setActiveLetter] = useState<ChamberLetter | null>(null);
  const [openedLetterIds, setOpenedLetterIds] = useState<number[]>([]);
  const [revealStep, setRevealStep] = useState(0);

  const handleOpenLetter = (letter: ChamberLetter) => {
    soundEngine.playParchmentOpen();
    setActiveLetter(letter);
    setRevealStep(0);
    if (!openedLetterIds.includes(letter.id)) {
      setOpenedLetterIds((prev) => [...prev, letter.id]);
    }

    // Step-by-step golden handwriting appearance
    const timer1 = setTimeout(() => setRevealStep(1), 300);
    const timer2 = setTimeout(() => setRevealStep(2), 700);
    const timer3 = setTimeout(() => setRevealStep(3), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleCloseLetter = () => {
    setActiveLetter(null);
    setRevealStep(0);
  };

  const getLetterIcon = (symbol: ChamberLetter['symbol']) => {
    switch (symbol) {
      case 'ask':
        return <Heart className="w-4 h-4 text-rose-300" />;
      case 'heavy':
        return <Shield className="w-4 h-4 text-indigo-300" />;
      case 'moon':
        return <Moon className="w-4 h-4 text-sky-200" />;
      case 'worth':
        return <Compass className="w-4 h-4 text-amber-300" />;
      case 'future':
        return <Bike className="w-4 h-4 text-amber-200" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-16 px-4 md:px-8 z-10 overflow-hidden">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center my-3 animate-fadeIn">
        <span className="text-xs font-sans uppercase tracking-widest text-sky-300/80">
          The Moonlit Sanctuary · Five Hanging Letters
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-amber-100 font-bold tracking-wide mt-1">
          A Secret Room Containing Letters
        </h2>
        <p className="text-xs md:text-sm font-sans text-slate-400 mt-1">
          Suspended from the glowing silver branches, each letter was written for a specific moment in your heart.
        </p>
      </div>

      {/* The Moonlit Chamber with Central Magical Glowing Tree */}
      <div className="relative max-w-5xl w-full mx-auto my-4 h-[460px] md:h-[520px] rounded-3xl border border-sky-900/40 bg-radial from-sky-950/20 via-slate-950/85 to-slate-950 p-6 shadow-2xl overflow-hidden flex items-center justify-center">
        {/* Soft Silver Moonlight Beam from above */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-full pointer-events-none opacity-20"
          style={{
            background:
              'linear-gradient(180deg, rgba(224, 242, 254, 0.4) 0%, rgba(186, 230, 253, 0.1) 60%, transparent 100%)',
          }}
        />

        {/* Ambient Moon in background */}
        <div className="absolute top-8 right-12 w-20 h-20 rounded-full bg-slate-100/10 shadow-[0_0_50px_rgba(255,255,255,0.15)] pointer-events-none border border-slate-200/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-200/5 blur-sm" />
        </div>

        {/* The Magical Tree with Luminous Branches (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Tree Trunk */}
          <path
            d="M 500 580 C 490 480, 510 400, 500 320 C 495 280, 480 250, 470 220"
            fill="none"
            stroke="#1e293b"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 500 580 C 490 480, 510 400, 500 320 C 495 280, 480 250, 470 220"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Luminous Branches */}
          {/* Branch to Letter 1 (Top Left) */}
          <path
            d="M 500 320 C 420 300, 320 280, 220 200"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            opacity="0.6"
          />
          {/* Branch to Letter 2 (Top Right) */}
          <path
            d="M 500 320 C 580 300, 680 270, 740 180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            opacity="0.6"
          />
          {/* Branch to Letter 3 (Center Top) */}
          <path
            d="M 470 220 C 475 170, 480 140, 480 120"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            opacity="0.7"
          />
          {/* Branch to Letter 4 (Mid Left) */}
          <path
            d="M 495 380 C 420 370, 360 380, 300 330"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.5"
          />
          {/* Branch to Letter 5 (Mid Right) */}
          <path
            d="M 505 380 C 580 370, 640 380, 680 340"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            opacity="0.5"
          />
        </svg>

        {/* The 5 Hanging Letters with Ribbons and Golden Symbols */}
        {CHAMBER_LETTERS.map((letter) => {
          const isOpened = openedLetterIds.includes(letter.id);
          return (
            <div
              key={letter.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300"
              style={{
                left: `${letter.branchPosition.x}%`,
                top: `${letter.branchPosition.y}%`,
              }}
            >
              {/* Hanging Ribbon visual from branch */}
              <div className="flex flex-col items-center">
                <div className="w-[1.5px] h-8 bg-amber-400/40 shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
                <button
                  onClick={() => handleOpenLetter(letter)}
                  className="group relative flex flex-col items-center p-3 rounded-2xl transition-transform duration-300 hover:scale-110 focus:outline-none cursor-pointer"
                  aria-label={`Open Letter ${letter.romanId}: ${letter.title}`}
                >
                  {/* Floating parchment envelope */}
                  <div className="relative w-16 h-20 md:w-20 md:h-24 rounded-lg bg-gradient-to-b from-[#fbf8f1] to-[#eeddc3] border border-amber-500/40 shadow-xl flex flex-col items-center justify-between p-2.5 float-subtle">
                    {/* Golden top ribbon bow */}
                    <div className="w-5 h-2 rounded-full bg-amber-500/80 shadow-sm" />

                    {/* Golden Symbol */}
                    <div className="w-8 h-8 rounded-full bg-amber-950/10 border border-amber-600/30 flex items-center justify-center text-amber-800 shadow-inner">
                      {getLetterIcon(letter.symbol)}
                    </div>

                    {/* Roman Numeral */}
                    <span className="font-serif text-[11px] font-bold text-amber-900 tracking-wider">
                      Letter {letter.romanId}
                    </span>
                  </div>

                  {/* Gentle hover purpose tooltip */}
                  <span className="text-[10px] font-sans text-sky-200/80 tracking-wide mt-1.5 opacity-90 group-hover:text-amber-200 transition-colors">
                    {letter.purpose}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom invitation leading to Final Reveal (Page 6) */}
      <div className="max-w-md mx-auto text-center mt-3">
        <button
          onClick={onTransitionToFinalReveal}
          className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-400/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 font-serif text-sm tracking-wider transition-all duration-300 hover:border-amber-300 shadow-xl cursor-pointer"
        >
          <span>Proceed to the Final Reveal</span>
          <ArrowRight className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Active Letter Modal with Line-by-Line Golden Handwriting Reveal */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl p-6 md:p-10 rounded-2xl parchment-paper text-slate-800 border border-amber-800/30 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={handleCloseLetter}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 rounded-full transition-colors"
              aria-label="Fold and return letter to branch"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="text-center mb-6 pb-4 border-b border-amber-900/15">
              <span className="text-xs font-sans uppercase tracking-widest text-amber-900/70 font-semibold">
                Chamber Letter {activeLetter.romanId} · {activeLetter.purpose}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-950 mt-1">
                {activeLetter.title}
              </h3>
            </div>

            {/* Salutation & Paragraphs with gentle progressive reveal */}
            <div className="font-serif text-base md:text-lg text-stone-800 leading-relaxed space-y-4 px-2">
              <p className="font-bold text-amber-950 text-xl">{activeLetter.salutation}</p>

              {activeLetter.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`transition-opacity duration-700 ${
                    revealStep >= 1 ? 'opacity-100' : 'opacity-20'
                  }`}
                >
                  {p}
                </p>
              ))}

              {activeLetter.highlight && (
                <div
                  className={`p-4 rounded-xl bg-amber-950/5 border border-amber-900/15 my-4 transition-opacity duration-700 ${
                    revealStep >= 2 ? 'opacity-100' : 'opacity-20'
                  }`}
                >
                  <p className="font-serif font-bold text-amber-950 italic text-base md:text-lg">
                    {activeLetter.highlight}
                  </p>
                </div>
              )}

              <div
                className={`mt-6 pt-2 transition-opacity duration-700 ${
                  revealStep >= 3 ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <p className="italic text-stone-700">{activeLetter.signoff}</p>
                <p className="font-handwriting text-2xl text-amber-950 font-bold mt-1">
                  {activeLetter.signature}
                </p>
              </div>
            </div>

            {/* Fold & Return back to branch */}
            <div className="mt-8 pt-4 border-t border-amber-900/15 flex items-center justify-between text-xs font-serif text-amber-900/70 px-2">
              <span>Always kept safe on your branch</span>
              <button
                onClick={handleCloseLetter}
                className="px-5 py-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 font-medium transition-colors"
              >
                Fold & Return to Branch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
