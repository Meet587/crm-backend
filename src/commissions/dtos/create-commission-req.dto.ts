import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { commissionPaymentStatusEnum } from '../../db/entities/commission.entity';
import { Type } from 'class-transformer';

export class CreateCommissionReqDto {
  @ApiProperty({
    required: true,
    type: Number,
    example: 30000,
    description: 'commission amount',
    name: 'amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    name: 'status',
    enum: commissionPaymentStatusEnum,
    required: true,
    example: commissionPaymentStatusEnum.PAID,
  })
  @IsEnum(commissionPaymentStatusEnum)
  @IsNotEmpty()
  status: commissionPaymentStatusEnum;

  @ApiProperty({
    name: 'payout_date',
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  payout_date: Date;

  @ApiProperty({
    required: true,
    type: Number,
    example: 1,
    description: 'builder id',
    name: 'builder_id',
  })
  @IsNumber()
  @Type(()=>Number)
  @IsNotEmpty()
  builder_id: number;

  @ApiProperty({
    required: true,
    type: Number,
    example: 1,
    description: 'deal id',
    name: 'deal_id',
  })
  @IsNumber()
  @IsNotEmpty()
  deal_id: number;
}
