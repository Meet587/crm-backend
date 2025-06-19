import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealsEntity } from './deals.entity';
import { PropertyEntity } from './property.entity';
import { UserEntity } from './user.entity';
import { FollowUpEntity } from './follow-up.entity';
import { SiteVisitEntity } from './site-visit.entity';

export enum InterestTypeEnum {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  RENTAL = 'rental',
}

export enum LeadStatusEnum {
  NEW = 'new',
  CONTACTED = 'contacted',
  INTERESTED = 'interested',
  CONVERTED = 'converted',
  VISITED = 'visited',
  NEGOTIATING = 'negotiating',
  PAPERWORK = 'paperwork',
  CLOSED = 'closed',
}

export enum LeadSourceEnum {
  DIGITAL_MARKETING = 'digitalMarketing',
  EVENT = 'event',
  WEBSITE = 'website',
  REFERRAL = 'referral',
  ADVERTISEMENT = 'advertisement',
  MANUAL = 'manual',
  OTHER = 'other',
}

export enum PriorityLevelEnum {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('clients')
export class ClientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  phoneNumber: string;

  @Column({ type: 'enum', enum: InterestTypeEnum, nullable: false })
  interestType: InterestTypeEnum;

  @Column({ type: 'enum', enum: LeadStatusEnum, nullable: false })
  leadStatus: LeadStatusEnum;

  @ManyToOne(() => UserEntity, (agent) => agent.clients, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'agentId' })
  assignedAgent: UserEntity;

  @Column('int8')
  agentId: number;

  @Column({ type: 'enum', enum: LeadSourceEnum, nullable: false })
  leadSource: LeadSourceEnum;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @ManyToMany(() => PropertyEntity, (property) => property.interestedClients, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinTable()
  interestedProperties: PropertyEntity[];

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  budgetMin: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  budgetMax: number;

  @Column({ type: 'smallint', nullable: true })
  bedroomsRequired: number;

  @Column({ type: 'smallint', nullable: true })
  bathroomsRequired: number;

  @Column({
    type: 'enum',
    enum: PriorityLevelEnum,
    default: PriorityLevelEnum.MEDIUM,
    nullable: false,
  })
  priorityLevel: PriorityLevelEnum;

  @Column({ type: 'timestamp', nullable: true })
  lastContactDate: Date;

  @OneToMany(() => FollowUpEntity, (followUp) => followUp.client)
  followUps: FollowUpEntity[];

  @OneToMany(() => SiteVisitEntity, (siteVisit) => siteVisit.client)
  siteVisits: SiteVisitEntity[];

  @OneToMany(() => DealsEntity, (deal) => deal.client)
  deals: DealsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
