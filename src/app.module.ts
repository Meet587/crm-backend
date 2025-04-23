import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BuildersModule } from './builders/builders.module';
import { ClientManagementModule } from './client-management/client-management.module';
import { CommissionsModule } from './commissions/commissions.module';
import environmentConfig from './config/environment.config';
import { TypeOrmConfigService } from './db/typeorm-config.service';
import { DealsModule } from './deals/deals.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FollowUpsModule } from './follow-ups/follow-ups.module';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { PropertyManagementModule } from './property-management/property-management.module';
import { SiteVisitsModule } from './site-visits/site-visits.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [environmentConfig],
    }),
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
    FileUploadModule,
    DealsModule,
    BuildersModule,
    CommissionsModule,
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
