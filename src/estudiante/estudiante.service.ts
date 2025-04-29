import { Injectable } from '@nestjs/common';
import { EstudianteRepository } from './estudiante.repository';
import { CreateEstudianteDto } from './dto/create.estudiante.dto';
import { Estudiante } from './Entity/Estudiante.entity';
import { UpdateStudentDto } from './dto/update.estudiante.dto';

@Injectable()
export class EstudianteService {
    constructor(private readonly studentRepository: EstudianteRepository){}

    async CreateStudent(CreateEstudianteDto: CreateEstudianteDto): Promise<Estudiante>{
        return await this.studentRepository.CreateStudent(CreateEstudianteDto);
    }

    async GetAllStudents(): Promise<Estudiante[]>{
        return await this.studentRepository.GetAllStudents();
    }

    async GetStudent(id_Estudiante:number): Promise<Estudiante | null >{
        return this.studentRepository.GetStudent(id_Estudiante);
    }

    async UpdateStudent(id_Estudiante:number ,data: UpdateStudentDto): Promise<boolean>{
        return await this.studentRepository.UpdateStudent(id_Estudiante, data);
    }

    async DeleteStudent(id_Estudiante:number): Promise<boolean>{
        return await this.studentRepository.DeleteStudent(id_Estudiante);
    }
}
