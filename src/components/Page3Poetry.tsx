import React, { useState } from 'react';
import { Scroll, Sparkles, ArrowRight, X, Flame } from 'lucide-react';
import { POEMS, Poem } from '../data/poems.ts';
import { soundEngine } from '../utils/audioSynthesizer.ts';

interface Page3PoetryProps {
  onTransitionToChamber: () => void;
}

export const Page3Poetry: React.FC<Page3PoetryProps> = ({ onTransitionToChamber }) => {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(POEMS[0]);
  const [showSecretInvitation, setShowSecretInvitation] = useState(false);
  const [readPoemIds, setReadPoemIds] = useState<number[]>([1]);

  const handleSelectPoem = (poem: Poem) => {
    soundEngine.playParchmentOpen();
    setSelectedPoem(poem);
    if (!readPoemIds.includes(poem.id)) {
      setReadPoemIds((prev) => [...prev, poem.id]);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-16 px-4 md:px-8 z-10 overflow-hidden">
      {/* Atmosphere Header */}
      <div className="max-w-2xl mx-auto text-center my-3 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/20 bg-amber-950/20 text-amber-300 text-xs font-serif mb-2">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>By Candlelight · Antique Manuscript Table</span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-amber-100 font-bold tracking-wide">
          A Personal Poem Collection
        </h2>
        <p className="text-xs md:text-sm font-sans text-slate-400 mt-1">
          Seven handwritten manuscripts resting on aged cedarwood. Select any paper to read.
        </p>
      </div>

      {/* Main Antique Table Workspace */}
      <div className="max-w-6xl w-full mx-auto my-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: The 7 Selectable Aged Parchment Papers on the Table */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <div className="text-xs font-sans text-amber-300/80 uppercase tracking-widest px-2 mb-1">
            Manuscript Index ({readPoemIds.length}/7 read)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {POEMS.map((poem) => {
              const isSelected = selectedPoem?.id === poem.id;
              const isRead = readPoemIds.includes(poem.id);
              return (
                <button
                  key={poem.id}
                  onClick={() => handleSelectPoem(poem)}
                  className={`group relative text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-amber-400/80 bg-amber-950/40 shadow-lg shadow-amber-900/20 scale-[1.02]'
                      : 'border-amber-900/30 bg-slate-900/60 hover:bg-amber-950/20 hover:border-amber-600/50'
                  }`}
                  aria-label={`Open Poem ${poem.romanId}: ${poem.title}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xs font-bold text-amber-400/90 tracking-wider">
                        Poem {poem.romanId}
                      </span>
                      {isRead && <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />}
                    </div>
                    <Scroll className="w-3.5 h-3.5 text-amber-400/60 group-hover:text-amber-300" />
                  </div>
                  <h4 className="font-serif text-sm md:text-base font-semibold text-slate-200 mt-1 line-clamp-1 group-hover:text-amber-200">
                    {poem.title}
                  </h4>
                  <p className="text-[11px] font-sans text-slate-400 mt-0.5 line-clamp-1">
                    {poem.stanzas[0].split('\n')[0]}...
                  </p>
                </button>
              );
            })}
          </div>

          {/* Mysterious Invitation Letter Banner at bottom of left column */}
          <div className="mt-4 p-4 rounded-xl border border-amber-500/30 bg-amber-950/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-serif font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>A Sealed Invitation</span>
            </div>
            <p className="text-xs text-slate-300/90 font-serif leading-relaxed mb-3">
              Beneath the manuscripts lies a letter in golden ink addressed to <strong className="text-amber-200 font-normal">Madamm</strong>...
            </p>
            <button
              onClick={() => setShowSecretInvitation(true)}
              className="w-full py-2 px-3 rounded-lg border border-amber-400/40 bg-amber-900/40 hover:bg-amber-800/50 text-amber-200 text-xs font-serif tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Examine the Invitation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: The Active Open Parchment Paper */}
        <div className="lg:col-span-8">
          {selectedPoem && (
            <div className="parchment-paper rounded-2xl p-6 md:p-10 text-stone-800 border border-amber-800/20 shadow-2xl relative">
              {/* Antique Paper Corner Embellishments */}
              <div className="absolute top-4 left-4 text-amber-900/20 font-serif text-xs select-none">❧</div>
              <div className="absolute top-4 right-4 text-amber-900/20 font-serif text-xs select-none">☙</div>

              <div className="text-center mb-8 pb-4 border-b border-amber-900/15">
                <span className="text-xs font-sans uppercase tracking-widest text-amber-900/70 font-semibold">
                  {selectedPoem.subtitle}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-950 mt-1 tracking-wide">
                  {selectedPoem.title}
                </h3>
              </div>

              {/* Poem Content */}
              <div className="max-w-xl mx-auto space-y-6 font-serif text-base md:text-lg text-stone-800 leading-relaxed max-h-[58vh] overflow-y-auto px-2 pr-4">
                {selectedPoem.stanzas.map((stanza, idx) => (
                  <div key={idx} className="whitespace-pre-line tracking-wide">
                    {stanza}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-amber-900/15 flex items-center justify-between text-xs font-serif text-amber-950/70 px-2">
                <span>Written with ink & devotion</span>
                <span>Madamm’s Collection</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secret Invitation Modal (leads to Page 5: Moonlit Chamber) */}
      {showSecretInvitation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 md:p-8 rounded-2xl parchment-paper text-slate-800 border border-amber-800/30 shadow-2xl">
            <button
              onClick={() => setShowSecretInvitation(false)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 rounded-full"
              aria-label="Close invitation"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900/70 font-semibold">
                An Invitation Across Worlds
              </span>
              <h3 className="font-serif text-3xl font-bold text-amber-950 mt-1">
                For Madamm
              </h3>
            </div>

            <div className="font-serif text-base md:text-lg text-stone-800 leading-relaxed space-y-4 px-2">
              <p>
                My dearest <span className="font-semibold text-amber-950">Madamm</span>,
              </p>
              <p>
                Beyond these verses lies a hidden sanctuary, bathed in silver moonlight where five delicate letters rest on the glowing branches of a dream.
              </p>
              <p className="italic text-amber-950 font-medium">
                Follow the quiet path beneath the moonlight, and let the chamber open for you.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-900/15 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setShowSecretInvitation(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-full border border-stone-300 text-stone-600 hover:text-stone-900 font-serif text-xs"
              >
                Stay Here Longer
              </button>
              <button
                onClick={() => {
                  setShowSecretInvitation(false);
                  onTransitionToChamber();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-amber-950 text-amber-100 hover:bg-amber-900 font-serif text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Enter the Secret Chamber</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
