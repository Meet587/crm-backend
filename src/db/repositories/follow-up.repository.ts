import { InjectRepository } from '@nestjs/typeorm';
import { FollowUpEntity } from 'src/db/entities/follow-up.entity';
import { FollowUpRepositoryInterface } from 'src/db/interfaces/follow-up.interface';
import { BaseAbstractRepository } from 'src/db/repositories/base/base.abstrac.repository';
import { FollowUpFilterReqDto } from 'src/follow-ups/dtos/follow-up-filter-req.dto';
import { FindOneOptions, Repository } from 'typeorm';

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
  async getAllFollowUpsByFileter(followUpFilterReqDto: FollowUpFilterReqDto) {
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
