import { interval, throwError, of } from 'rxjs';
import { mergeMap, retry, catchError } from 'rxjs/operators';
import { simularEntregadorId, simularStatusPedido } from '../utils/simulador.js';

export const pedidos$ = interval(2000).pipe(
  mergeMap(() => {
    if (Math.random() < 0.1) {
      return throwError(() => new Error('Falha na comunicação com o servidor'));
    }
    
    return of({
      pedidoId: `PED-${Math.floor(Math.random() * 1000)}`,
      status: simularStatusPedido(),
      entregadorId: simularEntregadorId(),
      timestamp: new Date()
    });
  }),
  retry(3),
  catchError(erro => of({ status: 'erro', mensagem: erro.message }))
);