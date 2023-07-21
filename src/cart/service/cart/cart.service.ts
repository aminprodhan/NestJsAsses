import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CartDto } from '../../dto/cart.dto';

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
    async save(cart: CartDto): Promise<Cart> {
        return await this.cartRepository.save(cart);;
    }
    async remove(id: number): Promise<Cart[]> {
        await this.cartRepository.delete(id);
        return this.findAll();
    }
    async findByProductId(id: any): Promise<Cart | null> {
        console.log(id);
        
        return await this.cartRepository.findOne({
            where: {
              product_id:id,
            },
        });
    }
    async update(cart: Cart): Promise<UpdateResult> {
        return await this.cartRepository.update(cart.id, cart);
      }


}
