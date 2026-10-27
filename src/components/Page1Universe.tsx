import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer.ts';

interface Page1UniverseProps {
  onTransitionToGarden: () => void;
}

export const Page1Universe: React.FC<Page1UniverseProps> = ({ onTransitionToGarden }) => {
  // Scene stages:
  // 1: Dark opening (golden star flickers)
  // 2: First words appear after 3.5s
  // 3: Universe transforms on star tap (expanding constellation)
  // 4: Stardust nickname reveals "Madamm"
  // 5: Golden path emerges with "Follow the stars →"
  // 6: Blooming transition into garden
  const [sceneStage, setSceneStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isStarTapped, setIsStarTapped] = useState(false);
  const [bloomingStep, setBloomingStep] = useState(0);

  // Breathe for 3.5 seconds before first text appears (Scene 2)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSceneStage((prev) => (prev === 1 ? 2 : prev));
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const handleStarTap = () => {
    if (isStarTapped) return;
    setIsStarTapped(true);
    soundEngine.playStarTap();
    setSceneStage(3);

    // After 2.5s, progress to Scene 4 (stardust nickname reveal)
    setTimeout(() => {
      setSceneStage(4);
    }, 2400);

    // After another 3s, progress to Scene 5 (golden path & invitation)
    setTimeout(() => {
      setSceneStage(5);
    }, 5600);
  };

  const handleFollowStars = () => {
    soundEngine.playPathFollow();
    setSceneStage(6);

    // Animate bloom sequence then enter garden
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setBloomingStep(step);
      if (step >= 3) {
        clearInterval(interval);
        setTimeout(() => {
          onTransitionToGarden();
        }, 1600);
      }
    }, 900);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden text-center z-10 selection:bg-amber-400/20">
      {/* Dynamic Cosmic Backing Overlay for Scene 3+ */}
      {isStarTapped && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            sceneStage >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.08) 0%, rgba(59, 130, 246, 0.12) 35%, transparent 75%)',
          }}
        />
      )}

      {/* Floating Constellation Ring in Scene 3+ */}
      {sceneStage >= 3 && (
        <div
          className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px] rounded-full border border-amber-300/20 animate-spin-slow pointer-events-none"
          style={{ animationDuration: '60s' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-300 shadow-[0_0_8px_#93c5fd]" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_10px_#fde68a]" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        </div>
      )}

      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-20 py-12">
        {/* The Central Flickering Golden Star */}
        <div className="relative mb-8">
          <button
            onClick={handleStarTap}
            disabled={isStarTapped}
            aria-label="Tap the golden star to awaken the universe"
            className={`group relative p-6 rounded-full transition-all duration-700 outline-none ${
              !isStarTapped ? 'cursor-pointer hover:scale-125' : 'cursor-default'
            }`}
          >
            {/* Outer halo */}
            <div
              className={`absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-all duration-1000 ${
                isStarTapped ? 'scale-150 bg-amber-400/40 blur-2xl' : 'animate-pulse'
              }`}
            />
            {/* Core golden star */}
            <div
              className={`relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full transition-transform duration-700 ${
                !isStarTapped ? 'star-flicker' : 'scale-110'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-8 h-8 md:w-10 md:h-10 text-amber-300 drop-shadow-[0_0_18px_rgba(251,191,36,0.95)] transition-all duration-700 ${
                  isStarTapped ? 'scale-125 text-amber-200' : 'group-hover:rotate-12'
                }`}
              >
                <path d="M12 1.5l2.8 6.9 7.4.6-5.6 4.9 1.7 7.3-6.3-3.8-6.3 3.8 1.7-7.3-5.6-4.9 7.4-.6z" />
              </svg>
            </div>
          </button>

          {!isStarTapped && sceneStage >= 2 && (
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-sans tracking-widest text-amber-300/70 uppercase whitespace-nowrap animate-bounce">
              Tap the star
            </p>
          )}
        </div>

        {/* Scene 2: The First Words */}
        <div
          className={`transition-all duration-1000 ${
            sceneStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-serif text-lg md:text-2xl text-slate-200/90 leading-relaxed font-light tracking-wide px-4">
            Somewhere among everything that exists, there is a little world that belongs to you.
          </p>
        </div>

        {/* Scene 4: Made of Stardust (Her Nickname) */}
        {sceneStage >= 4 && (
          <div className="mt-8 transition-all duration-1000 animate-fadeIn px-4">
            <p className="font-serif text-xl md:text-3xl text-amber-100 font-normal leading-relaxed tracking-wide">
              And somehow, among all the wonders of this universe, it was always you,{' '}
              <span className="font-serif font-bold text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] inline-block tracking-wider">
                Madamm.
              </span>
            </p>
          </div>
        )}

        {/* Scene 5: The Golden Path */}
        {sceneStage >= 5 && sceneStage < 6 && (
          <div className="mt-12 flex flex-col items-center transition-all duration-1000 animate-fadeIn">
            {/* Visual golden winding path */}
            <div className="w-48 h-12 relative flex items-center justify-between mb-4 px-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24] animate-ping" />
              <span className="w-1 h-1 rounded-full bg-amber-300/60" />
              <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fbbf24]" />
              <span className="w-1 h-1 rounded-full bg-amber-300/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fde68a] animate-pulse" />
            </div>

            <p className="font-serif text-sm md:text-base text-slate-300/80 mb-6 italic">
              There is more waiting beyond the light.
            </p>

            <button
              onClick={handleFollowStars}
              className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-400/40 bg-amber-950/20 hover:bg-amber-900/40 text-amber-200 font-serif text-base tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.35)] cursor-pointer"
            >
              <span>Follow the stars</span>
              <ArrowRight className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Scene 6: Stardust Blooms into the Garden */}
        {sceneStage === 6 && (
          <div className="mt-10 flex flex-col items-center animate-fadeIn text-amber-200 font-serif">
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-emerald-500/10 blur-xl transition-all duration-1000 ${
                  bloomingStep >= 1 ? 'scale-150 opacity-100' : 'opacity-0'
                }`}
              />
              <Sparkles
                className={`w-12 h-12 text-amber-300 transition-all duration-1000 ${
                  bloomingStep >= 1 ? 'scale-110 rotate-45 text-amber-200' : 'scale-90'
                }`}
              />
            </div>
            <p className="text-base md:text-lg text-emerald-200/90 tracking-wide font-light">
              {bloomingStep === 1 && 'The stardust begins to settle...'}
              {bloomingStep === 2 && 'Golden flowers unfurl in the twilight breeze...'}
              {bloomingStep >= 3 && 'Welcome to your enchanted garden...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
