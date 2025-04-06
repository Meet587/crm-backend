import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Repository } from 'typeorm';
import { LocationEntity } from '../entities/location.entity';
import { locationRepositoryInterface } from '../interfaces/location.interface';

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
