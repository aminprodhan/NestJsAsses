import { Product } from '../../product/entities/product.entity';
export class CartDto{
    id: number
    product_id: any;
    qty: number;
    price: number;
}