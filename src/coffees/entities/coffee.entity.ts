import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

// TypeOrm @Entity decorator will export as Entity
// default: table name will be class name in lowercase
// Or custom name inside
@Entity()
export class Coffee {
  // Will define as primary column and autoincrement
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '-' })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // JoinTable specifies owner entity
  @JoinTable()
  // Indicates many to many relationship
  @ManyToMany(
    // param1: Type of input
    (type) => Flavor,
    // Param2: Related columns on other end
    (Flavor) => Flavor.coffees,
    // Options Object
    {
      // Allows inserts and updates from coffee object to push through sub tables
      cascade: true,
    },
  )
  flavors: Flavor[];
}
