import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaReqDto {
  @ApiProperty({ example: 'Bopal', description: 'Area name' })
  name: string;

  @ApiProperty({ example: 1, description: 'Location ID' })
  location_id: number;
}
