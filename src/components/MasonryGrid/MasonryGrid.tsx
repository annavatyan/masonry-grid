import useFetchPhotos from '../../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';

const MasonryGrid = ({searchTerm, columns}:
     {searchTerm: string, columns: number}) => {
  const { photos, loading, error } = useFetchPhotos(searchTerm);
 
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (loading && !photos.length) return <p className="text-center">Loading...</p>;

  return (
    <div className="masonry-grid">
        <div className="masonry-css" style={{columnCount: columns}}>
            {photos.map(photo => (
              <div  key={photo.id} className="mb-4">
                <PhotoCard photo={photo} />
              </div>  
            ))}
        </div>

        {loading && <p className="text-center mt-4">Loading more...</p>}
    </div>
  );
};

export default MasonryGrid;
