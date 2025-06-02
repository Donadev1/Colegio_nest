import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Estudiante } from "./Entity/Estudiante.entity";
import { CreateEstudianteDto } from "./dto/create.estudiante.dto";
import { UpdateStudentDto } from "./dto/update.estudiante.dto";

@Injectable()
export class EstudianteRepository{
    constructor(private readonly databaseService: DatabaseService){}

    async CreateStudent(data:CreateEstudianteDto): Promise<Estudiante> {
        const sql = 'INSERT INTO estudiantes (fecha_nacimiento, grado, id_usuario, id_curso, id_acudiente) VALUES ($1, $2, $3, $4, $5)';
        const result = await this.databaseService.query(sql, [
            , data.fecha_nacimiento, data.grado, data.id_usuario, data.id_curso, data.id_acudiente
        ]);

        const insertId = result.insertId;
        return {
            id_Estudiante: insertId,
            ...data,
        } as Estudiante;
    }
    async GetAllStudents():Promise<Estudiante[]>{
        const sql = 'SELECT * FROM estudiantes';
        const result = await this.databaseService.query(sql, []);
        return result; 
    }

    async GetStudent(id_Estudiante:number): Promise<Estudiante | null>{
        const sql = 'SELECT * FROM estudiantes WHERE id = $1';
        const result = await this.databaseService.query(sql, [id_Estudiante]);

        if (!result||result === 0) {
            return null;
        }
        return result[0]
    }

    async UpdateStudent(id_Estudiante:number, data: UpdateStudentDto): Promise<boolean>{
        const sql = 'UPDATE estudiantes SET fecha_nacimiento = $1, grado = $2, id_usuario = $3, id_curso = $4, id_acudiente = $5 WHERE id = $6';
        const result = await this.databaseService.query(sql, [
            data.fecha_nacimiento,
            data.grado,
            data.id_usuario,
            data.id_curso,
            data.id_acudiente,
            id_Estudiante
        ]);
        if (!result || result.length === 0) {
            return false;
        }

        return result.affectedRows > 0;
    }

    async DeleteStudent(id_Estudiante:number): Promise<boolean>{
        const sql = 'DELETE FROM estudiantes WHERE id = $1';
        const result = await this.databaseService.query(sql, [id_Estudiante]);
        return result.affectedRows > 0;
    }
}
