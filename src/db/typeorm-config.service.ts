import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { DbConfig } from '../config/interfaces/db.config';
import { AreaEntity } from './entities/area.entity';
import { BuildersEntity } from './entities/builders.entity';
import { ClientsEntity } from './entities/client.entity';
import { CommissionEntity } from './entities/commission.entity';
import { DealsEntity } from './entities/deals.entity';
import { FollowUpEntity } from './entities/follow-up.entity';
import { LocationEntity } from './entities/location.entity';
import { PropertyImageEntity } from './entities/property-image.entity';
import { PropertyEntity } from './entities/property.entity';
import { SiteVisitEntity } from './entities/site-visit.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    try {
      const dbConfig = this.configService.getOrThrow<DbConfig>(
        'environment.dbConfig',
      );
      if (!dbConfig) {
        throw new Error('DB config not provided');
      }
      return {
        type: dbConfig.type,
        database: dbConfig.dbname,
        host: dbConfig.host,
        username: dbConfig.username,
        password: dbConfig.password,
        port: dbConfig.port,
        entities: [
          UserEntity,
          PropertyEntity,
          LocationEntity,
          AreaEntity,
          ClientsEntity,
          FollowUpEntity,
          SiteVisitEntity,
          PropertyImageEntity,
          BuildersEntity,
          DealsEntity,
          CommissionEntity,
        ],
        // logging: true,
        // autoLoadEntities: true,
        // synchronize: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      } as TypeOrmModuleOptions;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
