import { Injectable } from '@nestjs/common';
import { CursosRepository } from './cursos.repository';
import { CreateCursoDto } from './dto/create_cursos.dto';
import { cursos } from './model/Cursos.model';
import { UpdateCursoDto } from './dto/update.cursos.dto';

@Injectable()
export class CursosService {
    constructor(private readonly cursorepository:CursosRepository) {}

    async CreateCourse(data: CreateCursoDto):Promise<cursos>{
        return await this.cursorepository.CreateCourse(data);   

    }
    async GetAllCourses(): Promise<cursos[]> {
        return await this.cursorepository.GetAllCourses();
    }
    async GetCouseById(id_curso: number): Promise<cursos | null> {
        return await this.cursorepository.GetCouseById(id_curso);
    }
    async UpdateCourse(id_curso: number, data: UpdateCursoDto): Promise<boolean> {
        return await this.cursorepository.UpdateCourse(id_curso, data);
    }
    async DeleteCourse(id_curso: number): Promise<boolean> {
        return await this.cursorepository.DeleteCourse(id_curso);
    }
}
