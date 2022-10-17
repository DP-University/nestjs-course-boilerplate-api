import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM_MODULE_CONFIG } from '../common/constants';
import { UserSubscriber } from '../modules/user/user.subscriber';

export const typeormConfig = registerAs(
  TYPEORM_MODULE_CONFIG,
  (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : 'postgresql://postgres:postgres@localhost:5432/nestjscourse',
      migrationsRun:
        'string' === typeof process.env.DATABASE_MIGRATIONS_RUN
          ? process.env.DATABASE_MIGRATIONS_RUN === 'true'
          : false,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      subscribers: [UserSubscriber],
      synchronize:
        'string' === typeof process.env.DATABASE_SYNCHRONIZE
          ? process.env.DATABASE_SYNCHRONIZE === 'true'
          : false,
      migrations: [__dirname + '/../migrations/*.{js,ts}'],
      autoLoadEntities: true,
      logging: true,
      logger: 'file',
    };
  }
);