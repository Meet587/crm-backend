import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SiteVisitStatusEnum } from 'src/db/entities/site-visit.entity';

export class SiteVisitFilterReqDto {
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
    enum: SiteVisitStatusEnum,
    example: SiteVisitStatusEnum.COMPLETED,
  })
  @IsEnum(SiteVisitStatusEnum)
  @IsOptional()
  status?: SiteVisitStatusEnum;
}
