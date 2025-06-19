import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserEntity } from 'src/db/entities/user.entity';
import { UserRepositoryInterface } from './../db/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject('userRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const isExist = await this.userRepository.findByEmail(
        createUserDto.email,
      );
      if (isExist) {
        throw new ConflictException('user already exist with this email.');
      }
      let hashPassword = null;
      if (createUserDto.password) {
        hashPassword = await bcrypt.hash(createUserDto.password, 12);
      }
      const newUser = await this.userRepository.save({
        fname: createUserDto.fname,
        lname: createUserDto.lname,
        email: createUserDto.email,
        password: hashPassword,
        role: createUserDto.role,
      });
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException('user not found with this email.');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneById(id);
      if (!user) {
        throw new NotFoundException('user not found with this id.');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.findAll({
        select: [
          'createdAt',
          'email',
          'id',
          'fname',
          'lname',
          'phoneNumber',
          'role',
          'updatedAt',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneById(id);
      if (!user) {
        throw new NotFoundException('User not found with this id.');
      }

      // Merge the changes from updateUserDto into the user entity
      // Object.assign(user, updateUserDto);

      // More controlled update:
      if (updateUserDto.fname !== undefined) user.fname = updateUserDto.fname;
      if (updateUserDto.lname !== undefined) user.lname = updateUserDto.lname;
      // Email updates should be handled carefully, possibly disallowed or require verification
      // For now, we'll allow it but be mindful of unique constraints
      if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
      if (updateUserDto.role !== undefined) user.role = updateUserDto.role;
      if (updateUserDto.mfaSecret !== undefined) user.mfaSecret = updateUserDto.mfaSecret;
      if (updateUserDto.isMfaEnabled !== undefined) user.isMfaEnabled = updateUserDto.isMfaEnabled; // Handle isMfaEnabled
      // Password updates should ideally have their own flow and hash the password
      // If updateUserDto includes a password, it should be hashed.
      // However, for MFA setup, we are primarily concerned with mfaSecret.
      // This example will not handle password changes to keep it focused.
      // if (updateUserDto.password) {
      //   user.password = await bcrypt.hash(updateUserDto.password, 12);
      // }


      const updatedUser = await this.userRepository.save(user);
      delete updatedUser.password; // Ensure password is not returned
      return updatedUser;
    } catch (error) {
      // Handle potential unique constraint errors if email is changed to an existing one
      if (error.code === 'ER_DUP_ENTRY' || error.message.includes('unique constraint')) {
        throw new ConflictException('Email already exists.');
      }
      throw error;
    }
  }
}
