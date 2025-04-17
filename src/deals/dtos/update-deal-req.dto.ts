import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { DealStageEnum } from '../../db/entities/deals.entity';

export class UpdateDealsReqDto {
  @ApiProperty({
    name: 'deal_stage',
    enum: DealStageEnum,
    required: true,
  })
  @IsEnum(DealStageEnum)
  @IsOptional()
  deal_stage?: DealStageEnum;

  @ApiProperty({
    name: 'finalized_date',
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  finalized_date?: Date;
}
