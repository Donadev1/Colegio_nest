import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AcudientesModule } from './acudientes/acudientes.module';
import { EstudianteService } from './estudiante/estudiante.service';
import { EstudianteController } from './estudiante/estudiante.controller';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, AcudientesModule, EstudianteModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
