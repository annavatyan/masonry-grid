import SearchBar from '../../components/SearchBar';
import { useState } from 'react';
import MasonryGrid from '../../components/MasonryGrid';
import { GRID_COLUMNS_COUNT } from '../../utils/constants';

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("Portugal")

  return (
    <div className='container mx-auto px-4'>
        <h1 className="text-4xl font-bold text-center text-gray-800 m-5">
          Masonry Grid
        </h1>

        <SearchBar value={searchTerm}  onChange={setSearchTerm}/>

        <MasonryGrid searchTerm={searchTerm} columns={GRID_COLUMNS_COUNT}/>
    </div>
  );
};

export default GalleryPage;
