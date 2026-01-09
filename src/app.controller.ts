import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health')
export class AppController {
	@ApiOperation({ summary: 'Get the status of the API' })
	@ApiResponse({ status: 200, description: 'The status of the API' })
	@Get()
	getStatus() {
		return {
			status: 'ok',
			message: 'N8N Backend API is running',
			developer: 'Sebastian Cheikh',
			timestamp: new Date().toISOString(),
		};
	}
}
