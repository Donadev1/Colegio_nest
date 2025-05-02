import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseService } from 'src/database/database.service';
import { UsersRepository } from './users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports:[
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, DatabaseService,UsersRepository],
  exports: [UsersRepository]
})
export class UsersModule {}
