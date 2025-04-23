import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ClientsEntity } from '../db/entities/client.entity';
import { ClientRepository } from '../db/repositories/client.repository';
import { PropertyManagementModule } from '../property-management/property-management.module';
import { UserModule } from '../users/users.module';
import { ClientManagementController } from './client-management.controller';
import { ClientManagementService } from './client-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientsEntity]),
    UserModule,
    PropertyManagementModule,
  ],
  controllers: [ClientManagementController],
  providers: [
    {
      provide: 'clientRepositoryInterface',
      useClass: ClientRepository,
    },
    ClientManagementService,
  ],
  exports: [ClientManagementService],
})
export class ClientManagementModule {}
