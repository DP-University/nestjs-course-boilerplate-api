import { forwardRef, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '../../config/jwt.config';
import { EmailModule } from '../email/email.module';
import { LoggerModule } from '../logger/logger.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local-strategy';
import { ApiKeyMiddleware } from './midleware/api-key.middleware';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    EmailModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => config,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
})
export class AuthModule {}