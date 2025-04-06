import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Repository } from 'typeorm';
import { AreaEntity } from '../entities/area.entity';
import { AreaRepositoryInterface } from '../interfaces/area.interface';

export class AreaRepository
  extends BaseAbstractRepository<AreaEntity>
  implements AreaRepositoryInterface
{
  constructor(
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>,
  ) {
    super(areaRepository);
  }
}
