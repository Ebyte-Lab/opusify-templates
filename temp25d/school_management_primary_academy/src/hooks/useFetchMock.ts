import { useState, useEffect } from 'react';

export function useFetchMock<T>(mockData: T, delayMs = 400) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [mockData, delayMs]);

  return { data, isLoading };
}
export default useFetchMock;
