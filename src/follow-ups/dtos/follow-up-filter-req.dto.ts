import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { FollowUpStatusEnum } from 'src/db/entities/follow-up.entity';

export class FollowUpFilterReqDto {
  @ApiProperty({
    name: 'clientId',
    type: Number,
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  clientId?: number;

  @ApiProperty({
    name: 'agentId',
    type: Number,
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  agentId?: number;

  @ApiProperty({
    name: 'scheduledDate',
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  scheduledDate?: Date;

  @ApiProperty({
    name: 'status',
    required: false,
    enum: FollowUpStatusEnum,
    example: FollowUpStatusEnum.COMPLETED,
  })
  @IsEnum(FollowUpStatusEnum)
  @IsOptional()
  status?: FollowUpStatusEnum;
}
