import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('alunos')
export class Aluno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  matricula: string;

  @Column()
  turma: string;

  @Column('float', { array: true, default: [] })
  notas: number[];
}