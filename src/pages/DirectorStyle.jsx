import { useEffect, useState } from 'react';
import { generateCreditsEntry } from '../utils/nameGenerator';
import MusicPlayer from '../components/MusicPlayer';
import './DirectorStyle.css';

const DirectorStyle = () => {
  const [currentEntry, setCurrentEntry] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Generate first entry
    setCurrentEntry(generateCreditsEntry());
    setFadeIn(true);

    const interval = setInterval(() => {
      // Fade out
      setFadeIn(false);

      // Wait for fade out, then change entry
      setTimeout(() => {
        setCurrentEntry(generateCreditsEntry());
        setFadeIn(true);
      }, 1000); // Match fade-out duration
    }, 4000); // Show each entry for 4 seconds

    return () => clearInterval(interval);
  }, []);

  if (!currentEntry) {
    return <div className="director-container">Loading...</div>;
  }

  return (
    <div className="director-container">
      <MusicPlayer />

      <div className={`credits-content ${fadeIn ? 'fade-in' : 'fade-out'}`}>
        {currentEntry.type === 'character' ? (
          <div className="character-entry">
            <div className="character-name">{currentEntry.characterName}</div>
            <div className="actor-name">{currentEntry.actorName}</div>
          </div>
        ) : (
          <div className="position-entry">
            <div className="position-role">{currentEntry.role}</div>
            <div className="person-name">{currentEntry.name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorStyle;
