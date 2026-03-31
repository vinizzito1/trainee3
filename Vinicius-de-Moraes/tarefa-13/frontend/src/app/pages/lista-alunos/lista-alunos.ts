import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Aluno, DiarioService } from '../../services/diario';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-alunos.html',
  styleUrl: './lista-alunos.scss',
})
export class ListaAlunos implements OnInit {
  private diarioService = inject(DiarioService)
  private cdr = inject(ChangeDetectorRef)
  alunos: Aluno[] = []

  ngOnInit() {
    this.carregarAlunos()
  }

  carregarAlunos() {
    this.diarioService.listar().subscribe((dados) => {
      console.log("Dados:", dados)
      this.alunos = dados
      this.cdr.detectChanges()
    })
  }

  calcularMedia(notas: number[]): string {
    if (!notas || notas.length === 0) return '0.0'
    const soma = notas.reduce((acc, nota) => acc + nota, 0)
    return (soma / notas.length).toFixed(1)
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      this.diarioService.excluir(id).subscribe(() => {
        this.carregarAlunos()
      })
    }
  }
}
