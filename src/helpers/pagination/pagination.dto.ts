import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginatedResult, PaginationParams } from './pagination.interface';

export class PaginationReqDto implements PaginationParams {
  @ApiProperty({
    description: 'Page number (starts from 1)',
    default: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
    required: false,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class PaginationMeta {
  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  pages: number;
}

export class PaginationResponseDto<T> implements PaginatedResult<T> {
  @ApiProperty({ description: 'Array of items', isArray: true })
  data: any[];

  @ApiProperty({ type: PaginationMeta })
  meta: PaginationMeta;
}
