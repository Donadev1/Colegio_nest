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
import { CreateUserDto, Rol } from './dto/create.user.dto';
import { Usuarios } from './model/user.model';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorador';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Administrador')
  @Post()
  async CreateUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
    return { message: 'Usuario creado de manera satisfactoria' };
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Administrador')
  @Get()
  async GetAllUsers(): Promise<Usuarios[]> {
    return await this.usersService.GetAllUsers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Administrador')
  @Get(':id_usuario')
  async GetUserByid(@Param('id_usuario') id_usuario: string) {
    return await this.usersService.GetUserByid(+id_usuario);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Administrador')
  @Put(':id_Usuario')
  async UpdateUser(@Param('id_Usuario') id_Usuario: string, @Body() data: UpdateUserDto) {
    await this.usersService.UpdateUser(+id_Usuario, data);
    
    return {
      success: true,
      message: 'Usuario actualizado exitosamente',
    };
  }
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Administrador')
  @Delete(':id_Usuario')
  async DeleteUser(@Param('id_Usuario') id_Usuario: string) {
    await this.usersService.DeleteUser(+id_Usuario);
    return {
      success: true,
      message: 'Usuario eliminado exitosamente',
    };
  }
}