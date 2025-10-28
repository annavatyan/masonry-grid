import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GalleryPage from './GalleryPage';

test('renders GalleryPage without crashing', () => {
  render(
    <MemoryRouter>
      <GalleryPage />
    </MemoryRouter>
  );

  expect(screen.getByText(/Masonry Grid/i)).toBeInTheDocument();
});
