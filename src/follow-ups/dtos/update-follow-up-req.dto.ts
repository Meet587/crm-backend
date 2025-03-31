import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  FollowUpStatusEnum,
  FollowUpTypeEnum,
} from 'src/db/entities/follow-up.entity';

export class UpdateFollowUpReqDto {
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
    name: 'type',
    required: false,
    enum: FollowUpTypeEnum,
    example: FollowUpTypeEnum.CALL,
  })
  @IsEnum(FollowUpTypeEnum)
  @IsOptional()
  type?: FollowUpTypeEnum;

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

  @ApiProperty({
    name: 'outcome',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  outcome?: string;
}
