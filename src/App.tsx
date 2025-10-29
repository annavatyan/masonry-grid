
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import Spinner from "./components/Spinner";

// Lazy-load Photo page
const PhotoPage = lazy(() => import("./pages/PhotoPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route 
        path="/photo/:id" 
        element={
          <Suspense fallback={<Spinner message="Loading Photo..."/>}>
            <PhotoPage />
          </Suspense>
        } 
      />
    </Routes>
  );
}

export default App;