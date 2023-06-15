import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuarios, (usuario) => usuario.likes, { cascade: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: number;

  @OneToOne(() => Usuarios, (cancion) => cancion.likes, { cascade: true })
  @JoinColumn({ name: 'cancion_id' })
  cancion: number;

  @Column()
  like: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
