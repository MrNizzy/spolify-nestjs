import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';

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
}
