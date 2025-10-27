import { useEffect, useState } from "react";
import { fetchPhotos } from "../utils/api";
import type { Photo } from "../utils/types";
import { GRID_PER_PAGE } from "../utils/constants";

const useFetchPhotos = (query: string, perPage=GRID_PER_PAGE, page=1) => {
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