import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientsEntity } from './client.entity';
import { UserEntity } from './user.entity';
import { PropertyEntity } from './property.entity';

export enum FollowUpStatusEnum {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  MISSED = 'missed',
  RESCHEDULED = 'rescheduled',
  CANCELLED = 'cancelled',
}

export enum FollowUpTypeEnum {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  SITE_VISIT = 'siteVisit',
  OTHER = 'other',
}

@Entity('follow_ups')
export class FollowUpEntity {
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
  property_id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'agentId' })
  agent: UserEntity;

  @Column('int8')
  agentId: number;

  @Column({ type: 'enum', enum: FollowUpTypeEnum, nullable: false })
  type: FollowUpTypeEnum;

  @Column({ type: 'timestamp', nullable: false })
  scheduledDate: Date;

  @Column({
    type: 'enum',
    enum: FollowUpStatusEnum,
    default: FollowUpStatusEnum.SCHEDULED,
  })
  status: FollowUpStatusEnum;

  @Column({ type: 'text', nullable: true })
  outcome: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
