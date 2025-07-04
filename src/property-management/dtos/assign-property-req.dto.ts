import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignPropertyTo {
  @ApiProperty({
    name: 'propertyId',
    required: true,
    description: 'property id',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  propertyId: number;

  @ApiProperty({
    name: 'agentId',
    required: true,
    description: 'agent id',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  agentId: number;
}
