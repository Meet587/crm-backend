import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from 'src/auth/strategy/jwt-payload.interface';
import { AddPropertyReqDto } from 'src/property-management/dtos/add-property-req.dto';
import { AssignPropertyTo } from 'src/property-management/dtos/assign-property-req.dto';
import { UserService } from 'src/users/users.service';
import { In } from 'typeorm';
import { PropertyRepositoryInterface } from '../db/interfaces/property.interface';
import { FilterPropertyReqDto } from './dtos/filter-property-req.dto';
import { UpdatePropertyReqDto } from './dtos/update-property-req.dto';

@Injectable()
export class PropertyManagementService {
  constructor(
    @Inject('propertyRepositoryInterface')
    private readonly propertyRepository: PropertyRepositoryInterface,
    private readonly userService: UserService,
  ) {}

  async getAllProperties(
    user: JwtPayload,
    filterPropertyReqDto: FilterPropertyReqDto,
  ): Promise<any> {
    try {
      const list = await this.propertyRepository.getClientListWithFilters(
        user,
        filterPropertyReqDto,
      );
      // list.forEach((obj) => {
      //   if (obj?.agent) {
      //     delete obj.agent.password;
      //   }
      //   if (obj?.images.length !== 0)
      //     obj.thumbnail_url = obj.images[0].secure_url;
      // });
      return list;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPropertyById(id: number) {
    try {
      const property = await this.propertyRepository.findByCondition({
        where: { id },
        relations: { agent: true, images: true },
      });

      if (!property) {
        throw new NotFoundException('property not found.');
      }
      delete property?.agent?.password;

      return property;
    } catch (error) {
      throw error;
    }
  }

  async addProperty(addPropertyReqDto: AddPropertyReqDto) {
    try {
      return await this.propertyRepository.save(addPropertyReqDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const property = await this.propertyRepository.findOneById(id);
      if (!property) {
        throw new NotFoundException('Property not found for this id.');
      }
      return property;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async assignTo(assignPropertyTo: AssignPropertyTo) {
    try {
      const user = await this.userService.findById(assignPropertyTo.agentId);

      const property = await this.findById(assignPropertyTo.propertyId);

      property.assignTo = user.id;
      await this.propertyRepository.save(property);
      return { message: 'property assign.' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePropertyDetails(
    id: number,
    updatePropertyReqDto: UpdatePropertyReqDto,
  ) {
    try {
      const property = await this.findById(id);
      const updated = {
        ...property,
        ...updatePropertyReqDto,
      };
      return await this.propertyRepository.save(updated);
    } catch (error) {
      throw error;
    }
  }

  async findByPropertyIds(ids: number[]) {
    try {
      return await this.propertyRepository.findAll({
        where: { id: In(ids) },
        relations: {
          location: true,
          area: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
