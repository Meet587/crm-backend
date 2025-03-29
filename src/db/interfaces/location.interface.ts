import { BaseInterfacerepository } from '../repositories/base/base.interface.repository';
import { LocationEntity } from 'src/db/entities/location.entity';

export interface locationRepositoryInterface
  extends BaseInterfacerepository<LocationEntity> {}
