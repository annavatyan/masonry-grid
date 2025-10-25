import { Link, useLocation, useParams } from "react-router-dom";
import useFetchPhotoById from "../../hooks/useFetchPhotoById";
import type { Photo } from "../../utils/types";

export default function PhotoPage() {
    const location = useLocation();
    const { id } = useParams<{id: string}>();

    const initialPhoto: Photo | null = location.state?.photo || null;

    const { photo: fetchedPhoto, loading, error } = 
          !initialPhoto ? useFetchPhotoById(id!) : 
          { photo: null, loading: false, error: null };

    const photo = initialPhoto || fetchedPhoto;
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!photo) return <p>Photo not found</p>;

    return (
        <div className="container mx-auto px-4">
            <nav className="flex justify-between my-4" aria-label="Go back to gallery page">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 hover:underline rounded px-1 transition-colors"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Gallery
                </Link>
                <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm whitespace-nowrap px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 hover:text-blue-700 hover:underline transition-colors"
                >
                    View Photo on Pexels
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0-7L10 14"/>
                    </svg>
                </a>
            </nav>
           
            <article className="mb-20">
                <figure className="mb-8">
                    <img
                        className="mx-auto object-cover"
                        src={photo.src.large}
                        srcSet={`${photo.src.large} 1x, ${photo.src.large2x} 2x`}
                        sizes="(max-width: 1248px) 100vw, 1248px"
                        alt={photo.alt || "Photo"}
                        loading="lazy"
                    />
                </figure>

                <figcaption className="text-gray-500">
                    <p className="text-2xl text-gray-700 mb-5">{photo.alt}</p>
                    <p className="text-sm mb-2">
                        Photographer:{" "}
                        <a
                            href={photo.photographer_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 hover:underline"
                        >
                            {photo.photographer} ↗
                        </a>
                    </p>
                    <p className="text-sm">
                        Dimensions(actual): {photo.width} × {photo.height}
                    </p>
                </figcaption>
            </article>
        </div>
    )
}