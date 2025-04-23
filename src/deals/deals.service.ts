import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientManagementService } from '../client-management/client-management.service';
import { DealsRepositoryInterface } from '../db/interfaces/deals.interface';
import { PropertyManagementService } from '../property-management/property-management.service';
import { UserService } from '../users/users.service';
import { CreateDealsReqDto } from './dtos/create-deals.req.dto';
import { FilterDealsReqDto } from './dtos/filter-deals-req.sto';
import { UpdateDealsReqDto } from './dtos/update-deal-req.dto';

@Injectable()
export class DealsService {
  constructor(
    @Inject('dealsRepositoryInterface')
    private readonly dealsRepository: DealsRepositoryInterface,
    private readonly propertyManagementService: PropertyManagementService,
    private readonly userService: UserService,
    private readonly clientManagementService: ClientManagementService,
  ) {}

  async getAllDeals(filterDealsReqDto: FilterDealsReqDto) {
    try {
      return await this.dealsRepository.getAllDealsWithFilter(
        filterDealsReqDto,
      );
    } catch (error) {
      console.error('error while fetching deals list', error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const deal = await this.dealsRepository.findOneById(id);
      if (!deal) {
        throw new NotFoundException('Deal details not found');
      }
      return deal;
    } catch (error) {
      console.error('error while fetching deal by id', error);
      throw error;
    }
  }

  async createDeal(createDealsReqDto: CreateDealsReqDto): Promise<Boolean> {
    try {
      await this.clientManagementService.findClientById(
        createDealsReqDto.client_id,
      );
      await this.propertyManagementService.findById(
        createDealsReqDto.property_id,
      );
      await this.userService.findById(createDealsReqDto.agent_id);

      await this.dealsRepository.save(createDealsReqDto);
      return true;
    } catch (error) {
      console.error('error in creation of deal', error);
      throw error;
    }
  }

  async updateDeal(id: number, updateDealsReqDto: UpdateDealsReqDto) {
    try {
      const deal = await this.findById(id);

      if (updateDealsReqDto.deal_stage) {
        deal.deal_stage = updateDealsReqDto.deal_stage;
      }
      if (updateDealsReqDto.finalized_date) {
        deal.finalized_date = updateDealsReqDto.finalized_date;
      }

      await this.dealsRepository.save(deal);
      return true;
    } catch (error) {
      console.error('error in updating deal', error);
      throw error;
    }
  }
}
