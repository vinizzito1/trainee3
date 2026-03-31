import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  id?: string;
  nome: string;
  matricula: string;
  turma: string;
  notas: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DiarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/diario'; 

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  salvar(aluno: Aluno): Observable<Aluno> {
    if (aluno.id) {
      return this.http.patch<Aluno>(`${this.apiUrl}/${aluno.id}`, aluno);
    }
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}