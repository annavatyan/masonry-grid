import type { Photo } from '../utils/types';
import { 
  GRID_PER_PAGE,
  PEXELS_API_KEY, 
  PEXELS_API_URL 
} from '../utils/constants'

export const fetchPhotos = async (query: string, perPage = GRID_PER_PAGE, page = 1): Promise<Photo[]> => {
  const res = await fetch(
    `${PEXELS_API_URL}/search?query=${encodeURIComponent(
      query
    )}&per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  )

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.photos;
};

export const fetchPhotoById= async (id: string): Promise<Photo> => {
  const res = await fetch(
    `${PEXELS_API_URL}/photos/${id}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  )

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data;
};
