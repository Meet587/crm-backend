import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientsEntity } from './client.entity';
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

  @Column({ type: 'varchar', length: 255, nullable: true }) // Added for MFA
  mfaSecret: string; // Added for MFA

  @Column({ type: 'boolean', default: false }) // Added for MFA status
  isMfaEnabled: boolean; // Added for MFA status

  @OneToMany(() => ClientsEntity, (client) => client.assignedAgent)
  clients: ClientsEntity[];

  @OneToMany(() => DealsEntity, (deal) => deal.agent)
  deals: DealsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
