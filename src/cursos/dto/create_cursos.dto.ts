import { IsInt, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateCursoDto{
    @IsInt()
    id_curso:number;
    
    @IsString()
    @MinLength(3)
    grado:string;
    
    @IsString()
    @MinLength(3)
    salon:string;
    
    @IsString()
    jornada:string;
    
    @IsString()
    @MaxLength(5)
    codigo_curso:string;
    
    @IsInt()
    id_docente:number;
}