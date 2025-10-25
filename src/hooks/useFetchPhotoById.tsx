import { useEffect, useState } from "react";
import { fetchPhotoById } from "../api/pexels";
import type { Photo } from "../utils/types";

const useFetchPhotoById = (id: string) => {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchPhotoById(id)
        .then(setPhoto)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [id]);

    return {photo, loading, error};
};

export default useFetchPhotoById;