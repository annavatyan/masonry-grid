import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import * as debounceHook from "../../hooks/useDebounce";
import { vi } from "vitest";

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with initial value", () => {
    render(<SearchBar value="flowers" onChange={vi.fn()} />);
    const input = screen.getByRole("textbox", { name: /search photos/i });
    expect(input).toHaveValue("flowers");
  });

  test("updates inputValue on user typing", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    const input = screen.getByRole("textbox", { name: /search photos/i });

    fireEvent.change(input, { target: { value: "sunset" } });
    expect(input).toHaveValue("sunset");
  });

  test("calls onChange with debounced value", () => {
    const mockOnChange = vi.fn();

    // Mock useDebounce to return value immediately
    vi.spyOn(debounceHook, "useDebounce").mockImplementation((value) => value);

    render(<SearchBar value="" onChange={mockOnChange} />);
    const input = screen.getByRole("textbox", { name: /search photos/i });

    fireEvent.change(input, { target: { value: "mountain" } });
    expect(mockOnChange).toHaveBeenCalledWith("mountain");
  });

  test("does not call onChange if value hasn't changed", () => {
    const mockOnChange = vi.fn();
    vi.spyOn(debounceHook, "useDebounce").mockImplementation((value) => value);

    render(<SearchBar value="lake" onChange={mockOnChange} />);
    const input = screen.getByRole("textbox", { name: /search photos/i });

    // change input to same value
    fireEvent.change(input, { target: { value: "lake" } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
