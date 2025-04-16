import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuildersEntity } from '../entities/builders.entity';
import { BuildersRepositoryInterface } from './../interfaces/builders.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class BuildersRepository
  extends BaseAbstractRepository<BuildersEntity>
  implements BuildersRepositoryInterface
{
  constructor(
    @InjectRepository(BuildersEntity)
    private readonly buildersRepository: Repository<BuildersEntity>,
  ) {
    super(buildersRepository);
  }
}
