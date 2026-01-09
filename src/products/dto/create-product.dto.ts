import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@ApiProperty({
		description: 'The name of the product',
		example: 'Phone 15 Pro Max',
	})
	name: string;

	@ApiProperty({
		description: 'The description of the product',
		example: 'The best phone in the world',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	description: string;

	@ApiProperty({
		description: 'The price of the product',
		example: 1000,
	})
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	price: number;

	@ApiProperty({
		description: 'The slug of the product',
		example: 'phone_15_pro_max',
	})
	@IsString()
	@IsOptional()
	slug: string;

	@ApiProperty({
		description: 'The stock of the product',
		example: 100,
	})
	@IsNumber()
	@IsNotEmpty()
	stock: number;
}
