import { memo } from "react";
import { Link } from "react-router-dom";
import type { Photo } from "../../utils/types";

const PhotoCard = memo(({ photo }: { photo: Photo }) => {
  return (
    <article className="group relative w-full">
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
            className="w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-out"
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
            src={photo.src.large}
            srcSet={`${photo.src.small} 0.5x, ${photo.src.large} 1x, ${photo.src.large2x} 2x`}
            alt={photo.alt || `Photo by ${photo.photographer || "unknown photographer"}`}
            loading="lazy"
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