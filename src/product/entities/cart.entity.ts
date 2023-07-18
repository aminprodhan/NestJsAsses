
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, { "cascade": true })
  @JoinColumn({ name: "product_id" } )
  product_id: Product;

  @Column()
  qty: number;  
  
  @Column()
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
