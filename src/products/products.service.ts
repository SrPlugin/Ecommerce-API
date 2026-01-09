import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '@products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from '@products/dto';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
	) {}

	async create(createProductDto: CreateProductDto): Promise<Product> {
		const slug = this.generateSlug(createProductDto.name);
		await this.existProduct(slug);

		const product = this.productRepository.create({
			...createProductDto,
			slug,
		});
		await this.productRepository.save(product);
		return product;
	}

	async findAll(): Promise<Product[]> {
		return await this.productRepository.find();
	}

	async findOne(id: string): Promise<Product> {
		const product = await this.productRepository.findOne({ where: { id } });
		if (!product) {
			throw new NotFoundException('Product not found with id: ' + id);
		}
		return product;
	}

	async delete(id: string): Promise<{ message: string }> {
		await this.findOne(id);
		await this.productRepository.delete(id);
		return { message: 'Product deleted successfully' };
	}

	async update(id: string, updateProductDto: UpdateProductDto): Promise<{ message: string }> {
		await this.findOne(id);
		await this.productRepository.update(id, updateProductDto);
		return { message: 'Product updated successfully' };
	}

	private generateSlug(input: string): string {
		return input.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
	}

	private async existProduct(slug: string): Promise<void> {
		const product = await this.productRepository.findOne({ where: { slug } });
		if (product) {
			throw new BadRequestException('Product already exists with slug: ' + slug);
		}
	}
}
