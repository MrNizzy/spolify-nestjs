import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';
import { usuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  async getUsuarios() {
    return await this.usuariosRepository.find();
  }

  async getUsuarioPorId(id: number) {
    return await this.usuariosRepository.findOne({
      where: { id },
    });
  }

  async updateUsuario(id: number, usuario: usuarioDto) {
    return await this.usuariosRepository.update(id, usuario);
  }
}
