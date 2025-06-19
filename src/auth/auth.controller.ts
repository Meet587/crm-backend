import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  UseGuards, // Import UseGuards
  Req,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard for Google
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';
import { ConfirmMfaDto } from './dto/confirm-mfa.dto';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { JwtPayload } from './strategy/jwt-payload.interface'; // Import JwtPayload
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ensure ApiTags('Auth') is not duplicated if it's already at class level.
  // It seems there might have been a slight duplication in the previous tool output for ApiTags('Auth')
  // at the class level. I'll ensure it's clean.

  @Post('register')
  @ApiBody({
    description: 'register user',
    type: CreateUserDto,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiBody({
    description: 'login user',
    type: LoginDto,
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-mfa')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: 'Verify MFA code and complete login',
    type: VerifyMfaDto,
  })
  async verifyMfa(@Body() verifyMfaDto: VerifyMfaDto) {
    const isValid = await this.authService.verifyMfaCode(
      verifyMfaDto.userId,
      verifyMfaDto.mfaCode,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid MFA code');
    }
    // If valid, generate tokens using the new service method
    return this.authService.loginWithMfa(verifyMfaDto.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mfa/setup') // Changed to GET as it's initiating a setup process
  @ApiBearerAuth() // Indicates that this endpoint requires a bearer token
  @ApiTags('MFA')   // Group MFA endpoints under a specific tag in Swagger
  async setupMfa(@Req() req) {
    const userId = req.user.id; // Assumes JwtAuthGuard attaches user to req, and user has id
    // generateMfaSecret saves the secret to the user. isMfaEnabled is set upon confirmation.
    const { otpAuthUrl } = await this.authService.generateMfaSecret(userId);
    // The client should display this otpAuthUrl as a QR code
    return { otpAuthUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiTags('MFA')
  @ApiBody({
    description: 'Confirm MFA setup with the code from authenticator app',
    type: ConfirmMfaDto,
  })
  async confirmMfa(@Req() req, @Body() confirmMfaDto: ConfirmMfaDto) {
    const userId = req.user.id;
    await this.authService.confirmMfaSetup(userId, confirmMfaDto.mfaCode);
    return { message: 'MFA setup confirmed successfully.' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth2 login flow' })
  @ApiTags('OAuth') // Group OAuth endpoints
  async googleAuth(@Req() req) {
    // Guard will redirect to Google's OAuth server
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle Google OAuth2 callback and issue JWT' })
  @ApiTags('OAuth')
  async googleAuthRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException('User not found from Google OAuth');
    }

    const user = req.user; // UserEntity from GoogleStrategy.validate -> AuthService.findOrCreateUser

    // Generate JWT for this user
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const { token, refreshToken } = await this.authService.generateToken(payload);

    // Typically, for SPAs, you'd return tokens. For web apps, you might set a session/cookie
    // and redirect. Here, we return tokens.
    return {
      message: 'Google OAuth login successful',
      user: { // Return some non-sensitive user info
        id: user.id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        isMfaEnabled: user.isMfaEnabled, // It's good to inform client about MFA status
      },
      token,
      refreshToken,
    };
  }
}
