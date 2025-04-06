import { ClientsEntity } from '../entities/client.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ClientRepositoryInterface
  extends BaseInterfaceRepository<ClientsEntity> {}
