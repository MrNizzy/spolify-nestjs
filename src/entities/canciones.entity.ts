import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity()
export class Canciones {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuarios, (usuario) => usuario.canciones, { cascade: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuarios;

  @Column()
  titulo: string;

  @Column()
  artista: string;

  @Column()
  album: string;

  @Column()
  date: string;

  @Column()
  genero: string;

  @Column()
  duracion: number;

  @Column()
  imagen: string;

  @Column()
  audio: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;
}
