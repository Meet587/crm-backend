import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategy/jwt-payload.interface';
import { UserRole } from 'src/db/entities/user.entity';
import { PropertyRepository } from 'src/db/repositories/property.repository';
import { AddPropertyReqDto } from 'src/property-management/dtos/add-property-req.dto';
import { AssignPropertyTo } from 'src/property-management/dtos/assign-property-req.dto';
import { UserService } from 'src/users/users.service';
import { FindManyOptions, In } from 'typeorm';
import { PropertyEntity } from 'src/db/entities/property.entity';
import { UpdatePropertyReqDto } from './dtos/update-property-req.dto';

@Injectable()
export class PropertyManagementService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject('propertyRepositoryInterface')
    private readonly propertyRepository: PropertyRepository,
    private readonly userService: UserService,
  ) {}

  async getAllProperties(): Promise<any> {
    try {
      const payload = this.request.user as JwtPayload;

      if (!payload) {
        throw new BadRequestException('provide payload getAllProperties.');
      }

      const whereClaus: FindManyOptions<PropertyEntity> = {};
      if (payload.role === UserRole.ADMIN) {
        whereClaus.relations = { agent: true, images: true };
        whereClaus.select = ['agent', 'area'];
      } else if (payload.role === UserRole.RM) {
        whereClaus.where = {
          assignTo: payload.id,
        };
        whereClaus.relations = { agent: false, images: true };
      }

      const list = await this.propertyRepository.findWithRelations(whereClaus);
      list.forEach((obj) => {
        if (obj?.agent) {
          delete obj.agent.password;
        }
        if (obj?.images.length !== 0)
          obj.thumbnail_url = obj.images[0].secure_url;
      });
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
        relations: { agent: true },
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
