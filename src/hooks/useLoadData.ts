'use client';

import { useEffect, useState } from 'react';

export default function useLoadData(
  apiEndpoint: string,
  dataVar: string = 'data',
  isLoadingVar: string = 'isLoading'
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(apiEndpoint, { method: 'GET' });
        const { data } = await res.json();
        setData(data);
      } catch (err) {
        console.error('Client error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { [dataVar]: data, [isLoadingVar]: isLoading } as any;
}
