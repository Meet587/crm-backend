import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientManagmentService } from './client-managment.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateClientRequestDto } from 'src/client-managment/dtos/create-client-req.dto';
import { UpdateLeadStatusReqDto } from 'src/client-managment/dtos/update-lead-status-req.dto';
import { AssignClientToAgentReqDto } from 'src/client-managment/dtos/assign-client-to-agent-req.dto';
import { AddPropertyInterestReqDto } from 'src/client-managment/dtos/add-property-interest.det';

@Controller('client-managment')
@ApiTags('Client Managment')
export class ClientManagmentController {
  constructor(
    private readonly clientManagmentService: ClientManagmentService,
  ) {}

  @Get('get-client-list')
  @ApiOperation({
    operationId: 'getClientList',
    description: 'client list',
  })
  async getClientList() {
    const client = await this.clientManagmentService.getClientList();
    return {
      list: client,
    };
  }

  @Post('create-client')
  @ApiOperation({
    operationId: 'createClient',
    description: 'create new client or lead',
  })
  createClient(@Body() createClientRequestDto: CreateClientRequestDto) {
    return this.clientManagmentService.createClient(createClientRequestDto);
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
    return this.clientManagmentService.updateClientLeadStatusById(
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
    return this.clientManagmentService.assignClientToAgent(
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
  addPropertyIntrest(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() addPropertyInterestReqDto: AddPropertyInterestReqDto,
  ) {
    return this.clientManagmentService.addPropertyIntrest(
      clientId,
      addPropertyInterestReqDto.propertyIds,
    );
  }
}
