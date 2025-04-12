import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthConfig } from '../../config/interfaces/auth.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).jwtSecret,
      });

      request.user = {
        id: user.id,
        role: user.role,
        email: user.email,
      } as JwtPayload;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
export class JwtAuthGuard extends AuthGuard {}
