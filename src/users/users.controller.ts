import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpException,
    HttpStatus,
    Param,
    Post, 
    Put 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Usuarios } from './model/user.model';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    
   @Post()
   async CreateUser(@Body()createUserDto:CreateUserDto){
    const result = await this.usersService.createUser(createUserDto);
    if (!result) {
        throw new HttpException(
            'No se pudo crear el nuevo acudiente',
            HttpStatus.CONFLICT
            );
        }
        return{
            message:'Usuario Creado de manera satisfactoria'
        }
    }

    @Get()
    async GetAllUsers():Promise <Usuarios[]>{
        return await this.usersService.GetAllUsers();
    }

    @Get()
    async GetUserByid(id_usuario:string){
        return await this.usersService.GetUserByid(+id_usuario);
    }

    @Put(':id_Usuario')
    async UpdateUser(@Param('id_Usuario') id_Usuario:string, @Body()data:UpdateUserDto){
        const result = await this.usersService.UpdataUser(+id_Usuario, data);

        if (!result) {
            throw new HttpException(
                'No se Pudo actualizar el Usuario',
                HttpStatus.CONFLICT // 409 Conflict
            );
        }
        
        return {
            success: true,
            message: 'Acudiente Actualizado exitosamente'
        };
    }

    @Delete(':id_Usuario')
    async DeleteUser(@Param('id_Usuario') id_Usuario:string){
        const result = await this.usersService.DeleteUser(+id_Usuario);
        if (!result) {
            throw new HttpException(
                'No se pudo eliminar el usuario',
                HttpStatus.CONFLICT // 409 Conflict
            );
        }
        
        return {
            success: true,
            message: 'Acudiente Eliminado exitosamente'
        };
    }

}
