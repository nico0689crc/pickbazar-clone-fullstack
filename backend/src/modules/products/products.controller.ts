import {
  Controller,
  Get,
  Param,
  Inject,
  UseInterceptors,
  HttpStatus
} from '@nestjs/common';
import { Routes } from 'src/core/constant/routes';
import { Services } from 'src/core/constant/services';
import { IProductService } from './interfaces/product.interface';
import { TransformInterceptor } from 'src/core/interceptors/transform-interceptor';
import { MessageEntityResponse } from 'src/core/types';
import { Product } from './entities/product.entity';
import { plainToClass } from 'class-transformer';

@UseInterceptors(TransformInterceptor)
@Controller(Routes.PRODUCTS)
export class ProductsController {
  constructor(
    @Inject(Services.PRODUCT) private productsService: IProductService,
  ) { }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll({});

    return {
      result: plainToClass(Product, products),
      statusCode: HttpStatus.OK,
    };
  }

  @Get('run-seeds')
  runSeeds() {
    return this.productsService.runSeeds();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<MessageEntityResponse<Product>> {
    const product = await this.productsService.findOne({ where: { uuid } });

    return {
      result: plainToClass(Product, product),
      statusCode: HttpStatus.OK,
    };
  }
}
