
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;  
  
  @Column()
  price: number;

  @Column({ type: Date, nullable: true })
  dis_start_date: Date;

  @Column({ type: Date, nullable: true })
  dis_end_date: Date;

  @Column({ default: true })
  isActive: boolean;
}
