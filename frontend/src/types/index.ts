type ResponseInfo<T> = {
  message: string;
  data: T;
  statusCode: number;
};

type Product = {
  uuid: string;
  title: string;
  description: string;
  stock: number;
  coverUrl: string;
  createdAt?: string;
};

type QueryOptions = {
  page: number;
  limit: number;
  sortedBy: string;
  orderBy: string;
};

type ProductResponseCollection = ResponseInfo<Product[]>;
type ProductResponseIndividual = ResponseInfo<Product>;