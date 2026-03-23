import { useEffect, useState } from 'react';
import type { AxiosResponse } from 'axios';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(fetcher: () => Promise<AxiosResponse<T>>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetcher();
        if (!cancelled) {
          setData(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('An error occurred'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}
