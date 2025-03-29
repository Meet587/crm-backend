import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryInterface } from '../interfaces/user.interface';
import { BaseAbstractRepository } from './base/base.abstrac.repository';
import { Repository } from 'typeorm';

export class UserRepository
  extends BaseAbstractRepository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findByCondition({
      where: { email: email },
    });
  }
}
