import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { CartService } from '../../service/cart/cart.service';
import { Response ,Request } from 'express';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    @Get()
    async index(@Res() res:Response) {
        const cart = await this.cartService.findAll();
        res.status(HttpStatus.OK).json(cart);
    }
}
