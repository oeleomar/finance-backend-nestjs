import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { User } from './app/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'bd'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USER', 'postgres'),
        password: configService.get('DB_PASSWORD', '123456789'),
        database: configService.get('DB_DATABASE', 'postgres'),
        synchronize: Boolean(configService.get('DB_SYNC', true)),
        autoLoadEntities: true,
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
