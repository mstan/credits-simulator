import { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Get the base URL from Vite (handles GitHub Pages base path)
    const baseUrl = import.meta.env.BASE_URL;

    // Fetch the music manifest
    fetch(`${baseUrl}music.json`)
      .then(response => {
        if (!response.ok) throw new Error('No music manifest found');
        return response.json();
      })
      .then(songs => {
        if (songs.length > 0) {
          // Prepend base URL to each song path
          const songsWithBase = songs.map(song => `${baseUrl}${song}`);
          // Shuffle the playlist
          const shuffled = [...songsWithBase].sort(() => Math.random() - 0.5);
          setPlaylist(shuffled);
          console.log(`Found ${songs.length} music file(s)`);
        } else {
          console.log('No music files in manifest');
        }
      })
      .catch(err => {
        console.log('No music available:', err.message);
      });
  }, []);

  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
      audioRef.current.src = playlist[currentIndex];

      // Set volume to 50%
      audioRef.current.volume = 0.5;

      // Auto-play attempt (may be blocked by browser policies)
      audioRef.current.play().catch(err => {
        console.log('Autoplay prevented. User interaction required.');
        setIsPlaying(false);
      });

      setIsPlaying(true);
    }
  }, [currentIndex, playlist]);

  const handleEnded = () => {
    // Move to next song in playlist
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (playlist.length === 0) {
    return null; // No music to play
  }

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        style={{ display: 'none' }}
      />
      <div className={`music-player-zone ${isPlaying ? 'playing' : 'paused'}`}>
        <button className="music-player-button" onClick={togglePlay}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
