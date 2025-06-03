import { Body, Controller, Delete, Get, Param, Post, Put , HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create.estudiante.dto';
import { Estudiante } from './Entity/Estudiante.entity';
import { UpdateStudentDto } from './dto/update.estudiante.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
;

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService){}

    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async CreateStudent(@Body() createEstudianteDto: CreateEstudianteDto){
        const result = await this.estudianteService.CreateStudent(createEstudianteDto);
        if (!result) {
                    throw new HttpException(
                        'No se pudo crear el nuevo acudiente',
                        HttpStatus.CONFLICT
                    );
                }
                return{
                    message: 'Estudiante creado Exitosamente'
                }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async GetAllStudents(): Promise<Estudiante[]>{
        return await this.estudianteService.GetAllStudents();
    } 

    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id_Estudiante') 
    async GetStudent(@Param('id_Estudiante') id_Estudiante:string){
        return await this.estudianteService.GetStudent(+id_Estudiante);
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Put(':id_Estudiante')
    async UpdateStudent(@Param('id_Estudiante') id_Estudiante:string, @Body()data:UpdateStudentDto){
        const result = await this.estudianteService.UpdateStudent(+id_Estudiante, data);

        if (!result) {
            throw new HttpException(
                'No se pudo Actulizar el los datos del Estudiante',
                HttpStatus.CONFLICT
            );
        }
        return{
            success:true,
            message: 'Estudiante actulizado Exitosamente',
            
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id_Estudiante')
    async DeleteStudent(@Param('id_Estudiante') id_Estudiante:string){
        const result = await this.estudianteService.DeleteStudent(+id_Estudiante);
    
        if (!result) {
            throw new HttpException(
                'No se pudo eliminar el estudiante, posiblemente tiene Acudientes asociados',
                HttpStatus.CONFLICT // 409 Conflict
            );
        }
        
        return {
            success: true,
            message: 'Estudiante eliminado exitosamente'
        };
    
    }


}

