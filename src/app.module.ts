import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancionesModule } from './routes/canciones/canciones.module';
import { UsuariosModule } from './routes/usuarios/usuarios.module';
import { AuthModule } from './routes/auth/auth.module';
import { Canciones } from './entities/canciones.entity';
import { Usuarios } from './entities/usuarios.entity';
import { Likes } from './entities/likes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'spolify',
      entities: [Canciones, Usuarios, Likes],
      synchronize: true,
    }),
    CancionesModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
