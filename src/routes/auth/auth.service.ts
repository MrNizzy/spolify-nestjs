import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDtoAuth } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { Usuarios } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDtoAuth } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDtoAuth) {
    try {
      const { password } = body;
      const plainToHash = await hash(password, 10);
      body = { ...body, password: plainToHash };
      return this.usuariosRepository.save(body);
    } catch (error) {
      throw new HttpException('Datos incorrectos', 400);
    }
  }

  async login(body: LoginDtoAuth) {
    const { email, password } = body;
    const findUser = await this.usuariosRepository.findOne({
      where: { email: email },
    });

    if (!findUser) throw new HttpException('Cuenta no encontrada', 404);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('Contraseña incorrecta', 403);

    const payload = { id: findUser.id, username: findUser.username };

    const token = this.jwtService.sign(payload);

    const data = { user: findUser, token };

    return data;
  }
}
