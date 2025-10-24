import { Link } from 'react-router-dom';
import useFetchPhotos from '../../hooks/useFetchPhotos';

const GalleryPage = () => {
  const { photos, loading, error } = useFetchPhotos("Portugal");

  return (
    <div className='container mx-auto px-4'>
        <h1>Gallery Page</h1>

        {error && <p>Error - {error}</p>}

        {loading && <p>Loading...</p>}

        {!error && !loading && photos?.length &&
            <div style={{columnCount: 5}}>
                {photos.map(photo => (
                    <Link to={`/photo/${photo.id}`} state={{ photo }}
                    
                    key={photo.id}>
                        <img src={photo.src.medium} alt={photo.alt} style={{ width: '100%' }} />
                    </Link>
                ))}
            </div>
        }
        
    </div>
  );
};

export default GalleryPage;
