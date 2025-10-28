import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import PhotoPage from "./PhotoPage";
import * as fetchHook from "../../hooks/useFetchPhotoById";

// Mock useFetchPhotoById
vi.mock("../../hooks/useFetchPhotoById");

const mockLandscapePhoto = {
  id: 1,
  src: {
    original: "original.jpg",
    large2x: "large2x.jpg",
    large: "large.jpg",
    medium: "medium.jpg",
    landscape: "landscape.jpg",
    portrait: "portrait.jpg"
  },
  photographer: "Lena",
  photographer_url: "https://pexels.com/lena",
  alt: "Sunset photo",
  width: 1200,
  height: 800,
  url: "https://pexels.com/photo/1"
};

const mockPortraitPhoto = {
  id: 2,
  src: {
    original: "original.jpg",
    large2x: "large2x.jpg",
    large: "large.jpg",
    medium: "medium.jpg",
    landscape: "landscape2.jpg",
    portrait: "portrait2.jpg"
  },
  photographer: "Mark",
  photographer_url: "https://pexels.com/mark",
  alt: "Mountain photo",
  width: 800,
  height: 1200,
  url: "https://pexels.com/photo/2"
};

function renderWithRouter(initialEntries: any[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/photo/:id" element={<PhotoPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("PhotoPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders photo immediately from location.state (landscape)", () => {
    renderWithRouter([{ pathname: "/photo/1", state: { photo: mockLandscapePhoto } }]);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "landscape.jpg"); // landscape chosen
    expect(screen.getByText(/sunset photo/i)).toBeInTheDocument();
    expect(screen.getByText("View Photo on Pexels")).toHaveAttribute("href", mockLandscapePhoto.url);
    expect(screen.getByText(/back to gallery/i)).toBeInTheDocument();
  });

  test("renders photo immediately from location.state (portrait)", () => {
    renderWithRouter([{ pathname: "/photo/2", state: { photo: mockPortraitPhoto } }]);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "portrait2.jpg"); // portrait chosen
    expect(screen.getByText(/mountain photo/i)).toBeInTheDocument();
  });

  test("shows spinner while fetching when no initial photo", () => {
    vi.spyOn(fetchHook, "default").mockReturnValue({
      photo: null,
      loading: true,
      error: null
    });

    renderWithRouter([{ pathname: "/photo/1" }]);

    expect(screen.getByText(/loading photo/i)).toBeInTheDocument();
  });

  test("shows error message when fetch hook returns error", () => {
    vi.spyOn(fetchHook, "default").mockReturnValue({
      photo: null,
      loading: false,
      error: "Network error"
    });

    renderWithRouter([{ pathname: "/photo/1" }]);

    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  test("shows info message when no photo is found", () => {
    vi.spyOn(fetchHook, "default").mockReturnValue({
      photo: null,
      loading: false,
      error: null
    });

    renderWithRouter([{ pathname: "/photo/1" }]);

    expect(screen.getByText(/photo not found/i)).toBeInTheDocument();
  });

  test("renders fetched photo when fetch hook returns photo", () => {
    vi.spyOn(fetchHook, "default").mockReturnValue({
      photo: mockLandscapePhoto,
      loading: false,
      error: null
    });

    renderWithRouter([{ pathname: "/photo/1" }]);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "landscape.jpg");
    expect(screen.getByText(/sunset photo/i)).toBeInTheDocument();
    expect(screen.getByText("View Photo on Pexels")).toHaveAttribute("href", mockLandscapePhoto.url);
    expect(screen.getByText(/back to gallery/i)).toBeInTheDocument();
  });
});
