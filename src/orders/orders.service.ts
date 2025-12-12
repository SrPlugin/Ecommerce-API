import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { EmailsService } from '../emails/emails.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
    private readonly emailsService: EmailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const productsWithQuantity = await this.validateAndGetProducts(
        createOrderDto.items,
      );

      const { orderItems, totalAmount } = await this.createOrderItems(
        productsWithQuantity,
      );

      await this.updateProductsStock(productsWithQuantity);

      const order = this.orderRepository.create({
        ...createOrderDto,
        total_amount: totalAmount,
        created_at: new Date(),
        updated_at: new Date(),
        items: orderItems,
      });

      const savedOrder = await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      
      try {
        await this.emailsService.sendOrderEmail(savedOrder);
      } catch (emailError) {
        console.error('Error sending order confirmation email:', emailError);
      }
      
      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['items', 'items.product'],
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order not found with id: ${id}`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (updateOrderDto.items?.length) {
      await this.orderItemRepository.delete({ order: { id } });

      const productsWithQuantity = await this.validateAndGetProducts(
        updateOrderDto.items,
      );

      const { orderItems, totalAmount } = await this.createOrderItems(
        productsWithQuantity,
        order,
      );

      await this.orderItemRepository.save(orderItems);
      order.total_amount = totalAmount;
    }

    const { items, ...updateData } = updateOrderDto;
    Object.assign(order, {
      ...updateData,
      updated_at: new Date(),
    });

    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return { message: 'Order deleted successfully' };
  }

  private async validateAndGetProducts(
    items: CreateOrderItemDto[],
  ): Promise<Array<{ product: Product; quantity: number }>> {
    const productIds = items.map((item) => item.product_id);
    const products = await this.productRepository.findBy(
      productIds.map((id) => ({ id })),
    );

    if (products.length !== productIds.length) {
      const foundIds = products.map((p) => p.id);
      const missingId = productIds.find((id) => !foundIds.includes(id));
      throw new NotFoundException(`Product with id ${missingId} not found`);
    }

    return items.map((item) => {
      const product = products.find((p) => p.id === item.product_id)!;
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        );
      }
      return { product, quantity: item.quantity };
    });
  }

  private async createOrderItems(
    productsWithQuantity: Array<{ product: Product; quantity: number }>,
    order?: Order,
  ): Promise<{ orderItems: OrderItem[]; totalAmount: number }> {
    const orderItems = productsWithQuantity.map(({ product, quantity }) =>
      this.orderItemRepository.create({
        product,
        quantity,
        price_at_purchase: product.price,
        ...(order && { order }),
      }),
    );

    const totalAmount = productsWithQuantity.reduce(
      (sum, { product, quantity }) => sum + product.price * quantity,
      0,
    );

    return { orderItems, totalAmount };
  }

  private async updateProductsStock(
    productsWithQuantity: Array<{ product: Product; quantity: number }>,
  ): Promise<void> {
    await Promise.all(
      productsWithQuantity.map(({ product, quantity }) => {
        product.stock -= quantity;
        return this.productRepository.save(product);
      }),
    );
  }



    
  }

