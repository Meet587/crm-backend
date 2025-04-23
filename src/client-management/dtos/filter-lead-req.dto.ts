import { ApiProperty } from '@nestjs/swagger';
import {
  InterestTypeEnum,
  LeadStatusEnum,
} from '../../db/entities/client.entity';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterLeadReqDto {
  @ApiProperty({
    name: 'status',
    enum: LeadStatusEnum,
    required: false,
  })
  @IsEnum(LeadStatusEnum)
  @IsOptional()
  status?: LeadStatusEnum;

  @ApiProperty({
    name: 'interestType',
    enum: InterestTypeEnum,
    required: false,
  })
  @IsEnum(InterestTypeEnum)
  @IsOptional()
  interestType?: InterestTypeEnum;

  @ApiProperty({
    name: 'agentAssign',
    description: 'assign agent id',
    example: 1,
    type: Number,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  agentAssign?: number;
}
