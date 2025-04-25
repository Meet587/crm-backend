import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import {
  PropertyStatusEnum,
  PropertyTypeEnum,
} from '../../db/entities/property.entity';
import { PaginationReqDto } from '../../helpers/pagination/pagination.dto';

export class FilterPropertyReqDto extends PaginationReqDto {
  @ApiProperty({
    enum: PropertyTypeEnum,
    example: PropertyTypeEnum.house,
    description: 'Type of property',
    required: false,
  })
  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  property_type?: PropertyTypeEnum;

  @ApiProperty({
    example: 3,
    required: false,
    description: 'Number of bedrooms, (minimum bedrooms require)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bedrooms?: number;

  @ApiProperty({
    name: 'agent_id',
    example: 3,
    required: false,
    description: 'assign agent id',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  agent_id?: number;

  @ApiProperty({
    example: 2,
    required: false,
    description: 'Number of bathrooms, (minimum bathrooms require)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bathrooms?: number;

  @ApiProperty({ example: 1, description: 'Location ID', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  location_id?: number;

  @ApiProperty({ example: 1, description: 'area ID', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  area_id?: number;

  @ApiProperty({
    example: 1500,
    required: false,
    description: 'Square footage (minimum sqft require)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sqft?: number;

  @ApiProperty({
    example: 2000,
    required: false,
    description: 'Year property was built',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  year_built?: number;

  @ApiProperty({
    enum: PropertyStatusEnum,
    example: PropertyStatusEnum.AVAILABLE_FOR_SALE,
    description: 'Purpose of property',
    required: false,
  })
  @IsOptional()
  @IsEnum(PropertyStatusEnum)
  status?: PropertyStatusEnum;

  @ApiProperty({
    example: '100000',
    required: false,
    description: 'Price of property, (maximum price)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;
}
