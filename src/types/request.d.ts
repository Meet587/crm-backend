import { Request } from 'express';
import { JwtPayload } from '../auth/strategy/jwt-payload.interface';

declare module 'express' {
  export interface Request {
    user?: JwtPayload;
  }
}
