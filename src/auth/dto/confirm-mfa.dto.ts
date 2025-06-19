import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmMfaDto {
  @IsString()
  @IsNotEmpty()
  mfaCode: string;
}
