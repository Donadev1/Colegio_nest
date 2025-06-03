import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { Usuarios } from './model/user.model';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
    
    constructor(private readonly usersRepository:UsersRepository){}

    
    async createUser(data:CreateUserDto):Promise<Usuarios>{
           
        try {
            
            return await this.usersRepository.CreateUser(data);

        } catch (error) {
            
            if (error.code === '23505') {
                throw new HttpException('El correo ya está registrado', HttpStatus.CONFLICT);
            }
            
            throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  async GetAllUsers(): Promise<Usuarios[]> {
    return await this.usersRepository.GetAllUsers(); // No necesita try-catch si no haces lógica adicional
  }

  async GetUserByid(id_Usuario: number): Promise<Usuarios | null> {
    
    try {
        const user = await this.usersRepository.GetUserByid(id_Usuario);
    
        if (!user) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
    
        return user;
    
    } catch (error) {
        throw new HttpException('Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async UpdateUser(id_Usuario: number, data: UpdateUserDto): Promise<boolean> {
    
    try {
        const updated = await this.usersRepository.UpdateUser(id_Usuario, data);
    
        if (!updated) {
         throw new HttpException('No se encontró el usuario para actualizar', HttpStatus.NOT_FOUND);
      }

      return true;
    
    } catch (error) {
        throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async DeleteUser(id_Usuario: number): Promise<boolean> {
    try {
      const deleted = await this.usersRepository.DeleteUser(id_Usuario);
        
      if (!deleted) {
        throw new HttpException('No se encontró el usuario para eliminar', HttpStatus.NOT_FOUND);
      }
        
      return true;
    
    } catch (error) {
      throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async GetCorreoByStudent(correo: string): Promise<Usuarios | null> {
    try {
      const user = await this.usersRepository.GetEmail(correo);
      
      if (!user) {
        throw new HttpException('Correo no encontrado', HttpStatus.NOT_FOUND);
      }
      
      return user;
    
    } catch (error) {
      throw new HttpException('Error al buscar el correo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
