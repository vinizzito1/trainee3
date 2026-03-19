import { timer, of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { simularEntregadorId, simularTipoAlerta, simularSeveridade } from '../utils/simulador.js';

interface Alerta {
  tipo: 'atraso' | 'veiculo_parado' | 'rota_desviada';
  entregadorId: string;
  mensagem: string;
  severidade: 'baixa' | 'media' | 'alta';
}

export const alertas$: Observable<Alerta> = of(null).pipe(
  switchMap(function loop(): Observable<Alerta> {
    const tempoAleatorio = Math.floor(Math.random() * (8000 - 3000 + 1) + 3000);
    
    return timer(tempoAleatorio).pipe(
      map(() => ({
        tipo: simularTipoAlerta(),
        entregadorId: simularEntregadorId(),
        mensagem: 'Alerta gerado pelo sistema',
        severidade: simularSeveridade()
      })),
      switchMap(alerta => of(alerta, null).pipe(switchMap(val => val ? of(val) : loop())))
    );
  })
);