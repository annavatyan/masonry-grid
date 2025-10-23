import { Routes, Route } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import PhotoPage from './pages/PhotoPage';

function App() {
  return (
     <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route path="/photo/:id" element={<PhotoPage />} />
     </Routes>
  )
}

export default App