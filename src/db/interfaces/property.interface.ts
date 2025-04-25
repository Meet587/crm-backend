import { JwtPayload } from '../../auth/strategy/jwt-payload.interface';
import { PaginatedResult } from '../../helpers/pagination/pagination.interface';
import { FilterPropertyReqDto } from '../../property-management/dtos/filter-property-req.dto';
import { PropertyEntity } from '../entities/property.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface PropertyRepositoryInterface
  extends BaseInterfaceRepository<PropertyEntity> {
  getClientListWithFilters(
    user: JwtPayload,
    filterDto: FilterPropertyReqDto,
  ): Promise<PaginatedResult<PropertyEntity>>;
}
