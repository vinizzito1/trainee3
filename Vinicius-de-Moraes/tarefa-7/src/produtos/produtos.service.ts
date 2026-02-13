import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService implements OnModuleInit {
  private db: Database;

  async onModuleInit() {
    this.db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        ativo INTEGER DEFAULT 1
      )
    `);
    console.log('📦 Banco de dados SQLite conectado e tabela verificada.');
  }

  async create(createProdutoDto: CreateProdutoDto) {
    const result = await this.db.run(
      'INSERT INTO produto (nome, preco) VALUES (?, ?)',
      [createProdutoDto.nome, createProdutoDto.preco],
    );

    // CORREÇÃO: Usamos '!' para garantir ao TS que lastID não é undefined
    return this.findOne(result.lastID!);
  }

  async findAll() {
    return this.db.all('SELECT * FROM produto');
  }

  async findOne(id: number) {
    const produto = await this.db.get('SELECT * FROM produto WHERE id = ?', [id]);

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    
    return {
        ...produto,
        ativo: produto.ativo === 1
    };
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    await this.findOne(id); 

    // CORREÇÃO: Tipamos explicitamente os arrays
    const updates: string[] = [];
    const values: (string | number)[] = [];

    if (updateProdutoDto.nome !== undefined) {
      updates.push('nome = ?');
      values.push(updateProdutoDto.nome);
    }

    if (updateProdutoDto.preco !== undefined) {
      updates.push('preco = ?');
      values.push(updateProdutoDto.preco);
    }

    if (updates.length > 0) {
      values.push(id); 
      const query = `UPDATE produto SET ${updates.join(', ')} WHERE id = ?`;
      await this.db.run(query, values);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id); 
    
    await this.db.run('DELETE FROM produto WHERE id = ?', [id]);
    return { message: `Produto ${id} removido com sucesso` };
  }
}