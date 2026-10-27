import React, { useState, useEffect } from 'react';
import { ACTIVE_PAGE_IDS, ActivePageId } from './data/roadmap.ts';
import { StarfieldCanvas } from './components/StarfieldCanvas.tsx';
import { HeaderNav } from './components/HeaderNav.tsx';
import { Page1Universe } from './components/Page1Universe.tsx';
import { Page2Garden } from './components/Page2Garden.tsx';
import { Page3Poetry } from './components/Page3Poetry.tsx';
import { Page5Letters } from './components/Page5Letters.tsx';
import { Page6FinalReveal } from './components/Page6FinalReveal.tsx';
import { soundEngine } from './utils/audioSynthesizer.ts';

export default function App() {
  const [currentPageId, setCurrentPageId] = useState<ActivePageId>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFinalEnded, setIsFinalEnded] = useState<boolean>(false);

  // Check URL query parameters (e.g. ?page=2 or ?autostart=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get('page') || '', 10);
    if (ACTIVE_PAGE_IDS.includes(pageParam as ActivePageId)) {
      setCurrentPageId(pageParam as ActivePageId);
    }
  }, []);

  // Update soundscape scene on page change
  useEffect(() => {
    soundEngine.setScene(currentPageId);
  }, [currentPageId]);

  const handleToggleSound = () => {
    const nextMuted = soundEngine.setMuted(!isMuted);
    setIsMuted(nextMuted);
  };

  const handleSelectPage = (id: ActivePageId) => {
    setCurrentPageId(id);
    if (id !== 6) {
      setIsFinalEnded(false);
    }
  };

  const getAccentHue = () => {
    switch (currentPageId) {
      case 2:
        return 'garden';
      case 3:
        return 'amber';
      case 5:
        return 'moon';
      case 6:
      case 1:
      default:
        return 'blue';
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-[#e0e7ff] overflow-x-hidden flex flex-col font-sans select-none">
      {/* Background Living Starfield Canvas */}
      <StarfieldCanvas
        accentHue={getAccentHue()}
        dimmed={currentPageId === 6 && isFinalEnded}
        singleStarOnly={currentPageId === 6 && isFinalEnded}
        interactive={true}
      />

      {/* Top Bar Navigation (Hidden during final quiet ending) */}
      <HeaderNav
        currentPageId={currentPageId}
        onSelectPage={handleSelectPage}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        hideNav={currentPageId === 6 && isFinalEnded}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {currentPageId === 1 && (
          <Page1Universe onTransitionToGarden={() => handleSelectPage(2)} />
        )}
        {currentPageId === 2 && (
          <Page2Garden onTransitionToPoetry={() => handleSelectPage(3)} />
        )}
        {currentPageId === 3 && (
          <Page3Poetry onTransitionToChamber={() => handleSelectPage(5)} />
        )}
        {currentPageId === 5 && (
          <Page5Letters onTransitionToFinalReveal={() => handleSelectPage(6)} />
        )}
        {currentPageId === 6 && (
          <Page6FinalReveal onFinalEndingStateChange={(ended) => setIsFinalEnded(ended)} />
        )}
      </main>
    </div>
  );
}
