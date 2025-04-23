import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
