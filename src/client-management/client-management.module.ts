import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from 'src/db/entities/client.entity';
import { ClientRepository } from 'src/db/repositories/client.repository';
import { UserModule } from 'src/users/users.module';
import { PropertyManagementModule } from '../property-management/property-management.module';
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
