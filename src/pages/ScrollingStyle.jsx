import { useEffect, useState, useRef } from 'react';
import { generateCreditsEntry } from '../utils/nameGenerator';
import MusicPlayer from '../components/MusicPlayer';
import './ScrollingStyle.css';

const ScrollingStyle = () => {
  const [sections, setSections] = useState([]);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const nextSectionIdRef = useRef(0);

  // Generate sections with pre-determined structure
  const generateSections = (sectionCount = 15) => {
    const newSections = [];

    for (let i = 0; i < sectionCount; i++) {
      // Decide section type: 40% single column, 60% multi-column
      const isSingleColumn = Math.random() < 0.4;

      if (isSingleColumn) {
        // Single column: 2-3 entries
        const entryCount = 2 + Math.floor(Math.random() * 2);
        const entries = [];

        for (let j = 0; j < entryCount; j++) {
          entries.push(generateCreditsEntry());
        }

        newSections.push({
          id: nextSectionIdRef.current++,
          type: 'single',
          entries
        });
      } else {
        // Multi-column: 4-6 entries
        const entryCount = 4 + Math.floor(Math.random() * 3);
        const entries = [];

        for (let j = 0; j < entryCount; j++) {
          entries.push(generateCreditsEntry());
        }

        newSections.push({
          id: nextSectionIdRef.current++,
          type: 'multi',
          entries
        });
      }
    }

    return newSections;
  };

  // Count total entries in sections
  const getTotalEntries = (sectionList) => {
    return sectionList.reduce((total, section) => total + section.entries.length, 0);
  };

  // Initialize with 250 items
  useEffect(() => {
    const initialSections = [];
    while (getTotalEntries(initialSections) < 250) {
      initialSections.push(...generateSections(10));
    }
    console.log(`Initialized with ${getTotalEntries(initialSections)} credit entries`);
    setSections(initialSections);
  }, []);

  // Continuous scroll animation with infinite generation
  useEffect(() => {
    if (sections.length === 0) return;

    let lastTimestamp = 0;
    const scrollSpeed = 40; // pixels per second
    let lastGenerationCheck = 0;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (containerRef.current) {
        scrollPositionRef.current += scrollSpeed * delta;
        containerRef.current.style.transform = `translateX(-50%) translateY(-${scrollPositionRef.current}px)`;

        // Check every 2 seconds if we need more credits
        if (timestamp - lastGenerationCheck > 2000) {
          lastGenerationCheck = timestamp;

          const containerHeight = containerRef.current.scrollHeight;
          const viewportHeight = window.innerHeight;

          // If we've scrolled past 30% of content, check total entries
          if (scrollPositionRef.current > (containerHeight - viewportHeight * 5)) {
            setSections(prev => {
              const currentTotal = getTotalEntries(prev);
              // If below 200 items, add sections until we have at least 50 more entries
              if (currentTotal < 200) {
                const newSections = [];
                while (getTotalEntries(newSections) < 50) {
                  newSections.push(...generateSections(5));
                }
                const newTotal = currentTotal + getTotalEntries(newSections);
                console.log(`Credits below 200 (${currentTotal}), adding ${getTotalEntries(newSections)} more. New total: ${newTotal}`);
                return [...prev, ...newSections];
              }
              return prev;
            });
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sections.length]);

  if (sections.length === 0) {
    return <div className="scrolling-container">Loading...</div>;
  }

  return (
    <div className="scrolling-container">
      <MusicPlayer />

      <div className="scrolling-wrapper">
        <div className="scrolling-credits" ref={containerRef}>
          <div className="initial-spacer" />

          {sections.map((section) => (
            <div key={section.id} className={`credit-section ${section.type}-column`}>
              {section.type === 'single' ? (
                // Single column layout
                <div className="single-layout">
                  {section.entries.map((entry, idx) => (
                    <div key={`${section.id}-${idx}`} className="credit-entry">
                      {entry.type === 'character' ? (
                        <div className="character-credit">
                          <div className="character-role">{entry.characterName}</div>
                          <div className="character-actor">{entry.actorName}</div>
                        </div>
                      ) : (
                        <div className="position-credit">
                          <div className="credit-role">{entry.role}</div>
                          <div className="credit-name">{entry.name}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // Multi-column layout
                <div className="multi-grid">
                  {section.entries.map((entry, idx) => (
                    <div key={`${section.id}-${idx}`} className="credit-entry-compact">
                      {entry.type === 'character' ? (
                        <div className="character-credit-compact">
                          <div className="character-role-compact">{entry.characterName}</div>
                          <div className="character-actor-compact">{entry.actorName}</div>
                        </div>
                      ) : (
                        <div className="position-credit-compact">
                          <div className="credit-role-compact">{entry.role}</div>
                          <div className="credit-name-compact">{entry.name}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingStyle;
