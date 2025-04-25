import { FilterLeadReqDto } from '../../client-management/dtos/filter-lead-req.dto';
import { PaginatedResult } from '../../helpers/pagination/pagination.interface';
import { ClientsEntity } from '../entities/client.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ClientRepositoryInterface
  extends BaseInterfaceRepository<ClientsEntity> {
  // getClientsWithFilters(filterLeadReqDto: FilterLeadReqDto);
  getClientListWithFilters(
    filterDto: FilterLeadReqDto,
  ): Promise<PaginatedResult<ClientsEntity>>;
}
