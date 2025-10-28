import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value = "", onChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedInput = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedInput !== value) {
      onChange(debouncedInput);
    }
  }, [debouncedInput, value, onChange]);

  return (
    <div className="relative w-full max-w-2xl m-auto mb-5">
        <input
            type="text"
            placeholder="Search photos..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2
                       border border-gray-300
                       rounded-lg shadow-sm"
            aria-label="Search photos"
        />
        <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.7-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
  );
}
