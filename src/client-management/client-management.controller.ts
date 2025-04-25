import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { UserRole } from '../db/entities/user.entity';
import { CacheControl } from '../helpers/cache.decorator';
import { ClientManagementService } from './client-management.service';
import { AddPropertyInterestReqDto } from './dtos/add-property-interest.det';
import { AssignClientToAgentReqDto } from './dtos/assign-client-to-agent-req.dto';
import { CreateClientRequestDto } from './dtos/create-client-req.dto';
import { FilterLeadReqDto } from './dtos/filter-lead-req.dto';
import { ClientPaginationResponseDto } from './dtos/get-client-list-res.dto';
import { UpdateClientRequestDto } from './dtos/update-client-details-req.dto';
import { UpdateLeadStatusReqDto } from './dtos/update-lead-status-req.dto';

@Controller('client-management')
@ApiTags('Client Management')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@CacheControl(500)
export class ClientManagementController {
  constructor(
    private readonly clientManagementService: ClientManagementService,
  ) {}

  @Get('get-client-list')
  @ApiOperation({
    operationId: 'getClientList',
    description: 'client list',
  })
  @ApiResponse({ type: ClientPaginationResponseDto })
  async getClientList(
    @Query() filterLeadReqDto: FilterLeadReqDto,
    @Req() request: Request,
  ) {
    if (request.user && request.user.role !== UserRole.ADMIN) {
      filterLeadReqDto.agentAssign = request.user.id;
    }
    return await this.clientManagementService.getClientList(filterLeadReqDto);
  }

  @Get('/:clientId/profile')
  @ApiOperation({
    operationId: 'getClientProfileById',
    description: 'get client profile by id',
  })
  async clientDetails(@Param('clientId', ParseIntPipe) clientId: number) {
    return await this.clientManagementService.clientDetails(clientId);
  }

  @Post('create-client')
  @ApiOperation({
    operationId: 'createClient',
    description: 'create new client or lead',
  })
  createClient(@Body() createClientRequestDto: CreateClientRequestDto) {
    return this.clientManagementService.createClient(createClientRequestDto);
  }

  @Put('/:clientId/update')
  @ApiParam({
    name: 'clientId',
    description: 'client id',
    required: true,
  })
  @ApiOperation({
    operationId: 'updateClient',
    description: 'update clients details',
  })
  updateClient(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() updateClientRequestDto: UpdateClientRequestDto,
  ) {
    return this.clientManagementService.updateClient(
      clientId,
      updateClientRequestDto,
    );
  }

  @Patch('/:clientId/change-lead-status')
  @ApiParam({
    name: 'clientId',
    description: 'client id',
    required: true,
  })
  @ApiBody({
    type: UpdateLeadStatusReqDto,
    description: 'status',
    required: true,
  })
  updateClientLeadStatusById(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() updateLeadStatusReqDto: UpdateLeadStatusReqDto,
  ) {
    return this.clientManagementService.updateClientLeadStatusById(
      clientId,
      updateLeadStatusReqDto,
    );
  }

  @Patch('assign-client-to-agent')
  @ApiBody({
    type: AssignClientToAgentReqDto,
    required: true,
  })
  assignClientToAgent(
    @Body() assignClientToAgentReqDto: AssignClientToAgentReqDto,
  ) {
    return this.clientManagementService.assignClientToAgent(
      assignClientToAgentReqDto,
    );
  }

  @Patch('/:clientId/interested-properties')
  @ApiBody({
    type: AddPropertyInterestReqDto,
    required: true,
  })
  @ApiParam({
    name: 'clientId',
    description: 'client id',
    required: true,
  })
  addPropertyInterest(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() addPropertyInterestReqDto: AddPropertyInterestReqDto,
  ) {
    return this.clientManagementService.addPropertyInterest(
      clientId,
      addPropertyInterestReqDto.propertyIds,
    );
  }
}
