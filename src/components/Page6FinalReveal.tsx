import React, { useState } from 'react';
import { FINAL_REVEAL_CONTENT } from '../data/letters.ts';
import { soundEngine } from '../utils/audioSynthesizer.ts';

interface Page6FinalRevealProps {
  onFinalEndingStateChange?: (ended: boolean) => void;
}

export const Page6FinalReveal: React.FC<Page6FinalRevealProps> = ({ onFinalEndingStateChange }) => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);

  const handleFinishReading = () => {
    setStage(1);
    soundEngine.fadeOutEnding(8);
    if (onFinalEndingStateChange) {
      onFinalEndingStateChange(true);
    }

    setTimeout(() => {
      setStage(2);
    }, 1200);

    setTimeout(() => {
      setStage(3);
    }, 2800);

    setTimeout(() => {
      setStage(4);
    }, 7000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 py-20 z-10 overflow-hidden text-center">
      {/* Stage 0 & 1: The Birthday Letter under Midnight Sky */}
      {stage <= 1 && (
        <div
          className={`relative max-w-xl w-full mx-auto parchment-paper rounded-2xl p-8 md:p-12 text-slate-800 border border-amber-800/20 shadow-2xl transition-all duration-1000 ${
            stage === 1 ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-fadeIn'
          }`}
        >
          <div className="absolute top-4 left-4 text-amber-900/20 font-serif text-xs select-none">✦</div>
          <div className="absolute top-4 right-4 text-amber-900/20 font-serif text-xs select-none">✦</div>

          <div className="text-left font-serif space-y-5 text-stone-800 text-base md:text-lg leading-relaxed">
            <h3 className="font-bold text-amber-950 text-2xl md:text-3xl tracking-wide">
              {FINAL_REVEAL_CONTENT.salutation}
            </h3>

            {FINAL_REVEAL_CONTENT.bodyParagraphs.map((para, idx) => (
              <p key={idx} className="tracking-wide">
                {para}
              </p>
            ))}

            <div className="pt-4 pb-2">
              <p className="font-serif font-bold text-xl md:text-2xl text-amber-950 tracking-wider">
                {FINAL_REVEAL_CONTENT.birthdayGreeting}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-amber-900/15 flex justify-center">
            <button
              onClick={handleFinishReading}
              className="px-6 py-2.5 rounded-full border border-amber-900/20 bg-amber-950/5 hover:bg-amber-950/15 text-amber-950 font-serif text-sm tracking-wider transition-all duration-300 cursor-pointer"
            >
              Take it into your heart
            </button>
          </div>
        </div>
      )}

      {/* Stage 2, 3 & 4: Dimmed Stars with One Single Golden Star and Ending Line */}
      {stage >= 2 && (
        <div className="relative flex flex-col items-center justify-center my-auto transition-all duration-1000">
          <div className="relative mb-6">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_24px_#fbbf24] star-flicker" />
          </div>

          {stage >= 3 && (
            <div className="animate-fadeIn transition-opacity duration-1000">
              <h2 className="font-serif text-2xl md:text-4xl text-amber-100 font-light tracking-widest drop-shadow-[0_0_16px_rgba(251,191,36,0.5)]">
                {FINAL_REVEAL_CONTENT.finalEndingLine}
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
