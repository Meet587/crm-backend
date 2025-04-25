import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { JwtPayload } from '../../auth/strategy/jwt-payload.interface';
import { PaginatedResult } from '../../helpers/pagination/pagination.interface';
import { FilterPropertyReqDto } from '../../property-management/dtos/filter-property-req.dto';
import { PropertyEntity } from '../entities/property.entity';
import { UserRole } from '../entities/user.entity';
import { PropertyRepositoryInterface } from '../interfaces/property.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class PropertyRepository
  extends BaseAbstractRepository<PropertyEntity>
  implements PropertyRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {
    super(propertyRepository);
  }

  async getClientListWithFilters(
    user: JwtPayload,
    filterDto: FilterPropertyReqDto,
  ): Promise<PaginatedResult<PropertyEntity>> {
    const options: FindManyOptions<PropertyEntity> = {
      order: { id: 'ASC' },
    };

    const whereConditions: FindOptionsWhere<PropertyEntity> = {};

    if (user?.role === UserRole.ADMIN) {
      options.relations = { agent: true, images: true };
      options.select = {
        area: true,
        agent: {
          id: true,
          email: true,
          phoneNumber: true,
          role: true,
          createdAt: true,
        },
      };
    } else if (user?.role === UserRole.RM) {
      whereConditions.assignTo = user.id;
      options.relations = { agent: false, images: true };
    }

    if (filterDto.area_id) {
      whereConditions.area_id = filterDto.area_id;
    }

    if (filterDto.status) {
      whereConditions.status = filterDto.status;
    }
    if (filterDto.agent_id) {
      whereConditions.assignTo = filterDto.agent_id;
    }
    if (filterDto.bathrooms) {
      whereConditions.bathrooms = MoreThanOrEqual(filterDto.bathrooms);
    }
    if (filterDto.bedrooms) {
      whereConditions.bedrooms = MoreThanOrEqual(filterDto.bedrooms);
    }
    if (filterDto.location_id) {
      whereConditions.location_id = filterDto.location_id;
    }
    if (filterDto.price) {
      whereConditions.price = LessThanOrEqual(filterDto.price);
    }
    if (filterDto.property_type) {
      whereConditions.property_type = filterDto.property_type;
    }
    if (filterDto.status) {
      whereConditions.status = filterDto.status;
    }
    if (filterDto.year_built) {
      whereConditions.year_built = filterDto.year_built;
    }
    if (filterDto.sqft) {
      whereConditions.sqft = MoreThanOrEqual(filterDto.sqft);
    }

    if (Object.keys(whereConditions).length > 0) {
      options.where = whereConditions;
    }

    return this.findWithFiltersAndPaginate(
      {
        page: filterDto.page,
        limit: filterDto.limit,
      },
      options,
    );
  }
}
