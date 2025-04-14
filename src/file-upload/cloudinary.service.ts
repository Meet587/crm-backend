import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { existsSync, unlinkSync } from 'fs';
import { CloudinaryConfig } from '../config/interfaces/cloudinary.config';

@Injectable()
export class CloudinaryService {
  private readonly cloud_name: string;
  private readonly api_key: string;
  private readonly api_secret: string;

  constructor(private readonly configService: ConfigService) {
    this.cloud_name = this.configService.getOrThrow<CloudinaryConfig>(
      'environment.cloudinaryConfig',
    ).CloudinaryCloudName;
    this.api_key = this.configService.getOrThrow<CloudinaryConfig>(
      'environment.cloudinaryConfig',
    ).CloudinaryKey;
    this.api_secret = this.configService.getOrThrow<CloudinaryConfig>(
      'environment.cloudinaryConfig',
    ).CloudinarySecret;

    cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    });
  }

  async upload(imagePath: string) {
    try {
      if (!existsSync(imagePath)) {
        throw new NotFoundException('image path not found.');
      }

      const result: UploadApiResponse = await cloudinary.uploader.upload(
        imagePath,
        {
          folder: 'property-test',
        },
        (err: UploadApiErrorResponse, callResult: UploadApiResponse) => {
          unlinkSync(imagePath);
          if (err) {
            throw err;
          }
        },
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteImage(public_id: string) {
    try {
      return await cloudinary.uploader.destroy(public_id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
