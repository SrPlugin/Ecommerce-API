import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
	@ApiProperty({
		description: 'The id of the product',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsString()
	@IsNotEmpty()
	product_id: string;

	@ApiProperty({
		description: 'The quantity of the product',
		example: 1,
	})
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	quantity: number;
}
