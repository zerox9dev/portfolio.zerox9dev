# Images Directory

This directory contains all the images used in the portfolio. Place your images here following this structure:

## Required Images

### Avatar
- `avatar.jpg` - Your profile picture (recommended: 400x400px)

### Project Images
For each project, you'll need:
- `project1-logo.png` - Project 1 logo (recommended: 200x200px)
- `project1-1.jpg` - Project 1 screenshot 1 (recommended: 1200x800px)
- `project1-2.jpg` - Project 1 screenshot 2 (recommended: 1200x800px)
- `portfolio-logo.png` - Portfolio website logo (recommended: 200x200px)
- `portfolio-1.jpg` - Portfolio website screenshot 1 (recommended: 1200x800px)
- `portfolio-2.jpg` - Portfolio website screenshot 2 (recommended: 1200x800px)

## Example Structure
```
public/images/
├── avatar.jpg
├── project1-logo.png
├── project1-1.jpg
├── project1-2.jpg
├── portfolio-logo.png
├── portfolio-1.jpg
└── portfolio-2.jpg
```

## Updating the Data

After adding images, update the corresponding entries in `src/lib/data.ts` with:
- Correct image paths (`/images/filename.ext`)
- Image dimensions (width/height)
- Descriptive alt text

The current data.ts file contains placeholder data that you'll need to replace with your actual content.