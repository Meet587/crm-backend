import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as env from '../config/environment.config';
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

dotenv.config();
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
    PropertyImageEntity,
    BuildersEntity,
    DealsEntity,
    CommissionEntity,
  ],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
};

export default new DataSource(dataSourceOptions);
