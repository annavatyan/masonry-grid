import { useEffect, useState } from "react";
import { fetchPhotos } from "../api/pexels";
import type { Photo } from "../utils/types";

const useFetchPhotos = (query: string, perPage=20, page=1) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchPhotos(query, perPage, page)
        .then(setPhotos)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [query, perPage, page]);

    return {photos, loading, error};
};

export default useFetchPhotos;