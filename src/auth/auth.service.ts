import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException, // Import NotFoundException
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { authenticator } from 'otplib'; // Import authenticator from otplib
import { UserEntity, UserRole } from 'src/db/entities/user.entity'; // Import UserRole
import { AuthConfig } from '../config/interfaces/auth.config';
import { UserService } from './../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategy/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userService.createUser(createUserDto);

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const { token, refreshToken } = await this.generateToken(payload);
      return {
        id: user.id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        token,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        // validateUser already throws BadRequestException for invalid credentials
        // This check can be considered redundant if validateUser always throws or returns a valid user.
        // However, it doesn't hurt to keep it as a safeguard.
        throw new BadRequestException('Invalid credentials');
      }

      // if (user.mfaSecret) { // Old check
      if (user.isMfaEnabled) { // New check based on the isMfaEnabled flag
        // MFA is enabled
        return {
          mfaRequired: true,
          userId: user.id,
          email: user.email, // Optionally return email or other non-sensitive identifiers
          message: 'MFA code required to complete login.',
        };
      } else {
        // MFA is not enabled, proceed to generate tokens
        const payload: JwtPayload = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        const { token, refreshToken } = await this.generateToken(payload);
        return {
          id: user.id,
          email: user.email,
          fname: user.fname,
          lname: user.lname,
          token,
          refreshToken,
          mfaRequired: false, // Explicitly state MFA was not required
        };
      }
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async generateToken(payload: JwtPayload): Promise<Record<string, string>> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).jwtSecret,
        expiresIn: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).expiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).jwtSecret,
        expiresIn: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).RefreshExpiresIn,
      }),
    ]);

    return {
      token,
      refreshToken,
    };
  }

  async findOrCreateUser(profile: any): Promise<UserEntity> {
    const { id: googleId, emails, name, photos } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      throw new BadRequestException('Email not found from OAuth provider');
    }

    try {
      let user = await this.userService.findByEmail(email);

      if (user) {
        // Optional: Link Google ID if you add a googleId field to UserEntity
        // if (!user.googleId) {
        //   user.googleId = googleId;
        //   await this.userService.updateUser(user.id, { googleId });
        // }
        return user;
      } else {
        // Create a new user
        const newUserDetails: CreateUserDto = {
          email,
          fname: name?.givenName,
          lname: name?.familyName,
          role: UserRole.RM, // Default role, ensure UserRole is imported
          // password is not provided, relying on optionality in CreateUserDto and UserService handling
        };

        user = await this.userService.createUser(newUserDetails);
        return user;
      }
    } catch (error) {
      // Log the error and profile details for debugging
      console.error('Error in findOrCreateUser:', error);
      console.error('OAuth Profile:', profile);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Could not process user from OAuth profile.',
      );
    }
  }

  async generateMfaSecret(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const secret = authenticator.generateSecret();

    await this.userService.updateUser(user.id, {
      mfaSecret: secret,
    } as CreateUserDto); // Cast to CreateUserDto, ensure mfaSecret is an optional field

    const otpAuthUrl = authenticator.keyuri(
      user.email,
      'MyAppName', // Replace with your actual app name
      secret,
    );

    return { secret, otpAuthUrl }; // Commonly, only otpAuthUrl is returned to the frontend for QR display
                                  // The raw secret might be returned for backup codes, but handle with care.
  }

  async verifyMfaCode(userId: number, mfaCode: string): Promise<boolean> {
    const user = await this.userService.findById(userId);
    if (!user || !user.mfaSecret) {
      // User not found or MFA not enabled for this user
      throw new BadRequestException('MFA not enabled for this user or user not found.');
    }

    return authenticator.verify({
      token: mfaCode,
      secret: user.mfaSecret,
    });
  }

  async loginWithMfa(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      // This case should ideally be rare if MFA verification happened just before for the same userId
      throw new UnauthorizedException('User not found after MFA verification.');
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const { token, refreshToken } = await this.generateToken(payload);
    return {
      id: user.id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      token,
      refreshToken,
      mfaVerified: true, // Indicate that login was completed via MFA
    };
  }

  async confirmMfaSetup(userId: number, mfaCode: string): Promise<void> {
    const user = await this.userService.findById(userId);
    if (!user || !user.mfaSecret) {
      throw new BadRequestException(
        'MFA setup not initiated or user not found.',
      );
    }

    const isMfaCodeValid = authenticator.verify({
      token: mfaCode,
      secret: user.mfaSecret,
    });

    if (!isMfaCodeValid) {
      throw new BadRequestException('Invalid MFA code.');
    }

    // Mark MFA as enabled by updating the user record
    await this.userService.updateUser(user.id, {
      isMfaEnabled: true,
    } as CreateUserDto); // Cast to CreateUserDto, ensure isMfaEnabled is an optional field
  }
}
