import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientManagementService } from './client-management.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateClientRequestDto } from 'src/client-management/dtos/create-client-req.dto';
import { UpdateLeadStatusReqDto } from 'src/client-management/dtos/update-lead-status-req.dto';
import { AssignClientToAgentReqDto } from 'src/client-management/dtos/assign-client-to-agent-req.dto';
import { AddPropertyInterestReqDto } from 'src/client-management/dtos/add-property-interest.det';
import { UpdateClientRequestDto } from 'src/client-management/dtos/update-client-details-req.dto';
import { CacheControl } from 'src/helpers/cache.decorator';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@Controller('client-management')
@ApiTags('Client Management')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClientManagementController {
  constructor(
    private readonly clientManagementService: ClientManagementService,
  ) {}

  @Get('get-client-list')
  @CacheControl(300)
  @ApiOperation({
    operationId: 'getClientList',
    description: 'client list',
  })
  async getClientList() {
    const client = await this.clientManagementService.getClientList();
    return {
      list: client,
    };
  }

  @Get('/:clientId/profile')
  // @CacheControl(300)
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
