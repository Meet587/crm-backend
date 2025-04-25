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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { UserRole } from '../db/entities/user.entity';
import { AddPropertyReqDto } from './dtos/add-property-req.dto';
import { AssignPropertyTo } from './dtos/assign-property-req.dto';
import { FilterPropertyReqDto } from './dtos/filter-property-req.dto';
import { GetPropertyResDto } from './dtos/get-property-res.dto';
import { UpdatePropertyReqDto } from './dtos/update-property-req.dto';
import { PropertyManagementService } from './property-management.service';

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
  async getProperty(
    @Query() filterPropertyReqDto: FilterPropertyReqDto,
    @Req() req: Request,
  ): Promise<GetPropertyResDto[]> {
    const user = req?.user;
    user.role = UserRole.RM;
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.propertyManagementService.getAllProperties(
      user,
      filterPropertyReqDto,
    );
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
