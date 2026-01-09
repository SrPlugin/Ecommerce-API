import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from '@seed/seed.service';
import { SeedController } from '@seed/seed.controller';
import { Product } from '@products/entities/product.entity';
import { OrderItem } from '@orders/entities/order-item.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Product, OrderItem])],
	controllers: [SeedController],
	providers: [SeedService],
	exports: [SeedService],
})
export class SeedModule {}
