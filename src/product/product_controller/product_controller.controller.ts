import { Body, Controller, HttpStatus, Post, Req, Res, ValidationPipe, Get, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { ProductDTO } from '../dto/product.dto';
import { ProductService } from '../service/product/product.service';
@Controller('product')
export class ProductControllerController {
    constructor(private readonly productServer: ProductService) {}
    @Get("index")
    async index(@Query() query,@Res() res:Response) {
        console.log(query);
         
        const products =await this.productServer.findAll(query);
        res.status(HttpStatus.OK).json(products);
    }
    @Post("store")
    async store(@Body() product: ProductDTO,@Res() res:Response) { 
        //@Body() updateCatDto: UpdateCatDto , @Req() req: Request
        //console.log(product.id);
        const products =await this.productServer.save(product);
        res.status(HttpStatus.OK).json(products);
    }
}
