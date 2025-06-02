import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { Usuarios } from "./model/user.model";
import { UpdateUserDto } from "./dto/update.user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersRepository{
    constructor(private readonly databaseService: DatabaseService){}

    async CreateUser(data:CreateUserDto): Promise<Usuarios>{

        const saltos = 10;
        const hashpassword = await bcrypt.hash(data.contrasena, saltos);
        
        const sql = 'INSERT INTO usuarios(D_Identidad, nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5)';
        const result = await this.databaseService.query(sql,[
            data.d_identidad, data.nombre, data.correo, hashpassword, data.rol
        ]);

        const insertId = result.insertId;
        return {
            id_Usuario: insertId,
            ...data,
            contrasena: hashpassword
        };
    }
    async GetAllUsers():Promise<Usuarios[]>{
        const sql = 'SELECT * FROM usuarios';
        const result = await this.databaseService.query(sql,[]);
        return result
    }

    async GetUserByid(id_Usuario:number): Promise<Usuarios | null>{
        const sql = 'SELECT * FROM usuarios WHERE id = 1$';
        const result = await this.databaseService.query(sql, [id_Usuario])
        return result[0]
    }

    async UpdateUser(id_Usuario:number, data:UpdateUserDto):Promise <boolean>{
        const sql = 'UPDATE usuarios SET D_Identidad = $1, nombre = $2, correo = $3, contrasena = $4, rol = ? WHERE id = $5';
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
        const sql = 'DELETE FROM usuarios WHERE id_usuario = $1';
        const result = await this.databaseService.query(sql,[id_Usuario]);
        return result.affectedRows > 0;
    }


    async GetEmail(correo:string): Promise<Usuarios | null>{
        const sql =  'SELECT * FROM usuarios WHERE correo = $1';
        const result = await this.databaseService.query(sql, [correo]);
        return result.length > 0 ? result[0] : null;
    }
    
    async GetById(id_usuario:number): Promise<Usuarios>{
        const sql = 'SELECT * FROM usuarios WHERE id_usuario = $1';
        const result = await this.databaseService.query(sql, [id_usuario]);
    
        if (result.length === 0) {
            throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
        }
    
        return result[0];
    }
}