import { Test, TestingModule } from '@nestjs/testing';
import { FollowUpsController } from './follow-ups.controller';
import { FollowUpsService } from './follow-ups.service';

describe('FollowUpsController', () => {
  let controller: FollowUpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowUpsController],
      providers: [FollowUpsService],
    }).compile();

    controller = module.get<FollowUpsController>(FollowUpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
