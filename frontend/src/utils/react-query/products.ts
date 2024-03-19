import { useQuery } from 'react-query';
import { API_ENDPOINTS } from './client/api-endpoints';
import client from './client';

export const useProducts = (options?: Partial<QueryOptions>) => {
  const { data, isLoading, error } = useQuery<ProductResponseCollection, Error>(
    [API_ENDPOINTS.PRODUCTS.ROOT, options],
    () => client.products.all(),
    { refetchOnWindowFocus: false }
  );

  return {
    products: data?.data,
    isLoading,
    error,
    isDataEmpty: data?.data?.length === 0,
  };
};

export const useProduct = (uuid: string) => {
  const { data, isLoading, error } = useQuery<ProductResponseIndividual, Error>(
    [`${API_ENDPOINTS.PRODUCTS.ROOT}/${uuid}`],
    () => client.products.get(uuid),
    { refetchOnWindowFocus: false }
  );

  return {
    quiz: data?.data,
    isLoading,
    error,
  };
};
