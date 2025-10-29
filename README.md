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

---

## General Decisions / Considerations

The application is designed for performance, accessibility, and maintainability. Shared components, TypeScript types, and optimized layouts ensure consistency across pages.

### Important Performance Optimizations

- **`aspect-ratio`** – Reserves layout space before images load, preventing cumulative layout shift (CLS) without specifying width/height.  
  This improves perceived stability and overall performance. 
   
  > **NOTE :** Some Lighthouse versions may still report CLS issues because they don’t fully recognize the CSS `aspect-ratio` property.

### Build Optimization

**Lazy Loading**  
PhotoPage is lazy-loaded using `Suspense`, which reduces the initial bundle size and speeds up the first meaningful render.

**Chunking**  
React and React Router are split into a separate vendor chunk for better caching and faster subsequent loads.

### Lighthouse

The application has been tested and optimized using **Lighthouse** to ensure good web performance and accessibility:

- **Performance:** Verified fast load times and smooth scrolling. 
- **Best Practices:** Ensured proper use of links, secure external URLs (`rel="noopener noreferrer"`), and responsive design.
- **Web Vitals:** Monitored metrics such as Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Total Blocking Time (TBT) to maintain high UX scores.

### Accessibility (a11y)

The application prioritizes accessibility and has been tested using **a11y-jsx plugin**, **Lighthouse audits**, WCAG Color Contrast Checker browser extension and manual checks:

- **Semantic Markup:** Proper use of elements (`<nav>`, `<main>`, `<figure>`, `<figcaption>`, etc.) for meaningful structure.  
- **Alt Text:** All images include descriptive `alt` attributes.  
-** ARIA Attributes**: Roles and labels applied where appropriate (e.g., aria-label for search and navigation links).
- **Keyboard Navigation and Focus Styles:** The app implements a consistent focus indicator for keyboard navigation using Tailwind’s utilities.

### Unit Testing

The application includes automated tests to ensure components and hooks work correctly:

- **Testing Framework:** Vitest is used for unit and integration tests.  
- **Coverage:** Tests cover key components such as `MasonryGrid`, `PhotoCard`, `SearchBar`, and custom hooks (`useFetchPhotos`, `useFetchPhotoById`).  
- **Accessibility Testing:** Some tests include a11y checks to ensure semantic markup, focus, and ARIA attributes are correctly applied.  

**Run Tests:**

```bash
npm run test

### TypeScript

The project uses **TypeScript** for type safety and maintainability:

- **Type Safety:** Ensures props, state, and API responses are correctly typed.  
- **Custom Types:** `Photo` type defines the structure of Pexels API photo objects and is used across components and hooks.  
- **Improved Developer Experience:** Catch errors at compile-time and get better autocompletion in editors.  
- **Consistency:** Shared types ensure consistent data handling between **Gallery Page** and **Photo Page**.

---

## Gallery Page & Masonry Grid

The **Gallery Page** is the main entry point of the app, displaying a masonry photo grid with search functionality.

### Design Decisions

- **Search Bar with Debounce:** Reduces unnecessary API calls; accessible with `aria-label`.
- **Custom Hook (`useFetchPhotos`):** Handles API fetching, pagination, loading, and errors. Resets data on query change.
- **Masonry Layout:** Column-based layout provides control over image ordering and responsive behavior.
- **Responsive Columns:** Dynamically adjusts based on container width (`2` for <600px, `3` for <900px, default for larger screens).
- **Virtualization:** Only photos in the viewport ± buffer are rendered to reduce DOM nodes.
- **Infinite Scroll:** Triggered with `IntersectionObserver` for efficient photo loading.
- **Memoized Components:** `PhotoCard` wrapped with `React.memo`; event handlers use `useCallback` to minimize re-renders.

### Performance Optimizations

- **Image Loading:**  
  - `decoding="async"` prevents blocking  
  - Fade-in transition avoids sudden layout jumps  
  - aspect-ratio - prevent CLS
- **Buffered Virtualization:** Renders only visible photos plus a 300px buffer
- **Efficient Column Distribution:** Calculated with `useMemo` to minimize recalculation
- **Intersection Observer:** Triggers `loadMore` efficiently without polling or scroll events

## Photo Page

The **Photo Page** displays a single photo in high resolution, along with photographer information and a link to the Pexels page.

### Design Decisions

- **State Management:** Uses React Router `location.state` to pass photo data when navigating from the gallery; falls back to `useFetchPhotoById` for direct page access or refresh.  
- **Custom Hook (`useFetchPhotoById`):** Encapsulates fetching a single photo by ID, including loading and error handling.  
- **Dynamic Image Variant:** Chooses `landscape` or `portrait` variant based on the photo’s dimensions for optimal display.  
- **Navigation & Accessibility:** Back link to gallery and external Pexels link; uses semantic `<nav>` and `aria-labels`.  
- **Responsive Layout:** `aspect-ratio` CSS property ensures the layout reserves space before the image loads.  

### Performance Optimizations

- **Largest Contentful Paint (LCP) Optimization:**  
  - Preloads the main image using `preload()` to start fetching early.  
  - `fetchPriority="high"` ensures the main image is prioritized.  
  - `decoding="async"` prevents blocking the main thread.  
  - Fade-in transition avoids a “jump-in” effect.  
  - aspect-ratio - prevent CLS
- **Efficient Rendering:** Uses memoized `useMemo` to determine the best image variant. 


## Shared Components

The app includes reusable components to ensure consistent UI behavior across pages.

- **Loading Handling:** `Spinner` provides visual feedback during data fetching without blocking the UI. Supports `full` and `inline` variants.  
- **Error Handling:** `StatusMessage` displays informative messages for errors or empty states, ensuring users understand issues.  

## Future Improvements

### Quick View Popup
- Add a modal or lightbox for quick preview of a photo directly from the masonry grid, without leaving the gallery.

### Improved “Back to Gallery” Navigation
- Preserve scroll position when returning from a photo page to the gallery.
- Avoid full page refresh to make navigation feel seamless.