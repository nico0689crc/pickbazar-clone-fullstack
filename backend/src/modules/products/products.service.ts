import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductService } from './interfaces/product.interface';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductsService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }
  findAll(options: FindManyOptions<Product>): Promise<Product[]> {
    return this.productRepository.find(options);
  }
  findOne(options: FindOneOptions<Product>): Promise<Product> {
    return this.productRepository.findOne(options);
  }
  async runSeeds(): Promise<void> {
    const promises = [...Array(100)].map((_, i) =>
      this.productRepository.save({
        uuid: faker.string.uuid(),
        title: faker.word.words({ count: { min: 5, max: 10 } }),
        description: faker.word.words({ count: { min: 80, max: 100 } }),
        coverUrl: faker.image.urlLoremFlickr({ category: 'products' }),
      }),
    );

    await Promise.all(promises);
  }
}
