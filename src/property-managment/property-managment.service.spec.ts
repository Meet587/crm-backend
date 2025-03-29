import { Test, TestingModule } from '@nestjs/testing';
import { PropertyManagmentService } from './property-managment.service';

describe('PropertyManagmentService', () => {
  let service: PropertyManagmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyManagmentService],
    }).compile();

    service = module.get<PropertyManagmentService>(PropertyManagmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
