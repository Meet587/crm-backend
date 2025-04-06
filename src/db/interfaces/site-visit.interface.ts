import { SiteVisitFilterReqDto } from '../../site-visits/dtos/site-visit-filter-req.dto';
import { SiteVisitEntity } from '../entities/site-visit.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface SiteVisitRepositoryInterface
  extends BaseInterfaceRepository<SiteVisitEntity> {
  getAllSiteVisitsByFilter(siteVisitFilterReqDto: SiteVisitFilterReqDto);
}
