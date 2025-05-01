import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Estudiante } from "./Entity/Estudiante.entity";
import { CreateEstudianteDto } from "./dto/create.estudiante.dto";
import { UpdateStudentDto } from "./dto/update.estudiante.dto";

@Injectable()
export class EstudianteRepository{
    constructor(private readonly databaseService: DatabaseService){}

    async CreateStudent(data:CreateEstudianteDto): Promise<Estudiante> {
        const sql = 'INSERT INTO Estudiantes (id_usuario, id_curso, telefono, direccion, id_acudiente) VALUES (?, ?, ?, ?, ?)';
        const result = await this.databaseService.query(sql, [
            data.id_usuario, data.id_curso, data.telefono,data.direccion,data.id_acudiente
        ]);

        const insertId = result.insertId;
        return {
            id_Estudiante: insertId,
            ...data,
        } as Estudiante;
    }
    async GetAllStudents():Promise<Estudiante[]>{
        const sql = 'SELECT * FROM Estudiantes';
        const result = await this.databaseService.query(sql, []);
        return result; 
    }

    async GetStudent(id_Estudiante:number): Promise<Estudiante | null>{
        const sql = 'SELECT * FROM Estudiantes WHERE id_Estudiante = ?';
        const result = await this.databaseService.query(sql, [id_Estudiante]);

        if (!result||result === 0) {
            return null;
        }
        return result[0]
    }

    async UpdateStudent(id_Estudiante:number, data: UpdateStudentDto): Promise<boolean>{
        const sql = 'UPDATE Estudiantes SET id_usuario = ?, id_curso = ?, telefono = ?, direccion = ?, id_acudiente = ? WHERE id_estudiante = ?';
        const result = await this.databaseService.query(sql, [
            data.id_usuario,
            data.id_curso,
            data.telefono,
            data.direccion,
            data.id_acudiente,
            id_Estudiante
        ]);
        if (!result || result.length === 0) {
            return false;
        }

        return result.affectedRows > 0;
    }

    async DeleteStudent(id_Estudiante:number): Promise<boolean>{
        const sql = 'DELETE FROM Estudiantes WHERE id_Estudiante = ?';
        const result = await this.databaseService.query(sql, [id_Estudiante]);
        return result.affectedRows > 0;
    }
}
