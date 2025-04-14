import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { ServiceConfig } from './service.config';
import { AuthConfig } from './auth.config';
import { DbConfig } from './db.config';
import { CloudinaryConfig } from './cloudinary.config';

export class CommonConfig {
  @IsDefined({
    always: true,
    message: `$target: $property is empty`,
  })
  @Type(() => ServiceConfig)
  @ValidateNested()
  serviceConfig?: ServiceConfig;

  @IsDefined({
    always: true,
    message: `$target: $property is empty`,
  })
  @Type(() => AuthConfig)
  @ValidateNested()
  authConfig?: AuthConfig;

  @IsDefined({
    always: true,
    message: `$target: $property is empty`,
  })
  @Type(() => DbConfig)
  @ValidateNested()
  dbConfig?: DbConfig;

  @IsDefined({
    always: true,
    message: `$target: $property is empty`,
  })
  @Type(() => CloudinaryConfig)
  @ValidateNested()
  cloudinaryConfig?: CloudinaryConfig;
}
