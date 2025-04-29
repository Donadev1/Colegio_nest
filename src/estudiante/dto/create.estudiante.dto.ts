import { IsString, IsInt,IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEstudianteDto {
  
  @IsInt()
  @IsNotEmpty()
  id_usuario: number;  // Relacionado con la tabla Usuarios

  @IsInt()
  @IsNotEmpty()
  id_curso: number;  // Relacionado con la tabla Cursos

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsInt()
  @IsOptional()  // No siempre será necesario, puede ser nulo
  id_acudiente?: number;  // Relacionado con la tabla Acudientes
}
  