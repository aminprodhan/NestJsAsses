import { Body, Controller, HttpStatus, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { Response ,Request } from 'express';
import { ProductDTO } from '../dto/product.dto';
import { ProductService } from '../service/product/product.service';
@Controller('product')
export class ProductControllerController {
    constructor(private readonly productServer: ProductService) {}
    @Post("store")
    async store(@Body() product: ProductDTO,@Res() res:Response) { 
        //@Body() updateCatDto: UpdateCatDto , @Req() req: Request
        //console.log(product.id);
        //await this.productServer.save(product);
        const products = await this.productServer.paginate({limit:1,page:2});

        res.status(HttpStatus.OK).json(products);
    }
}
