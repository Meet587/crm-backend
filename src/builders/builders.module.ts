import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildersEntity } from '../db/entities/builders.entity';
import { BuildersRepository } from '../db/repositories/builders.repository';
import { BuildersController } from './builders.controller';
import { BuildersService } from './builders.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuildersEntity])],
  controllers: [BuildersController],
  providers: [
    BuildersService,
    {
      provide: 'buildersRepositoryInterface',
      useClass: BuildersRepository,
    },
  ],
  exports:[BuildersService]
})
export class BuildersModule {}
