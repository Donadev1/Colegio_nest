import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Acudiente } from "./entity/Acudiente.Entity";
import { CreateAcudienteDto } from "./DTO/create.Acudiente.dto";
import { UpdateAcudienteDto } from "./DTO/update.user.dto";

@Injectable()
export class AcudienteRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async createAcudiente(data: CreateAcudienteDto): Promise<Acudiente> {
        const sql = 'INSERT INTO Acudientes (id_usuario, telefono, direccion) VALUES (?, ?, ?)';
        const result = await this.databaseService.query(sql, [
            data.id_usuario, data.telefono, data.direccion
        ]);
        console.log(result)
    
        const insertId = result.insertId;
        return {
            id_acudiente: insertId,
            ...data,
        };
        
    }

    async GetAllacudientes(): Promise<Acudiente[]> {
        const sql = 'SELECT * FROM Acudientes';
        const result = await this.databaseService.query(sql, []);
        // Returning the results correctly without destructuring
        return result;
    }

    async getAcudiente(id_Acudiente: number): Promise<Acudiente | null> {
        const sql = 'SELECT * FROM Acudientes WHERE id_Acudiente = ?';
        const result = await this.databaseService.query(sql, [id_Acudiente]);

        if (!result || result.length === 0) {
            return null;
        }
        return result[0];
    }

    async UpdateAcudiente(id_Acudiente: number, data: UpdateAcudienteDto): Promise<boolean> {
        const sql = 'UPDATE Acudientes SET id_usuario = ?, telefono = ?, direccion = ? WHERE id_acudiente = ?';
        const result = await this.databaseService.query(
            sql, [
                data.id_usuario,
                data.telefono,
                data.direccion,
                id_Acudiente
            ]);
        return result.affectedRows > 0;
    }

    async DeleteAcudiente(id_Acudiente: number): Promise<boolean> {
        const sql = 'DELETE FROM Acudientes WHERE id_Acudiente = ?';
        const result:any = await this.databaseService.query(sql, [id_Acudiente]);
        console.log(result);
        console.log(id_Acudiente);
        return result.affectedRows > 0;
    }
}