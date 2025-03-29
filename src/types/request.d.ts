import { Request } from 'express';
import { JwtPayloadType } from 'src/user/dto/jwt-payload.type';

declare module 'express' {
  export interface Request {
    user?: JwtPayloadType;
  }
}
