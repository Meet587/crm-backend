import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/db/entities/user.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
