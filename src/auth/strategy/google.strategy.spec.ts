import { Test, TestingModule } from '@nestjs/testing';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../db/entities/user.entity'; // Adjust path as necessary

describe('GoogleStrategy', () => {
  let strategy: GoogleStrategy;
  let authService: jest.Mocked<AuthService>; // Using jest.Mocked for better type safety

  beforeEach(async () => {
    // Create a partial mock for AuthService
    const authServiceMock = {
      findOrCreateUser: jest.fn(),
      // Mock other AuthService methods if they were to be called by the strategy
    };

    // Create a partial mock for ConfigService
    const configServiceMock = {
      get: jest.fn((key: string) => {
        if (key === 'GOOGLE_CLIENT_ID') return 'test_client_id';
        if (key === 'GOOGLE_CLIENT_SECRET') return 'test_client_secret';
        if (key === 'GOOGLE_CALLBACK_URL') return 'http://localhost/callback_url';
        // Potentially mock other config values if the strategy constructor uses them
        return null;
      }),
      // Mock other ConfigService methods if needed
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleStrategy,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    strategy = module.get<GoogleStrategy>(GoogleStrategy);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    const mockAccessToken = 'mockAccessToken';
    const mockRefreshToken = 'mockRefreshToken'; // GoogleStrategy might not use refreshToken
    const mockProfile = {
      id: 'google123',
      displayName: 'Test User',
      emails: [{ value: 'test@example.com' }],
      // Other profile fields can be added if relevant to findOrCreateUser
    };
    const mockUser = { id: 1, email: 'test@example.com' } as UserEntity;

    it('should call authService.findOrCreateUser with profile and call done(null, user) on success', async () => {
      authService.findOrCreateUser.mockResolvedValue(mockUser);
      const done = jest.fn();

      await strategy.validate(mockAccessToken, mockRefreshToken, mockProfile, done);

      expect(authService.findOrCreateUser).toHaveBeenCalledWith(mockProfile);
      expect(done).toHaveBeenCalledWith(null, mockUser);
    });

    it('should call done(error, null) if authService.findOrCreateUser throws an error', async () => {
      const mockError = new Error('Failed to process user');
      authService.findOrCreateUser.mockRejectedValue(mockError);
      const done = jest.fn();

      await strategy.validate(mockAccessToken, mockRefreshToken, mockProfile, done);

      expect(authService.findOrCreateUser).toHaveBeenCalledWith(mockProfile);
      expect(done).toHaveBeenCalledWith(mockError, null);
    });

    it('should call done(error, null) if profile is null or undefined (though Passport typically ensures profile exists)', async () => {
        // This scenario might be more about how Passport itself handles a missing profile before validate is called.
        // However, if validate could somehow be called with null profile:
        const done = jest.fn();
        // We expect findOrCreateUser to throw if profile is not as expected, or handle it gracefully.
        // Let's assume findOrCreateUser would throw.
        const badProfileError = new Error("Cannot read properties of null (reading 'emails')"); // Example error
        authService.findOrCreateUser.mockRejectedValue(badProfileError);

        await strategy.validate(mockAccessToken, mockRefreshToken, null, done);
        expect(authService.findOrCreateUser).toHaveBeenCalledWith(null);
        expect(done).toHaveBeenCalledWith(badProfileError, null);
    });
  });
});
