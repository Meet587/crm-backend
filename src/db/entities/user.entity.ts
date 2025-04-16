import { Exclude } from 'class-transformer';
import { ClientsEntity } from 'src/db/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealsEntity } from './deals.entity';

export enum UserRole {
  ADMIN = 'admin',
  RM = 'rm',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 155, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 155 })
  fname: string;

  @Column({ type: 'varchar', length: 155 })
  lname: string;

  @Column('bigint', { width: 20, nullable: true })
  phoneNumber: number;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Exclude()
  @Column('text', { nullable: true })
  password: string;

  @OneToMany(() => ClientsEntity, (client) => client.assignedAgent)
  clients: ClientsEntity[];

  @OneToMany(() => DealsEntity, (deal) => deal.agent)
  deals: DealsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
