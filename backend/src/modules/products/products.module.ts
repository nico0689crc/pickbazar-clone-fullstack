import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Services } from 'src/core/constant/services';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    {
      provide: Services.PRODUCT,
      useClass: ProductsService,
    },
  ],
})
export class ProductsModule {}
