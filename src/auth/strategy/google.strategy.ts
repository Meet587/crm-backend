import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service'; // Assuming AuthService will handle user creation/linking

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService, // Inject AuthService
  ) {
    super({
      authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenURL: 'https://oauth2.googleapis.com/token',
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'), // Placeholder for environment variable
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'), // Placeholder for environment variable
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'), // Placeholder for environment variable
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // Here, you would typically find or create a user in your database
    const user = await this.authService.findOrCreateUser(profile);
    done(null, user);
  }
}
