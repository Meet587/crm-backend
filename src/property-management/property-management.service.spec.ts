import { Test, TestingModule } from '@nestjs/testing';
import { PropertyManagementService } from './property-management.service';

describe('PropertyManagementService', () => {
  let service: PropertyManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyManagementService],
    }).compile();

    service = module.get<PropertyManagementService>(PropertyManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
