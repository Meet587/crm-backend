import { BaseAbstractRepository } from 'src/db/repositories/base/base.abstrac.repository';
import { ClientRepositoryInterface } from './../interfaces/client.interface';
import { ClientsEntity } from 'src/db/entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
