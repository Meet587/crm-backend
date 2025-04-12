import { DataSource, DataSourceOptions } from 'typeorm';

import * as env from '../config/environment.config';
import { DbConfig } from '../config/interfaces/db.config';
import { AreaEntity } from './entities/area.entity';
import { ClientsEntity } from './entities/client.entity';
import { FollowUpEntity } from './entities/follow-up.entity';
import { LocationEntity } from './entities/location.entity';
import { PropertyEntity } from './entities/property.entity';
import { SiteVisitEntity } from './entities/site-visit.entity';
import { UserEntity } from './entities/user.entity';

const dbConfig = env.getConfig().dbConfig as DbConfig;

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
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
  ],
  logging: true,
  synchronize: dbConfig.synchronize,
};

export default new DataSource(dataSourceOptions);
