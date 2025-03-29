import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('text', { nullable: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
