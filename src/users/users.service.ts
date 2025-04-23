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
      const hashPassword = await bcrypt.hash(createUserDto.password, 12);
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
}
