import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AcudientesModule } from './acudientes/acudientes.module';

@Module({
  imports: [DatabaseModule, AcudientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
