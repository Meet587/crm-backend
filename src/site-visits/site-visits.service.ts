import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSiteVisitReqDto } from 'src/site-visits/dtos/create-site-visit-req.dto';
import { SiteVisitFilterReqDto } from 'src/site-visits/dtos/site-visit-filter-req.dto';
import { UpdateSiteVisitReqDto } from 'src/site-visits/dtos/update-site-visit-req.dto';
import { JwtPayload } from '../auth/strategy/jwt-payload.interface';
import { SiteVisitRepositoryInterface } from '../db/interfaces/site-visit.interface';

@Injectable()
export class SiteVisitsService {
  constructor(
    @Inject('siteVisitRepositoryInterface')
    private readonly siteVisitRepository: SiteVisitRepositoryInterface,
  ) {}

  async getAllSiteVisitsWithFilters(
    siteVisitFilterReqDto: SiteVisitFilterReqDto,
  ) {
    try {
      return await this.siteVisitRepository.getAllSiteVisitsByFilter(
        siteVisitFilterReqDto,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createSiteVisit(
    payload: JwtPayload,
    createSiteVisitReqDto: CreateSiteVisitReqDto,
  ) {
    try {
      if (!payload) {
        throw new UnauthorizedException();
      }
      const obj = {
        ...createSiteVisitReqDto,
        agentId: payload.id,
      };
      await this.siteVisitRepository.save(obj);
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
