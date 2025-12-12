import { Controller, Post, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('products')
  async seedProducts() {
    return this.seedService.seedProducts();
  }

  @Delete('products')
  async clearProducts() {
    return this.seedService.clearProducts();
  }
}
