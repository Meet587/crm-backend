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

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  contact_person: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  phone_number: string;

  @Column({ type: 'decimal', scale: 2, nullable: false })
  commission_rate: number;

  @OneToMany(() => CommissionEntity, (commission) => commission.builder)
  commissions: CommissionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
