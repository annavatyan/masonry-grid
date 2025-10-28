import { memo, useState } from "react";
import { Link } from "react-router-dom";
import type { Photo } from "../../utils/types";

const loadedImages = new Set<string>();

const PhotoCard = memo(({ photo }: { photo: Photo }) => {
  const [loaded, setLoaded] = useState(loadedImages.has(photo.src.large2x));

  const handleLoad = () => {
    loadedImages.add(photo.src.large2x);
    setLoaded(true);
  };

  return (
    <article className="group relative w-full transition-transform duration-300 ease-out will-change-transform hover:scale-[1.02] hover:z-10">
      <Link
        to={`/photo/${photo.id}`}
        state={{ photo }}
        aria-label={`View photo by ${photo.photographer || "unknown photographer"}`}
        className="block w-full"
      >
        <div
          className="w-full rounded-lg overflow-hidden"
          style={{ aspectRatio: photo.width / photo.height }}
        >
          <img
             className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
            }`}
            onLoad={handleLoad}
            src={photo.src.large}
            srcSet={`${photo.src.large} 1x, ${photo.src.large2x} 2x`}
            alt={photo.alt || `Photo by ${photo.photographer || "unknown photographer"}`}
            decoding="async"
            fetchPriority="low"
          />
        </div>
      </Link>
    </article>
  );
});

PhotoCard.displayName = "PhotoCard";
export default PhotoCard;