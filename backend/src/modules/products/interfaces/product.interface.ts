import { FindManyOptions, FindOneOptions } from 'typeorm';
import { Product } from '../entities/product.entity';

export interface IProductService {
  findAll(options: FindManyOptions<Product>): Promise<Product[]>;
  findOne(options: FindOneOptions<Product>): Promise<Product>;
  runSeeds(): Promise<void>;
}
