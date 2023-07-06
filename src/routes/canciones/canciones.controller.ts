import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as ffprobe from 'ffprobe-static';
import { exec } from 'child_process';
import { join } from 'path';
import * as fs from 'fs';
import { CancionesService } from './canciones.service';
import { cancionPostDto } from './dto/cancion-post.dto';
import { Canciones } from 'src/entities/canciones.entity';
import { generosDto } from './dto/generos.dto';
import { updateCancionDto } from './dto/update-cancion.dto';

@Controller('canciones')
export class CancionesController {
  constructor(private cancionesService: CancionesService) {}

  @Get()
  obtenerCanciones(): Promise<Canciones[]> {
    return this.cancionesService.obtenerCanciones();
  }

  @Get('/:id')
  async getCancionesPorUsuario(@Param('id') id: number) {
    return this.cancionesService.getCancionesPorUsuario(id);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          const uniqueSuffix = '_' + Date.now() + '.mp3';
          const originalName = file.originalname.replace(/\s+/g, '_');
          cb(null, originalName.replace(/\.[^.]+$/, '') + uniqueSuffix);
        },
      }),
    }),
  )
  @Post('upload/:id_usuario')
  async uploadFile(
    @Param('id_usuario') id_usuario: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = './uploads/' + file.filename;
    const metadata = await this.getAudioMetadata(filePath);

    const cancion: cancionPostDto = {
      titulo: metadata.format.tags.title ?? '',
      artista: metadata.format.tags.artist ?? '',
      album: metadata.format.tags.album ?? '',
      genero: metadata.format.tags.genre ?? '',
      date: metadata.format.tags.date ?? '',
      duracion: metadata.format.duration ?? '',
      imagen: '',
      audio: file.filename,
    };
    console.log(cancion);
    await this.cancionesService.guardarCancion(cancion, id_usuario);
    return { msg: 'Archivo subido correctamente', file, metadata };
  }

  @Post('generos')
  async getCancionesPorGenero(@Body() genero: generosDto) {
    return this.cancionesService.getCancionesPorGenero(genero.genero);
  }

  @Get('generos/all')
  getAllGeneros() {
    return this.cancionesService.obtenerGeneros();
  }

  @Get('view/:filename')
  async viewFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = join(process.cwd(), 'uploads', filename);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      } else {
        return res
          .status(404)
          .send({ msg: 'El archivo no se encuentra disponible', filename });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ msg: 'Error al procesar la solicitud', error });
    }
  }

  @Patch('update/:id')
  async updateCancion(
    @Param('id') id: number,
    @Body() cancion: updateCancionDto,
  ) {
    return this.cancionesService.updateCancion(id, cancion);
  }

  private async getAudioMetadata(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const command = `${ffprobe.path} -v quiet -print_format json -show_format -show_streams "${filePath}"`;
      exec(command, (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          const metadata = JSON.parse(stdout);
          resolve(metadata);
        }
      });
    });
  }
}
