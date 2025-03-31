import { Module } from '@nestjs/common';
import { SiteVisitsService } from './site-visits.service';
import { SiteVisitsController } from './site-visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteVisitEntity } from 'src/db/entities/site-visit.entity';
import { SiteVisitRepository } from 'src/db/repositories/site-visit.repository';

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
