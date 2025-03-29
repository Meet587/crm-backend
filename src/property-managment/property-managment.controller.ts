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
import { PropertyManagmentService } from './property-managment.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddPropertyReqDto } from 'src/property-managment/dtos/add-property-req.dto';
import { GetPropertyResDto } from './dtos/get-property-res.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { AssignProeprtyTo } from 'src/property-managment/dtos/assign-property-req.dto';
import { UpdatePropertyReqDto } from 'src/property-managment/dtos/update-property-req.dto';

@Controller('property-managment')
@ApiTags('Property Managment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PropertyManagmentController {
  constructor(
    private readonly propertyManagmentService: PropertyManagmentService,
  ) {}

  @Get('list')
  @ApiOperation({ description: 'get property' })
  @ApiResponse({ type: GetPropertyResDto })
  async getProperty(): Promise<GetPropertyResDto[]> {
    return await this.propertyManagmentService.getAllProperties();
  }

  @Get(':id')
  @ApiOperation({ description: 'get property by id' })
  @ApiResponse({ type: GetPropertyResDto })
  async getPropertyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetPropertyResDto> {
    return await this.propertyManagmentService.getPropertyById(id);
  }

  @Post('create')
  @ApiOperation({ description: 'create property' })
  async addproperty(@Body() body: AddPropertyReqDto) {
    return await this.propertyManagmentService.addProperty(body);
  }

  @Patch('assign-to')
  @ApiOperation({ description: 'assign property to agent' })
  async assignTo(@Body() assignProeprtyTo: AssignProeprtyTo) {
    return await this.propertyManagmentService.assignTo(assignProeprtyTo);
  }

  @Put('/:id')
  @ApiOperation({ description: 'update property by id' })
  async updatePropertyDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropertyReqDto: UpdatePropertyReqDto,
  ) {
    return await this.propertyManagmentService.updatePropertyDetails(
      id,
      updatePropertyReqDto,
    );
  }
}
