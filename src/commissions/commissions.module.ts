import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildersModule } from '../builders/builders.module';
import { CommissionEntity } from '../db/entities/commission.entity';
import { CommissionRepository } from '../db/repositories/commission.repository';
import { DealsModule } from '../deals/deals.module';
import { CommissionsController } from './commissions.controller';
import { CommissionsService } from './commissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommissionEntity]),
    BuildersModule,
    DealsModule,
  ],
  controllers: [CommissionsController],
  providers: [
    CommissionsService,
    {
      provide: 'commissionRepositoryInterface',
      useClass: CommissionRepository,
    },
  ],
})
export class CommissionsModule {}
