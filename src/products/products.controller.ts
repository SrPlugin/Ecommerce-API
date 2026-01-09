import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from '@products/products.service';
import { CreateProductDto, UpdateProductDto } from '@products/dto';
import { Product } from '@products/entities/product.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post('')
	@ApiOperation({ summary: 'Create a new product' })
	@ApiResponse({ status: 201, description: 'The product has been successfully created' })
	create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productsService.create(createProductDto);
	}

	@Get('')
	@ApiOperation({ summary: 'Get all products' })
	@ApiResponse({ status: 200, description: 'The products have been successfully retrieved' })
	findAll(): Promise<Product[]> {
		return this.productsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a product by id' })
	@ApiResponse({ status: 200, description: 'The product has been successfully retrieved' })
	findOne(@Param('id') id: string): Promise<Product> {
		return this.productsService.findOne(id);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a product by id' })
	@ApiResponse({ status: 200, description: 'The product has been successfully deleted' })
	delete(@Param('id') id: string): Promise<{ message: string }> {
		return this.productsService.delete(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a product by id' })
	@ApiResponse({ status: 200, description: 'The product has been successfully updated' })
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<{ message: string }> {
		return this.productsService.update(id, updateProductDto);
	}
}
