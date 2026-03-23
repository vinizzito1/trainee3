import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroEscolarComponent } from './cadastro-escolar/cadastro-escolar'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CadastroEscolarComponent], 
  templateUrl: './app.html',
})
export class App {
  title = 'tarefa-11';
}
