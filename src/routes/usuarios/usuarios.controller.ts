import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from 'src/entities/usuarios.entity';
import { usuarioDto } from './dto/usuario.dto';

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

  @Patch('update/:id')
  updateUsuario(@Param('id') id: number, @Body() usuario: usuarioDto) {
    return this.usuariosService.updateUsuario(id, usuario);
  }
}
