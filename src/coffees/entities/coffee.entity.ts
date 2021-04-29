import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // JSON format for arrays, nullable = optional
  @Column('json', { nullable: true })
  flavors: string[];
}
