import { Test, TestingModule } from '@nestjs/testing';
import { PropertyManagementController } from './property-management.controller';
import { PropertyManagementService } from './property-management.service';

describe('PropertyManagementController', () => {
  let controller: PropertyManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyManagementController],
      providers: [PropertyManagementService],
    }).compile();

    controller = module.get<PropertyManagementController>(
      PropertyManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
