import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  getUsuarios(): string {
    return 'Hello World!';
  }
}
