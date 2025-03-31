import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class AddPropertyInterestReqDto {
  @ApiProperty({
    name: 'propertyIds',
    type: Number,
    isArray: true,
    description: 'array of all intereste property ids.',
  })
  @IsArray({ message: 'only number id is valid.' })
  @Type(() => Number)
  propertyIds: number[];
}
