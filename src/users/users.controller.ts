import { Controller, UseGuards, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { UserRole } from 'src/db/entities/user.entity';

@Controller('users')
@ApiTags('User Managment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-users')
  // @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'get all user list',
    operationId: 'getAllUserList',
  })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
