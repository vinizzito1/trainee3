import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNumber()
  @Min(0, { message: 'O preço deve ser maior que zero' })
  preco: number;
}