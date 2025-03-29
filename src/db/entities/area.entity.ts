import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity('areas')
export class AreaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ManyToOne(() => LocationEntity, (location) => location.areas)
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @Column({ type: 'int' })
  location_id: number;
}
