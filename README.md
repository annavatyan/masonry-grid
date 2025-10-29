# Masonry Grid SPA

A high-performance React + TypeScript app with a masonry photo grid and detailed photo view.

## Tech Stack

- React + TypeScript
- Vite
- React Router (for page navigation)
- Vitest + Testing Library (for testing)
- a11y-jsx (for accessibility checks)
- Tailwind CSS (for fast and responsive styling)

## Project setup and run

1. Clone the repo:

```bash
git clone https://github.com/annavatyan/masonry-grid.git
cd masonry-grid
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

This project uses the Pexels API.
Create a .env file in the project root and add your API key:

VITE_PEXELS_API_KEY=your_api_key_here

4. Run the development server:

```bash
npm run dev
```

5. Run tests:

```bash
npm run test
```

6. Build the app:

```bash
npm run build

## Performance Optimizations
 
###  Photo Page
preload() - Start LCP image fetch early | Faster LCP
fetchPriority="high"- Prioritize main image | Faster render
decoding="async"- Non-blocking image decode | Smoother paint
Fade-in transition - Visual polish | No “jump-in” effect 
aspect-ratio - Reserve layout space before image loads | Prevent CLS without width/height
