import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DbConfig {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsString()
  host!: string;

  @IsNotEmpty()
  @IsNumber()
  port!: number;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  dbname!: string;

  @IsOptional()
  synchronize?: boolean;
}
