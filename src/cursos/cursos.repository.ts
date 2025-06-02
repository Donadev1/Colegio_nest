import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateCursoDto } from "./dto/create_cursos.dto";
import { cursos } from "./model/Cursos.model";
import { constrainedMemory } from "process";
import { UpdateCursoDto } from "./dto/update.cursos.dto";

@Injectable()
export class CursosRepository {
constructor(private readonly databaseService: DatabaseService) {}

async CreateCourse(data: CreateCursoDto): Promise<cursos> {
    const sql = 'INSERT INTO cursos(grado, salon, jornada, codigo_curso, id_docente_director) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await this.databaseService.query(sql, [
        data.grado, data.salon, data.jornada, data.codigo_curso, data.id_docente
    ]);
    const insertId = result.insertId;
            return {
                id_Estudiante: insertId,
                ...data,
            } as cursos;
}

async GetAllCourses(): Promise<cursos[]> {
    const sql = 'SELECT * FROM cursos';
    const result = await this.databaseService.query(sql, []);
    return result; 
}

async GetCouseById(id_curso: number): Promise<cursos | null>{
    const sql =  'SELECT * FROM cursos WHERE id = $1';
    const result = await this.databaseService.query(sql, [id_curso]);
    if (!result || result.length === 0) {
        return null;
    }
    return result[0];
}

async UpdateCourse(id_curso: number, data: UpdateCursoDto): Promise<boolean>{
    const sql = 'UPDATE cursos SET grado = $1, salon = $2, jornada = $3, codigo_curso = $4, id_docente_director = $5 WHERE id = $6';
    const result = await this.databaseService.query(sql, [
        data.grado,
        data.salon,
        data.jornada,
        data.codigo_curso,
        data.id_docente,
        id_curso
    ]);
    if (!result || result.length === 0) {
        return false;
    }
    return result.affectedRows > 0;
}
async DeleteCourse(id_curso: number): Promise<boolean> {
    const sql = 'DELETE FROM cursos WHERE id = $1';
    const result = await this.databaseService.query(sql, [id_curso]);
    return result.affectedRows > 0;
}
}