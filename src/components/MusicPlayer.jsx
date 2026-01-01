import { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Automatically discover all MP3 files in the public/music directory
    // Vite's import.meta.glob scans for files at build time
    const musicFiles = import.meta.glob('/public/music/*.mp3', {
      eager: true,
      query: '?url',
      import: 'default'
    });

    // Convert the object keys to an array of URLs
    const songs = Object.keys(musicFiles).map(path => {
      // Convert /public/music/song.mp3 to /music/song.mp3
      return path.replace('/public', '');
    });

    if (songs.length > 0) {
      // Shuffle the playlist
      const shuffled = [...songs].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
      console.log(`Found ${songs.length} music file(s):`, songs);
    } else {
      console.log('No music files found in public/music/');
    }
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
      <div className="music-player-zone">
        <button className="music-player-button" onClick={togglePlay}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
