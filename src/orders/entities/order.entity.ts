import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderStatus } from '@orders/enums/order.enum';
import { OrderItem } from '@orders/entities/order-item.entity';
import type { Relation } from 'typeorm';

@Entity()
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', nullable: false })
	contact_email: string;

	@Column({ type: 'text', nullable: false })
	contact_name: string;

	@Column({
		type: 'enum',
		enum: OrderStatus,
		nullable: false,
		default: OrderStatus.PENDING,
	})
	status: OrderStatus;

	@Column({ type: 'text', nullable: false })
	shipping_address: string;

	@Column({ type: 'date', nullable: false })
	created_at: Date;

	@Column({ type: 'date', nullable: false })
	updated_at: Date;

	@Column({
		type: 'numeric',
		nullable: false,
		transformer: {
			to: (value: number) => value,
			from: (value: string) => parseFloat(value),
		},
	})
	total_amount: number;

	@Column({ type: 'numeric', nullable: false })
	customer_identifier: number;

	@OneToMany(
		() => OrderItem,
		(orderItem) => orderItem.order,
		{ cascade: true },
	)
	items: Relation<OrderItem[]>;
}
