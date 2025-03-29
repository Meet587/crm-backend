import { BaseInterfacerepository } from '../repositories/base/base.interface.repository';
import { AreaEntity } from 'src/db/entities/area.entity';

export interface AreaRepositoryInterface
  extends BaseInterfacerepository<AreaEntity> {}
