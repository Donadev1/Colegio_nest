import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { CursosRepository } from './cursos.repository';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [CursosController],
  providers: [CursosService, CursosRepository,DatabaseService],
})
export class CursosModule {}
