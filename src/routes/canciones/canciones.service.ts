import { Injectable, NotFoundException } from '@nestjs/common';
import { cancionPostDto } from './dto/cancion-post.dto';
import { Canciones } from 'src/entities/canciones.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/entities/usuarios.entity';
import { updateCancionDto } from './dto/update-cancion.dto';

@Injectable()
export class CancionesService {
  constructor(
    @InjectRepository(Canciones)
    private cancionesRepository: Repository<Canciones>,
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  async guardarCancion(cancion: cancionPostDto, id_usuario: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id: id_usuario },
    });

    if (!usuario) {
      throw new NotFoundException('No se encontró el usuario.');
    }

    const nuevaCancion = this.cancionesRepository.create({
      ...cancion,
      usuario: usuario,
    });
    await this.cancionesRepository.save(nuevaCancion);
  }

  async getCancionesPorUsuario(id_usuario: number): Promise<Canciones[]> {
    return this.cancionesRepository.find({
      where: {
        usuario: { id: id_usuario },
      },
    });
  }

  async obtenerGeneros(): Promise<string[]> {
    const query = this.cancionesRepository
      .createQueryBuilder('cancion')
      .select('DISTINCT cancion.genero', 'genero')
      .getRawMany();

    const result = await query;

    return await result.map((item) => item.genero);
  }

  async getCancionesPorGenero(genero: string): Promise<Canciones[]> {
    return this.cancionesRepository.find({
      relations: ['usuario'],
      where: {
        genero: genero,
      },
    });
  }

  async updateCancion(id: number, cancion: updateCancionDto) {
    return this.cancionesRepository.update(id, cancion);
  }

  deleteCancion(id: number) {
    return this.cancionesRepository.delete({ id });
  }

  async obtenerCanciones() {
    return await this.cancionesRepository.find({ relations: ['usuario'] });
  }
}
