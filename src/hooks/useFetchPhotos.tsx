import { useCallback, useEffect, useState } from "react";
import { fetchPhotos } from "../utils/api";
import type { Photo } from "../utils/types";
import { GRID_PER_PAGE } from "../utils/constants";

const useFetchPhotos = (query: string, perPage = GRID_PER_PAGE) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPhotos(query, perPage, page)
      .then(newPhotos => {
        setPhotos(prev => page === 1 ? newPhotos : [...prev, ...newPhotos]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [query, perPage, page]);

   // Reset on query changes
   useEffect(() => {
    setPhotos([]);
    setPage(1);
  }, [query]);

  const loadMore = useCallback(() => setPage(prev => prev + 1), []);

  return { photos, loading, error, loadMore };
};

export default useFetchPhotos;