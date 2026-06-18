import { useState, useEffect } from 'react';

export function useFetchMock<T>(data: T, delayMs = 350): { data: T | null; loading: boolean } {
  const [mockData, setMockData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setMockData(data);
      setLoading(false);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [data, delayMs]);

  return { data: mockData, loading };
}
