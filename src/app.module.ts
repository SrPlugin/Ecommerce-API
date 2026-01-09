import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';
import { EmailsModule } from '@emails/emails.module';
import { SeedModule } from '@seed/seed.module';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
			isGlobal: true,
		}),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const isTest = process.env.NODE_ENV === 'test';
				const isDevelopment = process.env.NODE_ENV === 'development';

				return {
					type: 'postgres',
					host: configService.get<string>('DB_HOST', 'localhost'),
					port: configService.get<number>('DB_PORT', 5432),
					username: configService.get<string>('DB_USERNAME'),
					password: configService.get<string>('DB_PASSWORD'),
					database: configService.get<string>('DB_DATABASE'),
					autoLoadEntities: true,
					synchronize: isTest || isDevelopment,
					dropSchema: isTest,
				};
			},
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60,
				limit: 50,
			},
		]),

		ProductsModule,
		OrdersModule,
		EmailsModule,
		...(process.env.NODE_ENV === 'development' ? [SeedModule] : []),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
