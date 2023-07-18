import { Controller, Get, Res, HttpStatus, Post, NotFoundException, Body,Param } from '@nestjs/common';
import { CartService } from '../../service/cart/cart.service';
import { Response ,Request } from 'express';
import { CartDto } from '../../dto/cart.dto';
import { CartIncDecrDto } from '../../dto/cart.inc_decr.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    @Get()
    async index(@Res() res:Response) {
        const cart = await this.cartService.findAll();
        res.status(HttpStatus.OK).json(cart);
    }
    @Post('store')
    async store(@Body() cart: CartDto,@Res() res:Response) {
        //console.log(cart.product_id);
        const isExist = await this.cartService.findByProductId(cart.product_id);        
        if(isExist)
            {
                cart.id=isExist.id;
                cart.qty=isExist.qty + 1;
            }
        //console.log("exi=",cart);
        const items = await this.cartService.save(cart);
        res.status(HttpStatus.OK).json(items);
    }
    @Post('inc_decr')
    async incDecr(@Body() cart: CartIncDecrDto,@Res() res:Response) {
        const isExist = await this.cartService.findByProductId(cart.product_id);
        //console.log(isExist);
        if (!isExist) {
          throw new NotFoundException();
        }
        const item=new CartDto();
        if(cart.type == 1)
            isExist.qty=isExist.qty + cart.qty;
        else
            isExist.qty=isExist.qty - cart.qty;

        const r= await this.cartService.update(isExist);
        res.status(HttpStatus.OK).json(r);
    }
    @Post('remove')
    async remove(@Body() req: any,@Res() res:Response) {
        console.log(req);
        
        const items = await this.cartService.remove(Number(req.id));
        res.status(HttpStatus.OK).json(items);
    }
}
