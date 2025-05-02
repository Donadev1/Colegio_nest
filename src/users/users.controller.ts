import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpException,
    HttpStatus,
    Param,
    Post, 
    Put, 
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Usuarios } from './model/user.model';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorador';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Administrador')
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
    @Roles('Administrador')
    @Get()
    async GetAllUsers():Promise <Usuarios[]>{
        return await this.usersService.GetAllUsers();
    }

    @Roles('Administrador')
    @Get()
    async GetUserByid(id_usuario:string){
        return await this.usersService.GetUserByid(+id_usuario);
    }
    @Roles('Administrador')
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
    @Roles('Administrador')
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
            message: 'usuario Eliminado exitosamente'
        };
    }

}
