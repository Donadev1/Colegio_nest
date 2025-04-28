import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateAcudienteDto {
  
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
  telefono: string;
  
  @IsString()
  @MinLength(0)
  Direccion: string;

  @IsEmail()
  @MinLength(0)
  correo_electronico: string;
}
