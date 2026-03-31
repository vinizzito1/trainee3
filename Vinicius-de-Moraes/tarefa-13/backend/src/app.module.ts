import { Module } from '@nestjs/common';
import { DiarioModule } from './diario/diario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './diario/entities/diario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'diario_db',
      entities: [Aluno],
      synchronize: true,
    }),
    DiarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
