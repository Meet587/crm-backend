import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { FollowUpEntity } from '../entities/follow-up.entity';
import { FollowUpRepositoryInterface } from '../interfaces/follow-up.interface';
import { FollowUpFilterReqDto } from '../../follow-ups/dtos/follow-up-filter-req.dto';

export class FollowUpRepository
  extends BaseAbstractRepository<FollowUpEntity>
  implements FollowUpRepositoryInterface
{
  constructor(
    @InjectRepository(FollowUpEntity)
    private readonly followUpRepository: Repository<FollowUpEntity>,
  ) {
    super(followUpRepository);
  }
  async getAllFollowUpsByFilter(followUpFilterReqDto: FollowUpFilterReqDto) {
    try {
      const whereClause: FindOneOptions<FollowUpEntity> = {};
      if (followUpFilterReqDto.clientId) {
        whereClause.where = {
          ...whereClause.where,
          clientId: followUpFilterReqDto.clientId,
        };
      }
      if (followUpFilterReqDto.agentId) {
        whereClause.where = {
          ...whereClause.where,
          agentId: followUpFilterReqDto.agentId,
        };
      }
      if (followUpFilterReqDto.scheduledDate) {
        whereClause.where = {
          ...whereClause.where,
          scheduledDate: followUpFilterReqDto.scheduledDate,
        };
      }
      if (followUpFilterReqDto.status) {
        whereClause.where = {
          ...whereClause.where,
          status: followUpFilterReqDto.status,
        };
      }

      return await this.followUpRepository.find(whereClause);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
