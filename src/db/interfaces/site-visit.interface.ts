import { SiteVisitEntity } from 'src/db/entities/site-visit.entity';
import { BaseInterfacerepository } from 'src/db/repositories/base/base.interface.repository';
import { SiteVisitFilterReqDto } from 'src/site-visits/dtos/site-visit-filter-req.dto';

export interface SiteVisitRepositoryInterface
  extends BaseInterfacerepository<SiteVisitEntity> {
  getAllSiteVisitssByFileter(siteVisitFilterReqDto: SiteVisitFilterReqDto);
}
