import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PropertyManagmentModule } from './property-managment/property-managment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthModule,
    UserModule,
    PropertyManagmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
