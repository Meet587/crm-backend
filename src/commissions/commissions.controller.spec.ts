import { Test, TestingModule } from '@nestjs/testing';
import { CommissionsController } from './commissions.controller';
import { CommissionsService } from './commissions.service';

describe('CommissionsController', () => {
  let controller: CommissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionsController],
      providers: [CommissionsService],
    }).compile();

    controller = module.get<CommissionsController>(CommissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
