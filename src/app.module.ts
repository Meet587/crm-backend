import { Module } from '@nestjs/common/decorators/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { FollowUpsModule } from './follow-ups/follow-ups.module';
import { SiteVisitsModule } from './site-visits/site-visits.module';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { ClientManagementModule } from './client-management/client-management.module';
import { PropertyManagementModule } from './property-management/property-management.module';

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
    PropertyManagementModule,
    ClientManagementModule,
    FollowUpsModule,
    SiteVisitsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
