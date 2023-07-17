import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductControllerController } from './product_controller/product_controller.controller';
import { ProductService } from './service/product/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductControllerController],
    providers: [ProductService],
})
export class ProductModule {}
