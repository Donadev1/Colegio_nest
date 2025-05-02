import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto{

    
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    correo:string;

    @MaxLength(10)
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    contrasena:string;

}