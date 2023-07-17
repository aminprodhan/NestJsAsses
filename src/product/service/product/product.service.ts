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
        const [results, total] = await this.productRepository.findAndCount({
          take: options.limit,
          skip: options.page, // think this needs to be page * limit
        });
        // TODO add more tests for paginate
        return new Pagination<Product>({
          results,
          total,
        });
    }
    
}
