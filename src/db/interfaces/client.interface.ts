import { FilterLeadReqDto } from '../../client-management/dtos/filter-lead-req.dto';
import { ClientsEntity } from '../entities/client.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ClientRepositoryInterface
  extends BaseInterfaceRepository<ClientsEntity> {
  getClientsWithFilters(filterLeadReqDto: FilterLeadReqDto);
}
