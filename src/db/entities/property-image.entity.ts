import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';

@Entity('property_images')
export class PropertyImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  asset_id: string;

  @Column({ type: 'varchar', length: 255 })
  public_id: string;

  @Column({ type: 'text' })
  secure_url: string;

  @ManyToOne(() => PropertyEntity, (property) => property.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column({ type: 'integer' })
  property_id: number;
}
