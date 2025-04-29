import { Body, Controller, Delete, Get, Param, Post, Put , HttpException, HttpStatus} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create.estudiante.dto';
import { Estudiante } from './Entity/Estudiante.entity';
import { UpdateStudentDto } from './dto/update.estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService){}

    @Post()
    async CreateStudent(@Body() CreateEstudianteDto: CreateEstudianteDto){
        const result = await this.estudianteService.CreateStudent(CreateEstudianteDto);
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

    @Get()
    async GetAllStudents(): Promise<Estudiante[]>{
        return await this.estudianteService.GetAllStudents();
    } 

    @Get() 
    async GetStudent(id_Estudiante:string){
        return await this.estudianteService.GetStudent(+id_Estudiante);
    }

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

    @Delete(':id_Estudiante')
    async DeleteStudent(@Param('id_Estudiante') id_Estudiante:string){
        const result = await this.estudianteService.DeleteStudent(+id_Estudiante);
    
        if (!result) {
            throw new HttpException(
                'No se pudo eliminar el estudiante, posiblemente tiene estudiantes asociados',
                HttpStatus.CONFLICT // 409 Conflict
            );
        }
        
        return {
            success: true,
            message: 'Acudiente eliminado exitosamente'
        };
    
    }


}

