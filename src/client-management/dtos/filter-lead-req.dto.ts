import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import {
  InterestTypeEnum,
  LeadStatusEnum,
} from '../../db/entities/client.entity';
import { PaginationReqDto } from '../../helpers/pagination/pagination.dto';

export class FilterLeadReqDto extends PaginationReqDto {
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
