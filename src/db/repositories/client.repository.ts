import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { FilterLeadReqDto } from '../../client-management/dtos/filter-lead-req.dto';
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

  async getClientsWithFilters(filterLeadReqDto: FilterLeadReqDto) {
    try {
      const whereClause: FindManyOptions<ClientsEntity> = {
        order: { id: 'ASC' },
      };
      if (filterLeadReqDto.interestType) {
        whereClause.where = {
          ...whereClause.where,
          interestType: filterLeadReqDto.interestType,
        };
      }
      if (filterLeadReqDto.status) {
        whereClause.where = {
          ...whereClause.where,
          leadStatus: filterLeadReqDto.status,
        };
      }
      if (filterLeadReqDto.agentAssign !== 0) {
        whereClause.where = {
          ...whereClause.where,
          agentId: filterLeadReqDto.agentAssign,
        };
      }

      return await this.clientRepository.find(whereClause);
    } catch (error) {
      throw error;
    }
  }
}
