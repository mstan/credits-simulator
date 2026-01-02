import { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [availableSongs, setAvailableSongs] = useState([]); // Full list from manifest
  const [loadedSongs, setLoadedSongs] = useState([]); // Songs loaded in memory (max 2)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Get the base URL from Vite (handles GitHub Pages base path)
    const baseUrl = import.meta.env.BASE_URL;
    const manifestUrl = `${baseUrl}music.json`;

    console.log(`Attempting to load music from: ${manifestUrl}`);

    // Fetch the music manifest
    fetch(manifestUrl)
      .then(response => {
        console.log(`Music manifest response status: ${response.status}`);
        if (!response.ok) throw new Error('No music manifest found');
        return response.json();
      })
      .then(songs => {
        console.log('Music manifest loaded:', songs);
        if (songs.length > 0) {
          // Prepend base URL to each song path
          const songsWithBase = songs.map(song => `${baseUrl}${song}`);
          // Shuffle the playlist
          const shuffled = [...songsWithBase].sort(() => Math.random() - 0.5);
          setAvailableSongs(shuffled);

          // Load only first 2 songs initially
          const initialSongs = shuffled.slice(0, 2);
          setLoadedSongs(initialSongs);
          console.log(`Loaded ${initialSongs.length} of ${songs.length} songs initially`);
        } else {
          console.log('No music files in manifest');
        }
      })
      .catch(err => {
        console.error('Music loading failed:', err.message);
        console.error('Attempted URL:', manifestUrl);
      });
  }, []);

  useEffect(() => {
    if (loadedSongs.length > 0 && audioRef.current) {
      audioRef.current.src = loadedSongs[currentIndex];

      // Set volume to 50%
      audioRef.current.volume = 0.5;

      // Set preload to metadata only (don't preload entire file)
      audioRef.current.preload = 'metadata';

      // Auto-play attempt (may be blocked by browser policies)
      audioRef.current.play().catch(err => {
        console.log('Autoplay prevented. User interaction required.');
        setIsPlaying(false);
      });

      setIsPlaying(true);
    }
  }, [currentIndex, loadedSongs]);

  const handleEnded = () => {
    // Move to next song in loaded queue
    const nextIndex = currentIndex + 1;

    if (nextIndex < loadedSongs.length) {
      // Play next song that's already loaded
      setCurrentIndex(nextIndex);
    } else {
      // Load next song from available pool
      const nextSongIndex = loadedSongs.length % availableSongs.length;
      const nextSong = availableSongs[nextSongIndex];

      // Replace oldest song with new one (keep queue at 2 songs)
      setLoadedSongs(prev => {
        const newQueue = [...prev.slice(1), nextSong]; // Remove first, add new at end
        return newQueue;
      });

      setCurrentIndex(0); // Reset to play the newly loaded song
      console.log('Loaded next song:', nextSong);
    }
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

  if (loadedSongs.length === 0) {
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
