import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPropertyResDto } from './dtos/get-property-res.dto';
import { LocationService } from 'src/property-managment/location.service';
import { CreateLocationReqDto } from 'src/property-managment/dtos/create-location-req.dto';
import { CreateAreaReqDto } from 'src/property-managment/dtos/create-area-req.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('location')
@ApiTags('Locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('list')
  @ApiOperation({ description: 'get location list' })
  @ApiResponse({ type: GetPropertyResDto })
  async getProperty(): Promise<any> {
    return await this.locationService.getAllLocations();
  }

  @Post('create')
  @ApiOperation({ description: 'add location' })
  async addproperty(@Body() body: CreateLocationReqDto) {
    return await this.locationService.addLocation(body);
  }

  @Get('area/list')
  @ApiOperation({ description: 'get location list' })
  @ApiResponse({ type: GetPropertyResDto })
  async getAllAreas(): Promise<any> {
    return await this.locationService.getAllAreas();
  }

  @Get('area/:location_id')
  @ApiParam({
    name: 'location_id',
    type: Number,
    required: true,
  })
  @ApiOperation({ description: 'get location list' })
  @ApiResponse({ type: GetPropertyResDto })
  async getAreasByLocation(
    @Param('location_id', ParseIntPipe) location_id: number,
  ): Promise<any> {
    return await this.locationService.getAreasByLocation(location_id);
  }

  @Post('area/create')
  @ApiOperation({ description: 'add location' })
  async addArea(@Body() body: CreateAreaReqDto) {
    return await this.locationService.addArea(body);
  }
}
