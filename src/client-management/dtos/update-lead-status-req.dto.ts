import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { LeadStatusEnum } from 'src/db/entities/client.entity';

export class UpdateLeadStatusReqDto {
  @ApiProperty({
    name: 'status',
    enum: LeadStatusEnum,
    example: LeadStatusEnum.INTERESTED,
    required: true,
  })
  @IsEnum(LeadStatusEnum)
  @IsNotEmpty()
  status: LeadStatusEnum;
}
