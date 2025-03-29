import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from './base/base.abstrac.repository';
import { Repository } from 'typeorm';
import { PropertyRepositoryInterface } from 'src/db/interfaces/property.interface';
import { PropertyEntity } from 'src/db/entities/property.entity';

export class PropertyRepository
  extends BaseAbstractRepository<PropertyEntity>
  implements PropertyRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {
    super(propertyRepository);
  }
}
