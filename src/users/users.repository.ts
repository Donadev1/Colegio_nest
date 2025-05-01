import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { Usuarios } from "./model/user.model";
import { UpdateUserDto } from "./dto/update.user.dto";


@Injectable()
export class UsersRepository{
    constructor(private readonly databaseService: DatabaseService){}

    async CreateUser(data:CreateUserDto): Promise<Usuarios>{
        
        const sql = 'INSERT INTO Usuarios(D_Identidad, nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?)';
        const result = await this.databaseService.query(sql,[
            data.d_identidad, data.nombre, data.correo, data.contrasena, data.rol
        ]);

        const insertId = result.insertId;
        return {
            id_Usuario: insertId,
            ...data,
        };
    }
    async GetAllUsers():Promise<Usuarios[]>{
        const sql = 'SELECT * FROM Usuarios';
        const result = await this.databaseService.query(sql,[]);
        return result
    }

    async GetUserByid(id_Usuario:number): Promise<Usuarios | null>{
        const sql = 'SELECT * FROM Usuarios WHERE id_usuario = ?';
        const result = await this.databaseService.query(sql, [id_Usuario])
        return result[0]
    }

    async UpdateUser(id_Usuario:number, data:UpdateUserDto):Promise <boolean>{
        const sql = 'UPDATE Usuarios SET D_Identidad = ?, nombre = ?, correo = ?, contrasena = ?, rol = ? WHERE id_usuario = ?';
        const result = await this.databaseService.query(sql, [
            data.d_identidad, 
            data.nombre,
            data.correo,
            data.contrasena,
            data.rol,
            id_Usuario
        ]);
        
        if (!result || result.length === 0) {
            return false;
        }

        return result.affectedRows > 0;
    } 

    async DeleteUser(id_Usuario:number): Promise<boolean>{
        const sql = 'DELETE FROM Usuarios WHERE id_usuario = ?';
        const result = await this.databaseService.query(sql,[id_Usuario]);
        return result.affectedRows > 0;
    }


    async GetDocumentById(d_identidad:number): Promise<Usuarios | null>{
        const sql =  'SELECT * FROM Usuarios WHERE D_Identidad = ? LIMIT 1';
        const result = await this.databaseService.query(sql, [d_identidad]);
        return result.length > 0 ? result[0] : null;
    }
}