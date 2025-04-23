import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DealStageEnum } from '../../db/entities/deals.entity';

export class FilterDealsReqDto {
  @ApiProperty({
    name: 'deal_stage',
    enum: DealStageEnum,
    required: true,
    example: DealStageEnum.DealFinalized,
  })
  @IsEnum(DealStageEnum)
  @IsOptional()
  deal_stage?: DealStageEnum;

  @ApiProperty({
    name: 'property_id',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  property_id?: number;

  @ApiProperty({
    name: 'agent_id',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  agent_id?: number;

  @ApiProperty({
    name: 'finalized_date',
    type: Date,
    required: false,
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  finalized_date?: Date;
}
