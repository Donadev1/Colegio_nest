import { IsString, IsInt,IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateEstudianteDto {
  
   // Relacionado con la tabla Usuarios

  @IsDate()
  @IsNotEmpty()
  fecha_nacimiento: Date;
    
  @IsString()
  @IsNotEmpty()
  grado: string;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number; 

  @IsInt()
  @IsOptional()  // No siempre será necesario, puede ser nulo
  id_acudiente?: number;
  
    @IsInt()
  @IsNotEmpty()
  id_curso: number;  // Relacionado con la tabla cursos
}
  