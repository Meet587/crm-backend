import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientManagementModule } from '../client-management/client-management.module';
import { DealsEntity } from '../db/entities/deals.entity';
import { DealsRepository } from '../db/repositories/deals.repository';
import { PropertyManagementModule } from '../property-management/property-management.module';
import { UserModule } from '../users/users.module';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DealsEntity]),
    UserModule,
    PropertyManagementModule,
    ClientManagementModule,
  ],
  controllers: [DealsController],
  providers: [
    DealsService,
    {
      provide: 'dealsRepositoryInterface',
      useClass: DealsRepository,
    },
  ],
})
export class DealsModule {}
