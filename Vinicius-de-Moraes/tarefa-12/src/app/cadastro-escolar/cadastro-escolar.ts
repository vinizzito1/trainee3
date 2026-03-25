import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormRecord, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro-escolar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-escolar.html',
})
export class CadastroEscolarComponent implements OnInit {
  cadastroForm!: FormGroup;

  documentosRecord!: FormRecord<FormControl<boolean | null>>;

  opcoesSerie = ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.documentosRecord = this.fb.record({
      'RG do Aluno': this.fb.control(false),
      'CPF do Responsável': this.fb.control(false),
      'Comprovante de Residência': this.fb.control(false)
    });

    this.cadastroForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      emailContato: ['', [Validators.required, Validators.email]],
      senhaPortal: ['', [Validators.required, Validators.minLength(6)]],
      serie: ['', Validators.required],
      turno: ['', Validators.required],
      necessidadeEspecial: [false],
      nomeResponsavel: ['', Validators.required],
      telefoneContato: ['', Validators.required],
      aceiteTermos: [false, Validators.requiredTrue],
      
      atividadesExtracurriculares: this.fb.array([
        this.fb.control('')
      ]),

      documentos: this.documentosRecord
    });
  }

  get atividades() {
    return this.cadastroForm.get('atividadesExtracurriculares') as FormArray;
  }

  adicionarAtividade() {
    this.atividades.push(this.fb.control(''));
  }

  removerAtividade(index: number) {
    this.atividades.removeAt(index);
  }

  adicionarNovoDocumento(nomeDocumento: string) {
    if (nomeDocumento && !this.documentosRecord.contains(nomeDocumento)) {
      this.documentosRecord.addControl(nomeDocumento, this.fb.control(false));
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Dados do Reactive Form:', this.cadastroForm.value);
      alert('Cadastro realizado com sucesso!');
      this.cadastroForm.reset();
    } else {
      this.cadastroForm.markAllAsTouched();
      alert('Formulário inválido. Verifique os campos.');
    }
  }
}