import { Test, TestingModule } from '@nestjs/testing';
import { ClientManagmentController } from './client-managment.controller';
import { ClientManagmentService } from './client-managment.service';

describe('ClientManagmentController', () => {
  let controller: ClientManagmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientManagmentController],
      providers: [ClientManagmentService],
    }).compile();

    controller = module.get<ClientManagmentController>(ClientManagmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
