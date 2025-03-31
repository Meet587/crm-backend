import { InjectRepository } from '@nestjs/typeorm';
import { SiteVisitEntity } from 'src/db/entities/site-visit.entity';
import { SiteVisitRepositoryInterface } from 'src/db/interfaces/site-visit.interface';
import { BaseAbstractRepository } from 'src/db/repositories/base/base.abstrac.repository';
import { SiteVisitFilterReqDto } from 'src/site-visits/dtos/site-visit-filter-req.dto';
import { FindOneOptions, Repository } from 'typeorm';

export class SiteVisitRepository
  extends BaseAbstractRepository<SiteVisitEntity>
  implements SiteVisitRepositoryInterface
{
  constructor(
    @InjectRepository(SiteVisitEntity)
    private readonly siteVisitRepository: Repository<SiteVisitEntity>,
  ) {
    super(siteVisitRepository);
  }

  async getAllSiteVisitssByFileter(
    siteVisitFilterReqDto: SiteVisitFilterReqDto,
  ) {
    try {
      const whereClause: FindOneOptions<SiteVisitEntity> = {};
      if (siteVisitFilterReqDto.clientId) {
        whereClause.where = {
          ...whereClause.where,
          clientId: siteVisitFilterReqDto.clientId,
        };
      }
      if (siteVisitFilterReqDto.agentId) {
        whereClause.where = {
          ...whereClause.where,
          agentId: siteVisitFilterReqDto.agentId,
        };
      }
      if (siteVisitFilterReqDto.scheduledDate) {
        whereClause.where = {
          ...whereClause.where,
          scheduledDate: siteVisitFilterReqDto.scheduledDate,
        };
      }
      if (siteVisitFilterReqDto.status) {
        whereClause.where = {
          ...whereClause.where,
          status: siteVisitFilterReqDto.status,
        };
      }

      return await this.siteVisitRepository.find(whereClause);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
