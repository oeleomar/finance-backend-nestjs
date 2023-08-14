import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './app/admin/admin.module';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from './filters/typeorm-exception.filter';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USER', 'postgres'),
        password: configService.get('DB_PASSWORD', '123456789'),
        database: configService.get('DB_DATABASE', 'postgres'),
        synchronize: Boolean(configService.get('DB_SYNC', true)),
        autoLoadEntities: true,
      }),
    }),
    AdminModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
})
export class AppModule {}
