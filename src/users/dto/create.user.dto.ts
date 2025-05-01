import { IsString, MinLength, MaxLength, IsInt, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';



export enum Rol {
    Estudiante = 'Estudiante',
    Docente = 'Docente',
    Administrativo = 'Administrativo',
    Administrador = 'Administrador',
    Acudiente = 'Acudiente',
  }


export class CreateUserDto{
    
    @IsInt()
    id_usuario: number;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    d_identidad: string;
    
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @IsEmail()
    @IsNotEmpty()
    correo:string;
    

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    contrasena:string;
    
    @IsEnum(Rol)
    rol:Rol;
}
