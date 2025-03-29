import { Module } from '@nestjs/common';
import { PropertyManagmentService } from './property-managment.service';
import { PropertyManagmentController } from './property-managment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/db/entities/property.entity';
import { PropertyRepository } from 'src/db/repositories/property.repository';
import { LocationController } from 'src/property-managment/location.controller';
import { LocationService } from 'src/property-managment/location.service';
import { LocationEntity } from 'src/db/entities/location.entity';
import { AreaEntity } from 'src/db/entities/area.entity';
import { LocationRepository } from 'src/db/repositories/location.repository';
import { AreaRepository } from 'src/db/repositories/area.repository';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyEntity, LocationEntity, AreaEntity]),
    UserModule,
  ],
  controllers: [PropertyManagmentController, LocationController],
  providers: [
    PropertyManagmentService,
    LocationService,
    { provide: 'propertyRepositoryInterface', useClass: PropertyRepository },
    { provide: 'locationRepositoryInterface', useClass: LocationRepository },
    { provide: 'areaRepositoryInterface', useClass: AreaRepository },
  ],
})
export class PropertyManagmentModule {}
