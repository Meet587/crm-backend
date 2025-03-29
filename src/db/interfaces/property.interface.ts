import { PropertyEntity } from 'src/db/entities/property.entity';
import { BaseInterfacerepository } from '../repositories/base/base.interface.repository';

export interface PropertyRepositoryInterface
  extends BaseInterfacerepository<PropertyEntity> {}
