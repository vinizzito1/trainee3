import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  slug: string;
}