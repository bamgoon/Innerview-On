import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_ACCESS_TOKEN'),
        signOptions: {
          expiresIn: ConfigService.get('JWT_ACCESS_TOKEN_EXPIRES'),
        },
      }),
    }),
    PassportModule,
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
