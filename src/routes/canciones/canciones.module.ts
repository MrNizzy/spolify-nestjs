import { Module } from '@nestjs/common';
import { CancionesController } from './canciones.controller';
import { CancionesService } from './canciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canciones } from 'src/entities/canciones.entity';
import { Usuarios } from 'src/entities/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Canciones, Usuarios])],
  controllers: [CancionesController],
  providers: [CancionesService],
})
export class CancionesModule {}
