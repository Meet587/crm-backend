import { UserEntity } from '../entities/user.entity';
import { BaseInterfacerepository } from '../repositories/base/base.interface.repository';

export interface UserRepositoryInterface
  extends BaseInterfacerepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}
