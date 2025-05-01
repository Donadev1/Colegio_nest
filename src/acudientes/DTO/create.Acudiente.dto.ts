import { IsString, MinLength, MaxLength, IsInt } from 'class-validator';

export class CreateAcudienteDto {
  

  @IsInt()
  id_usuario: number;

  @IsString()
  @MaxLength(10)
  @MinLength(0)
  telefono: string;
  
  @IsString()
  @MinLength(0)
  direccion: string;

}
