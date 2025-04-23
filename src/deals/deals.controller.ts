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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DealsService } from './deals.service';
import { CreateDealsReqDto } from './dtos/create-deals.req.dto';
import { FilterDealsReqDto } from './dtos/filter-deals-req.sto';
import { UpdateDealsReqDto } from './dtos/update-deal-req.dto';

@Controller('deals')
@ApiTags('Deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('list')
  @ApiOperation({
    description: 'fetch deals list',
    operationId: 'fetchDealsList',
  })
  async getAllDeals(@Query() filterDealsReqDto: FilterDealsReqDto) {
    return await this.dealsService.getAllDeals(filterDealsReqDto);
  }

  @Post('create')
  @ApiOperation({
    description: 'add new deal',
    operationId: 'addNewDeal',
  })
  async createDeal(@Body() createDealsReqDto: CreateDealsReqDto) {
    return await this.dealsService.createDeal(createDealsReqDto);
  }

  @Put('/:dealId/update')
  @ApiOperation({
    description: 'update deal by id',
    operationId: 'updateDealById',
  })
  @ApiBody({
    type: CreateDealsReqDto,
  })
  @ApiParam({
    name: 'dealId',
    description: 'deal id',
  })
  async updateDeal(
    @Param('dealId', ParseIntPipe) dealId: number,
    @Body() updateDealsReqDto: UpdateDealsReqDto,
  ) {
    return await this.dealsService.updateDeal(dealId, updateDealsReqDto);
  }
}
