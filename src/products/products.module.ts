import { Module } from '@nestjs/common';
import { ProductsService } from '@products/products.service';
import { ProductsController } from '@products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@products/entities/product.entity';

@Module({
	controllers: [ProductsController],
	providers: [ProductsService],
	imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
