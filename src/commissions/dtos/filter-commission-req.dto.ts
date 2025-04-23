import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { commissionPaymentStatusEnum } from '../../db/entities/commission.entity';

export class FilterCommissionsReqDto {
  @ApiProperty({
    name: 'status',
    enum: commissionPaymentStatusEnum,
    required: false,
    example: commissionPaymentStatusEnum.PAID,
  })
  @IsEnum(commissionPaymentStatusEnum)
  @IsOptional()
  status?: commissionPaymentStatusEnum;

  @ApiProperty({
    name: 'payout_date',
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  payout_date?: Date;

  @ApiProperty({
    required: false,
    type: Number,
    example: 1,
    description: 'builder id',
    name: 'builder_id',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  builder_id?: number;
}
