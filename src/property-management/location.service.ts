import {
  Inject,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { LocationEntity } from 'src/db/entities/location.entity';
import { AreaRepository } from 'src/db/repositories/area.repository';
import { LocationRepository } from 'src/db/repositories/location.repository';
import { CreateAreaReqDto } from 'src/property-management/dtos/create-area-req.dto';
import { CreateLocationReqDto } from 'src/property-management/dtos/create-location-req.dto';

export class LocationService {
  constructor(
    @Inject('locationRepositoryInterface')
    private readonly locationRepository: LocationRepository,
    @Inject('areaRepositoryInterface')
    private readonly areaRepository: AreaRepository,
  ) {}

  async getAllLocations() {
    try {
      return await this.locationRepository.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async addLocation(createLocationReqDto: CreateLocationReqDto) {
    try {
      return await this.locationRepository.save(createLocationReqDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllAreas() {
    try {
      return await this.areaRepository.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findLocationById(id: number): Promise<LocationEntity> {
    try {
      const location = await this.locationRepository.findOneById(id);
      if (!location) {
        throw new NotFoundException('location not found for this id.');
      }
      return location;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAreasByLocation(id: number) {
    try {
      const location = await this.findLocationById(id);
      return await this.areaRepository.findAll({
        where: { location_id: location.id },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async addArea(createAreaReqDto: CreateAreaReqDto) {
    try {
      await this.findLocationById(createAreaReqDto.location_id);

      const exist = await this.areaRepository.findByCondition({
        where: {
          location_id: createAreaReqDto.location_id,
          name: createAreaReqDto.name,
        },
      });
      if (exist) {
        throw new NotAcceptableException('area alredy present.');
      }
      return await this.areaRepository.save(createAreaReqDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
