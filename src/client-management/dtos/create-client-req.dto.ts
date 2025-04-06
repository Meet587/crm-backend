import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  InterestTypeEnum,
  LeadSourceEnum,
  LeadStatusEnum,
  PriorityLevelEnum,
} from 'src/db/entities/client.entity';

export class CreateClientRequestDto {
  @ApiProperty({
    name: 'name',
    example: 'John doe',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    name: 'email',
    example: 'example@test.com',
    type: String,
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    name: 'remarks',
    example: 'client show interates in this property.',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({
    name: 'phoneNumber',
    example: '9090909090',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    name: 'interestType',
    example: InterestTypeEnum.COMMERCIAL,
    enum: InterestTypeEnum,
    required: true,
  })
  @IsEnum(InterestTypeEnum)
  @IsNotEmpty()
  interestType: InterestTypeEnum;

  @ApiProperty({
    name: 'leadStatus',
    example: LeadStatusEnum.NEW,
    enum: LeadStatusEnum,
    required: true,
  })
  @IsEnum(LeadStatusEnum)
  @IsNotEmpty()
  leadStatus: LeadStatusEnum;

  @ApiProperty({
    name: 'leadSource',
    example: LeadSourceEnum.DIGITAL_MARKETING,
    enum: LeadSourceEnum,
    required: true,
  })
  @IsEnum(LeadSourceEnum)
  @IsNotEmpty()
  leadSource: LeadSourceEnum;

  @ApiProperty({
    name: 'agentId',
    example: 1,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  agentId?: number;

  @ApiProperty({
    name: 'budgetMin',
    example: 1000000,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  budgetMin?: number;

  @ApiProperty({
    name: 'budgetMax',
    example: 10000000,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  budgetMax?: number;

  @ApiProperty({
    name: 'bedroomsRequired',
    example: 3,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  bedroomsRequired?: number;

  @ApiProperty({
    name: 'bathroomsRequired',
    example: 3,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  bathroomsRequired?: number;

  @ApiProperty({
    name: 'priorityLevel',
    example: PriorityLevelEnum.MEDIUM,
    required: true,
    enum: PriorityLevelEnum,
    default: PriorityLevelEnum.MEDIUM,
  })
  @IsEnum(PriorityLevelEnum)
  @IsNotEmpty()
  priorityLevel: PriorityLevelEnum;
}
