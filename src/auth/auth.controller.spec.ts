import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VerifyMfaDto } from './dto/verify-mfa.dto';
import { ConfirmMfaDto } from './dto/confirm-mfa.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto'; // Though register isn't explicitly a target, it's good practice
import {
  UnauthorizedException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UserEntity, UserRole } from '../db/entities/user.entity';
import { JwtPayload } from './strategy/jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport'; // For mocking Google AuthGuard
import { JwtAuthGuard } from './strategy/jwt-auth.guard'; // For mocking JwtAuthGuard

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const authServiceMock = {
      register: jest.fn(),
      login: jest.fn(),
      generateMfaSecret: jest.fn(),
      verifyMfaCode: jest.fn(),
      confirmMfaSetup: jest.fn(),
      loginWithMfa: jest.fn(),
      generateToken: jest.fn(),
      findOrCreateUser: jest.fn(), // Not directly called by controller but part of Google flow
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    })
    // Example of how one might mock guards if direct testing of guard logic is needed.
    // For controller tests, we often assume guards work or test the state after guard execution.
    // .overrideGuard(JwtAuthGuard).useValue({ canActivate: (context) => {
    //   const req = context.switchToHttp().getRequest();
    //   req.user = { id: 1, email: 'test@example.com', role: UserRole.RM }; // Mock user
    //   return true;
    // }})
    // .overrideGuard(AuthGuard('google')).useValue({ canActivate: (context) => {
    //   const req = context.switchToHttp().getRequest();
    //   // For googleAuth, canActivate would initiate redirect.
    //   // For googleAuthRedirect, it would populate req.user.
    //   if (context.getHandler().name === 'googleAuthRedirect') {
    //     req.user = { id: 1, email: 'googleuser@example.com', fname: 'Google', lname: 'User', role: UserRole.RM };
    //   }
    //   return true;
    // }})
    .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /auth/login', () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'password' };

    it('should return tokens if MFA is not required by AuthService', async () => {
      const tokenResult = { token: 'jwtToken', refreshToken: 'refreshToken', mfaRequired: false };
      authService.login.mockResolvedValue(tokenResult);
      expect(await controller.login(loginDto)).toEqual(tokenResult);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should return mfaRequired if MFA is required by AuthService', async () => {
      const mfaRequiredResult = { mfaRequired: true, userId: 1, email: 'test@example.com' };
      authService.login.mockResolvedValue(mfaRequiredResult);
      expect(await controller.login(loginDto)).toEqual(mfaRequiredResult);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('GET /auth/google', () => {
    it('should be defined (guard handles actual logic)', () => {
      // The method itself is trivial as AuthGuard('google') handles redirection
      expect(controller.googleAuth).toBeDefined();
      // We can't easily test the redirection here without more complex e2e setup or guard mocking
      // that actually performs a redirect. For a unit test, this is often sufficient.
    });
  });

  describe('GET /auth/google/callback', () => {
    const mockUserFromGoogle = {
      id: 1,
      email: 'google@example.com',
      fname: 'Google',
      lname: 'User',
      role: UserRole.RM,
      isMfaEnabled: false,
    } as UserEntity;
    const mockReq = { user: mockUserFromGoogle };
    const tokenResult = { token: 'jwtToken', refreshToken: 'refreshToken' };

    it('should generate tokens and return user info if req.user is populated', async () => {
      authService.generateToken.mockResolvedValue(tokenResult);
      const result = await controller.googleAuthRedirect(mockReq as any); // Cast as any for mock req

      const expectedPayload: JwtPayload = {
        id: mockUserFromGoogle.id,
        email: mockUserFromGoogle.email,
        role: mockUserFromGoogle.role,
      };
      expect(authService.generateToken).toHaveBeenCalledWith(expectedPayload);
      expect(result).toEqual({
        message: 'Google OAuth login successful',
        user: {
          id: mockUserFromGoogle.id,
          email: mockUserFromGoogle.email,
          fname: mockUserFromGoogle.fname,
          lname: mockUserFromGoogle.lname,
          isMfaEnabled: mockUserFromGoogle.isMfaEnabled,
        },
        token: tokenResult.token,
        refreshToken: tokenResult.refreshToken,
      });
    });

    it('should throw UnauthorizedException if req.user is not populated', async () => {
      const emptyReq = { user: null };
      await expect(controller.googleAuthRedirect(emptyReq as any)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('POST /auth/verify-mfa', () => {
    const verifyMfaDto: VerifyMfaDto = { userId: 1, mfaCode: '123456' };
    const tokenResult = { token: 'jwtToken', refreshToken: 'refreshToken', mfaVerified: true };

    it('should return tokens if MFA code is valid', async () => {
      authService.verifyMfaCode.mockResolvedValue(true);
      authService.loginWithMfa.mockResolvedValue(tokenResult);

      const result = await controller.verifyMfa(verifyMfaDto);
      expect(result).toEqual(tokenResult);
      expect(authService.verifyMfaCode).toHaveBeenCalledWith(verifyMfaDto.userId, verifyMfaDto.mfaCode);
      expect(authService.loginWithMfa).toHaveBeenCalledWith(verifyMfaDto.userId);
    });

    it('should throw UnauthorizedException if MFA code is invalid', async () => {
      authService.verifyMfaCode.mockResolvedValue(false);
      await expect(controller.verifyMfa(verifyMfaDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('GET /auth/mfa/setup', () => {
    const mockReq = { user: { id: 1 } }; // Mocking req.user from JwtAuthGuard
    const mfaSetupResult = { otpAuthUrl: 'otpauth://mockurl' };

    it('should call authService.generateMfaSecret and return otpAuthUrl', async () => {
      authService.generateMfaSecret.mockResolvedValue(mfaSetupResult);
      const result = await controller.setupMfa(mockReq as any); // Cast as any for mock req
      expect(result).toEqual(mfaSetupResult);
      expect(authService.generateMfaSecret).toHaveBeenCalledWith(mockReq.user.id);
    });
  });

  describe('POST /auth/mfa/confirm', () => {
    const mockReq = { user: { id: 1 } }; // Mocking req.user
    const confirmMfaDto: ConfirmMfaDto = { mfaCode: '123456' };

    it('should call authService.confirmMfaSetup and return success message', async () => {
      authService.confirmMfaSetup.mockResolvedValue(undefined); // Method is void
      const result = await controller.confirmMfa(mockReq as any, confirmMfaDto);
      expect(result).toEqual({ message: 'MFA setup confirmed successfully.' });
      expect(authService.confirmMfaSetup).toHaveBeenCalledWith(mockReq.user.id, confirmMfaDto.mfaCode);
    });

    it('should propagate BadRequestException if authService.confirmMfaSetup throws it', async () => {
      authService.confirmMfaSetup.mockRejectedValue(new BadRequestException('Invalid MFA code.'));
      await expect(controller.confirmMfa(mockReq as any, confirmMfaDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // Example for POST /auth/register (not a primary target but good to have)
  describe('POST /auth/register', () => {
    const createUserDto: CreateUserDto = { email: 'new@example.com', password: 'password123', fname: 'New', lname: 'User', role: UserRole.RM };
    const registerResult = { id: 1, /* ... other user props ... */ token: 'token' };

    it('should call authService.register and return result', async () => {
      authService.register.mockResolvedValue(registerResult);
      const result = await controller.register(createUserDto);
      expect(result).toEqual(registerResult);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });
  });
});
