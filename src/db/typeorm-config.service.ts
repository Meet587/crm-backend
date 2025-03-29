import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AreaEntity } from 'src/db/entities/area.entity';
import { LocationEntity } from 'src/db/entities/location.entity';
import { PropertyEntity } from 'src/db/entities/property.entity';
import { UserEntity } from 'src/db/entities/user.entity';

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      entities: [UserEntity, PropertyEntity, LocationEntity, AreaEntity],
      // autoLoadEntities: true,
      // synchronize: true,
      // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
