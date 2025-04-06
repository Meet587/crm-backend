import { FollowUpFilterReqDto } from '../../follow-ups/dtos/follow-up-filter-req.dto';
import { FollowUpEntity } from '../entities/follow-up.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface FollowUpRepositoryInterface
  extends BaseInterfaceRepository<FollowUpEntity> {
  getAllFollowUpsByFilter(followUpFilterReqDto: FollowUpFilterReqDto);
}
