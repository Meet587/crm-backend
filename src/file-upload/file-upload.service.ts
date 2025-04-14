import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PropertyImageRepositoryInterface } from '../db/interfaces/property-image.interface';
import { PropertyManagementService } from '../property-management/property-management.service';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class FileUploadService {
  constructor(
    @Inject('propertyImageRepositoryInterface')
    private readonly propertyImageRepository: PropertyImageRepositoryInterface,
    private readonly cloudinaryService: CloudinaryService,
    private readonly propertyManagementService: PropertyManagementService,
  ) {}

  async uploadImages(propertyId: number, images: Array<Express.Multer.File>) {
    try {
      const property =
        await this.propertyManagementService.findById(propertyId);
      for (let i = 0; i < images.length; i++) {
        const ImagePath = path.join(
          process.cwd(),
          'public',
          'uploads',
          images[i].filename,
        );
        const result = await this.cloudinaryService.upload(ImagePath);
        setTimeout(async () => {
          try {
            if (
              fs.existsSync(images[i].destination + '/' + images[i].filename)
            ) {
              fs.unlinkSync(images[i].destination + '/' + images[i].filename);
              console.log('File deleted successfully');
            } else {
              console.log('path not exist');
            }
          } catch (err) {
            console.error('Error deleting file:', err);
          }
        }, 2000);
        const imageRes = {
          asset_id: result.asset_id,
          property_id: property.id,
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        await this.propertyImageRepository.save(imageRes);
      }
      return { message: 'images uploaded successfully.' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteImageById(imageId: number) {
    try {
      const img = await this.propertyImageRepository.findOneById(imageId);
      if (!img) {
        throw new NotFoundException('image data not found.');
      }
      await this.cloudinaryService.deleteImage(img.public_id);
      await this.propertyImageRepository.remove(img);
      return { message: 'images deleted successfully.' };
    } catch (error) {
      console.log('error in image delete');
      throw error;
    }
  }

  async deleteImageByProperty(propertyId: number) {
    try {
      const property =
        await this.propertyManagementService.findById(propertyId);

      const imgs = await this.propertyImageRepository.findAll({
        where: {
          property_id: property.id,
        },
      });

      for (let i = 0; i < imgs.length; i++) {
        await this.cloudinaryService.deleteImage(imgs[i].public_id);
        await this.propertyImageRepository.remove(imgs[i]);
      }

      return true;
    } catch (error) {
      console.log('error in image delete');
      throw error;
    }
  }

  async getImagesByPropertyId(propertyId: number) {
    try {
      if (!propertyId) throw new BadRequestException('property id not found');

      return await this.propertyImageRepository.findAll({
        where: {
          property_id: propertyId,
        },
        select: {
          id: true,
          secure_url: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
