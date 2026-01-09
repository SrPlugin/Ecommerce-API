import { Controller, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeedService } from '@seed/seed.service';

@Controller('seed')
export class SeedController {
	constructor(private readonly seedService: SeedService) {}

	@Post('products')
	@ApiOperation({ summary: 'Seed the products database' })
	@ApiResponse({ status: 200, description: 'The products database has been successfully seeded' })
	async seedProducts(): Promise<{ message: string }> {
		return this.seedService.seedProducts();
	}

	@Delete('products')
	@ApiOperation({ summary: 'Clear the products database' })
	@ApiResponse({ status: 200, description: 'The products database has been successfully cleared' })
	async clearProducts(): Promise<{ message: string }> {
		return this.seedService.clearProducts();
	}
}
