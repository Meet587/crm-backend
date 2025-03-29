import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationReqDto {
  @ApiProperty({ example: 'Ahmedabad', description: 'Location name' })
  name: string;
}
