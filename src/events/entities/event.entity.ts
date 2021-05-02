import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// Using index at the top allows you to index multiple composite columns
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // Use index decorator to add a single column as index
  // @Index()
  @Column()
  name: string;
  @Column('json')
  payload: Record<string, any>;
}
