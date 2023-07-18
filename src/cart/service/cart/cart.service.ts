import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../../product/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>) {}
    async findAll(): Promise<Cart[]> {
        return this.cartRepository.find({
            relations:{
                product_id:true
            }
        });
    }
    
}
