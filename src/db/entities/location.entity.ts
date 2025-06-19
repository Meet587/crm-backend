import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AreaEntity } from './area.entity';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => AreaEntity, (area) => area.location)
  areas: AreaEntity[];
}
