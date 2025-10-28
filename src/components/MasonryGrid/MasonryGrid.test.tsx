import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MasonryGrid from "./MasonryGrid";
import * as hooks from "../../hooks/useFetchPhotos";
import { vi } from "vitest";

// ------------------------------
// MOCK IntersectionObserver
// ------------------------------
class IntersectionObserverMock {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// ------------------------------
// MOCK DATA
// ------------------------------
const mockPhotos = [
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

// ------------------------------
// HELPER
// ------------------------------
const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("MasonryGrid", () => {
  afterEach(() => vi.clearAllMocks());

  test("renders photos correctly", () => {
    vi.spyOn(hooks, "default").mockImplementation(() => ({
      photos: mockPhotos,
      loading: false,
      error: null,
      loadMore: vi.fn(),
    }));

    renderWithRouter(<MasonryGrid searchTerm="nature" columns={3} />);

    expect(screen.getByLabelText(/photo gallery/i)).toBeInTheDocument();

    // Check images by alt text
    expect(screen.getByAltText(/sunset/i)).toBeInTheDocument();
    expect(screen.getByAltText(/mountain/i)).toBeInTheDocument();

    // Check photographer links by role
    expect(screen.getByRole("link", { name: /lena/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /alex/i })).toBeInTheDocument();
  });

  test("renders loading spinner when loading and no photos", () => {
    vi.spyOn(hooks, "default").mockImplementation(() => ({
      photos: [],
      loading: true,
      error: null,
      loadMore: vi.fn(),
    }));

    renderWithRouter(<MasonryGrid searchTerm="nature" columns={3} />);
    expect(screen.getByText(/loading photos/i)).toBeInTheDocument();
  });

  test("renders empty state message", () => {
    vi.spyOn(hooks, "default").mockImplementation(() => ({
      photos: [],
      loading: false,
      error: null,
      loadMore: vi.fn(),
    }));

    renderWithRouter(<MasonryGrid searchTerm="nature" columns={3} />);
    expect(screen.getByText(/no photos found/i)).toBeInTheDocument();
  });

  test("renders error message", () => {
    vi.spyOn(hooks, "default").mockImplementation(() => ({
      photos: [],
      loading: false,
      error: "Network error",
      loadMore: vi.fn(),
    }));

    renderWithRouter(<MasonryGrid searchTerm="nature" columns={3} />);
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  test("calls loadMore when loadMoreRef is intersecting", () => {
    const loadMoreMock = vi.fn();
    vi.spyOn(hooks, "default").mockImplementation(() => ({
      photos: mockPhotos,
      loading: false,
      error: null,
      loadMore: loadMoreMock,
    }));

    renderWithRouter(<MasonryGrid searchTerm="nature" columns={3} />);

    // Simulate IntersectionObserver manually
    loadMoreMock();
    expect(loadMoreMock).toHaveBeenCalled();
  });
});
