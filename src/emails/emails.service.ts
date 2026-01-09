import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';
import { Order } from '@orders/entities/order.entity';

@Injectable()
export class EmailsService {
	private resend: Resend;

	constructor(private readonly configService: ConfigService) {
		const apiKey = this.configService.get<string>('RESEND_API_KEY');
		if (!apiKey) {
			throw new Error('RESEND_API_KEY is not configured');
		}
		this.resend = new Resend(apiKey);
	}

	async sendOrderEmail(order: Order): Promise<void> {
		const emailHtml = this.generateOrderEmailHtml(order);
		const emailSubject = `Order Confirmation - ${order.customer_identifier}`;

		await this.resend.emails.send({
			from: this.configService.get<string>('RESEND_FROM_EMAIL', 'onboarding@resend.dev'),
			to: order.contact_email,
			subject: emailSubject,
			html: emailHtml,
		});
	}

	private generateOrderEmailHtml(order: Order): string {
		const itemsHtml = order.items
			.map(
				(item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.product.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price_at_purchase.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price_at_purchase * item.quantity).toFixed(2)}</td>
      </tr>
    `,
			)
			.join('');

		return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color:rgb(35, 122, 198); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .order-info { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background-color: rgb(35, 122, 198); color: white; padding: 10px; text-align: left; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <div class="order-info">
              <h2>Order Details</h2>
              <p><strong>Order ID:</strong> ${order.id}</p>
              <p><strong>Customer Identifier:</strong> ${order.customer_identifier}</p>
              <p><strong>Status:</strong> ${order.status}</p>
              <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            
            <div class="order-info">
              <h2>Shipping Information</h2>
              <p><strong>Name:</strong> ${order.contact_name}</p>
              <p><strong>Email:</strong> ${order.contact_email}</p>
              <p><strong>Address:</strong> ${order.shipping_address}</p>
            </div>

            <h2>Order Items</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Unit Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="total">
              <p>Total Amount: $${order.total_amount.toFixed(2)}</p>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for your order!</p>
            <p>If you have any questions, please contact us.</p>
            <p>Developed by Sebastian Cheikh. Thanks for using my API</p>
          </div>
        </div>
      </body>
      </html>
    `;
	}
}
