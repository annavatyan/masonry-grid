import { useState, useEffect, useMemo, useRef } from 'react';
import useFetchPhotos from '../../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';
import type { Photo } from "../../utils/types";
import Spinner from '../Spinner';
import StatusMessage from '../StatusMessage/StatusMessage';

const MasonryGrid = ({searchTerm, columns: defaultColumns}: {searchTerm: string, columns: number}) => {
  const { photos, loading, error, loadMore } = useFetchPhotos(searchTerm);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [columns, setColumns] = useState(defaultColumns);

  //Responsive columns
  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth;

      if (width < 600) setColumns(2);
      else if (width < 900) setColumns(3);
      else setColumns(defaultColumns);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultColumns]);

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;
  
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore(); // fetch next bucket of items
      }
    }, { rootMargin: "200px", threshold: 0.1  });
  
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

   // Split photos into columns
    const distributed = useMemo(() => {
        const cols: Photo[][] = Array.from({ length: columns }, () => []);
        photos.forEach((photo, idx) => {
        cols[idx % columns].push(photo);
        });
        return cols;
    }, [photos, columns]);

    if (loading && !photos.length) return <Spinner size="full" message="Loading photos..." />;
    if (error) return <StatusMessage message={error} type="error" />;
    if (!photos.length && !loading) return <StatusMessage message="No photos found." type="info" />;


  return (
    <section ref={containerRef} className="masonry-grid" aria-label="Photo Gallery">
        <div className="flex gap-4 justify-center items-start">
          {distributed.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-4 flex-1">
              {col.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} />
              ))}
              </div>
          ))}
        </div>

        {loading && photos.length > 0 && <Spinner size="inline" />}

        {/* Element for infinite scroll */}
        <div ref={loadMoreRef} className="h-2" aria-hidden="true" tabIndex={0}/>
    </section>
  );
};

export default MasonryGrid;
