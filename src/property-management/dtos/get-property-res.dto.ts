import { ApiProperty } from '@nestjs/swagger';
import {
  PropertyForEnum,
  PropertyStatusEnum,
  PropertyTypeEnum,
} from 'src/db/entities/property.entity';

export class GetPropertyResDto {
  @ApiProperty({ example: 1, description: 'Property ID' })
  id: number;

  @ApiProperty({
    enum: PropertyTypeEnum,
    example: PropertyTypeEnum.house,
    description: 'Type of property',
  })
  property_type: PropertyTypeEnum;

  @ApiProperty({ example: '123 Main St', description: 'Property address' })
  address: string;

  @ApiProperty({ example: 3, description: 'Number of bedrooms' })
  bedrooms: number;

  @ApiProperty({ example: 2, description: 'Number of bathrooms' })
  bathrooms: number;

  @ApiProperty({ example: 1500, description: 'Square footage' })
  sqft: number;

  @ApiProperty({ example: 2000, description: 'Year property was built' })
  year_built: number;

  @ApiProperty({
    enum: PropertyStatusEnum,
    example: PropertyStatusEnum.AVAILABLE_FOR_RENT,
    description: 'Purpose of property',
  })
  status: PropertyStatusEnum;

  @ApiProperty({ example: '100000', description: 'Price of property' })
  price: number;

  @ApiProperty({
    example: 'Beautiful house for rent',
    description: 'Property description',
  })
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
