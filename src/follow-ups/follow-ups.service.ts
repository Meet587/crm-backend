import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FollowUpRepository } from 'src/db/repositories/follow-up.repository';
import { CreateFollowUpReqDto } from 'src/follow-ups/dtos/create-follow-up-req.dto';
import { FollowUpFilterReqDto } from 'src/follow-ups/dtos/follow-up-filter-req.dto';
import { UpdateFollowUpReqDto } from 'src/follow-ups/dtos/update-follow-up-req.dto';

@Injectable()
export class FollowUpsService {
  constructor(
    @Inject('followUpRepositoryInterface')
    private readonly followUpRepository: FollowUpRepository,
  ) {}

  async getAllFollowUpsWithFileter(followUpFilterReqDto: FollowUpFilterReqDto) {
    try {
      return await this.followUpRepository.getAllFollowUpsByFileter(
        followUpFilterReqDto,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFollowUpsByAgentId(agentId: number) {
    try {
      return await this.followUpRepository.findByCondition({
        where: { agentId },
        relations: { agent: true },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFollowUpsByClientId(clientId: number) {
    try {
      return await this.followUpRepository.findByCondition({
        where: { clientId },
        relations: { agent: false },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFollowUpByDate(scheduledDate: Date) {
    try {
      return await this.followUpRepository.findByCondition({
        where: { scheduledDate },
        relations: { agent: false },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createFollowUp(createFollowUpReqDto: CreateFollowUpReqDto) {
    try {
      await this.followUpRepository.save(createFollowUpReqDto);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateFollowUp(id: number, updateFollowUpReqDto: UpdateFollowUpReqDto) {
    try {
      const data = await this.findById(id);

      const updated = {
        ...data,
        ...updateFollowUpReqDto,
      };
      await this.followUpRepository.save(updated);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const data = await this.followUpRepository.findOneById(id);
      if (!data) {
        throw new NotFoundException('follow up data not found.');
      }
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
