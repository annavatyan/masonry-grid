import { useEffect, useMemo, useRef } from 'react';
import useFetchPhotos from '../../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';
import type { Photo } from "../../utils/types";

const MasonryGrid = ({searchTerm, columns}: {searchTerm: string, columns: number}) => {
  const { photos, loading, error, loadMore } = useFetchPhotos(searchTerm);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
 
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (loading && !photos.length) return <p className="text-center">Loading...</p>;

  return (
    <div className="masonry-grid">
        <div className="flex gap-4 justify-center items-start">
        {distributed.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-4 w-full">
            {col.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}
            </div>
        ))}
        </div>

        {loading && <p className="text-center mt-4">Loading more...</p>}

        {/* Element for infinite scroll */}
        <div ref={loadMoreRef} className="h-2" />
    </div>
  );
};

export default MasonryGrid;
