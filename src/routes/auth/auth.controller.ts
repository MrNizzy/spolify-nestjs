import { Body, Controller, Post } from '@nestjs/common';
import { LoginDtoAuth } from './dto/login-auth.dto';
import { RegisterDtoAuth } from './dto/register-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('/register')
  register(@Body() usuarioObject: RegisterDtoAuth) {
    return this.auth.register(usuarioObject);
  }

  @Post('/login')
  login(@Body() usuarioObject: LoginDtoAuth) {
    return this.auth.login(usuarioObject);
  }
}
