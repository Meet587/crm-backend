import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientsEntity } from './client.entity';
import { PropertyEntity } from './property.entity';
import { UserEntity } from './user.entity';

export enum SiteVisitStatusEnum {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled',
  MISSED = 'missed',
}

@Entity('site_visits')
export class SiteVisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clientId' })
  client: ClientsEntity;

  @Column('int8')
  clientId: number;

  @ManyToOne(() => PropertyEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'propertyId' })
  property: PropertyEntity;

  @Column('int8')
  propertyId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'agentId' })
  agent: UserEntity;

  @Column('int8')
  agentId: number;

  @Column({ type: 'timestamp', nullable: false })
  scheduledDate: Date;

  @Column({
    type: 'enum',
    enum: SiteVisitStatusEnum,
    default: SiteVisitStatusEnum.SCHEDULED,
  })
  status: SiteVisitStatusEnum;

  @Column({ type: 'text', nullable: true })
  clientFeedback: string;

  @Column({ type: 'text', nullable: true })
  agentNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
