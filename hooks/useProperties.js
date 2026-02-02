import useSWR from 'swr';
import { fetchAllProperties } from '@/services/api';

const fetcher = (sort) => fetchAllProperties(sort);

const useProperties = (sort = '') => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['properties', sort],
    () => fetcher(sort),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  // isLoading: true when fetching and no data yet
  // We also consider it loading if data is undefined (first load)
  const loading = isLoading || (data === undefined && !error);

  return {
    properties: data || [],
    isLoading: loading,
    isValidating,
    isError: error,
    mutate,
  };
};

export default useProperties;
