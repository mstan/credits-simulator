import { copyFileSync, mkdirSync, readdirSync, existsSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create .nojekyll file to prevent GitHub Pages from using Jekyll
const nojekyllPath = join(__dirname, 'dist', '.nojekyll');
writeFileSync(nojekyllPath, '');
console.log('✓ Created .nojekyll file for GitHub Pages');

// Copy music files to dist after build
const musicSrcDir = join(__dirname, 'public', 'music');
const musicDestDir = join(__dirname, 'dist', 'music');

if (existsSync(musicSrcDir)) {
  // Create dist/music directory
  mkdirSync(musicDestDir, { recursive: true });

  // Copy only MP3 files (WAV files are too large for web deployment)
  const files = readdirSync(musicSrcDir);
  const mp3Files = files.filter(file => file.toLowerCase().endsWith('.mp3'));

  mp3Files.forEach(file => {
    const src = join(musicSrcDir, file);
    const dest = join(musicDestDir, file);
    copyFileSync(src, dest);
    const fileSizeKB = (existsSync(src) ? statSync(src).size / 1024 : 0).toFixed(0);
    console.log(`Copied: ${file} (${fileSizeKB} KB)`);
  });

  // Generate music.json manifest with relative paths
  const musicPaths = mp3Files.map(file => `music/${file}`);
  const manifestPath = join(__dirname, 'dist', 'music.json');
  writeFileSync(manifestPath, JSON.stringify(musicPaths, null, 2));
  console.log(`\n✓ Generated music.json manifest`);
  console.log(`✓ Copied ${mp3Files.length} MP3 file(s) to dist/music/`);
} else {
  console.log('No music directory found - deploying without music');
}
