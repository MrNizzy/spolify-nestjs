import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Canciones } from './canciones.entity';
import { Likes } from './likes.entity';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  nombre: string;

  @Column()
  apellido: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Canciones, (canciones) => canciones.usuario)
  canciones: Canciones[];

  @OneToMany(() => Likes, (likes) => likes.usuario)
  likes: Likes[];

  @Column({ nullable: false, type: 'date' })
  fecha_nacimiento: Date;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
