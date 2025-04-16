import { BuildersEntity } from '../entities/builders.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface BuildersRepositoryInterface
  extends BaseInterfaceRepository<BuildersEntity> {}
