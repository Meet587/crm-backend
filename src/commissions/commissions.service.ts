import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BuildersService } from '../builders/builders.service';
import { CommissionRepositoryInterface } from '../db/interfaces/commission.interface';
import { DealsService } from '../deals/deals.service';
import { CreateCommissionReqDto } from './dtos/create-commission-req.dto';
import { UpdateCommissionReqDto } from './dtos/update-commission-req.dto';

@Injectable()
export class CommissionsService {
  constructor(
    @Inject('commissionRepositoryInterface')
    private readonly commissionRepository: CommissionRepositoryInterface,
    private readonly buildersService: BuildersService,
    private readonly dealsService: DealsService,
  ) {}

  async getCommissionsList() {
    try {
      return await this.commissionRepository.findAll();
    } catch (error) {
      console.error('error while fetching commissions list', error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const commissionDetails = await this.commissionRepository.findOneById(id);
      if (!commissionDetails) {
        throw new NotFoundException('Commission details not found.');
      }
      return commissionDetails;
    } catch (error) {
      console.error('error while fetching commissions details', error);
      throw error;
    }
  }

  async createCommissionDetails(
    createCommissionReqDto: CreateCommissionReqDto,
  ) {
    try {
      await this.buildersService.findById(createCommissionReqDto.builder_id);
      await this.dealsService.findById(createCommissionReqDto.deal_id);

      await this.commissionRepository.save(createCommissionReqDto);
      return true;
    } catch (error) {
      console.error('error while adding commissions details', error);
      throw error;
    }
  }

  async updateCommissionDetails(
    id: number,
    updateCommissionReqDto: UpdateCommissionReqDto,
  ) {
    try {
      const commissionDetails = await this.findById(id);
      const updatedDetails = {
        ...commissionDetails,
        ...updateCommissionReqDto,
        id: commissionDetails.id,
      };
      await this.commissionRepository.save(updatedDetails);
      return true;
    } catch (error) {
      console.error('error while updating commissions details', error);
      throw error;
    }
  }
}
