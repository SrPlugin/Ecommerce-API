import { Controller, Post, Param, NotFoundException } from '@nestjs/common';
import { EmailsService } from '@emails/emails.service';
import { OrdersService } from '@orders/orders.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('emails')
export class EmailsController {
	constructor(
		private readonly emailsService: EmailsService,
		private readonly ordersService: OrdersService,
	) {}

	@Post('order/:orderId')
	@ApiOperation({ summary: 'Resend an order confirmation email' })
	@ApiResponse({ status: 200, description: 'The order confirmation email has been successfully sent' })
	async resendOrderEmail(@Param('orderId') orderId: string): Promise<{ message: string }> {
		const order = await this.ordersService.findOne(orderId);

		if (!order) {
			throw new NotFoundException('Order not found');
		}
		await this.emailsService.sendOrderEmail(order);
		return { message: 'Order confirmation email sent successfully' };
	}
}
