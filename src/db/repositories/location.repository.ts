import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from './base/base.abstrac.repository';
import { Repository } from 'typeorm';
import { LocationEntity } from 'src/db/entities/location.entity';
import { locationRepositoryInterface } from 'src/db/interfaces/location.interface';

export class LocationRepository
  extends BaseAbstractRepository<LocationEntity>
  implements locationRepositoryInterface
{
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {
    super(locationRepository);
  }
}
