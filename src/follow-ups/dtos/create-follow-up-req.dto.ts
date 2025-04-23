import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FollowUpTypeEnum } from '../../db/entities/follow-up.entity';

export class CreateFollowUpReqDto {
  @ApiProperty({
    name: 'clientId',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  clientId: number;

  @ApiProperty({
    name: 'propertyId',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  propertyId: number;

  @ApiProperty({
    name: 'type',
    required: true,
    enum: FollowUpTypeEnum,
    example: FollowUpTypeEnum.CALL,
  })
  @IsEnum(FollowUpTypeEnum)
  @IsNotEmpty()
  type: FollowUpTypeEnum;

  @ApiProperty({
    name: 'scheduledDate',
    type: Date,
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  scheduledDate: Date;

  // @ApiProperty({
  //   name: 'status',
  //   required: true,
  //   enum: FollowUpStatusEnum,
  //   example: FollowUpStatusEnum.COMPLETED,
  // })
  // @IsEnum(FollowUpStatusEnum)
  // @IsNotEmpty()
  // status: FollowUpStatusEnum;

  @ApiProperty({
    name: 'outcome',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  outcome?: string;
}
