import { IsString, IsNotEmpty, MinLength, IsNumber, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
	@ApiProperty({
		description: 'The email of the customer',
		example: 'customer@example.com',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	contact_email: string;

	@ApiProperty({
		description: 'The name of the customer',
		example: 'John Doe',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	contact_name: string;

	@ApiProperty({
		description: 'The shipping address of the customer',
		example: '123 Main St, City, Country',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	shipping_address: string;

	@ApiProperty({
		description: 'The items of the order',
		example: [
			{
				product_id: '123e4567-e89b-12d3-a456-426614174000',
				quantity: 1,
			},
		],
	})
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateOrderItemDto)
	items: CreateOrderItemDto[];

	@ApiProperty({
		description: 'The customer identifier',
		example: 12345678,
	})
	@IsNumber()
	@IsNotEmpty()
	customer_identifier: number;
}
