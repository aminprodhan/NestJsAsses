import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/paginate';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}
    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }
    findOne(id: number): Promise<Product | null> {
        return this.productRepository.findOneBy({ id });
    }
    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
    async paginate(options: PaginationOptionsInterface): Promise<Pagination<Product>> {

        // const [results, total] = await this.productRepository.findAndCount({
        //   take: options.limit,
        //   skip: options.page, // think this needs to be page * limit
        // });

        const query = `SELECT if('2023-07-17 00:00:00' >= dis_start_date and '2023-07-17 23:59:59' <= dis_end_date,price - (price*.15),price) as cprice,p.* 
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
