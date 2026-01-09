import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Order } from '@orders/entities/order.entity';
import { Product } from '@products/entities/product.entity';
import type { Relation } from 'typeorm';

@Entity()
export class OrderItem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(
		() => Order,
		(order) => order.items,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn({ name: 'order_id' })
	order: Relation<Order>;

	@ManyToOne(() => Product, { eager: true })
	@JoinColumn({ name: 'product_id' })
	product: Relation<Product>;

	@Column({
		type: 'numeric',
		nullable: false,
		transformer: {
			to: (value: number) => value,
			from: (value: string) => parseInt(value, 10),
		},
	})
	quantity: number;

	@Column({
		type: 'numeric',
		nullable: false,
		transformer: {
			to: (value: number) => value,
			from: (value: string) => parseFloat(value),
		},
	})
	price_at_purchase: number;
}
