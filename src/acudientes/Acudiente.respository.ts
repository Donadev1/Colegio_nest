import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Acudiente } from "./entity/Acudiente.Entity";
import { CreateAcudienteDto } from "./DTO/create.Acudiente.dto";
import { UpdateAcudienteDto } from "./DTO/update.user.dto";

@Injectable()
export class AcudienteRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async createAcudiente(data: CreateAcudienteDto): Promise<Acudiente> {
        const sql = 'INSERT INTO ACUDIENTES (nombre, D_Identidad, telefono, Direccion, correo_electronico) VALUES (?, ?, ?, ?, ?)';
        const result = await this.databaseService.query(sql, [
            data.nombre, data.D_Identidad, data.telefono, data.Direccion, data.correo_electronico
        ]);
    
        const insertId = result.insertId;
        return {
            id_Acudiente: insertId,
            ...data,
        };
    }

    async GetAllacudientes(): Promise<Acudiente[]> {
        const sql = 'SELECT * FROM ACUDIENTES';
        const result = await this.databaseService.query(sql, []);
        // Returning the results correctly without destructuring
        return result;
    }

    async getAcudiente(id_Acudiente: number): Promise<Acudiente | null> {
        const sql = 'SELECT * FROM ACUDIENTES WHERE id_Acudiente = ?';
        const result = await this.databaseService.query(sql, [id_Acudiente]);

        if (!result || result.length === 0) {
            return null;
        }
        return result[0];
    }

    async UpdateAcudiente(id_Acudiente: number, data: UpdateAcudienteDto): Promise<boolean> {
        const sql = 'UPDATE ACUDIENTES SET nombre = ?, D_Identidad = ?, telefono = ?, Direccion = ?, correo_electronico = ? WHERE id_Acudiente = ?';
        const result = await this.databaseService.query(
            sql, [
                data.nombre,
                data.D_Identidad,
                data.telefono,
                data.Direccion,
                data.correo_electronico,
                id_Acudiente
            ]);
        return result.affectedRows > 0;
    }

    async DeleteAcudiente(id_Acudiente: number): Promise<boolean> {
        const sql = 'DELETE FROM ACUDIENTES WHERE id_Acudiente = ?';
        const result:any = await this.databaseService.query(sql, [id_Acudiente]);
        console.log(result);
        console.log(id_Acudiente);
        return result.affectedRows > 0;
    }
}