import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule, // Añade el ConfigModule aquí
    JwtModule.registerAsync({
      imports: [ConfigModule], // Añade ConfigModule aquí también
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') || '3600s',
        },
      }),
      inject: [ConfigService] 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, AuthGuard],
  exports: [AuthGuard, AuthService, JwtModule], // Exporta también el JwtModule
})
export class AuthModule {}