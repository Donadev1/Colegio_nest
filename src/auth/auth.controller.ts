import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async RegisterUser(@Body() data:CreateUserDto){
        return await this.authService.RegisterUser(data);
    }

    @Post('login')
    async LoginUser(@Body() data:LoginDto){
        return await this.authService.LoginUser(data)
    }
    
}
