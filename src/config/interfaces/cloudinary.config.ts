import { IsNotEmpty, IsString } from 'class-validator';

export class CloudinaryConfig {
  @IsString()
  @IsNotEmpty()
  CloudinaryKey: string;

  @IsString()
  @IsNotEmpty()
  CloudinarySecret: string;

  @IsString()
  @IsNotEmpty()
  CloudinaryCloudName: string;
}
