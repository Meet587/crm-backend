import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealsEntity } from '../entities/deals.entity';
import { DealsRepositoryInterface } from '../interfaces/deals.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class DealsRepository
  extends BaseAbstractRepository<DealsEntity>
  implements DealsRepositoryInterface
{
  constructor(
    @InjectRepository(DealsEntity)
    private readonly dealsRepository: Repository<DealsEntity>,
  ) {
    super(dealsRepository);
  }
}
