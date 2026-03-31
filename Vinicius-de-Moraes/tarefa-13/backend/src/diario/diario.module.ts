import { Module } from '@nestjs/common';
import { DiarioService } from './diario.service';
import { DiarioController } from './diario.controller';
import { Aluno } from './entities/diario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  controllers: [DiarioController],
  providers: [DiarioService],
})
export class DiarioModule {}
