import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
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
