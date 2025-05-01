import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { Usuarios } from 'src/users/model/user.model';
import { UsersService } from 'src/users/users.service';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UsersService){}

    async RegisterUser(data:CreateUserDto):Promise<Usuarios>{
        const User = await this.userService.GetDocumentById(+data.d_identidad);

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
}
