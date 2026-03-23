import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-escolar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-escolar.html',
  styleUrls: ['./cadastro-escolar.css']
})
export class CadastroEscolarComponent {
  aluno = {
    nomeCompleto: '',
    dataNascimento: '',
    emailContato: '',
    senhaPortal: '',
    serie: '',
    turno: '',
    necessidadeEspecial: false,
    nomeResponsavel: '',
    telefoneContato: '',
    aceiteTermos: false
  };

  opcoesSerie = [
    'Educação Infantil',
    'Ensino Fundamental I',
    'Ensino Fundamental II',
    'Ensino Médio'
  ];

  onSubmit(formulario: any) {
    if (formulario.valid) {
      console.log('Dados submetidos para o backend:', this.aluno);
      alert('Cadastro de ' + this.aluno.nomeCompleto + ' realizado com sucesso!');
      formulario.resetForm();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }
}
