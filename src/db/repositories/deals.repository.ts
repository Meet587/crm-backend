import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { FilterDealsReqDto } from '../../deals/dtos/filter-deals-req.sto';
import { DealsEntity } from '../entities/deals.entity';
import { DealsRepositoryInterface } from '../interfaces/deals.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class DealsRepository
  extends BaseAbstractRepository<DealsEntity>
  implements DealsRepositoryInterface
{
  constructor(
    @InjectRepository(DealsEntity)
    private readonly dealsRepository: Repository<DealsEntity>,
  ) {
    super(dealsRepository);
  }
  async getAllDealsWithFilter(filterDealsReqDto: FilterDealsReqDto) {
    try {
      const whereClause: FindManyOptions<DealsEntity> = {
        relations: {
          agent: true,
          client: true,
          commission: true,
          property: { location: true, area: true },
        },
        select: {
          agent: {
            id: true,
            fname: true,
            lname: true,
          },
          client: {
            id: true,
            name: true,
            phoneNumber: true,
            budgetMax: true,
            budgetMin: true,
          },
          property: {
            address: true,
            area: true,
            id: true,
            location: true,
            price: true,
            sqft: true,
          },
        },
      };

      if (filterDealsReqDto.agent_id) {
        whereClause.where = {
          ...whereClause.where,
          agent_id: filterDealsReqDto.agent_id,
        };
      }
      if (filterDealsReqDto.deal_stage) {
        whereClause.where = {
          ...whereClause.where,
          deal_stage: filterDealsReqDto.deal_stage,
        };
      }
      if (filterDealsReqDto.finalized_date) {
        whereClause.where = {
          ...whereClause.where,
          finalized_date: filterDealsReqDto.finalized_date,
        };
      }
      if (filterDealsReqDto.property_id) {
        whereClause.where = {
          ...whereClause.where,
          property_id: filterDealsReqDto.property_id,
        };
      }

      return await this.dealsRepository.find(whereClause);
    } catch (error) {
      console.error('error while fetching deals list', error);
      throw error;
    }
  }
}
