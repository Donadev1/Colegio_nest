import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { Usuarios } from 'src/users/model/user.model';
import { UsersService } from 'src/users/users.service';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UsersService,
        private readonly jwtService: JwtService
    ){}

    async RegisterUser(data:CreateUserDto):Promise<Usuarios>{
        const User = await this.userService.GetCorreoByStudent(data.correo);
        
        if (User) {
            throw new BadRequestException('El Usuario ya existe')
        }

        const Hash = await bcryptjs.hash(data.contrasena, 10);

        const newUser = {
            ...data,
            contrasena: Hash,
          };
          console.log(newUser);
          return await this.userService.createUser(newUser);
    }

    async LoginUser(data: LoginDto): Promise<Usuarios | any> {
        const User = await this.userService.GetCorreoByStudent(data.correo)
        
        if (!User) {
            throw new UnauthorizedException('Documento es incorrecto');
        }
    
        const validPassword = await bcryptjs.compare(data.contrasena, User.contrasena);
    
        if (!validPassword) {
            throw new UnauthorizedException("Contraseña incorrecta")
        }
    
        // ✅ Aquí incluyes el id_usuario en el payload
        const payload = {
            identificacion: data.correo,
            rol:User.rol
        };
    
        const token = await this.jwtService.signAsync(payload);
    
        return {
            token,
            message: 'Inicio de sesion exitoso',
        };
    }
    
    
        
}
