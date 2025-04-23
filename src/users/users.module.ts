import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserRepository } from './../db/repositories/user.repository';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserEntity } from '../db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    { provide: 'userRepositoryInterface', useClass: UserRepository },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
