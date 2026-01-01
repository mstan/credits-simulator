# Credits Simulator

A fun movie credits simulator built with React and Vite. Features silly character names and crew positions, with two different credit display styles.

## Features

- **Director Style**: One name at a time with smooth fade transitions
- **Scrolling Style**: Traditional bottom-to-top scrolling credits
- **Name Generation**: Randomly generates either character names (like "Mister Franklin, God of Fire") or position names (like "John Smith - Senior Dog Walker")
- **Music Player**: Background music with playlist support (placeholder system included)
- **Responsive Design**: Works on any screen resolution

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm run start
```

or

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`

## Adding Background Music

1. Place your MP3 files in the `public/music/` directory
2. The music player will automatically detect and play them in random order
3. That's it! No code changes needed - just drop your MP3 files in and they'll be discovered automatically

## How It Works

### Name Types

The app picks one name type at the start of each session:

- **Character Names**: Generates silly fantasy-style character titles
  - Example: "Franklin, God of Fire", "Sheriff of Ice"
- **Position Names**: Generates crew-style credits with positions
  - Example: "John Smith - Dog Walker", "Sarah Johnson - Designer of the letter F"

### Pages

- **Home** (`/`): Choose between Director or Scrolling style
- **Director Style** (`/director`): Shows one name at a time
- **Scrolling Style** (`/scrolling`): Shows many names scrolling up

## Project Structure

```
web-based/
├── src/
│   ├── components/
│   │   └── MusicPlayer.jsx       # Background music player
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── DirectorStyle.jsx     # Director-style credits
│   │   └── ScrollingStyle.jsx    # Scrolling credits
│   ├── utils/
│   │   └── nameGenerator.js      # Name generation logic
│   └── data/
│       ├── characterNames/        # Character name JSON data
│       └── positionNames/         # Position name JSON data
└── public/
    └── music/                     # Place MP3 files here
```

## Customization

### Adding More Names

Edit the JSON files in `src/data/` to add more name variations:

- Character names: `src/data/characterNames/*.json`
- Position names: `src/data/positionNames/*.json`

### Adjusting Timing

- **Director Style**: Change the interval in `src/pages/DirectorStyle.jsx:24` (default: 4000ms)
- **Scrolling Style**: Change the animation duration in `src/pages/ScrollingStyle.css:15` (default: 120s)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.
