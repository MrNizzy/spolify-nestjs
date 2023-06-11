import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from 'src/entities/usuarios.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsuarios(): Promise<Usuarios[]> {
    return this.usuariosService.getUsuarios();
  }
}
