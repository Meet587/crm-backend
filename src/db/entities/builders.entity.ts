import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommissionEntity } from './commission.entity';

@Entity('builders')
export class BuildersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  contact_person: string;

  @Column({ type: 'varchar', length: 60 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  phone_number: string;

  @Column({ type: 'decimal', scale: 2 })
  commissionRate: number;

  @OneToMany(() => CommissionEntity, (commission) => commission.builder)
  commissions: CommissionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
