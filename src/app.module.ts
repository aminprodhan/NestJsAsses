import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductControllerController } from './product/product_controller/product_controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { CommonService } from './helper/service/common/common.service';
import { Cart } from './cart/entities/cart.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: 'cursorlt_nestjs',
      // username: 'root',
      // password: '',
      // database: 'task_nestjs',
      entities: [Product,Cart],
      synchronize: true,
    }),
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
