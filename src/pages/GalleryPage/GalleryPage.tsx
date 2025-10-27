import { Link } from 'react-router-dom';
import useFetchPhotos from '../../hooks/useFetchPhotos';
import SearchBar from '../../components/SearchBar';
import { useState } from 'react';

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("Portugal")
  const { photos, loading, error } = useFetchPhotos(searchTerm);

  return (
    <div className='container mx-auto px-4'>
        <h1 className="text-4xl font-bold text-center text-gray-800 m-5">
          Masonry Grid
        </h1>

        <SearchBar value={searchTerm}  onChange={setSearchTerm}/>

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
