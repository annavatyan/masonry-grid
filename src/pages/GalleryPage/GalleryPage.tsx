import useFetchPhotos from '../../hooks/useFetchPhotos';

const GalleryPage = () => {
  const { photos, loading, error } = useFetchPhotos("Portugal");

  return (
    <div>
        <h1>Gallery Page</h1>

        {error && <p>Error - {error}</p>}

        {loading && <p>Loading...</p>}

        {!error && !loading && photos?.length &&
            <div style={{columnCount: 5}}>
                {photos.map(photo => (
                    <a href={`/photo/${photo.id}`} 
                    target="_blank"
                    key={photo.id}>
                        <img src={photo.src.medium} alt={photo.title} style={{ width: '100%' }} />
                    </a>
                ))}
            </div>
        }
        
    </div>
  );
};

export default GalleryPage;
