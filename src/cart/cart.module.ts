import { Module } from '@nestjs/common';
import { CartController } from './controller/cart/cart.controller';
import { CommonService } from '../helper/service/common/common.service';
import { CartService } from './service/cart/cart.service';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Cart])],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {
}
