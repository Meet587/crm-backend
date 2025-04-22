import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBuilderReqDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'Ship',
    name: 'name',
    description: 'builders name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    type: String,
    example: 'Meet Rakholiya',
    name: 'contact_person',
  })
  @IsString()
  @IsOptional()
  contact_person?: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'test@gmail.com',
    name: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '9090909090',
    name: 'phone_number',
  })
  @IsNumberString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    required: true,
    type: Number,
    example: 3,
    description: 'commission rate in percentage',
    name: 'commission_rate',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  commission_rate: number;
}
