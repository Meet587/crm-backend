import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SiteVisitStatusEnum } from 'src/db/entities/site-visit.entity';

export class UpdateSiteVisitReqDto {
  @ApiProperty({
    name: 'agentId',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  agentId: number;

  @ApiProperty({
    name: 'scheduledDate',
    type: Date,
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  scheduledDate: Date;

  @ApiProperty({
    name: 'status',
    required: true,
    enum: SiteVisitStatusEnum,
    example: SiteVisitStatusEnum.COMPLETED,
  })
  @IsEnum(SiteVisitStatusEnum)
  @IsNotEmpty()
  status: SiteVisitStatusEnum;

  @ApiProperty({
    name: 'clientFeedback',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  clientFeedback?: string;

  @ApiProperty({
    name: 'agentNotes',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  agentNotes?: string;
}
