import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function userAgent(req: Request, res: Response, next: NextFunction) {
  const us = req.headers['user-agent'];
  console.log(us);
  res.json({ success: true });
  //   next();
}

@Injectable()
export class authMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    
    next();
  }
}
