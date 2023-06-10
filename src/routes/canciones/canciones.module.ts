import { Module } from '@nestjs/common';
import { CancionesController } from './canciones.controller';
import { CancionesService } from './canciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canciones } from 'src/entities/canciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Canciones])],
  controllers: [CancionesController],
  providers: [CancionesService],
})
export class CancionesModule {}
