import { useState, useEffect } from 'react';
import { IToDoResp, IToDoRespById } from '../../Shared/types';


const useFetchById = (url: string): IToDoRespById => {
  const [data, setData] = useState<IToDoResp | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetchById;
