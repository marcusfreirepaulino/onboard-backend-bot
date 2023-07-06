import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from 'typeorm';
import { Address } from './address.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthDate: string;

  @Column()
  password: string;

  @OneToMany(() => Address, (address) => address.user, {cascade: true})
  address: Relation<Address[]>;
}
