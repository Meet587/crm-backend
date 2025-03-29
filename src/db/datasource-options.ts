import { AreaEntity } from 'src/db/entities/area.entity';
import { LocationEntity } from 'src/db/entities/location.entity';
import { PropertyEntity } from 'src/db/entities/property.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  entities: [UserEntity,PropertyEntity,LocationEntity,AreaEntity],
  logging: true,
  synchronize: true,
};

export default new DataSource(dataSourceOptions);
