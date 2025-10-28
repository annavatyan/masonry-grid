import { render, screen } from "@testing-library/react";
import useFetchPhotoById from "./useFetchPhotoById";
import * as api from "../services/api";
import { vi } from "vitest";

const mockPhoto = {
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
  photographer_url: "https://pexels.com/lena",
  alt: "Sunset photo",
  width: 1200,
  height: 800,
  url: "https://pexels.com/photo/1",
};

// Mock API
vi.spyOn(api, "fetchPhotoById").mockResolvedValue(mockPhoto);

// Helper test component
function TestComponent({ id }: { id: string }) {
  const { photo, loading, error } = useFetchPhotoById(id);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {photo && <span>{photo.alt}</span>}
    </div>
  );
}

describe("useFetchPhotoById hook via component", () => {
  afterEach(() => vi.clearAllMocks());

  test("fetches photo successfully", async () => {
    render(<TestComponent id="1" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for async effect
    await screen.findByText(/sunset photo/i);

    expect(screen.getByText(/sunset photo/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test("handles fetch error", async () => {
    vi.spyOn(api, "fetchPhotoById").mockRejectedValueOnce(new Error("Network error"));

    render(<TestComponent id="1" />);

    await screen.findByText(/network error/i);

    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});
