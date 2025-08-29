import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
@Entity()
export class reports {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
}
