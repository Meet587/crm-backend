import { AreaEntity } from 'src/db/entities/area.entity';
import { ClientsEntity } from 'src/db/entities/client.entity';
import { LocationEntity } from 'src/db/entities/location.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { PropertyImageEntity } from './property-image.entity';

export enum PropertyForEnum {
  rent = 'rent',
  sale = 'sale',
}

export enum PropertyTypeEnum {
  house = 'house',
  flat = 'flat',
  commercial = 'commercial',
}

export enum PropertyStatusEnum {
  AVAILABLE_FOR_SALE = 'AVAILABLE_FOR_SALE',
  SOLD = 'SOLD',
  AVAILABLE_FOR_RENT = 'AVAILABLE_FOR_RENT',
  RENTED = 'RENTED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  INACTIVE = 'INACTIVE',
}

@Entity('properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PropertyTypeEnum })
  property_type: PropertyTypeEnum;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'assignTo' })
  agent: UserEntity;

  @Column({ type: 'int', nullable: true })
  assignTo: number;

  @Column({ type: 'int' })
  bedrooms: number;

  @Column({ type: 'int' })
  bathrooms: number;

  @Column({ type: 'float' })
  sqft: number;

  @Column({ type: 'int' })
  year_built: number;

  @OneToMany(() => PropertyImageEntity, (image) => image.property)
  images: PropertyImageEntity[];

  @Column({ nullable: true })
  thumbnail_url: string;

  @Column({
    type: 'enum',
    enum: PropertyStatusEnum,
    default: PropertyStatusEnum.AVAILABLE_FOR_SALE,
  })
  status: PropertyStatusEnum;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => LocationEntity, (location) => location)
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @Column({ type: 'int', nullable: false })
  location_id: number;

  @ManyToOne(() => AreaEntity, (area) => area)
  @JoinColumn({ name: 'area_id' })
  area: AreaEntity;

  @Column({ type: 'int' })
  area_id: number;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @ManyToMany(() => ClientsEntity, (client) => client.interestedProperties)
  interestedClients: ClientsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
