# N8N Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A robust and scalable e-commerce backend API built with NestJS, featuring order management, product catalog, and automated email notifications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/common.svg" alt="Package License" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Latest-blue" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-Ready-blue" alt="Docker" />
</p>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Extensive Documentation](https://deepwiki.com/SrPlugin/Ecommerce-API)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [N8N Integration](#n8n-integration)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🎯 Overview

N8N Backend is a comprehensive e-commerce backend API designed to handle product management, order processing, and automated email notifications. Built with NestJS framework, it provides a robust, scalable, and maintainable solution for e-commerce operations.

This backend is integrated with **N8N** workflow automation platform, which manages all operations through API endpoints and leverages **Google Gemini AI** model for intelligent processing. The N8N workflow configuration can be found in the `N8N/` directory as `n8nbot.json`.

### Key Capabilities

- **Product Management**: Full CRUD operations for product catalog with stock management
- **Order Processing**: Complete order lifecycle management with transaction support
- **Email Notifications**: Automated order confirmation emails via Resend API
- **Data Seeding**: Built-in seed functionality for quick database population
- **Type Safety**: Full TypeScript implementation with validation
- **Database Transactions**: ACID-compliant order processing
- **N8N Integration**: Workflow automation managed by N8N platform
- **AI-Powered**: Google Gemini AI model integration for intelligent processing

## ✨ Features

- ✅ RESTful API design
- ✅ Input validation with class-validator
- ✅ Database transactions for data integrity
- ✅ Automatic stock management
- ✅ Email notifications with HTML templates
- ✅ Database seeding utilities
- ✅ Environment-based configuration
- ✅ Global exception handling
- ✅ Request validation pipeline 
- ✅ Security best practices
- ✅ New Implementation (Helmet, Rate Limit and Swagger/OpenAPI)
- ❌ Testing framework setup (Jest) (Pending)
- ❌ Strong security with CORS, JWT(Pending)
- ❌ Clean Architecture and Design Patterns (MicroServices ??)

## 🛠 Tech Stack

### Core Framework
- **NestJS** (v11.0.1) - Progressive Node.js framework
- **TypeScript** (v5.7.3) - Type-safe development
- **Node.js** - Runtime environment

### Database
- **PostgreSQL** - Relational database
- **TypeORM** (v0.3.28) - Object-Relational Mapping

### Additional Services
- **Resend** (v6.6.0) - Email delivery service
- **N8N** - Workflow automation platform
- **Google Gemini AI** - AI model for intelligent processing
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration


## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - Package manager
- **PostgreSQL** (v14 or higher) - Or use Docker
- **Docker** (optional) - For containerized setup
- **Resend Account** - For email functionality

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd N8N-Backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.template .env
   ```

4. **Configure your `.env` file** (see [Configuration](#configuration) section)

5. **Start the database** (using Docker)
   ```bash
   docker-compose up -d
   ```

6. **Run database migrations** (if applicable)
   ```bash
   # TypeORM will auto-sync with synchronize: true
   ```

7. **Start the application**
   ```bash
   # Development mode
   pnpm run start:dev

   # Production mode
   pnpm run build
   pnpm run start:prod
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database_name

NODE_ENV=production || development

# Resend Email Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### Environment Variables Explained

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `3000` |
| `DB_HOST` | PostgreSQL host | Yes | `localhost` |
| `DB_PORT` | PostgreSQL port | No | `5432` |
| `DB_USERNAME` | Database username | Yes | - |
| `DB_PASSWORD` | Database password | Yes | - |
| `DB_DATABASE` | Database name | Yes | - |
| `NODE_ENV` | Development Environment | Yes | `development or production`  |
| `RESEND_API_KEY` | Resend API key | Yes | - |
| `RESEND_FROM_EMAIL` | Sender email address | No | `onboarding@resend.dev` |

### Resend Email Setup

To send emails to any recipient (not just your account email):

1. Go to [Resend Domains](https://resend.com/domains)
2. Add and verify your domain
3. Add DNS records provided by Resend
4. Set `RESEND_FROM_EMAIL` to an email using your verified domain (e.g., `noreply@yourdomain.com`)

## 📁 Project Structure

```
N8N-Backend/
├── src/
│   ├── products/          # Product module
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entities/      # TypeORM entities
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   ├── orders/            # Order module
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entities/      # TypeORM entities
│   │   ├── enums/         # Order status enum
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.module.ts
│   ├── emails/            # Email module
│   │   ├── emails.controller.ts
│   │   ├── emails.service.ts
│   │   └── emails.module.ts
│   ├── seed/              # Database seeding module
│   │   ├── seed.controller.ts
│   │   ├── seed.service.ts
│   │   └── seed.module.ts
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── N8N/                   # N8N workflow configuration
│   └── n8nbot.json        # N8N workflow bot configuration
├── docker-compose.yml     # Docker configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🔄 N8N Integration

This backend API is integrated with **N8N**, a powerful workflow automation platform. N8N manages all operations by calling the backend API endpoints and utilizes **Google Gemini AI** for intelligent data processing and decision-making.

### N8N Workflow Configuration

The N8N workflow configuration is located in the `N8N/` directory:
- **File**: `N8N/n8nbot.json`
- **Purpose**: Contains the complete N8N workflow definition that orchestrates backend operations

### How It Works

1. **N8N Workflows**: N8N workflows are defined in `n8nbot.json` and manage the entire business logic flow
2. **API Endpoints**: N8N calls the backend REST API endpoints to perform operations (create orders, manage products, etc.)
3. **Gemini AI Integration**: The workflow leverages Google Gemini AI model for intelligent processing, decision-making, and data analysis
4. **Automated Operations**: All operations are orchestrated through N8N, providing a centralized workflow management system

### Importing N8N Workflow

To use the N8N workflow:

1. Open your N8N instance
2. Import the workflow from `N8N/n8nbot.json`
3. Configure the API endpoints to point to your backend instance
4. Set up Google Gemini API and Postgres credentials in N8N
5. Activate the workflow

The workflow will then manage all backend operations through the defined API endpoints.


## 🏃 Running the Application

### Development Mode
```bash
pnpm run start:dev
```
Runs in watch mode with hot-reload enabled.

### Production Mode
```bash
# Build the application
pnpm run build

# Run production build
pnpm run start:prod
```

### Debug Mode
```bash
pnpm run start:debug
```

## 🐳 Docker Setup

### Using Docker Compose

1. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

2. **Stop database**
   ```bash
   docker-compose down
   ```

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

### Docker Compose Configuration

The `docker-compose.yml` file includes:
- PostgreSQL 14+ container
- Persistent volume for data
- Environment variable configuration
- Port mapping (configurable via `.env`)


## 📦 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set secure environment variables
- [ ] Disable `synchronize` in TypeORM (use migrations)
- [ ] Enable HTTPS
- [ ] Set up proper logging
- [ ] Configure CORS appropriately
- [ ] Set up monitoring and error tracking

### Recommended Platforms

- **AWS** - Using EC2, RDS, and Elastic Beanstalk
- **Heroku** - Simple deployment with PostgreSQL addon
- **DigitalOcean** - App Platform with managed database
- **Railway** - Full-stack deployment platform
- **Render** - Modern cloud platform

### Environment-Specific Configuration

For production, consider:
- Using environment-specific `.env` files
- Implementing database migrations
- Setting up CI/CD pipelines
- Configuring health check endpoints
- Implementing rate limiting
- Setting up API documentation (Swagger/OpenAPI)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use Biome.js for linter
- SWC for compiler
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Areas for Contribution

We welcome contributions in the following areas:

- **Testing**: Help improve test coverage, add unit tests, integration tests, or E2E tests
- **Security**: Implement security best practices, add authentication, authorization, rate limiting, or security headers

Your contributions in these areas are highly valued and will help make this project more robust and developer-friendly!

## 📝 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 Sebastian Cheikh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Sebastian Cheikh**

- Developed with ❤️ using NestJS
- Thanks for using my API!

---

<p align="center">
  Made with ❤️ by Sebastian Cheikh
</p>
