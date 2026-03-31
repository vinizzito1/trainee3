import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiarioService } from './diario.service';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';

@Controller('diario')
export class DiarioController {
  constructor(private readonly diarioService: DiarioService) {}

  @Post()
  create(@Body() createDiarioDto: CreateDiarioDto) {
    return this.diarioService.create(createDiarioDto);
  }

  @Get()
  findAll() {
    return this.diarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiarioDto: UpdateDiarioDto) {
    return this.diarioService.update(id, updateDiarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diarioService.remove(id);
  }
}
