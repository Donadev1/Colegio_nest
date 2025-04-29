import { Module } from '@nestjs/common';
import { AcudientesController } from './acudientes.controller';
import { AcudientesService } from './acudientes.service';
import { AcudienteRepository } from './Acudiente.respository';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AcudientesController],
  providers: [AcudientesService,AcudienteRepository,DatabaseService]
})
export class AcudientesModule {}
