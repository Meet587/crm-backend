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
import { FollowUpsService } from './follow-ups.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FollowUpFilterReqDto } from 'src/follow-ups/dtos/follow-up-filter-req.dto';
import { CreateFollowUpReqDto } from 'src/follow-ups/dtos/create-follow-up-req.dto';
import { UpdateFollowUpReqDto } from 'src/follow-ups/dtos/update-follow-up-req.dto';

@Controller('follow-ups')
@ApiTags('Follow Ups')
export class FollowUpsController {
  constructor(private readonly followUpsService: FollowUpsService) {}

  @Get('list')
  @ApiOperation({
    description: 'get follow list with filters',
    operationId: 'getAllFollowUpsWithFileter',
  })
  getAllFollowUpsWithFileter(
    @Query() followUpFilterReqDto: FollowUpFilterReqDto,
  ) {
    return this.followUpsService.getAllFollowUpsWithFileter(
      followUpFilterReqDto,
    );
  }

  @Post('create')
  createFollowUp(@Body() createFollowUpReqDto: CreateFollowUpReqDto) {
    return this.followUpsService.createFollowUp(createFollowUpReqDto);
  }

  @Put('/:id/update')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'follow up id',
  })
  updateFollowUp(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFollowUpReqDto: UpdateFollowUpReqDto,
  ) {
    return this.followUpsService.updateFollowUp(id, updateFollowUpReqDto);
  }
}
