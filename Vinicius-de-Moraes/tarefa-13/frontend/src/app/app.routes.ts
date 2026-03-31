import { Routes } from '@angular/router';
import { ListaAlunos } from './pages/lista-alunos/lista-alunos';
import { FormAlunoComponent } from './pages/form-aluno/form-aluno';

export const routes: Routes = [
    { path: '', redirectTo: 'alunos', pathMatch: 'full'},
    { path: 'alunos', component: ListaAlunos },
    { path: 'alunos/novo', component: FormAlunoComponent},
    { path: 'alunos/editar/:id', component: FormAlunoComponent}
];
