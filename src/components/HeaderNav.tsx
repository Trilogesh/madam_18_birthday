import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, X } from 'lucide-react';
import { ROADMAP_PAGES, ACTIVE_PAGE_IDS, ActivePageId } from '../data/roadmap.ts';

interface HeaderNavProps {
  currentPageId: ActivePageId;
  onSelectPage: (id: ActivePageId) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  hideNav?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPageId,
  onSelectPage,
  isMuted,
  onToggleSound,
  hideNav = false,
}) => {
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  if (hideNav) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8 bg-slate-950/40 backdrop-blur-md border-b border-amber-500/10 transition-all duration-300">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectPage(1)}
            className="font-serif text-lg md:text-xl font-bold tracking-wider text-amber-200/90 hover:text-amber-100 transition-colors whitespace-nowrap text-left"
            aria-label="Return to beginning of universe"
          >
            Madamm’s Universe
          </button>
        </div>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-sans text-slate-300"
          aria-label="Journey navigation"
        >
          <button
            onClick={() => onSelectPage(1)}
            className={`transition-colors hover:text-amber-300 whitespace-nowrap shrink-0 ${
              currentPageId === 1 ? 'text-amber-300 font-semibold underline underline-offset-8 decoration-amber-400' : 'text-slate-400'
            }`}
          >
            1. Universe
          </button>
          <button
            onClick={() => onSelectPage(2)}
            className={`transition-colors hover:text-amber-300 whitespace-nowrap shrink-0 ${
              currentPageId === 2 ? 'text-amber-300 font-semibold underline underline-offset-8 decoration-amber-400' : 'text-slate-400'
            }`}
          >
            2. Garden
          </button>
          <button
            onClick={() => onSelectPage(3)}
            className={`transition-colors hover:text-amber-300 whitespace-nowrap shrink-0 ${
              currentPageId === 3 ? 'text-amber-300 font-semibold underline underline-offset-8 decoration-amber-400' : 'text-slate-400'
            }`}
          >
            3. Poems
          </button>
          <button
            onClick={() => onSelectPage(5)}
            className={`transition-colors hover:text-amber-300 whitespace-nowrap shrink-0 ${
              currentPageId === 5 ? 'text-amber-300 font-semibold underline underline-offset-8 decoration-amber-400' : 'text-slate-400'
            }`}
          >
            5. Chamber
          </button>
          <button
            onClick={() => onSelectPage(6)}
            className={`transition-colors hover:text-amber-300 whitespace-nowrap shrink-0 ${
              currentPageId === 6 ? 'text-amber-300 font-semibold underline underline-offset-8 decoration-amber-400' : 'text-slate-400'
            }`}
          >
            6. Final Reveal
          </button>
        </nav>

        {/* Zone 3: Primary Action (Sound toggle + discreet Roadmap view) */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            onClick={() => setShowRoadmapModal(true)}
            title="View Roadmap"
            aria-label="View 6-page roadmap"
            className="p-2 text-slate-400 hover:text-amber-300 transition-colors rounded-full hover:bg-slate-800/50"
          >
            <Compass className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleSound}
            aria-label={isMuted ? 'Turn on sound ambience' : 'Mute sound ambience'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-sans tracking-wide transition-all whitespace-nowrap shrink-0 ${
              isMuted
                ? 'border-slate-700/80 bg-slate-900/60 text-slate-400 hover:border-amber-500/40 hover:text-slate-200'
                : 'border-amber-500/50 bg-amber-950/40 text-amber-200 shadow-sm shadow-amber-500/20'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound: Off' : 'Sound: Playing'}</span>
          </button>
        </div>
      </header>

      {/* Roadmap Modal */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 md:p-8 rounded-2xl bg-slate-900/95 border border-amber-500/20 shadow-2xl text-slate-200">
            <button
              onClick={() => setShowRoadmapModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-200 rounded-full"
              aria-label="Close roadmap"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-amber-200 mb-2 font-bold tracking-wide">
              The Journey Roadmap
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              The original six chapters crafted for Madamm:
            </p>

            <div className="space-y-3 font-sans">
              {ROADMAP_PAGES.map((page) => {
                const isActive = currentPageId === page.id;
                const isSkipped = page.isSkipped;
                return (
                  <div
                    key={page.id}
                    className={`flex items-start justify-between p-3 rounded-lg border transition-all ${
                      isSkipped
                        ? 'opacity-40 border-slate-800 bg-slate-950/40'
                        : isActive
                        ? 'border-amber-500/60 bg-amber-950/30 text-amber-100'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/20 cursor-pointer'
                    }`}
                    onClick={() => {
                      if (!isSkipped && ACTIVE_PAGE_IDS.includes(page.id as ActivePageId)) {
                        onSelectPage(page.id as ActivePageId);
                        setShowRoadmapModal(false);
                      }
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-400/80 font-bold">
                          Page {page.id}
                        </span>
                        <h4 className="text-sm font-medium font-serif">{page.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{page.subtitle}</p>
                    </div>
                    {isSkipped && (
                      <span className="text-[10px] tracking-wider uppercase text-slate-500 border border-slate-800 px-2 py-0.5 rounded">
                        Skipped
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="px-5 py-2 text-xs font-medium text-amber-200 bg-amber-950/40 border border-amber-500/30 rounded-lg hover:bg-amber-900/50 transition-colors"
              >
                Close Journey Map
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
