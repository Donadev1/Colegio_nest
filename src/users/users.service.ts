import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { Usuarios } from './model/user.model';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository){}

    async createUser(data:CreateUserDto):Promise<Usuarios>{
        return await this.usersRepository.CreateUser(data);
    }

    async GetAllUsers():Promise<Usuarios[]>{
        return await this.usersRepository.GetAllUsers();
    }

    async GetUserByid(id_Usuario:number):Promise<Usuarios | null>{
        return await this.usersRepository.GetUserByid(id_Usuario);
    }
    async UpdataUser(id_Usuario:number, data:UpdateUserDto): Promise<boolean>{
        return await this.usersRepository.UpdateUser(id_Usuario, data);
    }
    async DeleteUser(id_Usuario:number): Promise<boolean>{
        return await this.usersRepository.DeleteUser(id_Usuario);
    }

}
