import { Test, TestingModule } from '@nestjs/testing';
import { SiteVisitsController } from './site-visits.controller';
import { SiteVisitsService } from './site-visits.service';

describe('SiteVisitsController', () => {
  let controller: SiteVisitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteVisitsController],
      providers: [SiteVisitsService],
    }).compile();

    controller = module.get<SiteVisitsController>(SiteVisitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
