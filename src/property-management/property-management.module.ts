import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AreaEntity } from '../db/entities/area.entity';
import { LocationEntity } from '../db/entities/location.entity';
import { PropertyEntity } from '../db/entities/property.entity';
import { AreaRepository } from '../db/repositories/area.repository';
import { LocationRepository } from '../db/repositories/location.repository';
import { PropertyRepository } from '../db/repositories/property.repository';
import { UserModule } from '../users/users.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { PropertyManagementController } from './property-management.controller';
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
