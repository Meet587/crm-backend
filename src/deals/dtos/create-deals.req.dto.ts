import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { DealStageEnum } from '../../db/entities/deals.entity';

export class CreateDealsReqDto {
  @ApiProperty({
    name: 'deal_stage',
    enum: DealStageEnum,
    required: true,
    example: DealStageEnum.DealFinalized,
  })
  @IsEnum(DealStageEnum)
  @IsNotEmpty()
  deal_stage: DealStageEnum;

  @ApiProperty({
    name: 'deal_value',
    type: Number,
    required: true,
    description: 'total deal value',
    example: 5000000,
  })
  @IsNumber()
  @IsNotEmpty()
  deal_value: number;

  @ApiProperty({
    name: 'client_id',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  client_id: number;

  @ApiProperty({
    name: 'property_id',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  property_id: number;

  @ApiProperty({
    name: 'agent_id',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  agent_id: number;

  @ApiProperty({
    name: 'finalized_date',
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  finalized_date?: Date;
}
