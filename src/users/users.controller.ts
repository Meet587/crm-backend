import { Controller, UseGuards, Get } from '@nestjs/common/decorators';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { UserRole } from 'src/db/entities/user.entity';
import { CacheControl } from 'src/helpers/cache.decorator';

@Controller('users')
@ApiTags('User Management')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-users')
  @CacheControl(300)
  // @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'get all user list',
    operationId: 'getAllUserList',
  })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
