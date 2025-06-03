import { forwardRef, Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { CursosRepository } from './cursos.repository';
import { DatabaseService } from 'src/database/database.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    forwardRef(()=> AuthModule)
  ],
  controllers: [CursosController],
  providers: [CursosService, CursosRepository,DatabaseService],
  
})
export class CursosModule {}
