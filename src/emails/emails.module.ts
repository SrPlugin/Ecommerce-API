import { Module, forwardRef } from '@nestjs/common';
import { EmailsService } from '@emails/emails.service';
import { EmailsController } from '@emails/emails.controller';
import { OrdersModule } from '@orders/orders.module';

@Module({
	imports: [forwardRef(() => OrdersModule)],
	controllers: [EmailsController],
	providers: [EmailsService],
	exports: [EmailsService],
})
export class EmailsModule {}
