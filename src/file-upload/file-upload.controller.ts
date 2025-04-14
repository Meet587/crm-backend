import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { PropertyImageEntity } from '../db/entities/property-image.entity';
import { ApiFile } from '../helpers/image-body.decorator';
import { multerConfig } from '../helpers/multer';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
@ApiTags('File Upload Management')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiFile()
  @Post('image/:propertyId/upload')
  @ApiParam({
    name: 'propertyId',
    description: 'property id',
  })
  @ApiOperation({ summary: 'Upload multiple images' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Images uploaded successfully',
  })
  @UseInterceptors(FilesInterceptor('images', 3, multerConfig))
  async uploadImages(
    @Param('propertyId', ParseIntPipe) propertyId: number,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return await this.fileUploadService.uploadImages(propertyId, images);
  }

  @Delete('/:imageId/delete')
  @ApiParam({
    name: 'imageId',
    description: 'delete image by image id',
  })
  @ApiOperation({ summary: 'delete image by image id' })
  @ApiResponse({
    status: 201,
    description: 'Image deleted successfully',
  })
  async deleteImageById(@Param('imageId', ParseIntPipe) imageId: number) {
    return await this.fileUploadService.deleteImageById(imageId);
  }

  @Delete('/:propertyId/delete-by-pid')
  @ApiParam({
    name: 'propertyId',
    description: 'delete image by property id',
  })
  @ApiOperation({ summary: 'delete image by property id' })
  @ApiResponse({
    status: 201,
    description: 'Images deleted successfully',
  })
  async deleteImageByProperty(
    @Param('propertyId', ParseIntPipe) propertyId: number,
  ) {
    return await this.fileUploadService.deleteImageByProperty(propertyId);
  }

  @Get('/:propertyId/get-images')
  @ApiParam({
    name: 'propertyId',
    description: 'get image by property id',
  })
  @ApiOperation({ summary: 'fetch image by property id' })
  @ApiResponse({
    status: 201,
    description: 'Images fetched successfully',
    type: PropertyImageEntity,
    isArray: true,
  })
  async getImagesByPropertyId(@Param('propertyId') propertyId: number) {
    return await this.fileUploadService.getImagesByPropertyId(propertyId);
  }
}
