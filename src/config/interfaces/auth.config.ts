import { IsNotEmpty, IsString } from 'class-validator';

export class AuthConfig {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  expiresIn: string;

  @IsString()
  @IsNotEmpty()
  RefreshExpiresIn: string;
}
