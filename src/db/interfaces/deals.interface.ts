import { DealsEntity } from '../entities/deals.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface DealsRepositoryInterface
  extends BaseInterfaceRepository<DealsEntity> {}
