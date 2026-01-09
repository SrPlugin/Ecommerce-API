import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from '@orders/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '@orders/dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Order } from '@orders/entities/order.entity';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new order' })
	@ApiResponse({ status: 201, description: 'The order has been successfully created' })
	create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
		return this.ordersService.create(createOrderDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all orders' })
	@ApiResponse({ status: 200, description: 'The orders have been successfully retrieved' })
	findAll(): Promise<Order[]> {
		return this.ordersService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get an order by id' })
	@ApiResponse({ status: 200, description: 'The order has been successfully retrieved' })
	findOne(@Param('id') id: string): Promise<Order> {
		return this.ordersService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update an order by id' })
	@ApiResponse({ status: 200, description: 'The order has been successfully updated' })
	update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
		return this.ordersService.update(id, updateOrderDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete an order by id' })
	@ApiResponse({ status: 200, description: 'The order has been successfully deleted' })
	remove(@Param('id') id: string): Promise<{ message: string }> {
		return this.ordersService.remove(id);
	}
}
