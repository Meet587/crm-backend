import { Test, TestingModule } from '@nestjs/testing';
import { ClientManagementService } from './client-management.service';

describe('ClientManagementService', () => {
  let service: ClientManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientManagementService],
    }).compile();

    service = module.get<ClientManagementService>(ClientManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
