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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPropertyResDto } from './dtos/get-property-res.dto';
import { PropertyManagementService } from './property-management.service';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { AddPropertyReqDto } from './dtos/add-property-req.dto';
import { AssignPropertyTo } from './dtos/assign-property-req.dto';
import { UpdatePropertyReqDto } from './dtos/update-property-req.dto';

@Controller('property-management')
@ApiTags('Property Management')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PropertyManagementController {
  constructor(
    private readonly propertyManagementService: PropertyManagementService,
  ) {}

  @Get('list')
  @ApiOperation({ description: 'get property' })
  @ApiResponse({ type: GetPropertyResDto })
  async getProperty(): Promise<GetPropertyResDto[]> {
    return await this.propertyManagementService.getAllProperties();
  }

  @Get(':id')
  @ApiOperation({ description: 'get property by id' })
  @ApiResponse({ type: GetPropertyResDto })
  async getPropertyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetPropertyResDto> {
    return await this.propertyManagementService.getPropertyById(id);
  }

  @Post('create')
  @ApiOperation({ description: 'create property' })
  async addProperty(@Body() body: AddPropertyReqDto) {
    return await this.propertyManagementService.addProperty(body);
  }

  @Patch('assign-to')
  @ApiOperation({ description: 'assign property to agent' })
  async assignTo(@Body() assignPropertyTo: AssignPropertyTo) {
    return await this.propertyManagementService.assignTo(assignPropertyTo);
  }

  @Put('/:id')
  @ApiOperation({ description: 'update property by id' })
  async updatePropertyDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropertyReqDto: UpdatePropertyReqDto,
  ) {
    return await this.propertyManagementService.updatePropertyDetails(
      id,
      updatePropertyReqDto,
    );
  }
}
