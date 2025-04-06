import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsEnum,
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
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    name: 'password',
    minLength: 6,
    required: true,
    type: String,
  })
  password: string;
}
