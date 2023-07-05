import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from 'typeorm';
import { User } from './user.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column()
  streetNumber: number;

  @Column({ nullable: true })
  complement?: string | null;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @ManyToOne(() => User, (user) => user.address)
  user: Relation<User>;
}
