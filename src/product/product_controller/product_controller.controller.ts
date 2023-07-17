import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from '../service/product/product.service';
@Controller('product')
export class ProductControllerController {
    constructor(private readonly productServer: ProductService) {}
    @Post("store")
    async store(@Req() req: Request,@Res() res:Response) { 
        //@Body() updateCatDto: UpdateCatDto , @Req() req: Request
        //console.log(product.id);
        
        const products = await this.productServer.paginate({limit:100,page:0});

        res.status(HttpStatus.OK).json(products);
    }
}
