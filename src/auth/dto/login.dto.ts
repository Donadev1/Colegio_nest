import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto{

    @MaxLength(10)
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    d_identidad:string;

    @MaxLength(10)
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    contrasena:string;

}