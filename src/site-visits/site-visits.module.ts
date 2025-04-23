import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { SiteVisitEntity } from '../db/entities/site-visit.entity';
import { SiteVisitRepository } from '../db/repositories/site-visit.repository';
import { SiteVisitsController } from './site-visits.controller';
import { SiteVisitsService } from './site-visits.service';

@Module({
  imports: [TypeOrmModule.forFeature([SiteVisitEntity])],
  controllers: [SiteVisitsController],
  providers: [
    SiteVisitsService,
    {
      provide: 'siteVisitRepositoryInterface',
      useClass: SiteVisitRepository,
    },
  ],
})
export class SiteVisitsModule {}
