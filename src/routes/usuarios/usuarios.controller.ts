import { Controller, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from 'src/entities/usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  getUsuarios(): Promise<Usuarios[]> {
    return this.usuariosService.getUsuarios();
  }

  @Get('/:id')
  getUsuarioPorId(@Param('id') id: number) {
    return this.usuariosService.getUsuarioPorId(id);
  }
}
