import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from '@orders/orders.service';
import { OrdersController } from '@orders/orders.controller';
import { Order, OrderItem } from '@orders/entities';
import { Product } from '@products/entities/product.entity';
import { EmailsModule } from '@emails/emails.module';

@Module({
	imports: [TypeOrmModule.forFeature([Order, OrderItem, Product]), forwardRef(() => EmailsModule)],
	controllers: [OrdersController],
	providers: [OrdersService],
	exports: [OrdersService],
})
export class OrdersModule {}
