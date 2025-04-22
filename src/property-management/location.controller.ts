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
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CreateAreaReqDto } from 'src/property-management/dtos/create-area-req.dto';
import { CreateLocationReqDto } from 'src/property-management/dtos/create-location-req.dto';
import { LocationService } from 'src/property-management/location.service';
import { GetPropertyResDto } from './dtos/get-property-res.dto';

@Controller('location')
@ApiTags('Locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('list')
  @ApiOperation({ description: 'get location list' })
  @ApiResponse({ type: GetPropertyResDto })
  async getAllLocations() {
    return await this.locationService.getAllLocations();
  }

  @Post('create')
  @ApiOperation({ description: 'add location' })
  async addLocation(@Body() body: CreateLocationReqDto) {
    return await this.locationService.addLocation(body);
  }

  @Get('area/list')
  @ApiOperation({ description: 'get location list' })
  @ApiResponse({ type: GetPropertyResDto })
  async getAllAreas() {
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
  ) {
    return await this.locationService.getAreasByLocation(location_id);
  }

  @Post('area/create')
  @ApiOperation({ description: 'add location' })
  async addArea(@Body() body: CreateAreaReqDto) {
    return await this.locationService.addArea(body);
  }
}
