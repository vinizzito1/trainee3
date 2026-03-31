import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiarioService } from '../../services/diario';

@Component({
  selector: 'app-form-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './form-aluno.html',
  styleUrls: ['./form-aluno.scss']
})
export class FormAlunoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private diarioService = inject(DiarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  alunoForm: FormGroup;
  alunoId: string | null = null;

  constructor() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      turma: ['', Validators.required],
      notasStr: [''] 
    });
  }

  ngOnInit() {
    this.alunoId = this.route.snapshot.paramMap.get('id');
    
    if (this.alunoId) {
      this.diarioService.buscarPorId(this.alunoId).subscribe(aluno => {
        this.alunoForm.patchValue({
          nome: aluno.nome,
          matricula: aluno.matricula,
          turma: aluno.turma,
          notasStr: aluno.notas ? aluno.notas.join(', ') : '' 
        });
      });
    }
  }

  salvar() {
    if (this.alunoForm.invalid) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const formValues = this.alunoForm.value;

    const notasArray = formValues.notasStr
      ? formValues.notasStr.split(',').map((n: string) => parseFloat(n.trim())).filter((n: number) => !isNaN(n))
      : [];

    const alunoParaSalvar = {
      id: this.alunoId || undefined,
      nome: formValues.nome,
      matricula: formValues.matricula,
      turma: formValues.turma,
      notas: notasArray
    };

    this.diarioService.salvar(alunoParaSalvar).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }
}