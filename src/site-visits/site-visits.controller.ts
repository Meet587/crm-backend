import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SiteVisitsService } from './site-visits.service';
import { ApiTags } from '@nestjs/swagger';
import { SiteVisitFilterReqDto } from 'src/site-visits/dtos/site-visit-filter-req.dto';
import { CreateSiteVisitReqDto } from 'src/site-visits/dtos/create-site-visit-req.dto';
import { UpdateSiteVisitReqDto } from 'src/site-visits/dtos/update-site-visit-req.dto';

@Controller('site-visits')
@ApiTags('Site Visits')
export class SiteVisitsController {
  constructor(private readonly siteVisitsService: SiteVisitsService) {}

  @Get('list')
  getAllSiteVisitesWithFilters(
    @Query() siteVisitFilterReqDto: SiteVisitFilterReqDto,
  ) {
    return this.siteVisitsService.getAllSiteVisitesWithFilters(
      siteVisitFilterReqDto,
    );
  }

  @Post('create')
  createSiteVisit(@Body() createSiteVisitReqDto: CreateSiteVisitReqDto) {
    return this.siteVisitsService.createSiteVisit(createSiteVisitReqDto);
  }

  @Put('/:id/update')
  updateSiteVisit(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateSiteVisitReqDto: UpdateSiteVisitReqDto,
  ) {
    return this.siteVisitsService.updateSiteVisit(id, UpdateSiteVisitReqDto);
  }
}
