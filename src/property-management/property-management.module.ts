import { Module } from '@nestjs/common/decorators/modules';
import { PropertyManagementController } from './property-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/db/entities/property.entity';
import { PropertyRepository } from 'src/db/repositories/property.repository';
import { LocationController } from 'src/property-management/location.controller';
import { LocationService } from 'src/property-management/location.service';
import { LocationEntity } from 'src/db/entities/location.entity';
import { AreaEntity } from 'src/db/entities/area.entity';
import { LocationRepository } from 'src/db/repositories/location.repository';
import { AreaRepository } from 'src/db/repositories/area.repository';
import { UserModule } from 'src/users/users.module';
import { PropertyManagementService } from './property-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyEntity, LocationEntity, AreaEntity]),
    UserModule,
  ],
  controllers: [PropertyManagementController, LocationController],
  providers: [
    PropertyManagementService,
    LocationService,
    { provide: 'propertyRepositoryInterface', useClass: PropertyRepository },
    { provide: 'locationRepositoryInterface', useClass: LocationRepository },
    { provide: 'areaRepositoryInterface', useClass: AreaRepository },
  ],
  exports: [PropertyManagementService],
})
export class PropertyManagementModule {}
