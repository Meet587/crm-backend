import { Module } from '@nestjs/common';
import { FollowUpsService } from './follow-ups.service';
import { FollowUpsController } from './follow-ups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowUpEntity } from 'src/db/entities/follow-up.entity';
import { FollowUpRepository } from 'src/db/repositories/follow-up.repository';

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
