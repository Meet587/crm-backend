import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  PropertyForEnum,
  PropertyStatusEnum,
  PropertyTypeEnum,
} from 'src/db/entities/property.entity';

export class AddPropertyReqDto {
  @ApiProperty({
    enum: PropertyTypeEnum,
    example: PropertyTypeEnum.house,
    description: 'Type of property',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(PropertyTypeEnum)
  property_type: PropertyTypeEnum;

  @ApiProperty({
    example: '123 Main St',
    required: true,
    description: 'Property address',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    example: 3,
    required: true,
    description: 'Number of bedrooms',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  bedrooms: number;

  @ApiProperty({
    example: 2,
    required: true,
    description: 'Number of bathrooms',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  bathrooms: number;

  @ApiProperty({ example: 1, description: 'Location ID' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  location_id: number;

  @ApiProperty({ example: 1, description: 'Area ID' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  area_id: number;

  @ApiProperty({ example: 1500, required: true, description: 'Square footage' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  sqft: number;

  @ApiProperty({
    example: 2000,
    required: true,
    description: 'Year property was built',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  year_built: number;

  @ApiProperty({
    enum: PropertyStatusEnum,
    example: PropertyStatusEnum.AVAILABLE_FOR_SALE,
    description: 'Purpose of property',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(PropertyStatusEnum)
  status: PropertyStatusEnum;

  @ApiProperty({
    example: '100000',
    required: true,
    description: 'Price of property',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Beautiful house for rent',
    description: 'Property description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
