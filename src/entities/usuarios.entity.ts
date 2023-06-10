import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Canciones } from './canciones.entity';

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

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Canciones, (canciones) => canciones.usuario)
  canciones: Canciones[];

  @Column({ nullable: false, type: 'date' })
  fecha_nacimiento: Date;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
