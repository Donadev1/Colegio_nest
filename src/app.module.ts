import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AcudientesModule } from './acudientes/acudientes.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CursosModule } from './cursos/cursos.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DatabaseModule, 
    AcudientesModule, 
    EstudianteModule,
    AuthModule, 
    UsersModule, CursosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
