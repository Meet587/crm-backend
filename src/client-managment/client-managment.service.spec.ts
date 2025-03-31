import { Test, TestingModule } from '@nestjs/testing';
import { ClientManagmentService } from './client-managment.service';

describe('ClientManagmentService', () => {
  let service: ClientManagmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientManagmentService],
    }).compile();

    service = module.get<ClientManagmentService>(ClientManagmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
