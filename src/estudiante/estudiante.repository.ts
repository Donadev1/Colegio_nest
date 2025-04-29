import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Estudiante } from "./Entity/Estudiante.entity";
import { CreateEstudianteDto } from "./dto/create.estudiante.dto";
import { UpdateStudentDto } from "./dto/update.estudiante.dto";

@Injectable()
export class EstudianteRepository{
    constructor(private readonly databaseService: DatabaseService){}

    async CreateStudent(data:CreateEstudianteDto): Promise<Estudiante> {
        const sql = 'INSERT INTO Estudiantes (nombre, D_Identidad, Grado, telefono, Direccion, id_Acudiente, correo_electronico ) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const result = await this.databaseService.query(sql, [
            data.nombre, data.D_Identidad,data.Grado,data.telefono,data.id_Acudiente,data.correo_electronico
        ]);

        const insertId = result.insertId;
        return {
            id_Estudiante: insertId,
            ...data,
        };
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
        const sql = 'UPDATE Estudiantes SET nombre = ?, D_Identidad = ?, Grado = ?, telefono = ?, Direccion = ?, id_Acudiente, correo_electronico = ? WHERE id_Estudiante = ?';
        const result = await this.databaseService.query(sql, [
            data.nombre,
            data.D_Identidad,
            data.Grado,
            data.telefono,
            data.Direccion,
            data.id_Acudiente,
            data.correo_electronico,
            id_Estudiante
        ]);
        if (!result || result.length === 0) {
            return false;
        }

        return result.affectedRows > 0;
    }

    async DeleteStudent(id_Estudiante:number): Promise<boolean>{
        const sql = 'DELETE * FROM Estudiantes WHERE id_Estudiante = ?';
        const result = await this.databaseService.query(sql, [id_Estudiante]);
        return result.affectedRows > 0;
    }
}
