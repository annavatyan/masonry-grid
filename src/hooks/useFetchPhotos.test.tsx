import { render, screen, fireEvent } from "@testing-library/react";
import useFetchPhotos from "./useFetchPhotos";
import * as api from "../services/api";
import { vi } from "vitest";

const mockPhotosPage1 = [
  {
    id: 1,
    src: {
      original: "a_original.jpg",
      large2x: "a2x.jpg",
      large: "a.jpg",
      medium: "a_medium.jpg",
      landscape: "a_landscape.jpg",
      portrait: "a_portrait.jpg",
    },
    photographer: "Lena",
    photographer_url: "url",
    alt: "Sunset",
    width: 1200,
    height: 800,
    url: "url",
  },
];

const mockPhotosPage2 = [
  {
    id: 2,
    src: {
      original: "b_original.jpg",
      large2x: "b2x.jpg",
      large: "b.jpg",
      medium: "b_medium.jpg",
      landscape: "b_landscape.jpg",
      portrait: "b_portrait.jpg",
    },
    photographer: "Alex",
    photographer_url: "url",
    alt: "Mountain",
    width: 1200,
    height: 800,
    url: "url",
  },
];

// Mock API
vi.spyOn(api, "fetchPhotos").mockImplementation((_query, _perPage, page) => {
  if (page === 1) return Promise.resolve(mockPhotosPage1);
  if (page === 2) return Promise.resolve(mockPhotosPage2);
  return Promise.resolve([]);
});

// Helper component
function TestComponent({ query }: { query: string }) {
  const { photos, loading, error, loadMore } = useFetchPhotos(query);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {photos.map(p => <span key={p.id}>{p.alt}</span>)}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}

describe("useFetchPhotos hook via component", () => {
  afterEach(() => vi.clearAllMocks());

  test("fetches first page successfully", async () => {
    render(<TestComponent query="nature" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for first page
    await screen.findByText(/sunset/i);
    expect(screen.getByText(/sunset/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test("loadMore fetches next page and appends photos", async () => {
    render(<TestComponent query="nature" />);

    await screen.findByText(/sunset/i);

    fireEvent.click(screen.getByText(/load more/i));

    await screen.findByText(/mountain/i);
    expect(screen.getByText(/sunset/i)).toBeInTheDocument();
    expect(screen.getByText(/mountain/i)).toBeInTheDocument();
  });

  test("handles empty query", () => {
    render(<TestComponent query=" " />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sunset/i)).not.toBeInTheDocument();
  });

  test("handles fetch error", async () => {
    vi.spyOn(api, "fetchPhotos").mockRejectedValueOnce(new Error("Network error"));
    render(<TestComponent query="nature" />);

    await screen.findByText(/network error/i);
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});
