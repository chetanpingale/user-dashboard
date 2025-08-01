
// useDebounce: returns a debounced version of a value after a delay
import { useState, useEffect } from 'react';

// useDebounce: returns a debounced version of a value after a delay
export function useDebounce<T>(value: T, delay: number): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Clear timer if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
}
