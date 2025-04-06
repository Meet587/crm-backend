import { ClientRepositoryInterface } from './../interfaces/client.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { ClientsEntity } from '../entities/client.entity';

export class ClientRepository
  extends BaseAbstractRepository<ClientsEntity>
  implements ClientRepositoryInterface
{
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientRepository: Repository<ClientsEntity>,
  ) {
    super(clientRepository);
  }
}
