import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFollowUpReqDto } from 'src/follow-ups/dtos/create-follow-up-req.dto';
import { FollowUpFilterReqDto } from 'src/follow-ups/dtos/follow-up-filter-req.dto';
import { UpdateFollowUpReqDto } from 'src/follow-ups/dtos/update-follow-up-req.dto';
import { JwtPayload } from '../auth/strategy/jwt-payload.interface';
import { FollowUpRepositoryInterface } from '../db/interfaces/follow-up.interface';

@Injectable()
export class FollowUpsService {
  constructor(
    // @Inject(REQUEST) private request: Request,
    @Inject('followUpRepositoryInterface')
    private readonly followUpRepository: FollowUpRepositoryInterface,
  ) {}

  async getAllFollowUpsWithFilter(followUpFilterReqDto: FollowUpFilterReqDto) {
    try {
      return await this.followUpRepository.getAllFollowUpsByFilter(
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

  async createFollowUp(
    payload: JwtPayload,
    createFollowUpReqDto: CreateFollowUpReqDto,
  ) {
    try {
      if (!payload) {
        throw new UnauthorizedException();
      }
      const obj = {
        ...createFollowUpReqDto,
        agentId: payload.id,
      };
      await this.followUpRepository.save(obj);
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
