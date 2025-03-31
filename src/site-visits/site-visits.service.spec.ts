import { Test, TestingModule } from '@nestjs/testing';
import { SiteVisitsService } from './site-visits.service';

describe('SiteVisitsService', () => {
  let service: SiteVisitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteVisitsService],
    }).compile();

    service = module.get<SiteVisitsService>(SiteVisitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
