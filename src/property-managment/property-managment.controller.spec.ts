import { Test, TestingModule } from '@nestjs/testing';
import { PropertyManagmentController } from './property-managment.controller';
import { PropertyManagmentService } from './property-managment.service';

describe('PropertyManagmentController', () => {
  let controller: PropertyManagmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyManagmentController],
      providers: [PropertyManagmentService],
    }).compile();

    controller = module.get<PropertyManagmentController>(PropertyManagmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
