import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuildersEntity } from './builders.entity';
import { DealsEntity } from './deals.entity';

export enum commissionPaymentStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
}

@Entity('commissions')
export class CommissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: commissionPaymentStatusEnum })
  status: commissionPaymentStatusEnum;

  @CreateDateColumn({ type: 'date', nullable: false })
  payoutDate: Date;

  @ManyToOne(() => BuildersEntity, (builder) => builder.commissions)
  @JoinColumn({ name: 'builder_id' })
  builder: BuildersEntity;

  @Column()
  builder_id: number;

  @OneToOne(() => DealsEntity, (deal) => deal.commission)
  @JoinColumn({ name: 'deal_id' })
  deal: DealsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
