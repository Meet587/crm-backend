import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  InterestTypeEnum,
  LeadSourceEnum,
  LeadStatusEnum,
  PriorityLevelEnum,
} from '../../db/entities/client.entity';
import { PaginationMeta } from '../../helpers/pagination/pagination.dto';

export class GetClientListResDto {
  @ApiProperty({
    description: 'Client name',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Client email',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Client phone number',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Interest type',
    required: false,
    enum: InterestTypeEnum,
  })
  @IsOptional()
  @IsEnum(InterestTypeEnum)
  interestType?: InterestTypeEnum;

  @ApiProperty({
    description: 'Lead status',
    required: false,
    enum: LeadStatusEnum,
  })
  @IsOptional()
  @IsEnum(LeadStatusEnum)
  leadStatus?: LeadStatusEnum;

  @ApiProperty({
    description: 'Lead source',
    required: false,
    enum: LeadSourceEnum,
  })
  @IsOptional()
  @IsEnum(LeadSourceEnum)
  leadSource?: LeadSourceEnum;

  @ApiProperty({
    description: 'Agent ID',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  agentId?: number;

  @ApiProperty({
    description: 'Minimum budget',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  budgetMin?: number;

  @ApiProperty({
    description: 'Maximum budget',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  budgetMax?: number;

  @ApiProperty({
    description: 'Number of bedrooms required',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  bedroomsRequired?: number;

  @ApiProperty({
    description: 'Number of bathrooms required',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  bathroomsRequired?: number;

  @ApiProperty({
    description: 'Priority level',
    required: false,
    enum: PriorityLevelEnum,
  })
  @IsOptional()
  @IsEnum(PriorityLevelEnum)
  priorityLevel?: PriorityLevelEnum;

  @ApiProperty({
    description: 'Last contact date',
    required: false,
    type: Date,
  })
  @IsOptional()
  lastContactDate?: Date;

  @ApiProperty({
    description: 'Created at',
    required: false,
    type: Date,
  })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    description: 'Updated at',
    required: false,
    type: Date,
  })
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({
    description: 'Page number',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({
    description: 'Limit per page',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    description: 'Sort by field',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description: 'Sort order',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}

export class ClientPaginationResponseDto {
  @ApiProperty({ type: [GetClientListResDto] })
  data: GetClientListResDto[];

  @ApiProperty({ type: PaginationMeta })
  meta: PaginationMeta;
}
