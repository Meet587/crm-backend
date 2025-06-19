import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class VerifyMfaDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  mfaCode: string;
}
