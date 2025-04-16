import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommissionEntity } from '../entities/commission.entity';
import { CommissionRepositoryInterface } from '../interfaces/commission.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class CommissionRepository
  extends BaseAbstractRepository<CommissionEntity>
  implements CommissionRepositoryInterface
{
  constructor(
    @InjectRepository(CommissionEntity)
    private readonly commissionRepository: Repository<CommissionEntity>,
  ) {
    super(commissionRepository);
  }
}
