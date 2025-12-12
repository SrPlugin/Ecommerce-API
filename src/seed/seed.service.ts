import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from '../orders/entities/order-item.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async seedProducts(): Promise<{ message: string; count: number }> {
    this.logger.log('Starting seed of products...');

    
    const existingProducts = await this.productRepository.count();
    if (existingProducts > 0) {
      this.logger.warn(`There are ${existingProducts} products in the database`);
      return {
        message: `There are ${existingProducts} products in the database. No new products were inserted.`,
        count: existingProducts,
      };
    }

    const products = [
      {
        name: 'Laptop Dell XPS 15',
        description: 'Laptop de alto rendimiento con procesador Intel i7, 16GB RAM, 512GB SSD',
        price: 1299.99,
        stock: 15,
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Smartphone Apple con pantalla Super Retina XDR, 256GB de almacenamiento',
        price: 1099.99,
        stock: 25,
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Smartphone Android con cámara de 200MP, S Pen incluido, 512GB',
        price: 1199.99,
        stock: 20,
      },
      {
        name: 'MacBook Pro 14"',
        description: 'Laptop Apple con chip M3 Pro, 18GB RAM, 512GB SSD',
        price: 1999.99,
        stock: 10,
      },
      {
        name: 'Auriculares Sony WH-1000XM5',
        description: 'Auriculares inalámbricos con cancelación de ruido activa',
        price: 399.99,
        stock: 30,
      },
      {
        name: 'Monitor LG UltraWide 34"',
        description: 'Monitor curvo 3440x1440, 144Hz, FreeSync Premium',
        price: 599.99,
        stock: 18,
      },
      {
        name: 'Teclado Mecánico Logitech MX',
        description: 'Teclado inalámbrico mecánico con switches táctiles',
        price: 149.99,
        stock: 40,
      },
      {
        name: 'Mouse Logitech G Pro X',
        description: 'Mouse gaming inalámbrico con sensor HERO 25K',
        price: 129.99,
        stock: 35,
      },
      {
        name: 'Tablet iPad Air',
        description: 'Tablet Apple con chip M2, pantalla de 10.9", 256GB',
        price: 749.99,
        stock: 22,
      },
      {
        name: 'Smartwatch Apple Watch Series 9',
        description: 'Reloj inteligente con GPS, monitor de salud y pantalla Always-On',
        price: 429.99,
        stock: 28,
      },
      {
        name: 'Cámara Canon EOS R6',
        description: 'Cámara mirrorless full-frame, 20.1MP, grabación 4K',
        price: 2499.99,
        stock: 8,
      },
      {
        name: 'PlayStation 5',
        description: 'Consola de videojuegos con SSD de 825GB y control DualSense',
        price: 499.99,
        stock: 12,
      },
      {
        name: 'Xbox Series X',
        description: 'Consola de videojuegos con 1TB SSD y 4K UHD',
        price: 499.99,
        stock: 14,
      },
      {
        name: 'Nintendo Switch OLED',
        description: 'Consola portátil con pantalla OLED de 7", 64GB',
        price: 349.99,
        stock: 20,
      },
      {
        name: 'Altavoz Sonos Era 300',
        description: 'Altavoz inteligente con sonido espacial y Alexa integrado',
        price: 449.99,
        stock: 16,
      },
      {
        name: 'Webcam Logitech Brio 4K',
        description: 'Cámara web 4K Ultra HD con HDR y cancelación de ruido',
        price: 199.99,
        stock: 25,
      },
      {
        name: 'Disco Duro Externo Seagate 2TB',
        description: 'Disco duro portátil USB 3.0, 2TB de capacidad',
        price: 79.99,
        stock: 50,
      },
      {
        name: 'SSD Samsung 980 PRO 1TB',
        description: 'SSD NVMe PCIe 4.0, velocidad de lectura hasta 7000MB/s',
        price: 129.99,
        stock: 30,
      },
      {
        name: 'Router WiFi 6 ASUS AX6000',
        description: 'Router inalámbrico WiFi 6, hasta 6000Mbps, 8 puertos LAN',
        price: 299.99,
        stock: 15,
      },
      {
        name: 'Impresora HP LaserJet Pro',
        description: 'Impresora láser monocromática, WiFi, impresión automática a doble cara',
        price: 249.99,
        stock: 18,
      },
      {
        name: 'Micrófono Blue Yeti',
        description: 'Micrófono USB con 4 patrones de captación, ideal para streaming',
        price: 129.99,
        stock: 22,
      },
      {
        name: 'Auriculares Gaming SteelSeries Arctis 7',
        description: 'Auriculares inalámbricos gaming con sonido surround 7.1',
        price: 179.99,
        stock: 20,
      },
      {
        name: 'Teclado Gaming Razer BlackWidow V4',
        description: 'Teclado mecánico gaming con switches Razer Green, RGB',
        price: 169.99,
        stock: 25,
      },
      {
        name: 'Monitor Gaming ASUS ROG 27"',
        description: 'Monitor gaming 2560x1440, 165Hz, G-Sync compatible',
        price: 449.99,
        stock: 12,
      },
      {
        name: 'Silla Gaming Secretlab Titan',
        description: 'Silla ergonómica gaming con soporte lumbar ajustable',
        price: 499.99,
        stock: 10,
      },
      {
        name: 'Lámpara LED BenQ ScreenBar',
        description: 'Lámpara de escritorio LED con sensor de luz automático',
        price: 99.99,
        stock: 30,
      },
      {
        name: 'Hub USB-C Anker 7-en-1',
        description: 'Hub USB-C con puertos HDMI, USB 3.0, SD card reader',
        price: 49.99,
        stock: 40,
      },
      {
        name: 'Cargador Inalámbrico MagSafe',
        description: 'Cargador inalámbrico compatible con MagSafe, 15W',
        price: 39.99,
        stock: 45,
      },
      {
        name: 'Power Bank Anker 20000mAh',
        description: 'Batería externa 20000mAh con carga rápida USB-C PD',
        price: 59.99,
        stock: 35,
      },
      {
        name: 'Cable USB-C Thunderbolt 4',
        description: 'Cable USB-C Thunderbolt 4, 2 metros, soporte 40Gbps',
        price: 29.99,
        stock: 60,
      },
    ];

    try {
      const createdProducts = this.productRepository.create(products);
      await this.productRepository.save(createdProducts);
      
      this.logger.log(` ${createdProducts.length} was inserted successfully`);
      
      return {
        message: `${createdProducts.length} products were inserted successfully`,
        count: createdProducts.length,
      };
    } catch (error) {
      this.logger.error('Error inserting products:', error);
      throw error;
    }
  }

  async clearProducts(): Promise<{ message: string }> {
    this.logger.log('Deleting all products...');
    
    
    await this.orderItemRepository
      .createQueryBuilder()
      .delete()
      .execute();
    
    
    await this.productRepository
      .createQueryBuilder()
      .delete()
      .execute();
    
    this.logger.log('All products have been deleted');
    return { message: 'All products have been deleted' };
  }
}
