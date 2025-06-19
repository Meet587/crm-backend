import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity, UserRole } from '../db/entities/user.entity';
import { authenticator } from 'otplib';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategy/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';

// Mock bcrypt functions
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;
  let configService: Partial<Record<keyof ConfigService, jest.Mock>>;

  beforeEach(async () => {
    userService = {
      findById: jest.fn(),
      updateUser: jest.fn(),
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn(),
    };
    configService = { // Basic mock, expand if specific config values are needed by auth service
      get: jest.fn(),
      getOrThrow: jest.fn().mockImplementation((key: string) => {
        if (key === 'environment.authConfig') {
          return {
            jwtSecret: 'test-secret',
            expiresIn: '1h',
            RefreshExpiresIn: '7d',
          };
        }
        throw new Error(`Config key ${key} not mocked`);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateMfaSecret', () => {
    it('should throw NotFoundException if user not found', async () => {
      userService.findById.mockResolvedValue(null);
      await expect(service.generateMfaSecret(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should generate and return MFA secret and OTPAuth URL', async () => {
      const userId = 1;
      const mockUser = { id: userId, email: 'test@example.com' } as UserEntity;
      const mockSecret = 'MOCKSECRET123';
      const mockOtpAuthUrl = 'otpauth://mock';

      userService.findById.mockResolvedValue(mockUser);
      jest.spyOn(authenticator, 'generateSecret').mockReturnValue(mockSecret);
      jest.spyOn(authenticator, 'keyuri').mockReturnValue(mockOtpAuthUrl);
      userService.updateUser.mockResolvedValue({ ...mockUser, mfaSecret: mockSecret } as UserEntity);

      const result = await service.generateMfaSecret(userId);

      expect(result).toEqual({ secret: mockSecret, otpAuthUrl: mockOtpAuthUrl });
      expect(userService.findById).toHaveBeenCalledWith(userId);
      expect(authenticator.generateSecret).toHaveBeenCalled();
      expect(userService.updateUser).toHaveBeenCalledWith(userId, {
        mfaSecret: mockSecret,
      } as CreateUserDto);
      expect(authenticator.keyuri).toHaveBeenCalledWith(
        mockUser.email,
        'MyAppName', // Make sure this matches your app name in AuthService
        mockSecret,
      );
    });
  });

  describe('verifyMfaCode', () => {
    const userId = 1;
    const mfaCode = '123456';
    const mfaSecret = 'testsecret';

    it('should throw BadRequestException if user not found', async () => {
      userService.findById.mockResolvedValue(null);
      await expect(service.verifyMfaCode(userId, mfaCode)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if MFA secret is not set', async () => {
      userService.findById.mockResolvedValue({ id: userId, mfaSecret: null } as UserEntity);
      await expect(service.verifyMfaCode(userId, mfaCode)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return true for a valid MFA code', async () => {
      userService.findById.mockResolvedValue({ id: userId, mfaSecret } as UserEntity);
      jest.spyOn(authenticator, 'verify').mockReturnValue(true);

      const result = await service.verifyMfaCode(userId, mfaCode);
      expect(result).toBe(true);
      expect(authenticator.verify).toHaveBeenCalledWith({ token: mfaCode, secret: mfaSecret });
    });

    it('should return false for an invalid MFA code', async () => {
      userService.findById.mockResolvedValue({ id: userId, mfaSecret } as UserEntity);
      jest.spyOn(authenticator, 'verify').mockReturnValue(false);

      const result = await service.verifyMfaCode(userId, mfaCode);
      expect(result).toBe(false);
    });
  });

  describe('confirmMfaSetup', () => {
    const userId = 1;
    const mfaCode = '123456';
    const mfaSecret = 'testsecret';

    it('should throw BadRequestException if user not found', async () => {
      userService.findById.mockResolvedValue(null);
      await expect(service.confirmMfaSetup(userId, mfaCode)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if MFA secret is not set', async () => {
      userService.findById.mockResolvedValue({ id: userId, mfaSecret: null } as UserEntity);
      await expect(service.confirmMfaSetup(userId, mfaCode)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for an invalid MFA code', async () => {
      userService.findById.mockResolvedValue({ id: userId, mfaSecret } as UserEntity);
      jest.spyOn(authenticator, 'verify').mockReturnValue(false);
      await expect(service.confirmMfaSetup(userId, mfaCode)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should enable MFA if code is valid', async () => {
      const mockUser = { id: userId, mfaSecret, isMfaEnabled: false } as UserEntity;
      userService.findById.mockResolvedValue(mockUser);
      jest.spyOn(authenticator, 'verify').mockReturnValue(true);
      userService.updateUser.mockResolvedValue({ ...mockUser, isMfaEnabled: true } as UserEntity);

      await service.confirmMfaSetup(userId, mfaCode);
      expect(userService.updateUser).toHaveBeenCalledWith(userId, {
        isMfaEnabled: true,
      } as CreateUserDto);
    });
  });

  describe('loginWithMfa', () => {
    const userId = 1;
    const mockUser = {
      id: userId,
      email: 'test@example.com',
      role: UserRole.RM, // Assuming UserRole.USER or similar
      fname: 'Test',
      lname: 'User',
    } as UserEntity;

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findById.mockResolvedValue(null);
      await expect(service.loginWithMfa(userId)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should generate and return tokens for a valid user', async () => {
      userService.findById.mockResolvedValue(mockUser);
      jwtService.signAsync.mockResolvedValueOnce('mockToken').mockResolvedValueOnce('mockRefreshToken');

      const result = await service.loginWithMfa(userId);

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        fname: mockUser.fname,
        lname: mockUser.lname,
        token: 'mockToken',
        refreshToken: 'mockRefreshToken',
        mfaVerified: true,
      });
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'password' };
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      role: UserRole.RM,
      fname: 'Test',
      lname: 'User',
      mfaSecret: 'testsecret', // For MFA enabled case
      isMfaEnabled: false,     // Default to false
    } as UserEntity;

    beforeEach(() => {
      // Mock for validateUser part
      userService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Password matches
    });

    it('should return tokens if MFA is not enabled', async () => {
      const userWithoutMfa = { ...mockUser, isMfaEnabled: false, mfaSecret: null };
      userService.findByEmail.mockResolvedValue(userWithoutMfa); // findByEmail is called by validateUser

      jwtService.signAsync.mockResolvedValueOnce('mockToken').mockResolvedValueOnce('mockRefreshToken');

      const result = await service.login(loginDto);

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        id: userWithoutMfa.id,
        email: userWithoutMfa.email,
        fname: userWithoutMfa.fname,
        lname: userWithoutMfa.lname,
        token: 'mockToken',
        refreshToken: 'mockRefreshToken',
        mfaRequired: false,
      });
    });

    it('should return mfaRequired if MFA is enabled', async () => {
      const userWithMfa = { ...mockUser, isMfaEnabled: true, mfaSecret: ' موجوده ' }; // mfaSecret exists
      userService.findByEmail.mockResolvedValue(userWithMfa); // findByEmail is called by validateUser

      const result = await service.login(loginDto);

      expect(jwtService.signAsync).not.toHaveBeenCalled();
      expect(result).toEqual({
        mfaRequired: true,
        userId: userWithMfa.id,
        email: userWithMfa.email,
        message: 'MFA code required to complete login.',
      });
    });

    it('should throw BadRequestException for invalid credentials (password mismatch)', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Password does not match

      await expect(service.login(loginDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for invalid credentials (user not found)', async () => {
      userService.findByEmail.mockResolvedValue(null); // User not found

      await expect(service.login(loginDto)).rejects.toThrow(BadRequestException);
    });
  });

  // Placeholder for register and validateUser tests if they need specific adjustments
  // For example, validateUser needs to be tested if it correctly returns UserEntity with mfaSecret and isMfaEnabled
  describe('validateUser', () => {
    const email = 'test@example.com';
    const password = 'password';
    const mockUser = {
      id: 1,
      email,
      password: 'hashedPassword', // Bcrypt hash of 'password'
      role: UserRole.RM,
      fname: 'Test',
      lname: 'User',
      mfaSecret: 'secret',
      isMfaEnabled: true,
    } as UserEntity;

    it('should return user entity if credentials are valid', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(email, password);
      expect(result).toEqual(mockUser);
      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
    });

    it('should throw BadRequestException if user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);
      await expect(service.validateUser(email, password)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if password does not match', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.validateUser(email, password)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOrCreateUser', () => {
    const mockGoogleProfile = {
      id: 'google123',
      displayName: 'Test User',
      name: { givenName: 'Test', familyName: 'User' },
      emails: [{ value: 'test@example.com' }],
      photos: [{ value: 'http://example.com/photo.jpg' }],
    };
    const mockUserEntity = {
      id: 1,
      email: 'test@example.com',
      fname: 'Test',
      lname: 'User',
      role: UserRole.RM, // Default role assigned by findOrCreateUser
    } as UserEntity;

    it('should throw BadRequestException if profile has no email', async () => {
      const profileWithoutEmail = { ...mockGoogleProfile, emails: undefined };
      await expect(service.findOrCreateUser(profileWithoutEmail)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if profile has empty email array', async () => {
      const profileWithEmptyEmail = { ...mockGoogleProfile, emails: [] };
      await expect(service.findOrCreateUser(profileWithEmptyEmail)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return existing user if found by email', async () => {
      userService.findByEmail.mockResolvedValue(mockUserEntity);

      const result = await service.findOrCreateUser(mockGoogleProfile);

      expect(result).toEqual(mockUserEntity);
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(userService.createUser).not.toHaveBeenCalled();
    });

    it('should create and return new user if not found by email', async () => {
      userService.findByEmail.mockResolvedValue(null); // User not found
      userService.createUser.mockResolvedValue(mockUserEntity); // Mock creation

      const result = await service.findOrCreateUser(mockGoogleProfile);

      expect(result).toEqual(mockUserEntity);
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(userService.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          fname: 'Test',
          lname: 'User',
          role: UserRole.RM, // As per current findOrCreateUser implementation
          // password should be undefined
        }),
      );
    });

    it('should re-throw error if userService.findByEmail throws an unexpected error', async () => {
      const dbError = new Error('Database connection error');
      userService.findByEmail.mockRejectedValue(dbError);

      await expect(service.findOrCreateUser(mockGoogleProfile)).rejects.toThrow(
        // The error is caught and re-thrown as InternalServerErrorException or the original if HttpException
         InternalServerErrorException // Based on current findOrCreateUser catch block
      );
    });

    it('should throw InternalServerErrorException if userService.createUser throws an error', async () => {
      userService.findByEmail.mockResolvedValue(null);
      const creationError = new Error('Failed to create user');
      userService.createUser.mockRejectedValue(creationError);

      await expect(service.findOrCreateUser(mockGoogleProfile)).rejects.toThrow(
        InternalServerErrorException, // Based on current findOrCreateUser catch block
      );
    });
  });
});
