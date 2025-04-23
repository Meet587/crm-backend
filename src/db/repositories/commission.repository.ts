import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { FilterCommissionsReqDto } from '../../commissions/dtos/filter-commission-req.dto';
import { CommissionEntity } from '../entities/commission.entity';
import { CommissionRepositoryInterface } from '../interfaces/commission.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class CommissionRepository
  extends BaseAbstractRepository<CommissionEntity>
  implements CommissionRepositoryInterface
{
  constructor(
    @InjectRepository(CommissionEntity)
    private readonly commissionRepository: Repository<CommissionEntity>,
  ) {
    super(commissionRepository);
  }
  async getCommissionsListWithFilters(
    filterCommissionsReqDto: FilterCommissionsReqDto,
  ) {
    try {
      const whereClause: FindManyOptions<CommissionEntity> = {};

      if (filterCommissionsReqDto.status) {
        whereClause.where = {
          ...whereClause.where,
          status: filterCommissionsReqDto.status,
        };
      }
      if (filterCommissionsReqDto.payout_date) {
        whereClause.where = {
          ...whereClause.where,
          payout_date: filterCommissionsReqDto.payout_date,
        };
      }
      if (filterCommissionsReqDto.builder_id) {
        whereClause.where = {
          ...whereClause.where,
          builder_id: filterCommissionsReqDto.builder_id,
        };
      }

      return await this.commissionRepository.find(whereClause);
    } catch (error) {
      console.error('error while fetching commissions list', error);
      throw error;
    }
  }
}
