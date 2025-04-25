import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { FilterLeadReqDto } from '../../client-management/dtos/filter-lead-req.dto';
import { PaginatedResult } from '../../helpers/pagination/pagination.interface';
import { ClientsEntity } from '../entities/client.entity';
import { ClientRepositoryInterface } from './../interfaces/client.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class ClientRepository
  extends BaseAbstractRepository<ClientsEntity>
  implements ClientRepositoryInterface
{
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientRepository: Repository<ClientsEntity>,
  ) {
    super(clientRepository);
  }

  buildLeadFilters(
    filterDto: FilterLeadReqDto,
  ): FindManyOptions<ClientsEntity> {
    const options: FindManyOptions<ClientsEntity> = {
      order: { id: 'ASC' },
    };

    const whereConditions: FindOptionsWhere<ClientsEntity> = {};

    if (filterDto.interestType) {
      whereConditions.interestType = filterDto.interestType;
    }

    if (filterDto.status) {
      whereConditions.leadStatus = filterDto.status;
    }

    if (filterDto.agentAssign && filterDto.agentAssign !== 0) {
      whereConditions.agentId = filterDto.agentAssign;
    }

    if (Object.keys(whereConditions).length > 0) {
      options.where = whereConditions;
    }

    return options;
  }

  async getClientListWithFilters(
    filterDto: FilterLeadReqDto,
  ): Promise<PaginatedResult<ClientsEntity>> {
    const filterOptions = this.buildLeadFilters(filterDto);

    return await this.findWithFiltersAndPaginate(
      {
        page: filterDto.page,
        limit: filterDto.limit,
      },
      filterOptions,
    );
  }
}
