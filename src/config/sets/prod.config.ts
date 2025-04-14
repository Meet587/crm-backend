import { CommonConfig } from '../interfaces/common-config';

export const prodEnv = (): CommonConfig => ({
  authConfig: {
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_SECRET_EXP,
    RefreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXP,
  },
  serviceConfig: {},
  dbConfig: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbname: process.env.DB_DATABASE,
    synchronize: false,
  },
  cloudinaryConfig: {
    CloudinaryKey: process.env.CLOUDINARY_CLOUD_NAME,
    CloudinarySecret: process.env.CLOUDINARY_API_KEY,
    CloudinaryCloudName: process.env.CLOUDINARY_API_SECRET,
  },
});
