import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SiteVisitsService } from './site-visits.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SiteVisitFilterReqDto } from 'src/site-visits/dtos/site-visit-filter-req.dto';
import { CreateSiteVisitReqDto } from 'src/site-visits/dtos/create-site-visit-req.dto';
import { UpdateSiteVisitReqDto } from 'src/site-visits/dtos/update-site-visit-req.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@Controller('site-visits')
@ApiTags('Site Visits')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SiteVisitsController {
  constructor(private readonly siteVisitsService: SiteVisitsService) {}

  @Get('list')
  getAllSiteVisitsWithFilters(
    @Query() siteVisitFilterReqDto: SiteVisitFilterReqDto,
  ) {
    return this.siteVisitsService.getAllSiteVisitsWithFilters(
      siteVisitFilterReqDto,
    );
  }

  @Post('create')
  createSiteVisit(
    @Request() request,
    @Body() createSiteVisitReqDto: CreateSiteVisitReqDto,
  ) {
    return this.siteVisitsService.createSiteVisit(
      request?.user,
      createSiteVisitReqDto,
    );
  }

  @Put('/:id/update')
  updateSiteVisit(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateSiteVisitReqDto: UpdateSiteVisitReqDto,
  ) {
    return this.siteVisitsService.updateSiteVisit(id, UpdateSiteVisitReqDto);
  }
}
