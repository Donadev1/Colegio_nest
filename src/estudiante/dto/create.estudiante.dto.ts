import { IsString, IsEmail, MinLength, MaxLength, IsInt } from 'class-validator';

export class CreateEstudianteDto {
  
    @IsString()
    @MinLength(0)
    nombre: string;
  
    @IsString()
    @MaxLength(10)
    @MinLength(0)
    D_Identidad: string;
  
    @IsString()
    @MaxLength(10)
    @MinLength(0)
    Grado: string;

    @IsString()
    @MaxLength(10)
    @MinLength(0)
    telefono: string;
    
    @IsString()
    @MinLength(0)
    Direccion: string;
  
    @IsInt()
    @MaxLength(10)
    @MinLength(0)
    id_Acudiente: number;
    
    @IsEmail()
    @MinLength(0)
    correo_electronico: string;
  }