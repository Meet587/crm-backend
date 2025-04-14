import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyImageEntity } from '../db/entities/property-image.entity';
import { PropertyImageRepository } from '../db/repositories/property-image.repository';
import { multerConfig } from '../helpers/multer';
import { PropertyManagementModule } from '../property-management/property-management.module';
import { CloudinaryService } from './cloudinary.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [
    MulterModule.register(multerConfig),
    PropertyManagementModule,
    TypeOrmModule.forFeature([PropertyImageEntity]),
  ],
  controllers: [FileUploadController],
  providers: [
    {
      provide: 'propertyImageRepositoryInterface',
      useClass: PropertyImageRepository,
    },
    FileUploadService,
    CloudinaryService,
  ],
})
export class FileUploadModule {}
