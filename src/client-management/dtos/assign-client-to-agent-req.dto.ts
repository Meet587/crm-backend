import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignClientToAgentReqDto {
  @ApiProperty({
    name: 'clientId',
    type: Number,
    example: 1,
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({
    name: 'agentId',
    type: Number,
    example: 1,
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  agentId: number;
}
