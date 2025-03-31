import { FollowUpEntity } from 'src/db/entities/follow-up.entity';
import { BaseInterfacerepository } from 'src/db/repositories/base/base.interface.repository';
import { FollowUpFilterReqDto } from 'src/follow-ups/dtos/follow-up-filter-req.dto';

export interface FollowUpRepositoryInterface
  extends BaseInterfacerepository<FollowUpEntity> {
  getAllFollowUpsByFileter(followUpFilterReqDto: FollowUpFilterReqDto);
}
