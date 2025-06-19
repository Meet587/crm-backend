import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsEnum,
  IsOptional, // Import IsOptional
} from 'class-validator';
import { UserRole } from '../../db/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'fname',
    required: true,
    type: String,
  })
  fname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'lname',
    required: true,
    type: String,
  })
  lname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    required: true,
    type: String,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    name: 'role',
    required: true,
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsOptional() // Make password optional
  @MinLength(6)
  @ApiProperty({
    name: 'password',
    minLength: 6,
    required: false, // Set required to false
    type: String,
    nullable: true, // Indicate that it can be null
  })
  password?: string; // Make password property optional

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'mfaSecret',
    required: false,
    type: String,
    nullable: true,
  })
  mfaSecret?: string;

  @IsOptional()
  @ApiProperty({
    name: 'isMfaEnabled',
    required: false,
    type: Boolean,
    default: false,
  })
  isMfaEnabled?: boolean;
}
