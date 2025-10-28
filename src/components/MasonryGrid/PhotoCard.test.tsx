import { render, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PhotoCard, { loadedImages } from "./PhotoCard";
import type { Photo } from "../../utils/types";

// ------------------------------
// MOCK PHOTO
// ------------------------------
const photo: Photo = {
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
  photographer_url: "url",
  alt: "Sunset",
  width: 1200,
  height: 800,
  url: "url",
};

// ------------------------------
// HELPER
// ------------------------------
const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("PhotoCard", () => {
  afterEach(() => {
    // Clear loadedImages between tests
    loadedImages.clear();
  });

  test("renders image with correct src, srcSet, and alt", () => {
    const { container } = renderWithRouter(<PhotoCard photo={photo} />);
    const article = container.querySelector("article")!;
    const img = within(article).getByAltText(/sunset/i) as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toContain("large.jpg");
    expect(img.srcset).toContain("large.jpg 1x");
    expect(img.srcset).toContain("large2x.jpg 2x");
  });

  test("link navigates to correct path with state", () => {
    const { container } = renderWithRouter(<PhotoCard photo={photo} />);
    const article = container.querySelector("article")!;
    const link = within(article).getByRole("link", { name: /view photo by lena/i });

    expect(link).toHaveAttribute("href", `/photo/${photo.id}`);
  });

  test("image load sets loaded state and updates class", () => {
    const { container } = renderWithRouter(<PhotoCard photo={photo} />);
    const article = container.querySelector("article")!;
    const img = within(article).getByAltText(/sunset/i);

    // Initially should have opacity-0 and scale-[1.02]
    expect(img.className).toMatch(/opacity-0/);
    expect(img.className).toMatch(/scale-\[1.02\]/);

    // Simulate image load
    fireEvent.load(img);

    // After load, should have opacity-100 and scale-100
    expect(img.className).toMatch(/opacity-100/);
    expect(img.className).toMatch(/scale-100/);
  });
});
