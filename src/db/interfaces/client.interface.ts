import { ClientsEntity } from 'src/db/entities/client.entity';
import { BaseInterfacerepository } from 'src/db/repositories/base/base.interface.repository';

export interface ClientRepositoryInterface
  extends BaseInterfacerepository<ClientsEntity> {}
