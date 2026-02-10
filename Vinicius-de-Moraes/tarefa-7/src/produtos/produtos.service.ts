import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  async findOne(id: number) {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findOne(id);
    
    this.produtoRepository.merge(produto, updateProdutoDto);
    return this.produtoRepository.save(produto);
  }

  async remove(id: number) {
    const produto = await this.findOne(id);
    return this.produtoRepository.remove(produto);
  }
}