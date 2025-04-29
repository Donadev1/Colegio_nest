import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteRepository } from './estudiante.repository';
import { DatabaseService } from 'src/database/database.service';
import { EstudianteService } from './estudiante.service';

@Module({
    controllers: [EstudianteController],
    providers:[EstudianteRepository, DatabaseService, EstudianteService]
})
export class EstudianteModule {}
