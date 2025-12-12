import { Controller, Post, Param } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { OrdersService } from '../orders/orders.service';

@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailsService: EmailsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('order/:orderId')
  async resendOrderEmail(@Param('orderId') orderId: string) {
    const order = await this.ordersService.findOne(orderId);
    await this.emailsService.sendOrderEmail(order);
    return { message: 'Order confirmation email sent successfully' };
  }
}
