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

  @Column()
  name: string;

  @Column()
  brand: string;

  // JoinTable specifies owner entity
  @JoinTable()
  // Indicates many to many relationship
  @ManyToMany((type) => Flavor, (Flavor) => Flavor.coffees)
  flavors: string[];
}
