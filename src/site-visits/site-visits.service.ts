import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SiteVisitRepository } from 'src/db/repositories/site-visit.repository';
import { CreateSiteVisitReqDto } from 'src/site-visits/dtos/create-site-visit-req.dto';
import { SiteVisitFilterReqDto } from 'src/site-visits/dtos/site-visit-filter-req.dto';
import { UpdateSiteVisitReqDto } from 'src/site-visits/dtos/update-site-visit-req.dto';

@Injectable()
export class SiteVisitsService {
  constructor(
    @Inject('siteVisitRepositoryInterface')
    private readonly siteVisitRepository: SiteVisitRepository,
  ) {}

  async getAllSiteVisitesWithFilters(
    siteVisitFilterReqDto: SiteVisitFilterReqDto,
  ) {
    try {
      return await this.siteVisitRepository.getAllSiteVisitssByFileter(
        siteVisitFilterReqDto,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createSiteVisit(createSiteVisitReqDto: CreateSiteVisitReqDto) {
    try {
      await this.siteVisitRepository.save(createSiteVisitReqDto);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateSiteVisit(
    id: number,
    UpdateSiteVisitReqDto: UpdateSiteVisitReqDto,
  ) {
    try {
      const data = await this.findById(id);
      const updated = {
        ...data,
        ...UpdateSiteVisitReqDto,
      };
      await this.siteVisitRepository.save(updated);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const data = await this.siteVisitRepository.findOneById(id);
      if (!data) {
        throw new NotFoundException('site visit data not found.');
      }
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
