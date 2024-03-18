import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';

class Client {
  products = {
    all: (queryParams?: Partial<QueryOptions>) =>
      HttpClient.get<ProductResponseCollection>(API_ENDPOINTS.PRODUCTS.ROOT, queryParams),
    get: (uuid: string) => HttpClient.get<ProductResponseIndividual>(`${API_ENDPOINTS.PRODUCTS.ROOT}/${uuid}`)
  };
}

const client = new Client();

export default client;
