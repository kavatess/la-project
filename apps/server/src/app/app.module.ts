/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShowModule } from './apis/show/show.module';
import { FareTypeModule } from './apis/fare-type/fare-type.module';
import { UserModule } from './apis/user/user.module';
import { SectionModule } from './apis/section/section.module';
import { SeatModule } from './apis/seat/seat.module';
import { EnvVarProperties, envValidate } from './configs/env.validation';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.dev.server',
        '.env.prod.server',
        '.env.staging.server',
      ],
      validate: envValidate,
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get(EnvVarProperties.DATABASE_URL),
        dbName: configService.get(EnvVarProperties.DATABASE_NAME),
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthModule,
    ShowModule,
    FareTypeModule,
    UserModule,
    SectionModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
