import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientsEntity } from './client.entity';
import { CommissionEntity } from './commission.entity';
import { PropertyEntity } from './property.entity';
import { UserEntity } from './user.entity';

export enum DealStageEnum {
  SiteVisitCompleted = 'Site Visit Completed',
  PaperworkStarted = 'Paperwork Started',
  DealFinalized = 'Deal Finalized',
}

@Entity('deals')
export class DealsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DealStageEnum })
  deal_stage: DealStageEnum;

  @Column({ type: 'decimal', scale: 2 })
  deal_value: number;

  @ManyToOne(() => ClientsEntity, (client) => client.deals)
  @JoinColumn({ name: 'client_id' })
  client: ClientsEntity;

  @Column()
  client_id: number;

  @ManyToOne(() => PropertyEntity, (property) => property.deals)
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column()
  property_id: number;

  @OneToOne(() => CommissionEntity, (commission) => commission.deal)
  commission: CommissionEntity;

  @ManyToOne(() => UserEntity, (user) => user.deals)
  @JoinColumn({ name: 'agent_id' })
  agent: UserEntity;

  @Column()
  agent_id: number;

  @CreateDateColumn({ type: 'date', nullable: false, default: new Date() })
  finalized_date: Date;

  @CreateDateColumn()
  createdAt: Date;
}
