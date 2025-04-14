import { InjectRepository } from '@nestjs/typeorm';
import { PropertyImageEntity } from '../entities/property-image.entity';
import { PropertyImageRepositoryInterface } from '../interfaces/property-image.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Repository } from 'typeorm';

export class PropertyImageRepository
  extends BaseAbstractRepository<PropertyImageEntity>
  implements PropertyImageRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyImageEntity)
    private readonly propertyImageRepository: Repository<PropertyImageEntity>,
  ) {
    super(propertyImageRepository);
  }
}
