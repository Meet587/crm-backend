import { LocationEntity } from '../entities/location.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface locationRepositoryInterface
  extends BaseInterfaceRepository<LocationEntity> {}
