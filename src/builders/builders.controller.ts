import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BuildersService } from './builders.service';
import { CreateBuilderReqDto } from './dtos/create-builder-req.dto';
import { UpdateBuildersReqDto } from './dtos/update-builder-req.dto';

@Controller('builders')
export class BuildersController {
  constructor(private readonly buildersService: BuildersService) {}

  @Get('list')
  @ApiOperation({
    description: 'fetch builders list',
    operationId: 'fetchBuildersList',
  })
  async getAllBuilders() {
    return await this.buildersService.getAllBuilders();
  }

  @Post('create')
  @ApiOperation({
    description: 'add new builder',
    operationId: 'addNewBuilder',
  })
  async createBuilder(@Body() createBuilderReqDto: CreateBuilderReqDto) {
    return await this.buildersService.createBuilder(createBuilderReqDto);
  }

  @Put('/:builderId/update')
  @ApiOperation({
    description: 'update builder by id',
    operationId: 'updateBuilderById',
  })
  @ApiBody({
    type: CreateBuilderReqDto,
  })
  @ApiParam({
    name: 'builderId',
    description: 'builder id',
  })
  async updateDeal(
    @Param('builderId', ParseIntPipe) builderId: number,
    @Body() updateBuildersReqDto: UpdateBuildersReqDto,
  ) {
    return await this.buildersService.updateBuilderDetails(
      builderId,
      updateBuildersReqDto,
    );
  }
}
