import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from './base/base.abstrac.repository';
import { Repository } from 'typeorm';
import { AreaEntity } from 'src/db/entities/area.entity';
import { AreaRepositoryInterface } from 'src/db/interfaces/area.interface';

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
