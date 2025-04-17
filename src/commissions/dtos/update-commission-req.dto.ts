import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { commissionPaymentStatusEnum } from '../../db/entities/commission.entity';

export class UpdateCommissionReqDto {
  @ApiProperty({
    required: false,
    type: Number,
    example: 30000,
    description: 'commission amount',
    name: 'amount',
  })
  @IsNumber()
  @IsOptional()
  amount?: number;

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
}
