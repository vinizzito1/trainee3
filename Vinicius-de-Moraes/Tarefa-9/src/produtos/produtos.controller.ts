import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { SlugValidationPipe } from '../common/pipes/slug-validation.pipe.js';

@Controller('produtos')
export class ProdutosController {
  
@Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    createProdutoDto.slug = new SlugValidationPipe().transform(createProdutoDto.slug, { type: 'body' });
    
    return {
      message: 'Produto criado com slug validado!',
      data: createProdutoDto
    };
  }
}