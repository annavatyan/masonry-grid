import { useEffect, useMemo, useRef, useState } from 'react';
import useFetchPhotos from '../../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';
import type { Photo } from "../../utils/types";
import Spinner from '../Spinner';
import StatusMessage from '../StatusMessage/StatusMessage';

interface MasonryGridProps {
  searchTerm: string;
  columns: number;
}

const MasonryGrid = ({ searchTerm, columns:defaultColumns }: MasonryGridProps) => {
  const { photos, loading, error, loadMore } = useFetchPhotos(searchTerm);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [columns, setColumns] = useState(defaultColumns);

  // Responsive columns based on container width
  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth;

      if (width < 600) setColumns(2);
      else if (width < 900) setColumns(3);
      else setColumns(defaultColumns);

      setViewportHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultColumns]);


  // Scroll tracking for virtualization
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(containerRef.current?.scrollTop || window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;
  
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore(); // fetch next bucket of items
      }
    }, { rootMargin: "200px", threshold: 0.1  });
  
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMore, photos.length]);

   // Compute column layout with top positions
  const { distributed, columnHeights } = useMemo(() => {
    const cols: { photo: Photo; top: number; height: number }[][] = Array.from({ length: columns }, () => []);
    const heights = new Array(columns).fill(0);
    const columnWidth = (containerRef.current?.offsetWidth || window.innerWidth) / columns - 16;

    photos.forEach(photo => {
      const idx = heights.indexOf(Math.min(...heights));
      const height = (photo.height / photo.width) * columnWidth;
      cols[idx].push({ photo, top: heights[idx], height });
      heights[idx] += height + 16;
    });

    return { distributed: cols, columnHeights: heights };
  }, [photos, columns]);

  const buffer = 300;

  // Virtualization: only items in viewport ± buffer
  const visibleColumns = useMemo(() => {
    const top = scrollTop - buffer;
    const bottom = scrollTop + viewportHeight + buffer;

    return distributed.map(col => 
      col.filter(item => item.top + item.height > top && item.top < bottom)
    );
  }, [distributed, scrollTop, viewportHeight]);

  if (loading && !photos.length) return <Spinner size="full" message="Loading photos..." />;
  if (error) return <StatusMessage message={error} type="error" />;
  if (!photos.length && !loading) return <StatusMessage message="No photos found." type="info" />;

  return (
    <section ref={containerRef} className="masonry-grid" aria-label="Photo Gallery">
        <div className="flex gap-4 justify-center items-start">
          {visibleColumns.map((col, idx) => {
            const topOffset = col.length ? col[0].top : 0;
            const bottomOffset = (columnHeights[idx] ?? 0) - (col[col.length - 1]?.top + col[col.length - 1]?.height);

            return (
              <div key={idx} className="flex flex-col gap-4 flex-1">
                {topOffset > 0 && <div style={{ height: topOffset }} />}
                {col.map(({ photo }) => <PhotoCard key={photo.id} photo={photo} />)}
                {bottomOffset > 0 && <div style={{ height: bottomOffset }} />}
              </div>
            );
          })}
        </div>

        {loading && photos.length > 0 && <Spinner size="inline" />}

        {/* Element for infinite scroll */}
        <div ref={loadMoreRef} className="h-2" aria-hidden="true" tabIndex={0}/>
    </section>
  );
};

export default MasonryGrid;
