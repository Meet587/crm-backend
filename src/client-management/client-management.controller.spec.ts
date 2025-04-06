import { Test, TestingModule } from '@nestjs/testing';
import { ClientManagementController } from './client-management.controller';
import { ClientManagementService } from './client-management.service';

describe('ClientManagementController', () => {
  let controller: ClientManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientManagementController],
      providers: [ClientManagementService],
    }).compile();

    controller = module.get<ClientManagementController>(
      ClientManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
