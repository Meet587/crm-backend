import { DataSource, DataSourceOptions } from 'typeorm';

import * as env from '../config/environment.config';
import { DbConfig } from '../config/interfaces/db.config';

const dbConfig = env.getConfig().dbConfig as DbConfig;

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: dbConfig.dbname,
  host: dbConfig.host,
  username: dbConfig.username,
  password: dbConfig.password,
  port: dbConfig.port,
  entities: [],
};

export default new DataSource(dataSourceOptions);
