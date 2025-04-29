import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create.estudiante.dto';
import { Estudiante } from './Entity/Estudiante.entity';
import { UpdateStudentDto } from './dto/update.estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService){}

    @Post()
    async CreateStudent(@Body() CreateEstudianteDto: CreateEstudianteDto): Promise<Estudiante>{
            return await this.estudianteService.CreateStudent(CreateEstudianteDto);
    }

    @Get()
    async GetAllStudents(): Promise<Estudiante[]>{
        return await this.estudianteService.GetAllStudents();
    } 

    @Get() 
    async GetStudent(id_Estudiante:string): Promise<Estudiante | null>{
        return await this.estudianteService.GetStudent(+id_Estudiante);
    }

    @Put(':id_Estudiante')
    async UpdateStudent(@Param('id_Estudiante') id_Estudiante:string, @Body()data:UpdateStudentDto): Promise <boolean>{
        return await this.estudianteService.UpdateStudent(+id_Estudiante, data);
    }

    @Delete(':id_Estudiante')
    async DeleteStudent(@Param('id_Estudiante') id_Estudiante:string): Promise<boolean>{
        return await this.estudianteService.DeleteStudent(+id_Estudiante);
    }

}

