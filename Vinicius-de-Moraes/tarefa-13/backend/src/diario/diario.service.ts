import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/diario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiarioService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>
  ){}

  async create(createDiarioDto: CreateDiarioDto): Promise<Aluno>{
    const novoAluno = this.alunoRepository.create(createDiarioDto)
    return await this.alunoRepository.save(novoAluno)
  }

  async findAll(): Promise<Aluno[]> {
    return await this.alunoRepository.find()
  }

  async findOne(id: string): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOneBy({ id })

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrad')
    }
    return aluno;
  }

  async update(id: string, updateDiarioDto: UpdateDiarioDto): Promise<Aluno> {
    const aluno = await this.findOne(id)
    this.alunoRepository.merge(aluno, updateDiarioDto);
    return await this.alunoRepository.save(aluno);
  }

  async remove(id: string): Promise<void> {
    const aluno = await this.findOne(id)
    await this.alunoRepository.remove(aluno)
  }
}
