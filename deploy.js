import { copyFileSync, mkdirSync, readdirSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Copy music files to dist after build
const musicSrcDir = join(__dirname, 'public', 'music');
const musicDestDir = join(__dirname, 'dist', 'music');

if (existsSync(musicSrcDir)) {
  // Create dist/music directory
  mkdirSync(musicDestDir, { recursive: true });

  // Copy all MP3 files
  const files = readdirSync(musicSrcDir);
  const mp3Files = files.filter(file => file.toLowerCase().endsWith('.mp3'));

  mp3Files.forEach(file => {
    const src = join(musicSrcDir, file);
    const dest = join(musicDestDir, file);
    copyFileSync(src, dest);
    console.log(`Copied: ${file}`);
  });

  // Generate music.json manifest with relative paths
  const musicPaths = mp3Files.map(file => `music/${file}`);
  const manifestPath = join(__dirname, 'dist', 'music.json');
  writeFileSync(manifestPath, JSON.stringify(musicPaths, null, 2));
  console.log(`\n✓ Generated music.json manifest`);
  console.log(`✓ Copied ${mp3Files.length} music file(s) to dist/music/`);
} else {
  console.log('No music directory found - deploying without music');
}
