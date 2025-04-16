import { CommissionEntity } from '../entities/commission.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface CommissionRepositoryInterface
  extends BaseInterfaceRepository<CommissionEntity> {}
