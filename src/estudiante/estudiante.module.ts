import { forwardRef, Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteRepository } from './estudiante.repository';
import { DatabaseService } from 'src/database/database.service';
import { EstudianteService } from './estudiante.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        forwardRef(() => AuthModule) // Assuming you need to forward reference for circular dependency
    ],
    controllers: [EstudianteController],
    providers:[EstudianteRepository, DatabaseService, EstudianteService]
})
export class EstudianteModule {}
