import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
	const logger = new Logger(`N8N-BACKEND`);
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'verbose', 'debug'],
	});

	app.use(
		compression(),
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					styleSrc: ["'self'", "'unsafe-inline'"],
					scriptSrc: ["'self'"],
					imgSrc: ["'self'", 'data:', 'https:', 'http:', 'http://localhost:*', 'http://127.0.0.1:*'],
				},
			},
			crossOriginEmbedderPolicy: false,
			crossOriginResourcePolicy: { policy: 'cross-origin' },
		}),
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			stopAtFirstError: true,
		}),
	);

	app.setGlobalPrefix('api');

	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT') ?? 3000;

	if (configService.get<string>('NODE_ENV') === 'development') {
		const config = new DocumentBuilder()
			.setTitle('N8N Backend API')
			.setDescription('API for the N8N backend')
			.setVersion('1.0')
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('docs', app, document);
	}

	await app.listen(port ?? 3000);

	logger.log(`🚀 Server is running on port http://localhost:${port}/api/`);
	logger.log(`👨‍💻 Developed by Sebastian Cheikh, thanks for using my API`);
}
bootstrap().catch((error) => {
	console.error(error);
});
