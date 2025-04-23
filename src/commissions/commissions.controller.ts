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
import { CommissionsService } from './commissions.service';
import { CreateCommissionReqDto } from './dtos/create-commission-req.dto';
import { FilterCommissionsReqDto } from './dtos/filter-commission-req.dto';
import { UpdateCommissionReqDto } from './dtos/update-commission-req.dto';

@Controller('commissions')
@ApiTags('Commission Management')
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @Get('list')
  @ApiOperation({
    description: 'fetch commission list',
    operationId: 'fetchCommissionList',
  })
  async getAllBuilders(
    @Query() filterCommissionsReqDto: FilterCommissionsReqDto,
  ) {
    return await this.commissionsService.getCommissionsList(filterCommissionsReqDto);
  }

  @Post('create')
  @ApiOperation({
    description: 'add new commission details',
    operationId: 'addNewCommission',
  })
  async createBuilder(@Body() createCommissionReqDto: CreateCommissionReqDto) {
    return await this.commissionsService.createCommissionDetails(
      createCommissionReqDto,
    );
  }

  @Put('/:commissionId/update')
  @ApiOperation({
    description: 'update commission details by id',
    operationId: 'updateCommissionById',
  })
  @ApiBody({
    type: CreateCommissionReqDto,
  })
  @ApiParam({
    name: 'commissionId',
    description: 'commission id',
  })
  async updateDeal(
    @Param('commissionId', ParseIntPipe) commissionId: number,
    @Body() updateCommissionReqDto: UpdateCommissionReqDto,
  ) {
    return await this.commissionsService.updateCommissionDetails(
      commissionId,
      updateCommissionReqDto,
    );
  }
}
