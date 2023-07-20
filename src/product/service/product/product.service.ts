import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/paginate';
import { ProductDTO } from 'src/product/dto/product.dto';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CommonService } from '../../../helper/service/common/common.service';
@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>
    ,private commonService: CommonService) {}

    async findAll(query?:any): Promise<Pagination<Product>> {
        
        let name_like=``;let pageId=0;
        const perPage=10;

        if(query.name != undefined)
            name_like=` and name like '%${query.name}%'`;
        if(query.pageId != undefined)
            {
                pageId=perPage * query.pageId;
            }

            const currentDate = new Date();
            // Format the date in ISO 8601 format with local timezone offset
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            console.log(formattedDate);

            const querySql = `SELECT if('${formattedDate}' >= dis_start_date 
                            and '${formattedDate}' <= dis_end_date,price - (price*.25),price) as dis_price,p.* 
                                FROM products as p where 1 ${name_like} order by id desc limit ${pageId},${perPage} `;
            
            console.log(querySql);
                                
            const results=await this.productRepository.query(querySql);
            const queryCount=`SELECT COUNT(*) as total FROM products where 1 ${name_like}`;
            const parameters = ['total'];
            const resCount=await this.productRepository.query(queryCount);

            
            const totalRow=resCount[0];

            let totalPage=Number(Math.floor(totalRow['total'] / perPage));
            if(Number(totalRow['total'] % perPage) > 0)
                totalPage++;
            //console.log(Number(Math.floor(totalRow['total'] / perPage)));
            
            return new Pagination<Product>({
                results,
                total:totalPage,
                //perPage:2,
            });
    }
    findOne(id: number): Promise<Product | null> {
        return this.productRepository.findOneBy({ id });
    }
    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
    async save(product: ProductDTO): Promise<Pagination<Product>> {
        if(product.dis_end_date)
            product.dis_end_date=this.commonService.stringToDate(product.dis_end_date,2);
        if(product.dis_start_date)
            product.dis_start_date=this.commonService.stringToDate(product.dis_start_date);
        
        await this.productRepository.save(product);
        return null;
    }
    async paginate(options: PaginationOptionsInterface): Promise<Pagination<Product>> {

        // const [results, total] = await this.productRepository.findAndCount({
        //   take: options.limit,
        //   skip: options.page, // think this needs to be page * limit
        // });

        const query = `SELECT if('2023-07-17 00:00:00' >= dis_start_date 
                        and '2023-07-17 23:59:59' <= dis_end_date,price - (price*.15),price) as cprice,p.* 
                            FROM products as p`; 
        // Replace with your actual table name
        const results = await this.productRepository.query(query);

        // results.map(product => {
        //     if(product.dis_start_date)
        // })
        // TODO add more tests for paginate
        return new Pagination<Product>({
            results,
            total:3
        });
    }
    
}
