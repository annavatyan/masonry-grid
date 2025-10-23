import { useEffect, useState } from 'react';
import { fetchPhotos } from '../../api/pexels';
import type { Photo } from '../../utils/types';

const GalleryPage = () => {
const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPhotos('Portugal')
    .then(setPhotos)
  }, []);

  return (
    <div>
        <h1>Gallery Page</h1>

        <div style={{columnCount: 5}}>
        {photos.map(photo => (
            <a href={`/photo/${photo.id}`} 
            target="_blank"
            key={photo.id}>
                <img src={photo.src.medium} alt={photo.title} style={{ width: '100%' }} />
            </a>
        ))}
        </div>
    </div>
  );
};

export default GalleryPage;
