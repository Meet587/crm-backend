import { Module } from '@nestjs/common';
import { ClientManagmentService } from './client-managment.service';
import { ClientManagmentController } from './client-managment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from 'src/db/entities/client.entity';
import { ClientRepository } from 'src/db/repositories/client.repository';
import { UserModule } from 'src/users/users.module';
import { PropertyManagmentModule } from './../property-managment/property-managment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientsEntity]),
    UserModule,
    PropertyManagmentModule,
  ],
  controllers: [ClientManagmentController],
  providers: [
    {
      provide: 'clientRepositoryInterface',
      useClass: ClientRepository,
    },
    ClientManagmentService,
  ],
})
export class ClientManagmentModule {}
