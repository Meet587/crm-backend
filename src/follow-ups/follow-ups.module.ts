import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { FollowUpEntity } from '../db/entities/follow-up.entity';
import { FollowUpRepository } from '../db/repositories/follow-up.repository';
import { FollowUpsController } from './follow-ups.controller';
import { FollowUpsService } from './follow-ups.service';

@Module({
  imports: [TypeOrmModule.forFeature([FollowUpEntity])],
  controllers: [FollowUpsController],
  providers: [
    FollowUpsService,
    {
      provide: 'followUpRepositoryInterface',
      useClass: FollowUpRepository,
    },
  ],
})
export class FollowUpsModule {}
