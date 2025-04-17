import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BuildersEntity } from '../db/entities/builders.entity';
import { BuildersRepositoryInterface } from '../db/interfaces/builders.interface';
import { CreateBuilderReqDto } from './dtos/create-builder-req.dto';
import { UpdateBuildersReqDto } from './dtos/update-builder-req.dto';

@Injectable()
export class BuildersService {
  constructor(
    @Inject('buildersRepositoryInterface')
    private readonly buildersRepository: BuildersRepositoryInterface,
  ) {}

  async getAllBuilders() {
    try {
      return await this.buildersRepository.findAll();
    } catch (error) {
      console.error('error while fetching builders list', error);
      throw error;
    }
  }

  async createBuilder(createBuilderReqDto: CreateBuilderReqDto) {
    try {
      await this.buildersRepository.save(createBuilderReqDto);
      return true;
    } catch (error) {
      console.error('error while creation of builder', error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const builder = await this.buildersRepository.findOneById(id);
      if (!builder) {
        throw new NotFoundException('Builder details not found.');
      }
      return builder;
    } catch (error) {
      console.error('error in finding builders details by id.', error);
      throw error;
    }
  }

  async updateBuilderDetails(
    id: number,
    updateBuildersReqDto: UpdateBuildersReqDto,
  ) {
    try {
      const builder = await this.findById(id);
      const UpdateDetails: BuildersEntity = {
        ...builder,
        ...updateBuildersReqDto,
        id: builder.id,
      };

      await this.buildersRepository.save(UpdateDetails);
      return true;
    } catch (error) {
      console.error('error while updating builder details', error);
      throw error;
    }
  }
}
